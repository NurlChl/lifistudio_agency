"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const categories = ["All", "Web Development", "Automation", "UI/UX", "Graphic Design"];

const posts = [
  { title: "Cara Memilih Tech Stack yang Tepat di 2026", slug: "memilih-tech-stack-2026", excerpt: "Bingung milih Next.js, WordPress, atau Laravel? Simak panduan lengkap memilih teknologi yang sesuai project kamu.", category: "Web Development", date: "15 Jul 2026", readTime: "5 min", gradient: "from-accent-100 to-accent-50", pattern: "diagonal-lines", coverImage: null },
  { title: "Cara Otomatisasi CRM dengan n8n", slug: "otomatisasi-crm-n8n", excerpt: "Integrasikan CRM kamu dengan n8n tanpa coding. Workflow otomatis yang hemat puluhan jam per bulan.", category: "Automation", date: "10 Jul 2026", readTime: "7 min", gradient: "from-stone-200 to-stone-100", pattern: "dots", coverImage: null },
  { title: "7 Tips Desain Website Profesional", slug: "tips-desain-website-profesional", excerpt: "Bikin website yang engaging dan konversi tinggi dengan prinsip desain yang terbukti efektif.", category: "UI/UX", date: "28 Jun 2026", readTime: "4 min", gradient: "from-accent-200 to-accent-50", pattern: "grid", coverImage: null },
  { title: "Brand Identity untuk UMKM: Panduan Lengkap", slug: "brand-identity-umkm", excerpt: "Mulai dari logo sampai guidelines — panduan membangun identitas brand yang kuat untuk UMKM.", category: "Graphic Design", date: "20 Jun 2026", readTime: "6 min", gradient: "from-stone-100 to-cream", pattern: "diagonal-lines", coverImage: null },
  { title: "Next.js vs WordPress: Pilih Mana di 2026?", slug: "nextjs-vs-wordpress-2026", excerpt: "Perbandingan lengkap antara Next.js dan WordPress untuk berbagai jenis project website.", category: "Web Development", date: "12 Jun 2026", readTime: "8 min", gradient: "from-accent-100 to-accent-50", pattern: "grid", coverImage: null },
];

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

export default function BlogContent() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = activeCategory === "All" ? posts : posts.filter((p) => p.category === activeCategory);

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
          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" layout>
            {filtered.map((post, i) => (
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
                      <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                      <PatternBg pattern={post.pattern} gradient={post.gradient} />
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-stone-400 mb-3">
                      <span className="text-accent-500 font-medium uppercase tracking-wider">{post.category}</span>
                      <span className="w-1 h-1 rounded-full bg-stone-300" aria-hidden="true" />
                      <span className="flex items-center gap-1"><Calendar size={12} aria-hidden="true" />{post.date}</span>
                      <span className="w-1 h-1 rounded-full bg-stone-300" aria-hidden="true" />
                      <span>{post.readTime}</span>
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
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
