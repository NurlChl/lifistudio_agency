"use client";

import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Eye, X, Star } from "lucide-react";
import { getPortfolios, createPortfolio, updatePortfolio, deletePortfolio } from "@/lib/actions";
import { toast } from "react-hot-toast";
import Link from "next/link";

const categories = [
  { value: "all", label: "All" },
  { value: "web", label: "Web" },
  { value: "uiux", label: "UI/UX" },
  { value: "graphic", label: "Graphic" },
  { value: "automation", label: "Automation" },
];

const catColors: Record<string, string> = {
  web: "bg-blue-50 text-blue-600",
  uiux: "bg-purple-50 text-purple-600",
  graphic: "bg-pink-50 text-pink-600",
  automation: "bg-cyan-50 text-cyan-600",
};
const statusColors: Record<string, string> = {
  published: "bg-green-50 text-green-600",
  draft: "bg-yellow-50 text-yellow-600",
};

const defaultForm = { title: "", description: "", fullDescription: "", category: "web" as const, technologies: "" as string, coverImage: "", liveUrl: "", clientName: "", featured: false, status: "draft" as const };

export default function DashboardPortfolio() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(defaultForm);

  async function load() {
    try {
      const res = await getPortfolios({ category: filter !== "all" ? filter : undefined });
      setItems(res.items);
    } catch { toast.error("Gagal memuat portfolio"); }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, [filter]);

  function openCreate() {
    setEditing(null); setForm(defaultForm); setShowModal(true);
  }

  function openEdit(p: any) {
    setEditing(p);
    setForm({
      title: p.title, description: p.description || "", fullDescription: p.fullDescription || "",
      category: p.category, technologies: (p.technologies || []).join(", "),
      coverImage: p.coverImage || "", liveUrl: p.liveUrl || "", clientName: p.clientName || "",
      featured: p.featured || false, status: p.status || "draft",
    });
    setShowModal(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) { toast.error("Title wajib diisi"); return; }
    setSaving(true);
    const data = { ...form, technologies: form.technologies.split(",").map((t: string) => t.trim()).filter(Boolean) };
    try {
      if (editing) {
        await updatePortfolio(editing._id, data);
        toast.success("Portfolio berhasil diupdate");
      } else {
        await createPortfolio(data as any);
        toast.success("Portfolio berhasil dibuat");
      }
      setShowModal(false);
      load();
    } catch { toast.error("Gagal menyimpan portfolio"); }
    finally { setSaving(false); }
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus project ini?")) return;
    try { await deletePortfolio(id); toast.success("Portfolio berhasil dihapus"); load(); }
    catch { toast.error("Gagal menghapus portfolio"); }
  }

  async function toggleFeatured(item: any) {
    try {
      await updatePortfolio(item._id, { featured: !item.featured });
      toast.success(item.featured ? "Featured removed" : "Marked as featured");
      load();
    } catch { toast.error("Gagal update featured"); }
  }

  return (
    <div className="p-6 lg:p-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-stone-900">Portfolio</h1>
          <p className="text-sm text-stone-400 mt-1">Manage your portfolio projects</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-stone-900 text-white text-sm font-medium hover:bg-stone-700 transition-all">
          <Plus size={18} /> Add Project
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        {categories.map((cat) => (
          <button key={cat.value} onClick={() => setFilter(cat.value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${filter === cat.value ? "bg-stone-900 text-white" : "bg-white text-stone-500 border border-stone-200 hover:border-stone-400"}`}>
            {cat.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-16 bg-stone-50 rounded-xl animate-pulse" />)}</div>
      ) : (
        <div className="bg-white rounded-xl border border-stone-100 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone-100">
                <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider px-6 py-4">Title</th>
                <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider px-6 py-4">Category</th>
                <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider px-6 py-4">Status</th>
                <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider px-6 py-4">Featured</th>
                <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider px-6 py-4">Date</th>
                <th className="text-right text-xs font-semibold text-stone-400 uppercase tracking-wider px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p._id} className="border-b border-stone-50 hover:bg-stone-50/50 transition-colors">
                  <td className="px-6 py-4"><p className="text-sm font-medium text-stone-900">{p.title}</p></td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium capitalize ${catColors[p.category] || "bg-stone-50 text-stone-500"}`}>{p.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${statusColors[p.status] || "bg-stone-50 text-stone-500"}`}>{p.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => toggleFeatured(p)} className={`transition-colors ${p.featured ? "text-yellow-500" : "text-stone-300 hover:text-stone-400"}`}>
                      <Star size={16} fill={p.featured ? "currentColor" : "none"} />
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm text-stone-400">{new Date(p.createdAt).toLocaleDateString("id-ID")}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/portfolio/${p.slug}`} target="_blank" className="p-2 rounded-lg hover:bg-stone-100 text-stone-400 transition-all" title="View"><Eye size={16} /></Link>
                      <button onClick={() => openEdit(p)} className="p-2 rounded-lg hover:bg-stone-100 text-stone-400 transition-all" title="Edit"><Edit size={16} /></button>
                      <button onClick={() => handleDelete(p._id)} className="p-2 rounded-lg hover:bg-red-50 text-stone-400 hover:text-red-500 transition-all" title="Delete"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {items.length === 0 && <div className="text-center py-16"><p className="text-sm text-stone-400">No projects found</p></div>}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center pt-20 pb-10 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-xl font-semibold text-stone-900">{editing ? "Edit Project" : "New Project"}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-stone-100 text-stone-400"><X size={20} /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Title *</label>
                <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Category</label>
                  <select value={form.category} onChange={e => setForm({...form, category: e.target.value as any})}
                    className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500">
                    {categories.filter(c => c.value !== "all").map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Status</label>
                  <select value={form.status} onChange={e => setForm({...form, status: e.target.value as any})}
                    className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500">
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Description *</label>
                <textarea rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Full Description</label>
                <textarea rows={4} value={form.fullDescription} onChange={e => setForm({...form, fullDescription: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Cover Image URL</label>
                  <input type="url" value={form.coverImage} onChange={e => setForm({...form, coverImage: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Technologies (comma separated)</label>
                  <input type="text" value={form.technologies} onChange={e => setForm({...form, technologies: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500" placeholder="Next.js, Tailwind, MongoDB" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
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
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={form.featured} onChange={e => setForm({...form, featured: e.target.checked})}
                  className="w-4 h-4 rounded border-stone-300 text-accent-500 focus:ring-accent-500" />
                <span className="text-sm font-medium text-stone-700">Featured project</span>
              </label>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2.5 rounded-lg border border-stone-200 text-sm font-medium text-stone-600 hover:bg-stone-50 transition-all">Cancel</button>
                <button type="submit" disabled={saving} className="px-6 py-2.5 rounded-lg bg-stone-900 text-white text-sm font-semibold hover:bg-stone-700 disabled:opacity-50 transition-all">
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
