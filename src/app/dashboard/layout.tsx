"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  MessageSquare,
  Image,
  Settings,
  Users,
  Shield,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/portfolio", label: "Portfolio", icon: FolderKanban },
  { href: "/dashboard/blog", label: "Blog", icon: FileText },
  { href: "/dashboard/contacts", label: "Contacts", icon: MessageSquare },
  { href: "/dashboard/media", label: "Media", icon: Image },
  { href: "/dashboard/users", label: "Users", icon: Users },
  { href: "/dashboard/roles", label: "Roles", icon: Shield },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  // If on login page, render without sidebar
  if (pathname === "/dashboard/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-stone-50">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 z-40 h-screen bg-stone-900 text-stone-300 flex flex-col transition-all duration-300",
          collapsed ? "w-16" : "w-64"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-stone-800">
          <Link
            href="/dashboard"
            className={cn(
              "font-heading text-lg font-semibold text-white",
              collapsed && "hidden"
            )}
          >
            lifi<span className="text-accent-400">.</span>
            <span className="text-xs text-stone-500 ml-2 font-body font-normal">
              CMS
            </span>
          </Link>
          {collapsed && (
            <Link href="/dashboard" className="font-heading text-lg font-semibold text-white mx-auto">
              L
            </Link>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-accent-500/10 text-accent-400"
                    : "text-stone-400 hover:text-stone-200 hover:bg-stone-800"
                )}
              >
                <link.icon size={20} />
                {!collapsed && <span>{link.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Collapse toggle */}
        <div className="p-2 border-t border-stone-800">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm text-stone-500 hover:text-stone-300 hover:bg-stone-800 transition-all"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>

        {/* Logout */}
        <div className="p-2 border-t border-stone-800">
          <a
            href="/dashboard/login"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-stone-500 hover:text-red-400 hover:bg-stone-800 transition-all"
          >
            <LogOut size={20} />
            {!collapsed && <span>Logout</span>}
          </a>
        </div>
      </aside>

      {/* Main content */}
      <div className={cn("flex-1 transition-all duration-300", collapsed ? "ml-16" : "ml-64 lg:ml-0")}>
        {children}
      </div>
    </div>
  );
}
