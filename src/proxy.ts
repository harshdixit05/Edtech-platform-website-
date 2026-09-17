import { NextResponse, type NextRequest } from "next/server";

/**
 * A redirect convenience, NOT an authorisation boundary.
 *
 * The proxy runs on the Edge runtime with no database access, so it can only
 * see whether a session cookie is present — not whether it is valid, unexpired
 * or carries the right role. Every protected page and action re-checks the
 * session server-side with getCurrentUser(); this only saves a signed-out
 * visitor from rendering a page they will be bounced from anyway.
 */
const PROTECTED = ["/account"];

const SESSION_COOKIE =
  process.env.NODE_ENV === "production" ? "__Host-imf_session" : "imf_session";

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!PROTECTED.some((path) => pathname === path || pathname.startsWith(`${path}/`))) {
    return NextResponse.next();
  }

  if (request.cookies.has(SESSION_COOKIE)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/login";
  url.search = "";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/account/:path*"],
};
