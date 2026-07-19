import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPaths = ["/dashboard/login", "/api/auth/seed"];

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Allow public dashboard paths and API auth routes
  if (publicPaths.some((p) => pathname.startsWith(p))) return NextResponse.next();
  if (pathname.startsWith("/api/auth")) return NextResponse.next();

  // Protect all /dashboard routes
  if (pathname.startsWith("/dashboard")) {
    if (!req.auth?.user) {
      const loginUrl = new URL("/dashboard/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/api/dashboard/:path*"],
};
