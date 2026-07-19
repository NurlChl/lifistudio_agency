import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";

// This would normally fetch from MongoDB — using dummy data for now
const posts = {
  "memilih-tech-stack-2026": {
    title: "Cara Memilih Tech Stack untuk Website Bisnis di 2026",
    date: "2026-07-15",
    readTime: 5,
    category: "Web Development",
    content: `
      <p>Memilih technology stack yang tepat adalah salah satu keputusan paling penting dalam membangun website bisnis. Pilihan yang salah bisa berarti biaya maintenance tinggi, performa lambat, atau bahkan harus rebuild dari awal.</p>
      
      <h2>1. Kenali Kebutuhan Bisnis Kamu</h2>
      <p>Sebelum memilih tech stack, tanya dulu: apa tujuan website ini? Company profile sederhana? E-commerce? Atau web application kompleks? Setiap kebutuhan punya solusi yang berbeda.</p>
      
      <h2>2. WordPress — Cepat, Fleksibel, Terbukti</h2>
      <p>Cocok untuk: company profile, blog, e-commerce kecil-menengah. WordPress punya ribuan plugin dan themes, plus komunitas besar. Kekurangannya: bisa berat kalau kebanyakan plugin, dan keamanan perlu diperhatikan.</p>
      
      <h2>3. Next.js — Performa Modern, Developer Friendly</h2>
      <p>Cocok untuk: web application, SaaS, e-commerce custom, landing page performa tinggi. Next.js memberikan server-side rendering dan static generation yang bikin website super cepat.</p>
      
      <h2>4. Laravel — Andalan Backend PHP</h2>
      <p>Cocok untuk: web application kompleks dengan backend yang robust. Laravel punya ecosystem yang mature, dokumentasi lengkap, dan komunitas besar di Indonesia.</p>
      
      <h2>Kesimpulan</h2>
      <p>Tidak ada tech stack yang "paling baik" — yang ada adalah yang paling sesuai dengan kebutuhan bisnis kamu. Kalau ragu, konsultasi dulu dengan tim developer yang berpengalaman.</p>
    `,
  },
  "otomatisasi-crm-n8n": {
    title: "Otomatisasi CRM dengan n8n: Panduan Lengkap Pemula",
    date: "2026-07-10",
    readTime: 8,
    category: "Automation",
    content: `<p>n8n adalah workflow automation tool yang powerful dan open-source. Dengan n8n, kamu bisa menghubungkan berbagai aplikasi dan mengotomatiskan tugas-tugas repetitive tanpa coding yang rumit.</p>
    <p>Artikel ini akan membahas cara setup n8n untuk otomatisasi CRM dasar — dari capture lead sampai follow-up otomatis.</p>`,
  },
};

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // In real app, fetch from DB. Using dummy for now.
  const slug = (params as any).slug as string;
  const post = posts[slug as keyof typeof posts];

  if (!post) {
    notFound();
  }

  return (
    <>
      <article className="pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-stone-400 hover:text-stone-600 transition-colors mb-8"
            >
              <ArrowLeft size={16} />
              Back to Blog
            </Link>

            <div className="flex items-center gap-3 text-xs text-stone-400 mb-4">
              <span className="px-2.5 py-0.5 rounded-full bg-accent-50 text-accent-600 font-medium">
                {post.category}
              </span>
              <span>{post.date}</span>
              <span>· {post.readTime} min read</span>
            </div>

            <h1 className="heading-1 text-stone-900 mb-8">{post.title}</h1>

            <div
              className="prose prose-stone max-w-none 
                prose-headings:font-heading prose-headings:text-stone-900 
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-p:text-stone-500 prose-p:leading-relaxed
                prose-a:text-accent-500
                prose-strong:text-stone-700
                [&_h2]:font-semibold"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </article>
    </>
  );
}
