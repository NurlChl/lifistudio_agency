"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ThreeBackground from "@/components/ThreeBackground";
import Counter from "@/components/ui/Counter";
import {
  Monitor,
  Palette,
  Zap,
  ArrowRight,
  Globe,
  Users,
  Clock,
  Shield,
  Plus,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
};

const stagger = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
};

interface FaqItem {
  question: string;
  answer: string;
}

interface FeaturedProject {
  title: string;
  slug: string;
  coverImage: string | null;
  category: string;
  description: string;
}

export default function HomeClient({ faqItems, featuredProjects }: { faqItems: FaqItem[]; featuredProjects: FeaturedProject[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
    <>
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative min-h-[100dvh] flex items-center bg-cream overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-accent-50 via-cream to-transparent opacity-70" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 lg:py-40 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-stone-200 bg-white/50 text-xs font-medium text-stone-500 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse" />
                One Studio. All Solutions.
              </p>

              <h1 className="heading-1 text-stone-900 mb-6">
                Digital yang{" "}
                <span className="text-accent-500 italic">Hidup.</span>
              </h1>

              <p className="subtitle text-stone-600 max-w-xl mb-10">
                Dari web development, UI/UX, graphic design, sampai automation
                engineering — <strong>satu tim handle semuanya</strong>. Hasil
                2x lebih cepat, tanpa ribet koordinasi 3 vendor beda.
              </p>

              <div className="flex flex-col gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-stone-900 text-white text-sm font-semibold hover:bg-stone-700 active:bg-stone-800 active:scale-[0.97] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 w-fit"
                >
                  Mulai Proyek
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-900 active:text-stone-700 active:opacity-80 transition-colors duration-300 w-fit"
                >
                  Lihat Portfolio →
                </Link>
              </div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mt-14 pt-10 border-t border-stone-200/50"
              >
                <div className="grid grid-cols-3 gap-8">
                  {[
                    { num: 30, label: "Klien Puas", suffix: "+" },
                    { num: 100, label: "Proyek Selesai", suffix: "+" },
                    { num: 4, label: "Tahun Experience", suffix: "+" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <p className="font-heading text-3xl lg:text-4xl font-semibold text-stone-900">
                        <Counter value={stat.num} suffix={stat.suffix} />
                      </p>
                      <p className="text-xs text-stone-400 mt-1 font-medium uppercase tracking-wider">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Visual Hero - 3D Animated Geometric Elements */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:block relative h-[500px] w-full"
            >
              {/* Subtle grid pattern */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, rgba(120,113,108,0.18) 1px, transparent 0)",
                  backgroundSize: "32px 32px",
                }}
                aria-hidden="true"
              />
              
              {/* Three.js animated 3D shapes */}
              <ThreeBackground />

              {/* Warm gradient overlay at bottom */}
              <div
                className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-cream to-transparent"
                aria-hidden="true"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ SERVICES ═══════════════ */}
      <motion.section {...fadeUp} className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...stagger} className="max-w-2xl mb-16">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-500 mb-4">
              Services
            </p>
            <h2 className="heading-2 text-stone-900">Apa yang Kami Kerjakan</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group p-8 lg:p-10 rounded-2xl bg-white hover:shadow-lg transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-xl bg-accent-50 flex items-center justify-center mb-6 group-hover:bg-accent-100 transition-colors duration-300">
                  <s.icon size={24} className="text-accent-500" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-stone-900 mb-3">
                  {s.title}
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed mb-6">
                  {s.desc}
                </p>
                <div className="flex flex-wrap gap-2" role="list" aria-label={`${s.title} technologies`}>
                  {s.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-3 py-1 rounded-full bg-stone-50 text-stone-500 border border-stone-100"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ═══════════════ WHY US ═══════════════ */}
      <motion.section {...fadeUp} className="py-24 lg:py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...stagger} className="max-w-2xl mb-16">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-500 mb-4">
              Why Us
            </p>
            <h2 className="heading-2 text-stone-900">Kenapa Pilih Lifi Studio?</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {reasons.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="w-12 h-12 rounded-full bg-stone-900 flex items-center justify-center mb-5">
                  <r.icon size={22} className="text-white" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-stone-900 mb-3">
                  {r.title}
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {r.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ═══════════════ PORTFOLIO PREVIEW ═══════════════ */}
      <motion.section {...fadeUp} className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-500 mb-4">
                Portfolio
              </p>
              <h2 className="heading-2 text-stone-900">Beberapa Project Terbaru</h2>
            </div>
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-stone-900 active:opacity-80 transition-colors"
            >
              Lihat Semua
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredProjects.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  href={`/portfolio/${p.slug}`}
                  className="group block rounded-2xl overflow-hidden bg-white hover:shadow-lg active:scale-[0.97] transition-all duration-500"
                >
                  <div className="aspect-16/10 overflow-hidden bg-stone-50">
                    {p.coverImage ? (
                      <img
                        src={p.coverImage as string}
                        alt={p.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-linear-to-br from-accent-100 to-accent-50" />
                    )}
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-medium text-accent-500 uppercase tracking-wider">
                      {p.category}
                    </span>
                    <h3 className="font-heading text-base font-semibold text-stone-900 mt-1.5 group-hover:text-accent-500 transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-sm text-stone-400 mt-1.5 line-clamp-2">
                      {p.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ═══════════════ FAQ ═══════════════ */}
      <motion.section {...fadeUp} className="py-24 lg:py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...stagger} className="max-w-2xl mb-14">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-500 mb-4">
              FAQ
            </p>
            <h2 className="heading-2 text-stone-900">Pertanyaan Umum</h2>
          </motion.div>

          <div className="max-w-3xl space-y-4">
            {faqItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="border border-stone-50 bg-white rounded-xl transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-5 px-6 text-left font-heading font-medium text-stone-900 hover:text-accent-500 active:opacity-80 active:scale-[0.99] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 rounded-lg"
                >
                  {item.question}
                  <span className={`text-stone-400 text-xl transition-transform duration-300 ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 pt-0 text-sm text-stone-600 leading-relaxed">
                    {item.answer}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ═══════════════ CTA ═══════════════ */}
      <motion.section {...fadeUp} className="py-24 lg:py-32 bg-stone-900 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="heading-2 text-white mb-6">
            Siap Bikin Project Selanjutnya?
          </h2>
          <p className="text-stone-400 max-w-lg mx-auto mb-10 text-lg leading-relaxed">
            Diskusikan gratis. Nggak ada kewajiban. Cuma ngobrol tentang ide
            kamu.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-accent-500 text-white text-sm font-semibold hover:bg-accent-600 active:bg-accent-700 active:scale-[0.97] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-300"
          >
            Hubungi Kami
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </motion.section>
    </>
  );
}

/* ─── Data ─── */
const services = [
  {
    icon: Monitor,
    title: "Web Development",
    desc: "Dari WordPress company profile sampai Next.js marketplace — website cepat, aman, dan mudah dikelola.",
    tech: ["WordPress", "Next.js", "Laravel", "Vue.js"],
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    desc: "Bukan cuma cantik. Setiap pixel ada tujuannya — biar pengunjung betah dan konversi naik.",
    tech: ["Figma", "Framer", "Prototyping", "Design System"],
  },
  {
    icon: Palette,
    title: "Graphic Design",
    desc: "Logo, brand identity, sosial media visuals — identitas visual yang bikin brand langsung dikenal.",
    tech: ["Brand Identity", "Social Media", "Print"],
  },
  {
    icon: Zap,
    title: "Automation",
    desc: "Otomatiskan workflow kamu. Kirim invoice, follow-up pelanggan, sinkron data tanpa ribet.",
    tech: ["n8n", "GHL", "AI Integration", "Zapier"],
  },
];

const reasons = [
  {
    icon: Globe,
    title: "Integrated Service",
    desc: "Nggak perlu hiring 4 orang atau vendor beda-beda. Semua beres dalam satu tim.",
  },
  {
    icon: Shield,
    title: "Quality Guaranteed",
    desc: "Desain premium, code clean, delivery tepat waktu. Standar kualitas tinggi di setiap proyek.",
  },
  {
    icon: Clock,
    title: "Cost Efficient",
    desc: "Satu budget, semua beres. Lebih hemat daripada pisah-pisah vendor.",
  },
  {
    icon: Users,
    title: "Local Understanding",
    desc: "Paham pasar Indonesia, kualitas global. Strategi yang tepat untuk brand kamu.",
  },
];
