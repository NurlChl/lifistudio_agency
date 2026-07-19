"use client";

import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Eye, X, Star } from "lucide-react";
import { getPortfolios, createPortfolio, updatePortfolio, deletePortfolio } from "@/lib/actions";
import { toast } from "react-hot-toast";
import { useConfirm } from "@/components/providers/ConfirmProvider";
import Link from "next/link";
import { getCategories } from "@/lib/actions/categories";

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

const defaultForm = { title: "", slug: "", description: "", fullDescription: "", category: "web" as const, technologies: "" as string, coverImage: "", images: [] as string[], liveUrl: "", clientName: "", featured: false, status: "draft" as const };

export default function DashboardPortfolio() {
  const confirm = useConfirm();
  const [items, setItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  async function load() {
    try {
      const [res, cats] = await Promise.all([
        getPortfolios({ category: filter !== "all" ? filter : undefined }),
        getCategories("portfolio")
      ]);
      setItems(res.items);
      setCategories([{ slug: "all", name: "All" }, ...cats]);
    } catch { toast.error("Gagal memuat portfolio"); }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, [filter]);

  useEffect(() => { load(); }, [filter]);

  async function handleDelete(id: string) {
    if (!(await confirm("Hapus project ini?"))) return;
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
        <Link href="/dashboard/portfolio/create" className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-stone-900 text-white text-sm font-medium hover:bg-stone-700 transition-all">
          <Plus size={18} /> Add Project
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        {categories.map((cat) => (
          <button key={cat.slug} onClick={() => setFilter(cat.slug)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${filter === cat.slug ? "bg-stone-900 text-white" : "bg-white text-stone-500 border border-stone-200 hover:border-stone-400"}`}>
            {cat.name}
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
                      <Link href={`/dashboard/portfolio/edit/${p._id}`} className="p-2 rounded-lg hover:bg-stone-100 text-stone-400 transition-all" title="Edit"><Edit size={16} /></Link>
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

    </div>
  );
}
