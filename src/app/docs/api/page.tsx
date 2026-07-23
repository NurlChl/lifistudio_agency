"use client";

import dynamic from "next/dynamic";

const ApiReference = dynamic(
  () => import("@scalar/api-reference").then((mod) => mod.ApiReference),
  { ssr: false }
);

export default function ApiDocsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <style>{`
        body { margin: 0; background: #0a0a0f; }
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
      <ApiReference
        configuration={{
          spec: { url: "/api/openapi" },
          theme: "purple",
          layout: "modern",
          hideDownloadButton: false,
          darkMode: true,
        }}
      />
    </div>
  );
}
