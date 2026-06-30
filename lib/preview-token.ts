const enc = new TextEncoder();

function toB64url(bytes: Uint8Array): string {
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromB64url(s: string): Uint8Array {
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  return arr;
}

export async function verifyPreviewToken(token: string): Promise<{ id: number } | null> {
  const secret = process.env.PREVIEW_SECRET;
  if (!secret) return null;

  const dot = token.lastIndexOf(".");
  if (dot <= 0) return null;

  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);

  try {
    const key = await crypto.subtle.importKey(
      "raw",
      enc.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      fromB64url(sig) as unknown as BufferSource,
      enc.encode(payload) as unknown as BufferSource
    );
    if (!valid) return null;

    const data = JSON.parse(new TextDecoder().decode(fromB64url(payload))) as {
      id: number;
      exp: number;
    };
    if (Date.now() > data.exp) return null;

    return { id: data.id };
  } catch {
    return null;
  }
}
