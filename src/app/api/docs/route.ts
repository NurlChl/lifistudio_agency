import { NextResponse } from "next/server";

export async function GET() {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Lifi Studio API — Documentation</title>
  <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚡</text></svg>" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; background: #0a0a0f; }
    .navbar {
      display: flex; align-items: center; justify-content: space-between;
      padding: 12px 24px; border-bottom: 1px solid rgba(255,255,255,0.08);
      background: #0a0a0f; position: sticky; top: 0; z-index: 100;
    }
    .navbar a { text-decoration: none; }
    .navbar-brand { color: #fff; font-weight: 700; font-size: 18px; letter-spacing: -0.3px; }
    .navbar-brand:hover { color: #c9774d; }
    .navbar-links { display: flex; gap: 16px; }
    .navbar-links a { color: #888; font-size: 13px; transition: color 0.2s; }
    .navbar-links a:hover { color: #fff; }
  </style>
</head>
<body>
  <nav class="navbar">
    <a href="/" class="navbar-brand">lifi.docs</a>
    <div class="navbar-links">
      <a href="/api/openapi" target="_blank">openapi.json</a>
      <a href="/dashboard">CMS</a>
    </div>
  </nav>
  <script id="api-reference" data-url="/api/openapi" data-configuration='{"theme":"purple","layout":"modern","darkMode":true}'></script>
  <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"></script>
</body>
</html>`;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
