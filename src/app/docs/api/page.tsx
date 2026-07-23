"use client";

import { useEffect, useRef } from "react";

export default function ApiDocsPage() {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elRef.current) return;
    const div = elRef.current;
    div.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@scalar/api-reference";
    script.async = true;
    script.onload = () => {
      // @ts-expect-error - Scalar CDN script
      if (window.Scalar) {
        // @ts-expect-error
        window.Scalar.createApiReferenceApp({
          el: div,
          spec: {
            url: "/api/openapi",
          },
          configuration: {
            theme: "purple",
            layout: "modern",
            hideDownloadButton: false,
            hideModels: false,
            darkMode: true,
          },
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <style>{`
        body { margin: 0; background: #0a0a0f; }
        /* Override Scalar link colors to match brand */
        .scalar-api-reference a { color: #c9774d !important; }
      `}</style>
      <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 bg-[#0a0a0f]">
        <a
          href="/"
          className="text-white font-bold text-lg hover:text-[#c9774d] transition-colors"
        >
          lifi.docs
        </a>
        <div className="flex items-center gap-4 text-sm text-zinc-400">
          <a
            href="/api/openapi"
            target="_blank"
            className="hover:text-white transition-colors"
          >
            openapi.json
          </a>
          <a
            href="/dashboard"
            className="hover:text-white transition-colors"
          >
            CMS
          </a>
        </div>
      </div>
      <div ref={elRef} id="scalar-api" />
    </div>
  );
}
