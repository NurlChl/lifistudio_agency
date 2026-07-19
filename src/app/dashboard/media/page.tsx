"use client";

import { Upload, Trash2, ImageIcon } from "lucide-react";
import { useState } from "react";

const dummyMedia = [
  { id: "1", name: "hero-bg.jpg", size: "2.4 MB", date: "2 days ago" },
  { id: "2", name: "logo-lifi.svg", size: "48 KB", date: "5 days ago" },
  { id: "3", name: "project-1.png", size: "1.8 MB", date: "1 week ago" },
];

export default function DashboardMedia() {
  const [dragOver, setDragOver] = useState(false);

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-semibold text-stone-900">Media Library</h1>
        <p className="text-sm text-stone-400 mt-1">Upload and manage your images & files (Cloudinary)</p>
      </div>

      {/* Upload Zone */}
      <div
        className={`border-2 border-dashed rounded-xl p-12 text-center mb-8 transition-all ${
          dragOver ? "border-accent-500 bg-accent-50/30" : "border-stone-200 hover:border-stone-300"
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); }}
      >
        <div className="w-14 h-14 rounded-full bg-stone-50 flex items-center justify-center mx-auto mb-4">
          <Upload size={24} className="text-stone-400" />
        </div>
        <p className="text-sm font-medium text-stone-700 mb-1">
          Drop files here or click to upload
        </p>
        <p className="text-xs text-stone-400 mb-6">
          PNG, JPG, SVG, WebP up to 10MB (stored in Cloudinary)
        </p>
        <button className="px-6 py-2.5 rounded-lg bg-stone-900 text-white text-sm font-medium hover:bg-stone-700 transition-all">
          Choose Files
        </button>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {dummyMedia.map((file) => (
          <div key={file.id} className="group relative aspect-square rounded-xl border border-stone-100 bg-stone-50 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <ImageIcon size={32} className="text-stone-300" />
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 pt-8 opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-xs text-white font-medium truncate">{file.name}</p>
              <p className="text-xs text-white/60">{file.size}</p>
            </div>
            <button className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/80 hover:bg-white text-stone-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
