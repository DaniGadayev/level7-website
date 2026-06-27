import { NextRequest, NextResponse } from "next/server";
import { LEGAL_ENTITY } from "@/lib/legal/config";

/**
 * First-party contact-form handler. Replaces the previous direct POST to
 * formsubmit.co (a US third party with no DPA). Leads are sent to our inbox
 * via Resend (a disclosed processor under a data-processing agreement), so
 * personal data stays first-party and GDPR-accountable.
 *
 * Env:
 *   RESEND_API_KEY     — required to actually send (server-only secret)
 *   CONTACT_TO_EMAIL   — inbox that receives leads (default dani@thelevel7.ai)
 *   CONTACT_FROM_EMAIL — verified Resend sender (default noreply@thelevel7.ai)
 */
export const runtime = "nodejs";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || LEGAL_ENTITY.emails.general;
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL || "LEVEL7 <noreply@thelevel7.ai>";

// Best-effort in-memory rate limit (per server instance).
const WINDOW_MS = 60_000;
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
const esc = (v: string) =>
  v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

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

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 }
    );
  }

  // Honeypot — bots fill hidden fields. Pretend success, send nothing.
  if (clean(body.company)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, 200);
  const email = clean(body.email, 320);
  const phone = clean(body.phone, 60);
  const subject = clean(body.subject, 200);
  const message = clean(body.message, 5000);
  const consent = body.consent === true;

  if (!name || !email || !subject || !message) {
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

  if (!process.env.RESEND_API_KEY) {
    console.error("[contact] RESEND_API_KEY is not set — cannot send lead.");
    return NextResponse.json(
      { ok: false, error: "Messaging is temporarily unavailable." },
      { status: 503 }
    );
  }

  const html = `
    <div style="font-family:system-ui,sans-serif;font-size:15px;color:#1A1A1A;line-height:1.6">
      <h2 style="margin:0 0 12px">New lead from thelevel7.ai</h2>
      <p><strong>Name:</strong> ${esc(name)}</p>
      <p><strong>Email:</strong> ${esc(email)}</p>
      ${phone ? `<p><strong>Phone:</strong> ${esc(phone)}</p>` : ""}
      <p><strong>Subject:</strong> ${esc(subject)}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-wrap;background:#F7F7F7;padding:12px;border-radius:8px">${esc(message)}</p>
      <hr style="border:none;border-top:1px solid #E5E5E5;margin:16px 0" />
      <p style="font-size:12px;color:#6B6B6B">Consent to Privacy Policy: yes · Submitted ${new Date().toISOString()} · IP ${esc(ip)}</p>
    </div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject: `New lead: ${subject} (${name})`,
        html,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[contact] Resend error", res.status, detail);
      return NextResponse.json(
        { ok: false, error: "Could not send your message. Please try again." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("[contact] send failed", err);
    return NextResponse.json(
      { ok: false, error: "Could not send your message. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
