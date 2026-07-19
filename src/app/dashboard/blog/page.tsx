"use client";

import { useState } from "react";
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react";

const dummyPosts = [
  { id: "1", title: "Cara Memilih Tech Stack di 2026", category: "Web Development", status: "published", date: "2026-07-15" },
  { id: "2", title: "Otomatisasi CRM dengan n8n", category: "Automation", status: "published", date: "2026-07-10" },
  { id: "3", title: "Tips Desain Website Profesional", category: "UI/UX", status: "draft", date: "2026-06-28" },
];

export default function DashboardBlog() {
  return (
    <div className="p-6 lg:p-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-stone-900">Blog</h1>
          <p className="text-sm text-stone-400 mt-1">Manage blog posts</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-stone-900 text-white text-sm font-medium hover:bg-stone-700 transition-all">
          <Plus size={18} />
          New Post
        </button>
      </div>

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
            {dummyPosts.map((post) => (
              <tr key={post.id} className="border-b border-stone-50 hover:bg-stone-50/50 transition-colors">
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-stone-900">{post.title}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-accent-50 text-accent-600 font-medium">
                    {post.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                    post.status === "published"
                      ? "bg-green-50 text-green-600"
                      : "bg-yellow-50 text-yellow-600"
                  }`}>
                    {post.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-stone-400">{post.date}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button className="p-2 rounded-lg hover:bg-stone-100 text-stone-400 transition-all" title="View">
                      <Eye size={16} />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-stone-100 text-stone-400 transition-all" title="Edit">
                      <Edit size={16} />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-red-50 text-stone-400 hover:text-red-500 transition-all" title="Delete">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
