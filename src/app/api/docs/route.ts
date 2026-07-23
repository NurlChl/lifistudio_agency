import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { openApiSpec } from "@/lib/openapi-spec";

export async function GET() {
  const session = await auth();

  // Only superadmin can access API docs
  if (!session?.user || session.user.role !== "superadmin") {
    return new NextResponse(
      `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"/><title>Akses Ditolak — Lifi Studio</title>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body { font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif; background:#0a0a0f; color:#fff; display:flex; align-items:center; justify-content:center; min-height:100vh; }
.card { text-align:center; max-width:420px; padding:40px; }
.lock { font-size:48px; margin-bottom:16px; }
h1 { font-size:22px; margin-bottom:8px; }
p { color:#888; line-height:1.6; margin-bottom:24px; }
.btn { display:inline-block; padding:10px 24px; background:#c9774d; color:#fff; border-radius:8px; text-decoration:none; font-size:14px; font-weight:600; }
.btn:hover { background:#d68a5e; }
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

  // Authorized — serve Scalar docs with embedded spec (no client-side fetch needed)
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Lifi Studio API — Documentation</title>
  <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚡</text></svg>"/>
  <meta name="robots" content="noindex, nofollow" />
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif; background:#0a0a0f; }
    .navbar {
      display:flex; align-items:center; justify-content:space-between;
      padding:12px 24px; border-bottom:1px solid rgba(255,255,255,0.08);
      background:#0a0a0f; position:sticky; top:0; z-index:100;
    }
    .navbar a { text-decoration:none; }
    .navbar-brand { color:#fff; font-weight:700; font-size:18px; letter-spacing:-0.3px; }
    .navbar-brand:hover { color:#c9774d; }
    .navbar-links { display:flex; gap:16px; }
    .navbar-links a { color:#888; font-size:13px; transition:color .2s; }
    .navbar-links a:hover { color:#fff; }
  </style>
</head>
<body>
  <nav class="navbar">
    <a href="/" class="navbar-brand">lifi.docs</a>
    <div class="navbar-links">
      <a href="/dashboard">Dashboard</a>
      <a href="/blog">Blog</a>
    </div>
  </nav>
  <script id="api-reference" type="application/json">${JSON.stringify(openApiSpec)}</script>
  <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"></script>
</body>
</html>`;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow",
      "Cache-Control": "no-store",
    },
  });
}
