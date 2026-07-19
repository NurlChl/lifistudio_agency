"use client";

import { FolderKanban, FileText, MessageSquare, Eye, TrendingUp } from "lucide-react";

const stats = [
  { label: "Total Portfolio", value: "6", icon: FolderKanban, change: "+2 this month" },
  { label: "Blog Posts", value: "5", icon: FileText, change: "+1 this month" },
  { label: "Messages", value: "0", icon: MessageSquare, change: "No new messages" },
  { label: "Page Views", value: "—", icon: Eye, change: "Analytics coming soon" },
];

const recentContacts = [
  { name: "Budi Santoso", email: "budi@example.com", service: "Web Development", date: "2 days ago", status: "unread" },
  { name: "Siti Rahma", email: "siti@example.com", service: "UI/UX Design", date: "5 days ago", status: "read" },
];

export default function DashboardHome() {
  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-heading text-2xl font-semibold text-stone-900">
          Dashboard
        </h1>
        <p className="text-sm text-stone-400 mt-1">
          Overview of your Lifi Studio CMS
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-stone-100 p-6 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent-50 flex items-center justify-center">
                <stat.icon size={20} className="text-accent-500" />
              </div>
            </div>
            <p className="text-2xl font-heading font-semibold text-stone-900">
              {stat.value}
            </p>
            <p className="text-xs text-stone-400 mt-1">{stat.label}</p>
            <p className="text-xs text-stone-300 mt-0.5">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Contacts */}
        <div className="bg-white rounded-xl border border-stone-100 p-6">
          <h2 className="font-heading text-lg font-semibold text-stone-900 mb-4">
            Recent Messages
          </h2>
          {recentContacts.length === 0 ? (
            <p className="text-sm text-stone-400">No messages yet</p>
          ) : (
            <div className="space-y-4">
              {recentContacts.map((contact) => (
                <div
                  key={contact.email}
                  className="flex items-start justify-between pb-4 border-b border-stone-50 last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-stone-900">{contact.name}</p>
                    <p className="text-xs text-stone-400">{contact.service}</p>
                    <p className="text-xs text-stone-300 mt-1">{contact.date}</p>
                  </div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      contact.status === "unread"
                        ? "bg-accent-50 text-accent-600"
                        : "bg-stone-50 text-stone-400"
                    }`}
                  >
                    {contact.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-xl border border-stone-100 p-6">
          <h2 className="font-heading text-lg font-semibold text-stone-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "New Portfolio", href: "/dashboard/portfolio", icon: FolderKanban },
              { label: "New Blog Post", href: "/dashboard/blog", icon: FileText },
              { label: "View Messages", href: "/dashboard/contacts", icon: MessageSquare },
              { label: "Site Settings", href: "/dashboard/settings", icon: TrendingUp },
            ].map((action) => (
              <a
                key={action.label}
                href={action.href}
                className="p-4 rounded-lg border border-stone-100 hover:border-stone-200 hover:shadow-sm transition-all text-center"
              >
                <action.icon size={20} className="text-stone-400 mx-auto mb-2" />
                <p className="text-xs font-medium text-stone-600">{action.label}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
