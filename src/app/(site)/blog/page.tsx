import Link from "next/link";
import type { Metadata } from "next";
import { Calendar, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artikel dan insight seputar web development, desain, dan automation dari Lifi Studio.",
};

const posts = [
  {
    title: "Cara Memilih Tech Stack yang Tepat di 2026",
    slug: "memilih-tech-stack-2026",
    excerpt:
      "Bingung milih Next.js, WordPress, atau Laravel? Simak panduan lengkap memilih teknologi yang sesuai project kamu.",
    category: "Web Development",
    date: "15 Jul 2026",
    readTime: "5 min",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80",
  },
  {
    title: "Cara Otomatisasi CRM dengan n8n",
    slug: "otomatisasi-crm-n8n",
    excerpt:
      "Integrasikan CRM kamu dengan n8n tanpa coding. Workflow otomatis yang hemat puluhan jam per bulan.",
    category: "Automation",
    date: "10 Jul 2026",
    readTime: "7 min",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
  },
  {
    title: "7 Tips Desain Website Profesional",
    slug: "tips-desain-website-profesional",
    excerpt:
      "Bikin website yang engaging dan konversi tinggi dengan prinsip desain yang terbukti efektif.",
    category: "UI/UX",
    date: "28 Jun 2026",
    readTime: "4 min",
    image:
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&q=80",
  },
  {
    title: "Brand Identity untuk UMKM: Panduan Lengkap",
    slug: "brand-identity-umkm",
    excerpt:
      "Mulai dari logo sampai guidelines — panduan membangun identitas brand yang kuat untuk UMKM.",
    category: "Graphic Design",
    date: "20 Jun 2026",
    readTime: "6 min",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80",
  },
  {
    title: "Next.js vs WordPress: Pilih Mana di 2026?",
    slug: "nextjs-vs-wordpress-2026",
    excerpt:
      "Perbandingan lengkap antara Next.js dan WordPress untuk berbagai jenis project website.",
    category: "Web Development",
    date: "12 Jun 2026",
    readTime: "8 min",
    image:
      "https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=600&q=80",
  },
];

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-20 lg:pt-44 lg:pb-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-500 mb-4">
            Blog
          </p>
          <h1 className="heading-1 text-stone-900 max-w-2xl mb-6">
            Artikel &{" "}
            <span className="text-accent-500 italic">Insight</span>
          </h1>
          <p className="subtitle text-stone-500 max-w-xl">
            Tips, tutorial, dan pemikiran seputar web development, desain, dan
            automation dari tim Lifi Studio.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block rounded-2xl overflow-hidden border border-stone-100 bg-white hover:shadow-lg transition-all duration-500"
              >
                {/* Thumbnail Image */}
                <div className="aspect-[16/9] overflow-hidden bg-stone-50">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading={i < 3 ? "eager" : "lazy"}
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta */}
                  <div className="flex items-center gap-3 text-xs text-stone-400 mb-3">
                    <span className="text-accent-500 font-medium uppercase tracking-wider">
                      {post.category}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-stone-300" aria-hidden="true" />
                    <span className="flex items-center gap-1">
                      <Calendar size={12} aria-hidden="true" />
                      {post.date}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-stone-300" aria-hidden="true" />
                    <span>{post.readTime}</span>
                  </div>

                  <h2 className="font-heading text-lg font-semibold text-stone-900 mb-2 group-hover:text-accent-500 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-stone-400 leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-accent-500 group/link">
                    Baca Selengkapnya
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-300 group-hover/link:translate-x-1"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
