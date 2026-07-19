"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Link2, ExternalLink, MessageCircle, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
    gradient: "from-accent-100 to-accent-50",
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
    gradient: "from-stone-200 to-stone-100",
  },
];

const relatedPosts: Record<string, { title: string; slug: string; gradient: string; pattern: string }[]> = {
  "memilih-tech-stack-2026": [
    { title: "Next.js vs WordPress: Pilih Mana di 2026?", slug: "nextjs-vs-wordpress-2026", gradient: "from-accent-100 to-accent-50", pattern: "grid" },
    { title: "Cara Otomatisasi CRM dengan n8n", slug: "otomatisasi-crm-n8n", gradient: "from-stone-200 to-stone-100", pattern: "dots" },
  ],
  "otomatisasi-crm-n8n": [
    { title: "Cara Memilih Tech Stack yang Tepat di 2026", slug: "memilih-tech-stack-2026", gradient: "from-accent-100 to-accent-50", pattern: "diagonal-lines" },
    { title: "7 Tips Desain Website Profesional", slug: "tips-desain-website-profesional", gradient: "from-accent-200 to-accent-50", pattern: "grid" },
  ],
};

function extractTOC(html: string) {
  const headings = html.match(/<h2>(.*?)<\/h2>/g) || [];
  return headings.map((h) => h.replace(/<\/?h2>/g, ""));
}

function ShareButtons({ url, title }: { url: string; title: string }) {
  const encoded = encodeURIComponent(url);
  const shareUrl = `https://lifistudio.com${url}`;
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-stone-400 font-medium">Bagikan:</span>
      <button
        onClick={() => navigator.clipboard.writeText(shareUrl)}
        className="p-2 rounded-full bg-stone-50 text-stone-500 hover:bg-stone-100 hover:text-stone-700 transition-all"
        aria-label="Salin link"
      >
        <Link2 size={16} />
      </button>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full bg-stone-50 text-stone-500 hover:bg-stone-100 hover:text-stone-700 transition-all"
        aria-label="Bagikan ke Twitter"
      >
        <ExternalLink size={16} />
      </a>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(title + " " + shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full bg-stone-50 text-stone-500 hover:bg-stone-100 hover:text-stone-700 transition-all"
        aria-label="Bagikan ke WhatsApp"
      >
        <MessageCircle size={16} />
      </a>
    </div>
  );
}

function BackToTop() {
  return (
    <motion.button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-8 right-8 z-40 p-3 rounded-full bg-stone-900 text-white shadow-lg hover:bg-stone-700 transition-all"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      aria-label="Kembali ke atas"
    >
      <ArrowUp size={20} />
    </motion.button>
  );
}

