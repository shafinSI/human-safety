import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const protectedRoutes = [
    "/emergency-contact",
    "/guardian-mode",
    "/emergency-alert",
    "/safety-travel",
  ];

  const isProtectedRoute = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/emergency-contact/:path*",
    "/guardian-mode/:path*",
    "/emergency-alert/:path*",
    "/safety-travel/:path*",
  ],
};