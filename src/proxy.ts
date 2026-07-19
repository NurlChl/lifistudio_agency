import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

const publicPaths = ["/dashboard/login", "/api/auth/seed"];

export const proxy = auth((req) => {
  const { pathname, searchParams } = req.nextUrl;

  // Allow public dashboard paths and API auth routes
  if (publicPaths.some((p) => pathname.startsWith(p))) return NextResponse.next();
  if (pathname.startsWith("/api/auth")) return NextResponse.next();

  // Protect all /dashboard and /api/dashboard routes
  if (pathname.startsWith("/dashboard")) {
    if (!req.auth?.user) {
      // API routes → JSON 401, never redirect to login HTML
      if (pathname.startsWith("/api/dashboard")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      // Pages → redirect to login with callbackUrl
      const loginUrl = new URL("/dashboard/login", req.url);
      const callbackUrl = pathname + (searchParams.toString() ? `?${searchParams}` : "");
      loginUrl.searchParams.set("callbackUrl", callbackUrl);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/api/dashboard/:path*"],
};
