import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Canonicalizes the domain: www.thelevel7.ai has no reason to exist as a
// separate crawlable copy of the site, so it always redirects to the bare
// domain that every page already declares as its canonical URL.
export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  if (host === "www.thelevel7.ai") {
    const url = request.nextUrl.clone();
    url.hostname = "thelevel7.ai";
    url.protocol = "https";
    url.port = "";
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
