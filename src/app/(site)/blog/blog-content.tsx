"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
    <div className={cn("absolute inset-0 bg-gradient-to-br transition-transform duration-700 group-hover:scale-105", gradient)}>
      <div className={cn(
        "absolute inset-0 opacity-20",
        pattern === "diagonal-lines" && "bg-[repeating-linear-gradient(45deg,transparent,transparent_8px,rgba(0,0,0,0.04)_8px,rgba(0,0,0,0.04)_16px)]",
        pattern === "dots" && "bg-[radial-gradient(rgba(0,0,0,0.06)_1px,transparent_1px)] bg-[length:16px_16px]",
        pattern === "grid" && "bg-[repeating-linear-gradient(0deg,transparent,transparent_24px,rgba(0,0,0,0.03)_24px,rgba(0,0,0,0.03)_25px),repeating-linear-gradient(90deg,transparent,transparent_24px,rgba(0,0,0,0.03)_24px,rgba(0,0,0,0.03)_25px)]"
      )} />
    </div>
  );
}

export default function BlogContent({ posts }: { posts: any[] }) {
  const categories = ["All", ...new Set(posts.map((p: any) => p.category))];
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = activeCategory === "All" ? posts : posts.filter((p: any) => p.category === activeCategory);

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

      <section className="py-6 bg-white border-b border-stone-50 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={cn("px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  activeCategory === cat ? "bg-stone-900 text-white shadow-md" : "bg-stone-50 text-stone-500 hover:bg-stone-100"
                )}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {!filtered?.length ? (
            <p className="text-center text-sm text-stone-400 py-20">Belum ada artikel yang dipublikasikan.</p>
          ) : (
            <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" layout>
              {filtered.map((post: any, i: number) => {
                const style = CATEGORY_STYLE[post.category] || DEFAULT_STYLE;
                return (
                  <motion.div key={post.slug} layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link href={`/blog/${post.slug}`}
                      className="group block rounded-2xl overflow-hidden border border-stone-100 bg-white hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
                    >
                      <div className="relative aspect-[16/9] overflow-hidden bg-stone-50">
                        {post.coverImage ? (
                          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                        ) : (
                          <PatternBg pattern={style.pattern} gradient={style.gradient} />
                        )}
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-3 text-xs text-stone-400 mb-3">
                          <span className="text-accent-500 font-medium uppercase tracking-wider">{post.category}</span>
                          <span className="w-1 h-1 rounded-full bg-stone-300" aria-hidden="true" />
                          <span className="flex items-center gap-1"><Calendar size={12} aria-hidden="true" />{formatDate(post.publishedAt || post.createdAt)}</span>
                          <span className="w-1 h-1 rounded-full bg-stone-300" aria-hidden="true" />
                          <span>{post.readTime} min</span>
                        </div>
                        <h2 className="font-heading text-lg font-semibold text-stone-900 mb-2 group-hover:text-accent-500 transition-colors">{post.title}</h2>
                        <p className="text-sm text-stone-400 leading-relaxed line-clamp-2">{post.excerpt}</p>
                        <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-accent-500 group/link">
                          Baca Selengkapnya
                          <ArrowRight size={14} className="transition-transform duration-300 group-hover/link:translate-x-1" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
