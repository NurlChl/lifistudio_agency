"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { SessionProvider, useSession, signOut } from "next-auth/react";
import { ConfirmProvider } from "@/components/providers/ConfirmProvider";
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
  Briefcase,
  ChevronDown,
  HelpCircle,
  Key,
} from "lucide-react";
import { cn } from "@/lib/utils";

type SidebarLink = {
  href?: string;
  label: string;
  icon: any;
  subLinks?: { href: string; label: string }[];
};

const sidebarLinks: SidebarLink[] = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { label: "Portfolio", icon: FolderKanban, subLinks: [
    { href: "/dashboard/portfolio", label: "All Portfolio" },
    { href: "/dashboard/categories?type=portfolio", label: "Categories" }
  ]},
  { label: "Blog", icon: FileText, subLinks: [
    { href: "/dashboard/blog", label: "All Blog" },
    { href: "/dashboard/categories?type=blog", label: "Categories" }
  ]},
  { label: "Pricing", icon: Banknote, subLinks: [
    { href: "/dashboard/pricing", label: "All Pricing" },
    { href: "/dashboard/categories?type=pricing", label: "Categories" }
  ]},
  { href: "/dashboard/services", label: "Services", icon: Briefcase },
  { href: "/dashboard/faq", label: "FAQ", icon: HelpCircle },
  { href: "/dashboard/contacts", label: "Contacts", icon: MessageSquare },
  { href: "/dashboard/media", label: "Media", icon: Image },
  { href: "/dashboard/users", label: "Users", icon: Users },
  { href: "/dashboard/api-tokens", label: "API Tokens", icon: Key },
  { href: "/dashboard/roles", label: "Roles", icon: Shield },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

function SidebarItem({ link, collapsed, pathname, searchParams }: { link: SidebarLink, collapsed: boolean, pathname: string, searchParams: any }) {
  const [isOpen, setIsOpen] = useState(false);
  
  const currentUrl = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
  const hasActiveSubLink = link.subLinks?.some(sub => currentUrl.startsWith(sub.href));
  const isActive = link.href ? pathname === link.href : hasActiveSubLink;

  useEffect(() => {
    if (hasActiveSubLink) setIsOpen(true);
  }, [hasActiveSubLink]);

  if (!link.subLinks) {
    return (
      <Link href={link.href!} className={cn("flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200", isActive ? "bg-accent-500/10 text-accent-400" : "text-stone-400 hover:text-stone-200 hover:bg-stone-800")}>
        <link.icon size={20} />
        {!collapsed && <span>{link.label}</span>}
      </Link>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <button onClick={() => setIsOpen(!isOpen)} className={cn("w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200", isActive ? "text-stone-200" : "text-stone-400 hover:text-stone-200 hover:bg-stone-800")}>
        <div className="flex items-center gap-3">
          <link.icon size={20} className={isActive ? "text-accent-400" : ""} />
          {!collapsed && <span>{link.label}</span>}
        </div>
        {!collapsed && <ChevronDown size={14} className={cn("transition-transform duration-200", isOpen && "rotate-180")} />}
      </button>
      {!collapsed && isOpen && (
        <div className="pl-9 pr-2 space-y-1 mt-1">
          {link.subLinks.map(sub => {
            const isSubActive = currentUrl === sub.href;
            return (
              <Link key={sub.href} href={sub.href} className={cn("block px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200", isSubActive ? "bg-accent-500/10 text-accent-400" : "text-stone-400 hover:text-stone-200 hover:bg-stone-800")}>
                {sub.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [collapsed, setCollapsed] = useState(false);
  const { data: session, status } = useSession();

  if (pathname === "/dashboard/login") {
    return <>{children}</>;
  }

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
            className={cn("font-heading text-lg font-semibold text-white flex items-center gap-2.5", collapsed && "hidden")}
          >
            <img src="/lifi_white.svg" alt="Lifi Studio" className="h-6 w-auto object-contain" />
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-accent-500/20 text-accent-400 border border-accent-500/30">CMS</span>
          </Link>
          {collapsed && (
            <Link href="/dashboard" className="flex items-center justify-center mx-auto">
              <img src="/favicon/favicon.svg" alt="Lifi Studio" className="h-7 w-7 object-contain" />
            </Link>
          )}
        </div>

        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto scrollbar-thin">
          {sidebarLinks.map((link) => (
            <SidebarItem key={link.label} link={link} collapsed={collapsed} pathname={pathname} searchParams={searchParams} />
          ))}
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

export default function DashboardLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ConfirmProvider>
        <Suspense fallback={
          <div className="flex min-h-screen bg-stone-50 items-center justify-center">
            <div className="h-8 w-8 animate-spin border-4 border-stone-300 border-t-accent-500 rounded-full" />
          </div>
        }>
          <DashboardShell>{children}</DashboardShell>
        </Suspense>
      </ConfirmProvider>
    </SessionProvider>
  );
}
