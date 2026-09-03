import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  // Server actions perform their own authorization and may establish the
  // session during sign-in, so they must be allowed through the proxy.
  if (request.headers.has("next-action")) return NextResponse.next();
  const authenticated = [
    "better-auth.session_token",
    "better-auth.session_data",
  ].every((name) => request.cookies.has(name));

  const isAuthPage = request.nextUrl.pathname.startsWith("/auth");
  if (isAuthPage && authenticated)
    return NextResponse.redirect(new URL("/", request.url));
  if (!isAuthPage && !authenticated)
    return NextResponse.redirect(new URL("/auth", request.url));
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
