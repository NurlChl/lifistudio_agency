"use client";

import { useEffect, useState, Suspense } from "react";
import { Plus, Edit, Trash2, X } from "lucide-react";
import { getCategories, createCategory, updateCategory, deleteCategory } from "@/lib/actions/categories";
import { toast } from "react-hot-toast";
import { useConfirm } from "@/components/providers/ConfirmProvider";
import SearchableSelect from "@/components/ui/SearchableSelect";
import { useSearchParams } from "next/navigation";

function CategoriesContent() {
  const confirm = useConfirm();
  const searchParams = useSearchParams();
  const forcedType = searchParams.get("type") as "blog" | "portfolio" | "pricing" | null;

  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState<"blog" | "portfolio" | "pricing" | "all">(forcedType || "all");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({ name: "", slug: "", type: (forcedType || "blog") as "blog" | "portfolio" | "pricing", description: "" });

  useEffect(() => {
    if (forcedType) {
      setTypeFilter(forcedType);
    }
  }, [forcedType]);

  async function load() {
    try {
      const res = await getCategories(typeFilter !== "all" ? typeFilter : undefined);
      setCategories(res);
    } catch { toast.error("Gagal memuat kategori"); }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, [typeFilter]);

  function openCreate() {
    setEditing(null);
    setForm({ name: "", slug: "", type: forcedType || (typeFilter === "all" ? "blog" : typeFilter), description: "" });
    setShowModal(true);
  }

  function openEdit(cat: any) {
    setEditing(cat);
    setForm({ name: cat.name, slug: cat.slug, type: cat.type, description: cat.description || "" });
    setShowModal(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.slug.trim()) { toast.error("Name & Slug wajib diisi"); return; }
    setSaving(true);
    try {
      if (editing) {
        await updateCategory(editing._id, form);
        toast.success("Kategori diupdate");
      } else {
        await createCategory(form);
        toast.success("Kategori dibuat");
      }
      setShowModal(false);
      load();
    } catch (err: any) { toast.error("Gagal menyimpan (mungkin slug duplikat)"); }
    finally { setSaving(false); }
  }

  async function handleDelete(id: string) {
    if (!(await confirm("Hapus kategori ini?"))) return;
    try {
      await deleteCategory(id);
      toast.success("Kategori dihapus");
      load();
    } catch { toast.error("Gagal menghapus"); }
  }

  return (
    <div className="p-6 lg:p-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-stone-900 capitalize">
            {forcedType ? `${forcedType} Categories` : "Categories"}
          </h1>
          <p className="text-sm text-stone-400 mt-1">Manage categories {forcedType ? `for ${forcedType}` : "for Blog, Portfolio, and Pricing"}</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-stone-900 text-white text-sm font-medium hover:bg-stone-700 transition-all">
          <Plus size={18} /> New Category
        </button>
      </div>

      {!forcedType && (
        <div className="flex gap-2 mb-6">
          {["all", "blog", "portfolio", "pricing"].map((t) => (
            <button key={t} onClick={() => setTypeFilter(t as any)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${typeFilter === t ? "bg-stone-900 text-white" : "bg-white text-stone-500 border border-stone-200 hover:border-stone-400"}`}
            >{t.charAt(0).toUpperCase() + t.slice(1)}</button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-16 bg-stone-50 rounded-xl animate-pulse" />)}</div>
      ) : (
        <div className="bg-white rounded-xl border border-stone-100 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone-100">
                <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider px-6 py-4">Name</th>
                <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider px-6 py-4">Slug</th>
                {!forcedType && <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider px-6 py-4">Type</th>}
                <th className="text-right text-xs font-semibold text-stone-400 uppercase tracking-wider px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat._id} className="border-b border-stone-50 hover:bg-stone-50/50">
                  <td className="px-6 py-4 text-sm font-medium text-stone-900">{cat.name}</td>
                  <td className="px-6 py-4 text-sm text-stone-500">{cat.slug}</td>
                  {!forcedType && (
                    <td className="px-6 py-4">
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600 font-medium capitalize">{cat.type}</span>
                    </td>
                  )}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(cat)} className="p-2 rounded-lg hover:bg-stone-100 text-stone-400"><Edit size={16} /></button>
                      <button onClick={() => handleDelete(cat._id)} className="p-2 rounded-lg hover:bg-red-50 text-stone-400 hover:text-red-500"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {categories.length === 0 && <div className="text-center py-16"><p className="text-sm text-stone-400">No categories found</p></div>}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-xl font-semibold text-stone-900">{editing ? "Edit Category" : "New Category"}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-stone-100 text-stone-400"><X size={20} /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Name *</label>
                <input type="text" value={form.name} onChange={e => {
                  const name = e.target.value;
                  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
                  setForm({...form, name, slug: editing ? form.slug : slug});
                }} className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Slug *</label>
                <input type="text" value={form.slug} onChange={e => setForm({...form, slug: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500" required />
              </div>
              
              {!forcedType && (
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Type *</label>
                  <SearchableSelect 
                    options={[
                      { label: "Blog", value: "blog" },
                      { label: "Portfolio", value: "portfolio" },
                      { label: "Pricing", value: "pricing" }
                    ]}
                    value={form.type}
                    onChange={(val) => setForm({...form, type: val as "blog" | "portfolio" | "pricing"})}
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Description</label>
                <textarea rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500" />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2.5 rounded-lg border border-stone-200 text-sm font-medium text-stone-600 hover:bg-stone-50">Cancel</button>
                <button type="submit" disabled={saving} className="px-6 py-2.5 rounded-lg bg-stone-900 text-white text-sm font-semibold hover:bg-stone-700 disabled:opacity-50">
                  {saving ? "Saving..." : editing ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DashboardCategories() {
  return (
    <Suspense fallback={<div className="p-10">Loading categories...</div>}>
      <CategoriesContent />
    </Suspense>
  );
}
