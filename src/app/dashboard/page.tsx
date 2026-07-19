"use client";

import { useEffect, useState } from "react";
import { FolderKanban, FileText, MessageSquare, Eye, TrendingUp } from "lucide-react";
import { getDashboardStats, getContacts } from "@/lib/actions";
import Link from "next/link";

interface Stats {
  totalPortfolio: number;
  totalBlog: number;
  totalContacts: number;
  unreadContacts: number;
}

export default function DashboardHome() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentContacts, setRecentContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [s, c] = await Promise.all([
          getDashboardStats(),
          getContacts({ limit: 5 }),
        ]);
        setStats(s);
        setRecentContacts(c.items);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const statCards = [
    { label: "Total Portfolio", value: stats?.totalPortfolio ?? "—", icon: FolderKanban, change: "Published projects" },
    { label: "Blog Posts", value: stats?.totalBlog ?? "—", icon: FileText, change: "Published posts" },
    { label: "Messages", value: stats?.totalContacts ?? "—", icon: MessageSquare, change: `${stats?.unreadContacts ?? 0} unread` },
    { label: "Unread", value: stats?.unreadContacts ?? "—", icon: Eye, change: "Need attention" },
  ];

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-10">
        <h1 className="font-heading text-2xl font-semibold text-stone-900">Dashboard</h1>
        <p className="text-sm text-stone-400 mt-1">Overview of your Lifi Studio CMS</p>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[1,2,3,4].map(i => (
            <div key={i} className="bg-white rounded-xl border border-stone-100 p-6 animate-pulse">
              <div className="w-10 h-10 rounded-lg bg-stone-100 mb-4" />
              <div className="h-8 w-16 bg-stone-100 rounded mb-2" />
              <div className="h-4 w-24 bg-stone-100 rounded" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {statCards.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-stone-100 p-6 hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent-50 flex items-center justify-center">
                  <stat.icon size={20} className="text-accent-500" />
                </div>
              </div>
              <p className="text-2xl font-heading font-semibold text-stone-900">{stat.value}</p>
              <p className="text-xs text-stone-400 mt-1">{stat.label}</p>
              <p className="text-xs text-stone-300 mt-0.5">{stat.change}</p>
            </div>
          ))}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-stone-100 p-6">
          <h2 className="font-heading text-lg font-semibold text-stone-900 mb-4">Recent Messages</h2>
          {loading ? (
            <div className="space-y-4">
              {[1,2].map(i => <div key={i} className="h-12 bg-stone-50 rounded animate-pulse" />)}
            </div>
          ) : recentContacts.length === 0 ? (
            <p className="text-sm text-stone-400">No messages yet</p>
          ) : (
            <div className="space-y-4">
              {recentContacts.slice(0, 5).map((contact: any) => (
                <div key={contact._id} className="flex items-start justify-between pb-4 border-b border-stone-50 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-stone-900">{contact.name}</p>
                    <p className="text-xs text-stone-400">{contact.service || contact.message?.slice(0, 60)}</p>
                    <p className="text-xs text-stone-300 mt-1">{new Date(contact.createdAt).toLocaleDateString("id-ID")}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${contact.isRead ? "bg-stone-50 text-stone-400" : "bg-accent-50 text-accent-600"}`}>
                    {contact.isRead ? "Read" : "New"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl border border-stone-100 p-6">
          <h2 className="font-heading text-lg font-semibold text-stone-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "New Portfolio", href: "/dashboard/portfolio", icon: FolderKanban },
              { label: "New Blog Post", href: "/dashboard/blog", icon: FileText },
              { label: "View Messages", href: "/dashboard/contacts", icon: MessageSquare },
              { label: "Site Settings", href: "/dashboard/settings", icon: TrendingUp },
            ].map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="p-4 rounded-lg border border-stone-100 hover:border-stone-200 hover:shadow-sm transition-all text-center"
              >
                <action.icon size={20} className="text-stone-400 mx-auto mb-2" />
                <p className="text-xs font-medium text-stone-600">{action.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
