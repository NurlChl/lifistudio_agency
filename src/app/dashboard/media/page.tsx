"use client";

import { Upload, Trash2, ImageIcon, Loader2, X, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import { getMedia, uploadMedia, deleteMedia } from "@/lib/actions/media";
import { toast } from "react-hot-toast";
import { useConfirm } from "@/components/providers/ConfirmProvider";

export default function DashboardMedia() {
  const confirm = useConfirm();
  const [dragOver, setDragOver] = useState(false);
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [queue, setQueue] = useState<{ id: string; file: File; status: "pending" | "uploading" | "success" | "error" }[]>([]);
  const [previewMedia, setPreviewMedia] = useState<any | null>(null);

  useEffect(() => {
    loadMedia();
  }, []);

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

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement> | React.DragEvent) {
    let files: FileList | null = null;
    if ("dataTransfer" in e) {
      files = e.dataTransfer.files;
    } else if ("target" in e && e.target.files) {
      files = e.target.files;
    }

    if (!files || files.length === 0) return;

    const newTasks = Array.from(files).map(f => ({
      id: Math.random().toString(),
      file: f,
      status: "pending" as const
    }));
    
    setQueue(prev => [...prev, ...newTasks]);
    setUploading(true);
    let successCount = 0;
    
    for (const task of newTasks) {
      setQueue(prev => prev.map(q => q.id === task.id ? { ...q, status: "uploading" } : q));
      try {
        const formData = new FormData();
        formData.append("file", task.file);
        await uploadMedia(formData);
        setQueue(prev => prev.map(q => q.id === task.id ? { ...q, status: "success" } : q));
        successCount++;
      } catch {
        setQueue(prev => prev.map(q => q.id === task.id ? { ...q, status: "error" } : q));
        toast.error(`Gagal upload ${task.file.name}`);
      }
    }

    if (successCount > 0) {
      toast.success(`${successCount} media berhasil diupload`);
      loadMedia();
    }
    
    setUploading(false);
    setDragOver(false);
  }

  async function handleDelete(id: string) {
    if (!(await confirm("Hapus media ini secara permanen?"))) return;
    try {
      await deleteMedia(id);
      toast.success("Media dihapus");
      loadMedia();
    } catch {
      toast.error("Gagal menghapus media");
    }
  }

  function formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return "0 Bytes";
    const k = 1024, dm = decimals < 0 ? 0 : decimals, sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

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
        onDrop={(e) => { e.preventDefault(); handleUpload(e); }}
      >
        <div className="w-14 h-14 rounded-full bg-stone-50 flex items-center justify-center mx-auto mb-4">
          <Upload size={24} className="text-stone-400" />
        </div>
        <p className="text-sm font-medium text-stone-700 mb-1">
          {uploading ? `Uploading... (${queue.filter(q => q.status === 'success').length}/${queue.length})` : "Drop files here or click to upload"}
        </p>
        <p className="text-xs text-stone-400 mb-6">
          PNG, JPG, SVG, WebP up to 10MB (stored in Cloudinary)
        </p>
        <label className="px-6 py-2.5 rounded-lg bg-stone-900 text-white text-sm font-medium hover:bg-stone-700 transition-all cursor-pointer">
          Choose Files
          <input type="file" multiple className="hidden" accept="image/*" onChange={handleUpload} disabled={uploading} />
        </label>
        
        {queue.length > 0 && (
          <div className="w-full max-w-xl mx-auto mt-6 bg-white rounded-xl border border-stone-100 p-4 space-y-2 max-h-48 overflow-y-auto text-left">
            {queue.map(q => (
              <div key={q.id} className="flex items-center justify-between text-sm">
                <span className="truncate max-w-62.5 sm:max-w-sm text-stone-700">{q.file.name}</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex items-center ${
                  q.status === 'success' ? 'bg-green-50 text-green-600' :
                  q.status === 'error' ? 'bg-red-50 text-red-600' :
                  q.status === 'uploading' ? 'bg-blue-50 text-blue-600' :
                  'bg-stone-100 text-stone-500'
                }`}>
                  {q.status === 'uploading' && <Loader2 size={12} className="animate-spin mr-1" />}
                  {q.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="text-stone-400 animate-pulse">Loading media...</div>
      ) : media.length === 0 ? (
        <div className="text-center py-16 border border-stone-100 rounded-xl bg-stone-50/50">
          <ImageIcon size={32} className="mx-auto text-stone-300 mb-2" />
          <p className="text-sm text-stone-500">Belum ada media yang diupload.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {media.map((file) => (
            <div key={file._id} className="group relative aspect-square rounded-xl border border-stone-100 bg-stone-50 overflow-hidden cursor-pointer" onClick={() => setPreviewMedia(file)}>
              <img src={file.url} alt={file.filename} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent p-3 pt-8 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end pointer-events-none">
                <p className="text-xs text-white font-medium truncate">{file.filename}</p>
                <p className="text-[10px] text-white/80">{formatBytes(file.size || 0)}</p>
              </div>
              
              <div className="absolute top-2 left-2 p-1.5 rounded-lg bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-all pointer-events-none">
                <Eye size={14} />
              </div>

              <button 
                onClick={(e) => { e.stopPropagation(); handleDelete(file._id); }}
                className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/80 hover:bg-white text-stone-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all shadow-sm"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Preview Modal */}
      {previewMedia && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setPreviewMedia(null)}>
          <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center" onClick={e => e.stopPropagation()}>
            <button onClick={() => setPreviewMedia(null)} className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-all">
              <X size={24} />
            </button>
            <img src={previewMedia.url} alt={previewMedia.filename} className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl" />
            <div className="mt-4 text-center">
              <p className="text-white font-medium">{previewMedia.filename}</p>
              <p className="text-white/60 text-sm">{formatBytes(previewMedia.size || 0)} • {previewMedia.mimeType}</p>
              <a href={previewMedia.url} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-xs text-accent-400 hover:text-accent-300 transition-colors">
                Open in new tab ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
