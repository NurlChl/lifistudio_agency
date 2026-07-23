import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

const publicPaths = ["/dashboard/login", "/api/auth/seed"];

export default auth((req) => {
  const { pathname, searchParams } = req.nextUrl;

  // ── Allow public paths ──
  if (publicPaths.some((p) => pathname.startsWith(p))) return NextResponse.next();
  if (pathname.startsWith("/api/auth")) return NextResponse.next();

  // ── Protect dashboard routes ──
  if (pathname.startsWith("/dashboard")) {
    if (!req.auth?.user) {
      // API routes → JSON 401
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

  // ── Protect API docs & OpenAPI spec (superadmin only) ──
  if (pathname === "/api/docs" || pathname === "/api/openapi") {
    if (!req.auth?.user || req.auth.user.role !== "superadmin") {
      if (pathname === "/api/docs") {
        // Return HTML error page for the docs page
        return new NextResponse(
          `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"/><title>Akses Ditolak</title>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;background:#0a0a0f;color:#fff;display:flex;align-items:center;justify-content:center;min-height:100vh}
.card{text-align:center;max-width:420px;padding:40px}
.lock{font-size:48px;margin-bottom:16px}
h1{font-size:22px;margin-bottom:8px}
p{color:#888;line-height:1.6;margin-bottom:24px}
.btn{display:inline-block;padding:10px 24px;background:#c9774d;color:#fff;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600;text-decoration:none}
</style>
</head>
<body>
<div class="card">
<div class="lock">🔒</div>
<h1>Akses Terbatas</h1>
<p>Halaman dokumentasi API hanya bisa diakses oleh Superadmin Lifi Studio. Silakan login ke CMS dashboard terlebih dahulu.</p>
<a href="/dashboard/login" class="btn">Login ke CMS</a>
</div>
</body>
</html>`,
          {
            status: 401,
            headers: {
              "Content-Type": "text/html; charset=utf-8",
              "X-Robots-Tag": "noindex, nofollow",
            },
          }
        );
      }
      // openapi.json → JSON error
      return NextResponse.json(
        { success: false, error: "Unauthorized — superadmin only" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/dashboard/:path*",
    "/api/docs",
    "/api/openapi",
  ],
};
