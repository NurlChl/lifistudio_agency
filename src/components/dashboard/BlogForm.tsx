"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createBlog, updateBlog } from "@/lib/actions";
import { getCategories } from "@/lib/actions/categories";
import { toast } from "react-hot-toast";
import MediaPicker from "./MediaPicker";
import RichTextEditor from "./RichTextEditor";
import SearchableSelect from "@/components/ui/SearchableSelect";
import { ImagePreviewModal, PreviewableImage } from "./ImagePreview";

const defaultForm = { title: "", slug: "", content: "", category: "", status: "draft" as "draft" | "published", coverImage: "" };

export default function BlogForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [form, setForm] = useState(() => initialData ? {
    title: initialData.title,
    slug: initialData.slug || "",
    content: initialData.content || "",
    category: initialData.category || "",
    status: initialData.status || "draft",
    coverImage: initialData.coverImage || "",
  } : defaultForm);
  const [saving, setSaving] = useState(false);
  const [showCoverPicker, setShowCoverPicker] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    async function loadCats() {
      const cats = await getCategories("blog");
      setCategories(cats);
      if (!initialData && cats.length > 0) {
        setForm(f => ({ ...f, category: cats[0].slug }));
      }
    }
    loadCats();
  }, [initialData]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) { toast.error("Title wajib diisi"); return; }
    if (!form.category) { toast.error("Pilih kategori"); return; }
    if (!form.coverImage) { toast.error("Cover image wajib diisi"); return; }

    setSaving(true);
    try {
      if (initialData) {
        await updateBlog(initialData._id, form);
        toast.success("Blog diupdate");
      } else {
        await createBlog(form);
        toast.success("Blog dibuat");
      }
      router.push("/dashboard/blog");
    } catch (err: any) { toast.error("Gagal menyimpan blog (cek duplikat slug)"); }
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
              className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500" placeholder="Auto-generated if left blank" />
          </div>
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

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">Cover Image URL *</label>
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
          <label className="block text-sm font-medium text-stone-700 mb-2">Content *</label>
          <div className="mt-2">
            <RichTextEditor content={form.content} onChange={(content) => setForm({...form, content})} />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t border-stone-100">
          <button type="button" onClick={() => router.push("/dashboard/blog")} className="px-6 py-3 rounded-lg border border-stone-200 text-sm font-medium text-stone-600 hover:bg-stone-50 transition-all">Cancel</button>
          <button type="submit" disabled={saving} className="px-8 py-3 rounded-lg bg-stone-900 text-white text-sm font-semibold hover:bg-stone-700 disabled:opacity-50 transition-all">
            {saving ? "Saving..." : initialData ? "Update Post" : "Create Post"}
          </button>
        </div>
      </form>

      {showCoverPicker && (
        <MediaPicker onSelect={(url) => setForm({...form, coverImage: url as string})} onClose={() => setShowCoverPicker(false)} multiple={false} />
      )}
      {previewImage && (
        <ImagePreviewModal src={previewImage} onClose={() => setPreviewImage(null)} />
      )}
    </div>
  );
}
