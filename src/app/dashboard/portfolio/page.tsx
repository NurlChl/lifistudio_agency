"use client";

import { useState } from "react";
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye, ExternalLink } from "lucide-react";
import Link from "next/link";

const dummyProjects = [
  { id: "1", title: "TokoOnline.id", category: "web", status: "published", date: "2026-06-15" },
  { id: "2", title: "SiCantik App", category: "uiux", status: "published", date: "2026-05-20" },
  { id: "3", title: "WarungDigital", category: "web", status: "draft", date: "2026-07-01" },
];

const categories = [
  { value: "all", label: "All" },
  { value: "web", label: "Web" },
  { value: "uiux", label: "UI/UX" },
  { value: "graphic", label: "Graphic" },
  { value: "automation", label: "Automation" },
];

export default function DashboardPortfolio() {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? dummyProjects : dummyProjects.filter((p) => p.category === filter);

  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-stone-900">Portfolio</h1>
          <p className="text-sm text-stone-400 mt-1">Manage your portfolio projects</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-stone-900 text-white text-sm font-medium hover:bg-stone-700 transition-all">
          <Plus size={18} />
          Add Project
        </button>
      </div>

      {/* Filter + Search */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setFilter(cat.value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              filter === cat.value
                ? "bg-stone-900 text-white"
                : "bg-white text-stone-500 border border-stone-200 hover:border-stone-400"
            }`}
          >
            {cat.label}
          </button>
        ))}
        <div className="ml-auto relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-9 pr-4 py-2 rounded-lg border border-stone-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-accent-500"
          />
        </div>
      </div>

      {/* Table */}
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
            {filtered.map((project) => (
              <tr key={project.id} className="border-b border-stone-50 hover:bg-stone-50/50 transition-colors">
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-stone-900">{project.title}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-accent-50 text-accent-600 font-medium capitalize">
                    {project.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                    project.status === "published"
                      ? "bg-green-50 text-green-600"
                      : "bg-yellow-50 text-yellow-600"
                  }`}>
                    {project.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-stone-400">{project.date}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button className="p-2 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-600 transition-all" title="View">
                      <Eye size={16} />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-600 transition-all" title="Edit">
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
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-sm text-stone-400">No projects found</p>
          </div>
        )}
      </div>
    </div>
  );
}
