"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createPortfolio, updatePortfolio } from "@/lib/actions";
import { getCategories } from "@/lib/actions/categories";
import { toast } from "react-hot-toast";
import { X } from "lucide-react";
import MediaPicker from "./MediaPicker";
import SearchableSelect from "@/components/ui/SearchableSelect";
import RichTextEditor from "./RichTextEditor";
import { ImagePreviewModal, PreviewableImage } from "./ImagePreview";

const defaultForm = { title: "", slug: "", description: "", fullDescription: "", category: "", technologies: [] as string[], coverImage: "", images: [] as string[], liveUrl: "", clientName: "", featured: false, status: "draft" as "draft" | "published" };

export default function PortfolioForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [form, setForm] = useState(defaultForm);
  const [saving, setSaving] = useState(false);
  const [showCoverPicker, setShowCoverPicker] = useState(false);
  const [showGalleryPicker, setShowGalleryPicker] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [techInput, setTechInput] = useState("");

  useEffect(() => {
    async function loadCats() {
      const cats = await getCategories("portfolio");
      setCategories(cats);
      if (!initialData && cats.length > 0) {
        setForm(f => ({ ...f, category: cats[0].slug }));
      }
    }
    loadCats();

    if (initialData) {
      setForm({
        title: initialData.title,
        slug: initialData.slug || "",
        description: initialData.description || "",
        fullDescription: initialData.fullDescription || "",
        category: initialData.category || "",
        technologies: initialData.technologies || [],
        coverImage: initialData.coverImage || "",
        images: initialData.images || [],
        liveUrl: initialData.liveUrl || "",
        clientName: initialData.clientName || "",
        featured: initialData.featured || false,
        status: initialData.status || "draft",
      });
      setTechInput("");
    }
  }, [initialData]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) { toast.error("Title wajib diisi"); return; }
    if (!form.category) { toast.error("Pilih kategori"); return; }
    if (!form.coverImage) { toast.error("Cover image wajib diisi"); return; }
    
    setSaving(true);
    try {
      const payload = {
        ...form,
        technologies: form.technologies.map(t => t.trim()).filter(Boolean),
      };
      
      if (initialData) {
        await updatePortfolio(initialData._id, payload);
        toast.success("Portfolio diupdate");
      } else {
        await createPortfolio(payload);
        toast.success("Portfolio dibuat");
      }
      router.push("/dashboard/portfolio");
    } catch (err: any) { toast.error("Gagal menyimpan (cek duplikat slug)"); }
    finally { setSaving(false); }
  }

  return (
    <div className="bg-white rounded-xl border border-stone-100 p-6 lg:p-8 max-w-4xl mx-auto">
      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Title *</label>
            <input type="text" value={form.title} onChange={e => {
              const title = e.target.value;
              const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
              setForm({...form, title, slug: initialData ? form.slug : slug});
            }} className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Slug</label>
            <input type="text" value={form.slug} onChange={e => setForm({...form, slug: e.target.value})}
              className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">Short Description *</label>
          <textarea rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})}
            className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500" required />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">Full Description</label>
          <RichTextEditor
            content={form.fullDescription}
            onChange={(html) => setForm({ ...form, fullDescription: html })}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Category *</label>
            <SearchableSelect 
              options={categories.map(c => ({ label: c.name, value: c.slug }))}
              value={form.category}
              onChange={(val) => setForm({...form, category: val})}
              placeholder="Select category..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Status</label>
            <SearchableSelect 
              options={[
                { label: "Draft", value: "draft" },
                { label: "Published", value: "published" }
              ]}
              value={form.status}
              onChange={(val) => setForm({...form, status: val as "draft" | "published"})}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Cover Image *</label>
            <div className="flex gap-2">
              <input type="url" value={form.coverImage} onChange={e => setForm({...form, coverImage: e.target.value})}
                className="flex-1 px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500" required />
              <button type="button" onClick={() => setShowCoverPicker(true)}
                className="px-4 py-2 rounded-lg bg-stone-100 text-stone-600 hover:bg-stone-200 text-sm font-medium transition-all">
                Pick
              </button>
            </div>
            {form.coverImage && (
              <div
                className="mt-4 rounded-lg border border-stone-200 aspect-video overflow-hidden w-full max-w-xs cursor-zoom-in"
                onClick={() => setPreviewImage(form.coverImage)}
                title="Klik untuk preview"
              >
                <PreviewableImage src={form.coverImage} alt="Cover Preview" className="w-full h-full" />
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Technologies (press Enter to add)</label>
            <div className="flex flex-wrap gap-2 p-2 border border-stone-200 rounded-lg bg-white min-h-[46px] focus-within:ring-2 focus-within:ring-accent-500/20 transition-all">
              {form.technologies.map((tag, index) => (
                <span
                  key={index}
                  className="flex items-center gap-1.5 px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium rounded-md transition-colors"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, technologies: form.technologies.filter((_, i) => i !== index) })}
                    className="hover:text-red-500 focus:outline-none transition-colors"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const val = techInput.trim();
                    if (val && !form.technologies.includes(val)) {
                      setForm({ ...form, technologies: [...form.technologies, val] });
                      setTechInput("");
                    }
                  } else if (e.key === "Backspace" && !techInput && form.technologies.length > 0) {
                    setForm({ ...form, technologies: form.technologies.slice(0, -1) });
                  }
                }}
                className="flex-1 min-w-[140px] bg-transparent text-sm focus:outline-none placeholder:text-stone-400 py-1 px-1"
                placeholder={form.technologies.length === 0 ? "e.g. Next.js, Tailwind" : ""}
              />
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-stone-700">Images Gallery</label>
            <button type="button" onClick={() => setShowGalleryPicker(true)} className="text-xs font-medium text-accent-600 hover:text-accent-700">
              + Add Images
            </button>
          </div>
          {form.images.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {form.images.map((img, i) => (
                <div key={i} className="relative aspect-video rounded-lg overflow-hidden border border-stone-200 group cursor-zoom-in">
                  <PreviewableImage
                    src={img}
                    alt={`Gallery ${i + 1}`}
                    className="w-full h-full"
                    onDelete={() => setForm({...form, images: form.images.filter((_, idx) => idx !== i)})}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-stone-400 p-8 border border-dashed border-stone-200 rounded-xl text-center">
              No images in gallery
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Live URL</label>
            <input type="url" value={form.liveUrl} onChange={e => setForm({...form, liveUrl: e.target.value})}
              className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Client Name</label>
            <input type="text" value={form.clientName} onChange={e => setForm({...form, clientName: e.target.value})}
              className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500" />
          </div>
        </div>

        <label className="flex items-center gap-3 cursor-pointer p-4 border border-stone-100 rounded-xl bg-stone-50/50 w-max">
          <input type="checkbox" checked={form.featured} onChange={e => setForm({...form, featured: e.target.checked})}
            className="w-5 h-5 rounded border-stone-300 text-accent-500 focus:ring-accent-500" />
          <span className="text-sm font-medium text-stone-700">Featured project</span>
        </label>

        <div className="flex justify-end gap-3 pt-6 border-t border-stone-100">
          <button type="button" onClick={() => router.push("/dashboard/portfolio")} className="px-6 py-3 rounded-lg border border-stone-200 text-sm font-medium text-stone-600 hover:bg-stone-50 transition-all">Cancel</button>
          <button type="submit" disabled={saving} className="px-8 py-3 rounded-lg bg-stone-900 text-white text-sm font-semibold hover:bg-stone-700 disabled:opacity-50 transition-all">
            {saving ? "Saving..." : initialData ? "Update Portfolio" : "Create Portfolio"}
          </button>
        </div>
      </form>

      {showCoverPicker && (
        <MediaPicker onSelect={(url) => setForm({...form, coverImage: url as string})} onClose={() => setShowCoverPicker(false)} multiple={false} />
      )}
      {showGalleryPicker && (
        <MediaPicker onSelect={(urls) => setForm({...form, images: [...form.images, ...(urls as string[])]})} onClose={() => setShowGalleryPicker(false)} multiple={true} />
      )}
      {previewImage && (
        <ImagePreviewModal src={previewImage} onClose={() => setPreviewImage(null)} />
      )}
    </div>
  );
}
