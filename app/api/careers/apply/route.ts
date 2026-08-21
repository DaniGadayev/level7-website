import { NextRequest, NextResponse } from "next/server";

/**
 * Public application handler for /careers. Receives the visitor's multipart
 * form, validates it (required fields, resume type/size, magic bytes), then
 * forwards it server-side to the admin CMS with the shared internal secret,
 * mirroring the /api/contact -> /api/leads pattern. The resume never touches
 * a third party and is stored only in the admin app's private volume.
 *
 * Env:
 *   LEADS_INTERNAL_SECRET — shared secret for internal site->admin calls
 *   CAREERS_ADMIN_URL     — override for the admin apply endpoint (optional)
 */
export const runtime = "nodejs";

const ADMIN_APPLY_URL =
  process.env.CAREERS_ADMIN_URL || "http://level7-admin:3001/api/careers/apply";

const MAX_RESUME_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_EXT = ["pdf", "doc", "docx"] as const;
type AllowedExt = (typeof ALLOWED_EXT)[number];

// Best-effort in-memory rate limit (per server instance) — same approach as
// the contact form, slightly stricter because uploads are heavier.
const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const clean = (v: unknown, max = 5000) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

/** The resume's bytes must match its claimed extension. */
function magicBytesMatch(ext: AllowedExt, buf: Buffer): boolean {
  if (buf.length < 8) return false;
  switch (ext) {
    case "pdf":
      return buf.subarray(0, 4).toString("latin1") === "%PDF";
    case "docx":
      return buf[0] === 0x50 && buf[1] === 0x4b && buf[2] === 0x03 && buf[3] === 0x04;
    case "doc":
      return (
        buf[0] === 0xd0 && buf[1] === 0xcf && buf[2] === 0x11 && buf[3] === 0xe0 &&
        buf[4] === 0xa1 && buf[5] === 0xb1 && buf[6] === 0x1a && buf[7] === 0xe1
      );
  }
}

/** Duck-typed file check (the File global is version-dependent in Node). */
function isUploadedFile(v: unknown): v is Blob & { name?: string } {
  return (
    typeof v === "object" &&
    v !== null &&
    typeof (v as Blob).arrayBuffer === "function" &&
    typeof (v as Blob).size === "number"
  );
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      { status: 429 }
    );
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields. Pretend success, forward nothing.
  if (clean(form.get("company"))) {
    return NextResponse.json({ ok: true });
  }

  const jobPostingId = Number(form.get("jobPostingId"));
  const name = clean(form.get("name"), 200);
  const email = clean(form.get("email"), 320);
  const phone = clean(form.get("phone"), 60);
  const message = clean(form.get("message"), 5000);
  const consent = form.get("consent") === "true";
  const resume = form.get("resume");

  if (!Number.isInteger(jobPostingId) || jobPostingId <= 0 || !name || !email) {
    return NextResponse.json(
      { ok: false, error: "Please complete all required fields." },
      { status: 400 }
    );
  }
  if (!isEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 }
    );
  }
  if (!consent) {
    return NextResponse.json(
      { ok: false, error: "Please agree to the Privacy Policy to continue." },
      { status: 400 }
    );
  }
  if (!isUploadedFile(resume) || resume.size === 0) {
    return NextResponse.json(
      { ok: false, error: "Please attach your resume (PDF, DOC or DOCX)." },
      { status: 400 }
    );
  }
  if (resume.size > MAX_RESUME_BYTES) {
    return NextResponse.json(
      { ok: false, error: "Your resume must be 5MB or smaller." },
      { status: 400 }
    );
  }

  const filename = clean(resume.name || "resume", 300) || "resume";
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  if (!ALLOWED_EXT.includes(ext as AllowedExt)) {
    return NextResponse.json(
      { ok: false, error: "Your resume must be a PDF, DOC or DOCX file." },
      { status: 400 }
    );
  }

  const buf = Buffer.from(await resume.arrayBuffer());
  if (!magicBytesMatch(ext as AllowedExt, buf)) {
    return NextResponse.json(
      { ok: false, error: "The file content does not match its file type." },
      { status: 400 }
    );
  }

  if (!process.env.LEADS_INTERNAL_SECRET) {
    console.error("[careers/apply] LEADS_INTERNAL_SECRET not set — cannot forward application.");
    return NextResponse.json(
      { ok: false, error: "Applications are temporarily unavailable." },
      { status: 503 }
    );
  }

  // Forward to the admin CMS, which stores the resume privately, saves the
  // application, and notifies us by email.
  const forward = new FormData();
  forward.append("jobPostingId", String(jobPostingId));
  forward.append("name", name);
  forward.append("email", email);
  forward.append("phone", phone);
  forward.append("message", message);
  forward.append(
    "resume",
    new Blob([buf], { type: resume.type || "application/octet-stream" }),
    filename
  );

  try {
    const res = await fetch(ADMIN_APPLY_URL, {
      method: "POST",
      headers: { "x-careers-secret": process.env.LEADS_INTERNAL_SECRET },
      body: forward,
      signal: AbortSignal.timeout(15000),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok) {
      console.error("[careers/apply] admin forward failed", res.status, data.error || "");
      return NextResponse.json(
        {
          ok: false,
          error:
            typeof data.error === "string" && res.status < 500
              ? data.error
              : "Could not submit your application. Please try again.",
        },
        { status: res.status < 500 ? res.status : 502 }
      );
    }
  } catch (err) {
    console.error("[careers/apply] forward error", err);
    return NextResponse.json(
      { ok: false, error: "Could not submit your application. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