export default function BlogDetailContent() {
  const params = useParams();
  const slug = params.slug as string;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const toc = extractTOC(post.content);
  const related = relatedPosts[post.slug] || [];
  const paragraphs = post.content.split(/(?=<h2|<h3|<p)/).filter(Boolean);

  return (
    <>
      <section className="relative pt-32 pb-48 lg:pt-40 lg:pb-56 overflow-hidden">
        <div className={cn("absolute inset-0 bg-gradient-to-br", post.gradient)}>
          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_12px,rgba(0,0,0,0.03)_12px,rgba(0,0,0,0.03)_24px)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        </div>
      </section>

      <article className="relative z-10 -mt-40 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-[1fr_280px] gap-12">
          <div>
            <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-xl border border-stone-100">
              <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-stone-400 hover:text-stone-600 transition-colors mb-8">
                <ArrowLeft size={16} /> Kembali ke Blog
              </Link>

              <div className="flex flex-wrap items-center gap-4 text-sm text-stone-400 mb-4">
                <span className="text-accent-500 font-medium uppercase tracking-wider">{post.category}</span>
                <span className="w-1 h-1 rounded-full bg-stone-300" />
                <span className="flex items-center gap-1.5"><Calendar size={14} />{post.date}</span>
                <span className="w-1 h-1 rounded-full bg-stone-300" />
                <span className="flex items-center gap-1.5"><Clock size={14} />{post.readTime}</span>
              </div>

              <motion.h1 className="heading-2 text-stone-900 mb-8"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >{post.title}</motion.h1>

              <div className="space-y-4">
                {paragraphs.map((para, i) => (
                  <motion.div key={i}
                    className="prose prose-stone max-w-none prose-headings:font-heading prose-headings:text-stone-900 prose-p:text-stone-500 prose-p:leading-relaxed prose-a:text-accent-500 prose-img:rounded-xl"
                    initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    dangerouslySetInnerHTML={{ __html: para }}
                  />
                ))}
              </div>

              <motion.div className="mt-12 pt-8 border-t border-stone-100 flex items-center gap-4"
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
              >
                <div className="w-12 h-12 rounded-full bg-stone-900 flex items-center justify-center text-white font-heading font-semibold text-sm">NC</div>
                <div>
                  <p className="font-heading font-semibold text-stone-900 text-sm">{post.author}</p>
                  <p className="text-xs text-stone-400">Founder & Lead Developer</p>
                </div>
              </motion.div>

              <motion.div className="mt-8 pt-6 border-t border-stone-100"
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
              >
                <ShareButtons url={`/blog/${post.slug}`} title={post.title} />
              </motion.div>
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              {toc.length > 0 && (
                <div className="bg-white rounded-xl border border-stone-100 p-6 shadow-sm">
                  <h3 className="font-heading text-sm font-semibold text-stone-900 mb-4 uppercase tracking-wider">Daftar Isi</h3>
                  <nav className="space-y-2">
                    {toc.map((heading, i) => (
                      <a key={i} href="#" className="block text-sm text-stone-400 hover:text-accent-500 transition-colors">{heading}</a>
                    ))}
                  </nav>
                </div>
              )}
              <div className="bg-cream rounded-xl p-6 border border-stone-100">
                <h3 className="font-heading text-sm font-semibold text-stone-900 mb-2">Ada Project?</h3>
                <p className="text-xs text-stone-500 mb-4 leading-relaxed">Diskusikan kebutuhan kamu dengan tim Lifi Studio.</p>
                <Link href="/contact" className="inline-block text-xs font-semibold px-4 py-2 rounded-lg bg-stone-900 text-white hover:bg-stone-700 transition-all">Hubungi Kami</Link>
              </div>
            </div>
          </aside>
        </div>
      </article>

      {related.length > 0 && (
        <section className="py-16 lg:py-24 bg-cream">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="heading-3 text-stone-900 mb-10">Artikel Terkait</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {related.map((r, i) => (
                <motion.div key={r.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Link href={`/blog/${r.slug}`}
                    className="group block rounded-2xl overflow-hidden border border-stone-100 bg-white hover:shadow-lg transition-all duration-500 hover:-translate-y-1"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden bg-stone-50">
                      <div className={cn("absolute inset-0 bg-gradient-to-br transition-transform duration-700 group-hover:scale-105", r.gradient)}>
                        <div className={cn("absolute inset-0 opacity-20",
                          r.pattern === "grid" && "bg-[repeating-linear-gradient(0deg,transparent,transparent_24px,rgba(0,0,0,0.03)_24px,rgba(0,0,0,0.03)_25px),repeating-linear-gradient(90deg,transparent,transparent_24px,rgba(0,0,0,0.03)_24px,rgba(0,0,0,0.03)_25px)]",
                          r.pattern === "dots" && "bg-[radial-gradient(rgba(0,0,0,0.06)_1px,transparent_1px)] bg-[length:16px_16px]",
                          r.pattern === "diagonal-lines" && "bg-[repeating-linear-gradient(45deg,transparent,transparent_8px,rgba(0,0,0,0.04)_8px,rgba(0,0,0,0.04)_16px)]"
                        )} />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-heading text-base font-semibold text-stone-900 group-hover:text-accent-500 transition-colors">{r.title}</h3>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <BackToTop />
    </>
  );
}
