"use client";

import { useEffect } from "react";
import { X, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ImagePreviewModalProps {
  src: string;
  alt?: string;
  onClose: () => void;
}

export function ImagePreviewModal({ src, alt = "Preview", onClose }: ImagePreviewModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-5xl w-full max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute -top-4 -right-4 z-10 p-2 rounded-full bg-white text-stone-700 hover:bg-stone-100 shadow-lg transition-all"
            aria-label="Close preview"
          >
            <X size={18} />
          </button>

          {/* Image */}
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-contain max-h-[85vh]"
            />
          </div>

          {/* Caption */}
          {alt && alt !== "Preview" && (
            <p className="text-center text-sm text-white/60 mt-3">{alt}</p>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Thumbnail wrapper with click-to-preview ────────────────────────────────
interface PreviewableImageProps {
  src: string;
  alt?: string;
  className?: string;
  onDelete?: () => void;
}

export function PreviewableImage({ src, alt, className, onDelete }: PreviewableImageProps) {
  return (
    <div className={`relative group ${className || ""}`}>
      <img src={src} alt={alt || "Image"} className="w-full h-full object-cover" />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/40 transition-all rounded-lg flex items-center justify-center gap-2">
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-white rounded-lg text-stone-700 hover:bg-stone-50 shadow-sm"
          title="Lihat gambar penuh"
        >
          <ZoomIn size={16} />
        </a>
        {onDelete && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-white rounded-lg text-red-500 hover:bg-red-50 shadow-sm"
            title="Hapus gambar"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
