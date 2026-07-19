"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SessionProvider, useSession, signOut } from "next-auth/react";
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
  Banknote,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/portfolio", label: "Portfolio", icon: FolderKanban },
  { href: "/dashboard/blog", label: "Blog", icon: FileText },
  { href: "/dashboard/pricing", label: "Pricing", icon: Banknote },
  { href: "/dashboard/contacts", label: "Contacts", icon: MessageSquare },
  { href: "/dashboard/media", label: "Media", icon: Image },
  { href: "/dashboard/users", label: "Users", icon: Users },
  { href: "/dashboard/roles", label: "Roles", icon: Shield },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const { data: session, status } = useSession();

  // Login page → no sidebar, no loading gate
  if (pathname === "/dashboard/login") {
    return <>{children}</>;
  }

  // Loading state while session resolves — prevent flash of unprotected UI
  if (status === "loading") {
    return (
      <div className="flex min-h-screen bg-stone-50">
        <aside className="w-64 h-screen bg-stone-900 animate-pulse" />
        <main className="flex-1 p-6 lg:p-10">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-48 bg-stone-200 rounded" />
            <div className="h-4 w-32 bg-stone-100 rounded" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-stone-100 rounded-xl" />
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-stone-50">
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 z-40 h-screen bg-stone-900 text-stone-300 flex flex-col transition-all duration-300",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <div className="h-16 flex items-center px-4 border-b border-stone-800">
          <Link
            href="/dashboard"
            className={cn("font-heading text-lg font-semibold text-white", collapsed && "hidden")}
          >
            lifi<span className="text-accent-400">.</span>
            <span className="text-xs text-stone-500 ml-2 font-body font-normal">CMS</span>
          </Link>
          {collapsed && (
            <Link href="/dashboard" className="font-heading text-lg font-semibold text-white mx-auto">L</Link>
          )}
        </div>

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

        {session?.user && !collapsed && (
          <div className="px-4 py-3 border-t border-stone-800">
            <p className="text-xs font-medium text-stone-400 truncate">{session.user.name || session.user.email}</p>
            <p className="text-xs text-stone-600 truncate">{(session.user as any)?.role || "admin"}</p>
          </div>
        )}

        <div className="p-2 border-t border-stone-800">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm text-stone-500 hover:text-stone-300 hover:bg-stone-800 transition-all"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>

        <div className="p-2 border-t border-stone-800">
          <button
            onClick={() => signOut({ callbackUrl: "/dashboard/login" })}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-stone-500 hover:text-red-400 hover:bg-stone-800 transition-all"
          >
            <LogOut size={20} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      <div className={cn("flex-1 transition-all duration-300", collapsed ? "ml-16" : "ml-64 lg:ml-0")}>
        {children}
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <DashboardShell>{children}</DashboardShell>
    </SessionProvider>
  );
}
