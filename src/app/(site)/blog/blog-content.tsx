"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, LayoutGrid, List, Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Pagination from "@/components/ui/Pagination";

const CATEGORY_STYLE: Record<string, { gradient: string; pattern: string }> = {
  "Web Development": { gradient: "from-accent-100 to-accent-50", pattern: "diagonal-lines" },
  "UI/UX": { gradient: "from-accent-200 to-accent-50", pattern: "grid" },
  "Graphic Design": { gradient: "from-stone-100 to-cream", pattern: "diagonal-lines" },
  Automation: { gradient: "from-stone-200 to-stone-100", pattern: "dots" },
};
const DEFAULT_STYLE = { gradient: "from-stone-100 to-cream", pattern: "grid" };

function formatDate(d: string | Date) {
  const date = new Date(d);
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

function PatternBg({ pattern, gradient }: { pattern: string; gradient: string }) {
  return (
    <div className={cn("absolute inset-0 bg-linear-to-br transition-transform duration-700 group-hover:scale-105", gradient)}>
      <div className={cn(
        "absolute inset-0 opacity-20",
        pattern === "diagonal-lines" && "bg-[repeating-linear-gradient(45deg,transparent,transparent_8px,rgba(0,0,0,0.04)_8px,rgba(0,0,0,0.04)_16px)]",
        pattern === "dots" && "bg-[radial-gradient(rgba(0,0,0,0.06)_1px,transparent_1px)] bg-size-[16px_16px]",
        pattern === "grid" && "bg-[repeating-linear-gradient(0deg,transparent,transparent_24px,rgba(0,0,0,0.03)_24px,rgba(0,0,0,0.03)_25px),repeating-linear-gradient(90deg,transparent,transparent_24px,rgba(0,0,0,0.03)_24px,rgba(0,0,0,0.03)_25px)]"
      )} />

    </div>
  );
}

export default function BlogContent({ posts, categories, activeCategory, totalPages }: { posts: any[], categories: any[], activeCategory: string, totalPages: number }) {
  const router = useRouter();
  const catOptions = [{ name: "All", slug: "All" }, ...categories];
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = searchTerm
    ? posts.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.excerpt || '').toLowerCase().includes(searchTerm.toLowerCase())
      )
    : posts;
  
  function handleCategoryClick(catSlug: string) {
    if (catSlug === "All") {
      router.push("/blog", { scroll: false });
    } else {
      router.push(`/blog?category=${catSlug}`, { scroll: false });
    }
  }

  return (
    <>
      <section className="pt-36 pb-20 lg:pt-44 lg:pb-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-500 mb-4">Blog</p>
          <h1 className="heading-1 text-stone-900 max-w-2xl mb-6">
            Artikel & <span className="text-accent-500 italic">Insight</span>
          </h1>
          <p className="subtitle text-stone-500 max-w-xl">
            Tips, tutorial, dan pemikiran seputar web development, desain, dan automation dari tim Lifi Studio.
          </p>
        </div>
      </section>

      <section className="py-6 bg-white border-b border-stone-50 sticky top-[72px] z-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
            <div className="flex gap-2 overflow-x-auto flex-nowrap scrollbar-hide lg:flex-1">
              {catOptions.map((cat) => (
                <button key={cat.slug} onClick={() => handleCategoryClick(cat.slug)}
                  className={cn("shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                    activeCategory === cat.slug ? "bg-stone-900 text-white shadow-md" : "bg-stone-50 text-stone-500 hover:bg-stone-100"
                  )}>
                  {cat.name}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <div className="relative flex-1 md:max-w-xs">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
                <input type="search" placeholder="Cari artikel..."
                  value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-full bg-stone-50 text-sm text-stone-900 placeholder:text-stone-400 border border-stone-100 focus:outline-none focus:border-accent-500/30 focus:ring-2 focus:ring-accent-500/10 transition-all" />
              </div>
              <div className="flex items-center gap-1 bg-stone-50 rounded-lg p-0.5 shrink-0">
                <button onClick={() => setViewMode('grid')}
                  className={cn("p-2 rounded-md transition-all", viewMode === 'grid' ? "bg-white shadow-sm text-stone-900" : "text-stone-400 hover:text-stone-600")}
                  aria-label="Tampilan grid">
                  <LayoutGrid size={16} />
                </button>
                <button onClick={() => setViewMode('list')}
                  className={cn("p-2 rounded-md transition-all", viewMode === 'list' ? "bg-white shadow-sm text-stone-900" : "text-stone-400 hover:text-stone-600")}
                  aria-label="Tampilan list">
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {!filteredPosts?.length ? (
            <p className="text-center text-sm text-stone-400 py-20">
              {searchTerm ? `Tidak ada artikel untuk "${searchTerm}"` : 'Belum ada artikel yang dipublikasikan.'}
            </p>
          ) : viewMode === 'grid' ? (
            <>
              <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" layout>
                {filteredPosts.map((post: any, i: number) => {
                  const catName = categories.find((c: any) => c.slug === post.category)?.name || post.category;
                  const style = CATEGORY_STYLE[catName] || DEFAULT_STYLE;
                  return (
                    <motion.div key={post.slug} layout
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link href={`/blog/${post.slug}`}
                        className="group block rounded-2xl overflow-hidden bg-white hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
                      >
                        <div className="relative aspect-video overflow-hidden bg-stone-50">
                          {post.coverImage ? (
                            <Image src={post.coverImage} alt={post.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                          ) : (
                            <PatternBg pattern={style.pattern} gradient={style.gradient} />
                          )}
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-3 text-xs text-stone-400 mb-3">
                            <span className="text-accent-500 font-medium uppercase tracking-wider">{catName}</span>
                            <span className="w-1 h-1 rounded-full bg-stone-300" aria-hidden="true" />
                            <span className="flex items-center gap-1"><Calendar size={12} aria-hidden="true" />{formatDate(post.publishedAt || post.createdAt)}</span>
                            <span className="w-1 h-1 rounded-full bg-stone-300" aria-hidden="true" />
                            <span>{post.readTime} min</span>
                          </div>
                          <h2 className="font-heading text-lg font-semibold text-stone-900 mb-2 group-hover:text-accent-500 transition-colors">{post.title}</h2>
                          <p className="text-sm text-stone-400 leading-relaxed line-clamp-2 mb-4">{post.excerpt}</p>
                          <div className="flex items-center gap-1.5 text-sm font-medium text-accent-500 group/link">
                            Baca Selengkapnya
                            <ArrowRight size={14} className="transition-transform duration-300 group-hover/link:translate-x-1" />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
              {!searchTerm && <Pagination totalPages={totalPages} />}
            </>
          ) : (
            <div className="divide-y divide-stone-100">
              {filteredPosts.map((post: any) => {
                const catName = categories.find((c: any) => c.slug === post.category)?.name || post.category;
                return (
                  <Link key={post.slug} href={`/blog/${post.slug}`}
                    className="group flex items-start gap-6 py-6 first:pt-0 last:pb-0 transition-all hover:opacity-70"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 text-xs text-stone-400 mb-2">
                        <span className="text-accent-500 font-medium uppercase tracking-wider">{catName}</span>
                        <span className="w-1 h-1 rounded-full bg-stone-300" aria-hidden="true" />
                        <span className="flex items-center gap-1"><Calendar size={12} aria-hidden="true" />{formatDate(post.publishedAt || post.createdAt)}</span>
                      </div>
                      <h2 className="font-heading text-lg font-semibold text-stone-900 mb-1.5 group-hover:text-accent-500 transition-colors">{post.title}</h2>
                      <p className="text-sm text-stone-400 leading-relaxed line-clamp-2 mb-3">{post.excerpt}</p>
                      <div className="flex items-center gap-1.5 text-sm font-medium text-accent-500">
                        Baca Selengkapnya
                        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
