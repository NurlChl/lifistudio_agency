"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Pagination from "@/components/ui/Pagination";

const CATEGORY_STYLE: Record<string, { color: string; gradient: string; pattern: string }> = {
  web: { color: "stone", gradient: "from-stone-100 to-stone-50", pattern: "grid" },
  uiux: { color: "accent", gradient: "from-accent-100 to-accent-50", pattern: "dots" },
  graphic: { color: "purple", gradient: "from-accent-200 to-accent-100", pattern: "diagonal-lines" },
  automation: { color: "teal", gradient: "from-stone-200 to-cream", pattern: "dots" },
};
const CATEGORY_LABEL: Record<string, string> = {
  web: "Web Development", uiux: "UI/UX Design", graphic: "Graphic Design", automation: "Automation",
};


export default function PortfolioContent({ projects, categories, activeCategory, totalPages }: { projects: any[], categories: any[], activeCategory: string, totalPages: number }) {
  const router = useRouter();
  const catOptions = [{ name: "All", slug: "All" }, ...categories];
  
  function handleCategoryClick(catSlug: string) {
    if (catSlug === "All") {
      router.push("/portfolio", { scroll: false });
    } else {
      router.push(`/portfolio?category=${catSlug}`, { scroll: false });
    }
  }

  return (
    <>
      <section className="relative pt-36 pb-20 lg:pt-44 lg:pb-24 bg-cream overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-500 mb-4">Portfolio</p>
          <h1 className="heading-1 text-stone-900 max-w-2xl mb-6">
            Project yang <span className="text-accent-500 italic">Kami Banggakan</span>
          </h1>
          <p className="subtitle text-stone-500 max-w-xl">Setiap project punya cerita. Ini beberapa yang paling berkesan.</p>
        </div>
      </section>

      <section className="py-6 bg-white border-b border-stone-50 sticky top-[72px] z-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto flex-nowrap scrollbar-hide">
            {catOptions.map((cat) => (
              <button key={cat.slug} onClick={() => handleCategoryClick(cat.slug)}
                className={cn("shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  activeCategory === cat.slug ? "bg-stone-900 text-white shadow-md" : "bg-stone-50 text-stone-500 hover:bg-stone-100"
                )}>
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {!projects?.length ? (
            <p className="text-center text-sm text-stone-400 py-20">Belum ada project yang dipublikasikan.</p>
          ) : (
            <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
              variants={{ visible: { transition: { staggerChildren: 0.08 } }, hidden: {} }}
            >
              {projects.map((p) => {
                const style = CATEGORY_STYLE[p.category] || CATEGORY_STYLE.web;
                const categoryObj = categories.find(c => c.slug === p.category);
                const label = categoryObj ? categoryObj.name : (CATEGORY_LABEL[p.category] || p.category);
                return (
                  <motion.div key={p.slug}
                    variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }}
                  >
                    <Link href={`/portfolio/${p.slug}`}
                      className="group block rounded-2xl overflow-hidden border border-stone-100 bg-white hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
                    >
                      <div className="relative aspect-16/10 overflow-hidden bg-stone-50">
                        {p.coverImage ? (
                          <Image src={p.coverImage} alt={p.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                        ) : (
                          <div className={cn("absolute inset-0 bg-linear-to-br transition-all duration-700 group-hover:scale-105", style.gradient)}>
                            <div className={cn("absolute inset-0 opacity-30 transition-opacity duration-500 group-hover:opacity-10",
                              style.pattern === "grid" && "bg-[repeating-linear-gradient(0deg,transparent,transparent_24px,rgba(0,0,0,0.04)_24px,rgba(0,0,0,0.04)_25px),repeating-linear-gradient(90deg,transparent,transparent_24px,rgba(0,0,0,0.04)_24px,rgba(0,0,0,0.04)_25px)]",
                              style.pattern === "dots" && "bg-[radial-gradient(rgba(0,0,0,0.08)_1px,transparent_1px)] bg-size-[16px_16px]",
                              style.pattern === "diagonal-lines" && "bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.05)_10px,rgba(0,0,0,0.05)_20px)]"
                            )} />
                            <div className="absolute -bottom-8 -right-8 w-48 h-48 rounded-full bg-white/10" />
                            <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full bg-white/5" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/60 transition-all duration-500 flex items-center justify-center">
                          <span className="text-white font-heading font-semibold text-sm opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">Lihat Detail</span>
                        </div>
                        <div className="absolute top-4 left-4">
                          <span className={cn("inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-semibold uppercase tracking-wider shadow-sm backdrop-blur-sm",
                            style.color === "stone" && "bg-white/90 text-stone-700",
                            style.color === "accent" && "bg-accent-500/90 text-white",
                            style.color === "purple" && "bg-accent-500/90 text-white",
                            style.color === "teal" && "bg-stone-900/80 text-white",
                          )}>
                            {label}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h2 className="font-heading text-lg font-semibold text-stone-900 mb-2 group-hover:text-accent-500 transition-colors">{p.title}</h2>
                        <p className="text-sm text-stone-400 leading-relaxed line-clamp-2 mb-4">{p.description}</p>
                        <div className="flex flex-wrap gap-1.5" role="list" aria-label={`${p.title} technologies`}>
                          {(p.technologies || []).map((t: string) => (
                            <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-stone-50 text-stone-400 border border-stone-100">{t}</span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {projects?.length > 0 && <Pagination totalPages={totalPages} />}
        </div>
      </section>
    </>
  );
}
