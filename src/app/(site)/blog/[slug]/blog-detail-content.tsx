"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ArrowUp, Check, Link2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";

export interface PostData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  coverImage: string | null;
  gradient: string;
  pattern: string;
  images: { url: string | null; caption: string }[];
}

function extractTOC(html: string) {
  // Regex to match h2 and h3 along with their id attributes (which we will inject)
  const headings: { id: string; text: string; level: number }[] = [];
  const regex = /<(h[23])[^>]*id="([^"]+)"[^>]*>(.*?)<\/\1>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    headings.push({
      level: parseInt(match[1].replace('h', '')),
      id: match[2],
      text: match[3].replace(/<[^>]+>/g, '') // remove inner HTML tags if any
    });
  }
  return headings;
}

// Helper to inject slugified IDs into headings
function injectHeadingIds(html: string) {
  return html.replace(/<(h[2-6])([^>]*)>(.*?)<\/\1>/gi, (match, tag, attrs, content) => {
    // If it already has an ID, skip
    if (attrs.includes('id=')) return match;
    // Slugify content for ID
    const id = content
      .replace(/<[^>]+>/g, '')
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    return `<${tag}${attrs} id="${id}">${content}</${tag}>`;
  });
}

// SVG Icons for social platforms
const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.743l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const TelegramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.18l-1.91 9c-.14.65-.53.81-1.08.5l-2.91-2.14-1.4 1.35c-.15.15-.29.28-.59.28l.21-3 5.46-4.93c.24-.22-.05-.34-.37-.13l-6.75 4.25-2.9-.91c-.63-.2-.64-.63.13-.93l11.36-4.38c.53-.19.99.13.8 1.09z" />
  </svg>
);

function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = `https://lifistudio.com${url}`;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const buttons = [
    {
      label: "Salin Link",
      icon: copied ? <Check size={16} /> : <Link2 size={16} />,
      onClick: handleCopy,
      href: undefined,
      hoverClass: "hover:bg-stone-100 hover:text-stone-900",
      activeClass: copied ? "bg-green-50 text-green-600" : "bg-stone-50 text-stone-500",
    },
    {
      label: "Bagikan ke X",
      icon: <XIcon />,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      hoverClass: "hover:bg-stone-900 hover:text-white",
      activeClass: "bg-stone-50 text-stone-500",
    },
    {
      label: "Bagikan ke WhatsApp",
      icon: <WhatsAppIcon />,
      href: `https://wa.me/?text=${encodeURIComponent(title + " " + shareUrl)}`,
      hoverClass: "hover:bg-green-500 hover:text-white",
      activeClass: "bg-stone-50 text-stone-500",
    },
    {
      label: "Bagikan ke Telegram",
      icon: <TelegramIcon />,
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      hoverClass: "hover:bg-[#229ED9] hover:text-white",
      activeClass: "bg-stone-50 text-stone-500",
    },
  ];

  return (
    <div className="relative flex items-center gap-3">
      <span className="text-sm text-stone-400 font-medium">Bagikan:</span>

      {/* Copy notification */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute -top-10 left-0 bg-stone-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap z-50"
          >
            ✓ Link berhasil disalin!
          </motion.div>
        )}
      </AnimatePresence>

      {buttons.map((btn) =>
        btn.href ? (
          <a
            key={btn.label}
            href={btn.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "p-2 rounded-full transition-all",
              btn.activeClass,
              btn.hoverClass
            )}
            aria-label={btn.label}
            title={btn.label}
          >
            {btn.icon}
          </a>
        ) : (
          <button
            key={btn.label}
            type="button"
            onClick={btn.onClick}
            className={cn(
              "p-2 rounded-full transition-all",
              btn.activeClass,
              btn.hoverClass
            )}
            aria-label={btn.label}
            title={btn.label}
          >
            {btn.icon}
          </button>
        )
      )}
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

