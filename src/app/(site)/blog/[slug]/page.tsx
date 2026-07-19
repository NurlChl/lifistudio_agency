import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { articleSchema, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Blog Detail",
  description: "Baca artikel lengkap dari Lifi Studio.",
};

const posts = [
  {
    title: "Cara Memilih Tech Stack yang Tepat di 2026",
    slug: "memilih-tech-stack-2026",
    excerpt: "Bingung milih Next.js, WordPress, atau Laravel? Simak panduan lengkap memilih teknologi yang sesuai project kamu.",
    content: `
      <p>Memilih tech stack yang tepat adalah salah satu keputusan paling penting dalam pengembangan website. Pilihan yang salah bisa bikin biaya membengkak, timeline molor, dan hasil akhir nggak sesuai ekspektasi.</p>
      <h2>Kenali Kebutuhan Project</h2>
      <p>Sebelum milih teknologi, pastikan kamu paham dulu apa yang project kamu butuhkan. Apakah ini company profile sederhana? E-commerce? Atau web application dengan fitur kompleks?</p>
      <h3>Company Profile / Landing Page</h3>
      <p>Untuk jenis ini, WordPress atau Next.js dengan static generation sudah lebih dari cukup. Cepat, murah, dan mudah dikelola.</p>
      <h3>E-commerce / Marketplace</h3>
      <p>Butuh scalability, manajemen produk, dan integrasi payment. Next.js + Headless CMS atau Laravel jadi pilihan tepat.</p>
      <h3>Web Application Custom</h3>
      <p>Untuk project dengan fitur kompleks, Next.js full-stack atau Laravel + Vue.js adalah pilihan yang solid.</p>
      <h2>Timeline & Budget</h2>
      <p>WordPress bisa launching dalam 1-2 minggu. Next.js butuh 2-6 minggu tergantung kompleksitas. Laravel untuk aplikasi custom bisa 4-12 minggu. Sesuaikan dengan budget dan deadline kamu.</p>
      <h2>Kesimpulan</h2>
      <p>Nggak ada tech stack yang "paling baik" — yang ada adalah yang paling sesuai dengan kebutuhan project kamu. Konsultasi dengan kami untuk dapat rekomendasi tepat.</p>
    `,
    category: "Web Development",
    date: "15 Jul 2026",
    readTime: "5 min",
    author: "NurlChl",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80",
  },
  {
    title: "Cara Otomatisasi CRM dengan n8n",
    slug: "otomatisasi-crm-n8n",
    excerpt: "Integrasikan CRM kamu dengan n8n tanpa coding.",
    content: `
      <p>n8n adalah workflow automation tool open-source yang powerful. Dengan n8n, kamu bisa menghubungkan berbagai aplikasi tanpa perlu menulis kode rumit.</p>
      <h2>Apa itu n8n?</h2>
      <p>n8n (n-eight-n) adalah platform workflow automation yang memungkinkan kamu mengotomatiskan tugas-tugas repetitif dengan visual drag-and-drop interface. Mirip Zapier, tapi self-hosted dan gratis.</p>
      <h2>Use Case untuk CRM</h2>
      <p>Salah satu penggunaan paling umum adalah otomatisasi CRM: ketika ada lead baru dari website, n8n otomatis memasukkan data ke CRM, mengirim email notifikasi ke tim sales, dan menambahkan lead ke email marketing list.</p>
      <h2>Integrasi yang Didukung</h2>
      <p>n8n mendukung 400+ integrasi termasuk Google Sheets, Gmail, Slack, Notion, Airtable, dan ribuan API lainnya via HTTP Request node.</p>
    `,
    category: "Automation",
    date: "10 Jul 2026",
    readTime: "7 min",
    author: "NurlChl",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
  },
];

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Blog", url: "/blog" },
              { name: post.title, url: `/blog/${post.slug}` },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleSchema({
              title: post.title,
              excerpt: post.excerpt,
              date: post.date,
              author: post.author,
              slug: post.slug,
            })
          ),
        }}
      />

      <article>
        {/* Cover Image */}
        <div className="relative h-[40vh] lg:h-[55vh] bg-stone-900 overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/30 to-transparent" />
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-6 lg:px-8 -mt-32 relative z-10">
          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-xl border border-stone-100">
            {/* Back */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-stone-400 hover:text-stone-600 transition-colors mb-8"
            >
              <ArrowLeft size={16} />
              Kembali ke Blog
            </Link>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-stone-400 mb-4">
              <span className="text-accent-500 font-medium uppercase tracking-wider">
                {post.category}
              </span>
              <span className="w-1 h-1 rounded-full bg-stone-300" />
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {post.date}
              </span>
              <span className="w-1 h-1 rounded-full bg-stone-300" />
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {post.readTime}
              </span>
            </div>

            {/* Title */}
            <h1 className="heading-2 text-stone-900 mb-8">{post.title}</h1>

            {/* Body */}
            <div
              className="prose prose-stone max-w-none prose-headings:font-heading prose-headings:text-stone-900 prose-p:text-stone-500 prose-p:leading-relaxed prose-a:text-accent-500 prose-img:rounded-xl"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Author */}
            <div className="mt-12 pt-8 border-t border-stone-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-stone-900 flex items-center justify-center text-white font-heading font-semibold text-sm">
                NC
              </div>
              <div>
                <p className="font-heading font-semibold text-stone-900 text-sm">
                  {post.author}
                </p>
                <p className="text-xs text-stone-400">Founder & Lead Developer</p>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
