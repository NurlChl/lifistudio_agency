"use client";

import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, X } from "lucide-react";
import { getAllPricing, createPricing, updatePricing, deletePricing } from "@/lib/actions";
import { toast } from "react-hot-toast";

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

const defaultForm = { category: "web" as const, name: "", tagline: "", price: "", unit: "jt", description: "", features: "" as string, recommended: false, sortOrder: 0 };

export default function DashboardPricing() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(defaultForm);

  async function load() {
    try {
      const data = await getAllPricing();
      setItems(data);
    } catch { toast.error("Gagal memuat pricing"); }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  const filtered = filter === "all" ? items : items.filter((i) => i.category === filter);

  function openCreate() { setEditing(null); setForm(defaultForm); setShowModal(true); }

  function openEdit(p: any) {
    setEditing(p);
    setForm({
      category: p.category, name: p.name, tagline: p.tagline || "",
      price: p.price, unit: p.unit || "jt", description: p.description || "",
      features: (p.features || []).join(", "), recommended: p.recommended || false,
      sortOrder: p.sortOrder || 0,
    });
    setShowModal(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) { toast.error("Nama paket wajib diisi"); return; }
    setSaving(true);
    const data = {
      ...form,
      features: form.features.split(",").map((f: string) => f.trim()).filter(Boolean),
    };
    try {
      if (editing) {
        await updatePricing(editing._id, data);
        toast.success("Pricing berhasil diupdate");
      } else {
        await createPricing(data as any);
        toast.success("Pricing berhasil dibuat");
      }
      setShowModal(false);
      load();
    } catch { toast.error("Gagal menyimpan pricing"); }
    finally { setSaving(false); }
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus paket pricing ini?")) return;
    try { await deletePricing(id); toast.success("Pricing berhasil dihapus"); load(); }
    catch { toast.error("Gagal menghapus pricing"); }
  }

  return (
    <div className="p-6 lg:p-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-stone-900">Pricing</h1>
          <p className="text-sm text-stone-400 mt-1">Manage service pricing packages</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-stone-900 text-white text-sm font-medium hover:bg-stone-700 transition-all">
          <Plus size={18} /> Add Package
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
                <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider px-6 py-4">Name</th>
                <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider px-6 py-4">Category</th>
                <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider px-6 py-4">Price</th>
                <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider px-6 py-4">Recommended</th>
                <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider px-6 py-4">Sort</th>
                <th className="text-right text-xs font-semibold text-stone-400 uppercase tracking-wider px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p._id} className="border-b border-stone-50 hover:bg-stone-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-stone-900">{p.name}</p>
                    {p.tagline && <p className="text-xs text-stone-400">{p.tagline}</p>}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium capitalize ${catColors[p.category] || "bg-stone-50 text-stone-500"}`}>{p.category}</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-stone-900">Rp {p.price} {p.unit}</td>
                  <td className="px-6 py-4">
                    {p.recommended ? <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-600 font-medium">Recommended</span> : <span className="text-xs text-stone-300">—</span>}
                  </td>
                  <td className="px-6 py-4 text-sm text-stone-400">{p.sortOrder}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(p)} className="p-2 rounded-lg hover:bg-stone-100 text-stone-400 transition-all" title="Edit"><Edit size={16} /></button>
                      <button onClick={() => handleDelete(p._id)} className="p-2 rounded-lg hover:bg-red-50 text-stone-400 hover:text-red-500 transition-all" title="Delete"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="text-center py-16"><p className="text-sm text-stone-400">No pricing found</p></div>}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center pt-20 pb-10 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-xl font-semibold text-stone-900">{editing ? "Edit Package" : "New Package"}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-stone-100 text-stone-400"><X size={20} /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Name *</label>
                  <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Category</label>
                  <select value={form.category} onChange={e => setForm({...form, category: e.target.value as any})}
                    className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500">
                    {categories.filter(c => c.value !== "all").map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Tagline</label>
                <input type="text" value={form.tagline} onChange={e => setForm({...form, tagline: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Price *</label>
                  <input type="text" value={form.price} onChange={e => setForm({...form, price: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500" required placeholder="1,5" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Unit</label>
                  <select value={form.unit} onChange={e => setForm({...form, unit: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500">
                    <option value="jt">jt</option>
                    <option value="rb">rb</option>
                    <option value="jt+">jt+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Sort Order</label>
                  <input type="number" value={form.sortOrder} onChange={e => setForm({...form, sortOrder: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Description</label>
                <textarea rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Features (comma separated)</label>
                <input type="text" value={form.features} onChange={e => setForm({...form, features: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500" placeholder="Responsive design, SEO optimized, 1 bulan support" />
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={form.recommended} onChange={e => setForm({...form, recommended: e.target.checked})}
                  className="w-4 h-4 rounded border-stone-300 text-accent-500 focus:ring-accent-500" />
                <span className="text-sm font-medium text-stone-700">Recommended package</span>
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