export default function BlogDetailContent({
  post,
  relatedPosts,
}: {
  post: PostData;
  relatedPosts: PostData[];
}) {
  const processedContent = injectHeadingIds(post.content);
  const toc = extractTOC(processedContent);

  return (
    <>
      <section className="relative pt-32 pb-48 lg:pt-40 lg:pb-56 overflow-hidden">
        <div className={cn("absolute inset-0 bg-linear-to-br", post.gradient)}>
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-10 left-10 w-64 h-64 border border-stone-900/5 rounded-full" />
            <div className="absolute -top-20 -right-20 w-96 h-96 border border-stone-900/5 rounded-full" />
            <div className="absolute bottom-20 left-1/3 w-48 h-48 border border-stone-900/5 rotate-45" />
            <div className="bg-[repeating-linear-gradient(0deg,transparent,transparent_40px,rgba(0,0,0,0.02)_40px,rgba(0,0,0,0.02)_41px),repeating-linear-gradient(90deg,transparent,transparent_40px,rgba(0,0,0,0.02)_40px,rgba(0,0,0,0.02)_41px)] absolute inset-0" />
          </div>
          <div className="absolute inset-0 bg-linear-to-t from-white via-transparent to-transparent" />
        </div>
      </section>

      <article className="relative z-10 -mt-40 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-[1fr_280px] gap-12">
          <div className="min-w-0">
            <div className="bg-white rounded-2xl p-8 lg:p-12 border border-stone-100 min-w-0">
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

              {/* Cover Image */}
              {post.coverImage && (
                <motion.div className="mb-12 rounded-2xl overflow-hidden"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <img src={post.coverImage} alt={post.title} className="w-full h-auto max-h-[70vh] object-cover" />
                </motion.div>
              )}

              <div className="space-y-4">
                <motion.div
                  className="prose prose-stone prose-lg max-w-none prose-headings:font-heading prose-headings:font-semibold prose-a:text-accent-500 prose-img:rounded-xl"
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  dangerouslySetInnerHTML={{ __html: processedContent }}
                />
              </div>

              <motion.div className="mt-12 pt-8 border-t border-stone-100 flex items-center gap-4"
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
              >
                <div className="w-12 h-12 rounded-full bg-stone-900 flex items-center justify-center text-white font-heading font-semibold text-sm">
                  {post.author.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <p className="font-heading font-semibold text-stone-900 text-sm">{post.author}</p>
                  <p className="text-xs text-stone-400">Penulis</p>
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
                  <ul className="space-y-3">
                    {toc.map((item, i) => (
                      <li key={i} className={item.level === 3 ? "ml-1" : ""}>
                        <a href={`#${item.id}`} className={cn("text-stone-500 hover:text-accent-500 transition-colors line-clamp-2", item.level === 3 ? "text-[13px]" : "text-sm")}>
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
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

      {relatedPosts?.length > 0 && (
        <section className="py-16 lg:py-24 bg-cream">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="heading-3 text-stone-900 mb-10">Artikel Terkait</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedPosts.map((r, i) => (
                <motion.div key={r.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Link href={`/blog/${r.slug}`}
                    className="group block rounded-2xl overflow-hidden bg-white hover:shadow-lg transition-all duration-500 hover:-translate-y-1"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      {r.coverImage ? (
                        <img src={r.coverImage} alt={r.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                      ) : (
                        <div className={cn("absolute inset-0 bg-linear-to-br transition-transform duration-700 group-hover:scale-105", r.gradient)}>
                          <div className={cn("absolute inset-0 opacity-20",
                            r.pattern === "grid" && "bg-[repeating-linear-gradient(0deg,transparent,transparent_24px,rgba(0,0,0,0.03)_24px,rgba(0,0,0,0.03)_25px),repeating-linear-gradient(90deg,transparent,transparent_24px,rgba(0,0,0,0.03)_24px,rgba(0,0,0,0.03)_25px)]",
                            r.pattern === "dots" && "bg-[radial-gradient(rgba(0,0,0,0.06)_1px,transparent_1px)] bg-size-[16px_16px]",
                            r.pattern === "diagonal-lines" && "bg-[repeating-linear-gradient(45deg,transparent,transparent_8px,rgba(0,0,0,0.04)_8px,rgba(0,0,0,0.04)_16px)]"
                          )} />
                        </div>
                      )}
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
