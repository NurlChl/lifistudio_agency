"use client";

import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Eye, X } from "lucide-react";
import { getBlogs, createBlog, updateBlog, deleteBlog } from "@/lib/actions";
import { toast } from "react-hot-toast";
import Link from "next/link";

const categories = ["all", "Web Development", "UI/UX", "Graphic Design", "Automation"];
const statusColors: Record<string, string> = {
  published: "bg-green-50 text-green-600",
  draft: "bg-yellow-50 text-yellow-600",
};

export default function DashboardBlog() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({ title: "", content: "", category: "Web Development", status: "draft" as const, coverImage: "" });

  async function loadBlogs() {
    try {
      const res = await getBlogs({ status: statusFilter !== "all" ? statusFilter : undefined });
      setBlogs(res.items);
    } catch { toast.error("Gagal memuat blog"); }
    finally { setLoading(false); }
  }

  useEffect(() => { loadBlogs(); }, [statusFilter]);

  function openCreate() {
    setEditing(null);
    setForm({ title: "", content: "", category: "Web Development", status: "draft", coverImage: "" });
    setShowModal(true);
  }

  function openEdit(blog: any) {
    setEditing(blog);
    setForm({ title: blog.title, content: blog.content, category: blog.category, status: blog.status, coverImage: blog.coverImage || "" });
    setShowModal(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) { toast.error("Title wajib diisi"); return; }
    setSaving(true);
    try {
      if (editing) {
        await updateBlog(editing._id, form);
        toast.success("Blog berhasil diupdate");
      } else {
        await createBlog(form);
        toast.success("Blog berhasil dibuat");
      }
      setShowModal(false);
      loadBlogs();
    } catch { toast.error("Gagal menyimpan blog"); }
    finally { setSaving(false); }
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus blog ini?")) return;
    try {
      await deleteBlog(id);
      toast.success("Blog berhasil dihapus");
      loadBlogs();
    } catch { toast.error("Gagal menghapus blog"); }
  }

  return (
    <div className="p-6 lg:p-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-stone-900">Blog</h1>
          <p className="text-sm text-stone-400 mt-1">Manage blog posts</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-stone-900 text-white text-sm font-medium hover:bg-stone-700 transition-all">
          <Plus size={18} /> New Post
        </button>
      </div>

      {/* Status filter tabs */}
      <div className="flex gap-2 mb-6">
        {["all", "published", "draft"].map((s) => (
          <button key={s} onClick={() => setStatusFilter(s)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${statusFilter === s ? "bg-stone-900 text-white" : "bg-white text-stone-500 border border-stone-200 hover:border-stone-400"}`}
          >{s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}</button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-16 bg-stone-50 rounded-xl animate-pulse" />)}</div>
      ) : (
        <>
          <div className="bg-white rounded-xl border border-stone-100 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-stone-100">
                  <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider px-6 py-4">Title</th>
                  <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider px-6 py-4">Category</th>
                  <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider px-6 py-4">Status</th>
                  <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider px-6 py-4">Date</th>
                  <th className="text-right text-xs font-semibold text-stone-400 uppercase tracking-wider px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((post) => (
                  <tr key={post._id} className="border-b border-stone-50 hover:bg-stone-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-stone-900">{post.title}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-accent-50 text-accent-600 font-medium">{post.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${statusColors[post.status] || "bg-stone-50 text-stone-500"}`}>{post.status}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-stone-400">{new Date(post.createdAt).toLocaleDateString("id-ID")}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/blog/${post.slug}`} target="_blank" className="p-2 rounded-lg hover:bg-stone-100 text-stone-400 transition-all" title="View">
                          <Eye size={16} />
                        </Link>
                        <button onClick={() => openEdit(post)} className="p-2 rounded-lg hover:bg-stone-100 text-stone-400 transition-all" title="Edit">
                          <Edit size={16} />
                        </button>
                        <button onClick={() => handleDelete(post._id)} className="p-2 rounded-lg hover:bg-red-50 text-stone-400 hover:text-red-500 transition-all" title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {blogs.length === 0 && <div className="text-center py-16"><p className="text-sm text-stone-400">No posts found</p></div>}
          </div>
        </>
      )}

      {/* Create / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center pt-20 pb-10 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-xl font-semibold text-stone-900">{editing ? "Edit Post" : "New Post"}</h2>
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
                  <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500">
                    {categories.filter(c => c !== "all").map(c => <option key={c} value={c}>{c}</option>)}
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
                <label className="block text-sm font-medium text-stone-700 mb-2">Cover Image URL</label>
                <input type="url" value={form.coverImage} onChange={e => setForm({...form, coverImage: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500" placeholder="https://..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Content *</label>
                <textarea rows={10} value={form.content} onChange={e => setForm({...form, content: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 resize-y font-mono" required />
              </div>
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
