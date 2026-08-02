"use client";

import { useState, useEffect } from "react";
import { Upload, X, ImageIcon, Check, Loader2 } from "lucide-react";
import { uploadMedia, getMedia } from "@/lib/actions/media";
import { toast } from "react-hot-toast";

interface MediaPickerProps {
  onSelect: (url: string | string[]) => void;
  onClose: () => void;
  multiple?: boolean;
}

export default function MediaPicker({ onSelect, onClose, multiple = false }: MediaPickerProps) {
  const [tab, setTab] = useState<"upload" | "library" | "url">("library");
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [customUrl, setCustomUrl] = useState("");
  const [queue, setQueue] = useState<{ id: string; file: File; status: "pending" | "uploading" | "success" | "error" }[]>([]);

  useEffect(() => {
    if (tab === "library") loadMedia();
  }, [tab]);

  async function loadMedia() {
    setLoading(true);
    try {
      const res = await getMedia({ limit: 50 });
      setMedia(res.items);
    } catch {
      toast.error("Gagal memuat media");
    } finally {
      setLoading(false);
    }
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newTasks = Array.from(files).map(f => ({
      id: Math.random().toString(),
      file: f,
      status: "pending" as const
    }));

    setQueue(prev => [...prev, ...newTasks]);
    setUploading(true);
    let successCount = 0;
    const successUrls: string[] = [];

    for (const task of newTasks) {
      setQueue(prev => prev.map(q => q.id === task.id ? { ...q, status: "uploading" } : q));
      try {
        const formData = new FormData();
        formData.append("file", task.file);
        const result = await uploadMedia(formData);
        setQueue(prev => prev.map(q => q.id === task.id ? { ...q, status: "success" } : q));
        // Collect uploaded URL if returned
        if (result?.url) successUrls.push(result.url);
        successCount++;
      } catch {
        setQueue(prev => prev.map(q => q.id === task.id ? { ...q, status: "error" } : q));
        toast.error(`Gagal upload ${task.file.name}`);
      }
    }

    if (successCount > 0) {
      toast.success(`${successCount} file berhasil diupload`);
      await loadMedia();
      // Switch to library tab so user can select uploaded images
      setTab("library");
    }

    setUploading(false);
  }

  function toggleSelect(url: string) {
    if (multiple) {
      setSelected((prev) => prev.includes(url) ? prev.filter((u) => u !== url) : [...prev, url]);
    } else {
      setSelected([url]);
    }
  }

  function handleConfirm() {
    if (tab === "url") {
      if (!customUrl) return;
      onSelect(multiple ? [customUrl] : customUrl);
    } else {
      if (selected.length === 0) return;
      onSelect(multiple ? selected : selected[0]);
    }
    onClose();
  }

  // Whether the confirm button should be enabled
  const canConfirm = tab === "url" ? !!customUrl : selected.length > 0;

  return (
    <div className="fixed inset-0 z-200 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden flex flex-col h-[80vh]">

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-stone-100">
          <h2 className="font-heading text-lg font-semibold text-stone-900">Select Media</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-stone-100 text-stone-400"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-stone-100 px-4">
          {(["library", "upload", "url"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-all ${
                tab === t ? "border-accent-500 text-accent-600" : "border-transparent text-stone-500 hover:text-stone-700"
              }`}
            >
              {t === "library" ? "Media Library" : t === "upload" ? "Upload File" : "From URL"}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 bg-stone-50/50">
          {tab === "library" && (
            loading ? (
              <div className="flex items-center justify-center h-full text-stone-400">Loading...</div>
            ) : media.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-stone-400 gap-2">
                <ImageIcon size={32} />
                <p>No media found</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {media.map((m) => {
                  const isSelected = selected.includes(m.url);
                  return (
                    <div
                      key={m._id}
                      role="button"
                      tabIndex={0}
                      onClick={() => toggleSelect(m.url)}
                      onKeyDown={(e) => e.key === "Enter" && toggleSelect(m.url)}
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                        isSelected ? "border-accent-500" : "border-transparent hover:border-stone-200"
                      }`}
                    >
                      <img src={m.url} alt={m.filename} className="w-full h-full object-cover" />
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center text-white">
                          <Check size={14} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )
          )}

          {tab === "upload" && (
            <div className="flex flex-col items-center justify-center h-full py-10">
              <label className="flex flex-col items-center justify-center w-full max-w-md h-64 border-2 border-dashed border-stone-300 rounded-2xl cursor-pointer bg-white hover:bg-stone-50 transition-all mb-4">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {uploading ? (
                    <p className="text-sm text-stone-500 font-medium">
                      Uploading... ({queue.filter(q => q.status === "success").length}/{queue.length})
                    </p>
                  ) : (
                    <>
                      <Upload className="w-10 h-10 text-stone-400 mb-3" />
                      <p className="mb-2 text-sm text-stone-600"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                      <p className="text-xs text-stone-500">PNG, JPG or WebP (MAX. 10MB)</p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  multiple
                  className="hidden"
                  accept="image/*"
                  onChange={handleUpload}
                  disabled={uploading}
                />
              </label>

              {queue.length > 0 && (
                <div className="w-full max-w-md bg-white rounded-xl border border-stone-100 p-4 space-y-2 max-h-48 overflow-y-auto">
                  {queue.map(q => (
                    <div key={q.id} className="flex items-center justify-between text-sm">
                      <span className="truncate max-w-50 text-stone-700">{q.file.name}</span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex items-center ${
                        q.status === "success" ? "bg-green-50 text-green-600" :
                        q.status === "error" ? "bg-red-50 text-red-600" :
                        q.status === "uploading" ? "bg-blue-50 text-blue-600" :
                        "bg-stone-100 text-stone-500"
                      }`}>
                        {q.status === "uploading" && <Loader2 size={12} className="animate-spin mr-1" />}
                        {q.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === "url" && (
            <div className="p-4">
              <label className="block text-sm font-medium text-stone-700 mb-2">Image URL</label>
              <input
                type="url"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
                placeholder="https://example.com/image.jpg"
              />
              {customUrl && (
                <div className="mt-4 aspect-video bg-stone-100 rounded-xl overflow-hidden max-w-md mx-auto">
                  <img
                    src={customUrl}
                    alt="Preview"
                    className="w-full h-full object-contain"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-100 flex justify-end gap-3 bg-white">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-lg text-sm font-medium text-stone-600 hover:bg-stone-100"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!canConfirm}
            className="px-6 py-2 rounded-lg bg-stone-900 text-white text-sm font-semibold hover:bg-stone-700 disabled:opacity-50"
          >
            Insert {multiple && selected.length > 1 ? `(${selected.length})` : ""}
          </button>
        </div>

      </div>
    </div>
  );
}
