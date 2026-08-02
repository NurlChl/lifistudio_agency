"use client";

import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Eye, X } from "lucide-react";
import { getBlogs, createBlog, updateBlog, deleteBlog } from "@/lib/actions";
import { toast } from "react-hot-toast";
import { useConfirm } from "@/components/providers/ConfirmProvider";
import Link from "next/link";
import { getCategories } from "@/lib/actions/categories";
const statusColors: Record<string, string> = {
  published: "bg-green-50 text-green-600",
  draft: "bg-yellow-50 text-yellow-600",
};

export default function DashboardBlog() {
  const confirm = useConfirm();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");

  async function loadBlogs() {
    try {
      const [res, cats] = await Promise.all([
        getBlogs({ status: statusFilter !== "all" ? statusFilter : undefined }),
        getCategories("blog")
      ]);
      setBlogs(res.items);
      setCategories(cats);
    } catch { toast.error("Gagal memuat blog"); }
    finally { setLoading(false); }
  }

  useEffect(() => { loadBlogs(); }, [statusFilter]);

  async function handleDelete(id: string) {
    if (!(await confirm("Hapus blog ini?"))) return;
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
        <Link href="/dashboard/blog/create" className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-stone-900 text-white text-sm font-medium hover:bg-stone-700 transition-all">
          <Plus size={18} /> New Post
        </Link>
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
                    <td className="px-6 py-4 text-sm text-stone-400">{new Date(post.publishedAt || post.createdAt).toLocaleDateString("id-ID")}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/blog/${post.slug}`} target="_blank" className="p-2 rounded-lg hover:bg-stone-100 text-stone-400 transition-all" title="View">
                          <Eye size={16} />
                        </Link>
                        <Link href={`/dashboard/blog/edit/${post._id}`} className="p-2 rounded-lg hover:bg-stone-100 text-stone-400 transition-all" title="Edit">
                          <Edit size={16} />
                        </Link>
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

    </div>
  );
}
