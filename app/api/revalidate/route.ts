import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export const runtime = "nodejs";

/**
 * On-demand revalidation. Called by the admin when an article is published/updated.
 * Auth: shared secret in the `x-revalidate-secret` header (constant-time compared).
 * Body: { slug?: string }  — revalidates /resources and /resources/<slug>.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;

  // Fail closed: if no secret is configured server-side, never allow revalidation.
  if (!secret) {
    return NextResponse.json({ ok: false, error: "Revalidation not configured" }, { status: 503 });
  }

  const provided = req.headers.get("x-revalidate-secret") ?? "";
  if (!timingSafeEqual(provided, secret)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let slug: string | undefined;
  try {
    const body = await req.json();
    slug = typeof body?.slug === "string" ? body.slug : undefined;
  } catch {
    // empty/invalid body is fine — we still revalidate the index
  }

  const revalidated: string[] = [];
  revalidatePath("/resources");
  revalidated.push("/resources");

  if (slug) {
    revalidatePath(`/resources/${slug}`);
    revalidated.push(`/resources/${slug}`);
  }

  return NextResponse.json({ ok: true, revalidated, now: Date.now() });
}

// Length-agnostic constant-time-ish compare (avoids leaking length via early return).
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
