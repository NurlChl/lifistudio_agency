import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Artikel dan insight seputar web development, desain, dan automation dari Lifi Studio.",
};

const posts = [
  {
    slug: "memilih-tech-stack-2026",
    title: "Cara Memilih Tech Stack untuk Website Bisnis di 2026",
    excerpt: "Bingung pilih antara WordPress, Next.js, atau Laravel? Simak panduan lengkap memilih technology stack yang tepat untuk bisnis kamu.",
    category: "Web Development",
    date: "2026-07-15",
    readTime: 5,
  },
  {
    slug: "otomatisasi-crm-n8n",
    title: "Otomatisasi CRM dengan n8n: Panduan Lengkap Pemula",
    excerpt: "Tingkatkan efisiensi bisnis dengan workflow automation. Panduan step-by-step setup n8n untuk bisnis kecil dan menengah.",
    category: "Automation",
    date: "2026-07-10",
    readTime: 8,
  },
  {
    slug: "tips-desain-website-profesional",
    title: "7 Prinsip Desain Website Profesional yang Sering Diabaikan",
    excerpt: "Banyak website keren tapi nggak efektif. Pelajari prinsip desain yang bikin website kamu tampil profesional dan konversi tinggi.",
    category: "UI/UX",
    date: "2026-07-05",
    readTime: 6,
  },
  {
    slug: "brand-identity-umkm",
    title: "Pentingnya Brand Identity untuk UMKM di Era Digital",
    excerpt: "Brand identity bukan cuma logo. Pelajari bagaimana identitas visual yang kuat bisa mengubah bisnis UMKM kamu.",
    category: "Graphic Design",
    date: "2026-06-28",
    readTime: 4,
  },
  {
    slug: "nextjs-vs-wordpress-2026",
    title: "Next.js vs WordPress: Mana yang Tepat untuk Project Kamu?",
    excerpt: "Perbandingan lengkap antara Next.js dan WordPress dari segi performa, biaya, kemudahan, dan maintenance.",
    category: "Web Development",
    date: "2026-06-20",
    readTime: 7,
  },
];

export default function BlogPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-500 mb-4">
            Blog
          </p>
          <h1 className="heading-1 text-stone-900 mb-6">
            Insights & Stories
          </h1>
          <p className="subtitle text-stone-500 max-w-xl">
            Artikel, tips, dan insight seputar web development, desain, dan
            automation dari tim Lifi Studio.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-10">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block pb-10 border-b border-stone-100 last:border-0"
              >
                <div className="flex items-center gap-3 text-xs text-stone-400 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-accent-50 text-accent-600 font-medium">
                    {post.category}
                  </span>
                  <span>{post.date}</span>
                  <span>· {post.readTime} min read</span>
                </div>
                <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-stone-900 mb-3 group-hover:text-accent-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-stone-500 leading-relaxed max-w-2xl">
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
