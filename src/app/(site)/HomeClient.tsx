"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Monitor,
  Palette,
  Sparkles,
  Zap,
  ArrowRight,
  CheckCircle2,
  Code2,
  LayoutDashboard,
  ShoppingCart,
  Smartphone,
  BarChart3,
  Globe,
  Users,
  Clock,
  Shield,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
};

const stagger = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
};

interface FaqItem {
  q: string;
  a: string;
}

export default function HomeClient({ faqItems }: { faqItems: FaqItem[] }) {
  return (
    <>
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative min-h-screen flex items-center bg-cream overflow-hidden">
        {/* Gambar latar dekoratif */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.04]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80')",
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent-50 via-cream to-transparent opacity-70" />

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

              <p className="subtitle text-stone-500 max-w-xl mb-10">
                Web development, UI/UX design, graphic design, dan automation
                engineering — semua dalam satu tim terintegrasi. Hasil maksimal,
                tanpa ribet ngurusin banyak vendor.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-stone-900 text-white text-sm font-semibold hover:bg-stone-700 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
                >
                  Mulai Proyek
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-stone-200 text-stone-700 text-sm font-medium hover:border-stone-400 hover:text-stone-900 transition-all duration-300"
                >
                  Lihat Portfolio
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
                    { num: "30+", label: "Klien Puas" },
                    { num: "100+", label: "Proyek Selesai" },
                    { num: "4+", label: "Tahun Experience" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <p className="font-heading text-3xl lg:text-4xl font-semibold text-stone-900">
                        {stat.num}
                      </p>
                      <p className="text-xs text-stone-400 mt-1 font-medium uppercase tracking-wider">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Visual Hero */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:block relative"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80"
                  alt="Workspace coding setup"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Floating card */}
              <motion.div
                initial={{ opacity: 0, y: 20, x: 20 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-accent-50 flex items-center justify-center">
                  <CheckCircle2 size={20} className="text-accent-500" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-stone-900">Quality Guaranteed</p>
                  <p className="text-[11px] text-stone-400">100% satisfaction</p>
                </div>
              </motion.div>
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
                className="group p-8 lg:p-10 rounded-2xl border border-stone-100 bg-white hover:border-stone-200 hover:shadow-lg transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-xl bg-accent-50 flex items-center justify-center mb-6 group-hover:bg-accent-100 transition-colors duration-300">
                  <s.icon size={24} className="text-accent-500" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-stone-900 mb-3">
                  {s.title}
                </h3>
                <p className="text-sm text-stone-500 leading-relaxed mb-6">
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
                <p className="text-sm text-stone-500 leading-relaxed">
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
              className="group inline-flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
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
                  className="group block rounded-2xl overflow-hidden border border-stone-100 bg-white hover:shadow-lg transition-all duration-500"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-stone-50">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-medium text-accent-500 uppercase tracking-wider">
                      {p.category}
                    </span>
                    <h3 className="font-heading text-base font-semibold text-stone-900 mt-1.5 group-hover:text-accent-500 transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-sm text-stone-400 mt-1.5 line-clamp-2">
                      {p.desc}
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

          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <details className="group rounded-xl border border-stone-100 bg-white p-6 open:border-accent-100 open:bg-accent-50/20 transition-all cursor-pointer">
                  <summary className="flex items-center justify-between font-heading font-medium text-stone-900 list-none">
                    {item.q}
                    <span className="text-stone-400 text-xl leading-none group-open:hidden">+</span>
                    <span className="text-stone-400 text-xl leading-none hidden group-open:inline">−</span>
                  </summary>
                  <p className="mt-4 text-sm text-stone-500 leading-relaxed">
                    {item.a}
                  </p>
                </details>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ═══════════════ CTA ═══════════════ */}
      <motion.section {...fadeUp} className="py-24 lg:py-32 bg-stone-900 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.03]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1920&q=80')",
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
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-accent-500 text-white text-sm font-semibold hover:bg-accent-600 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-300"
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
    icon: Sparkles,
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

const featuredProjects = [
  {
    title: "TokoOnline.id",
    slug: "toko-online",
    category: "Web",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
    desc: "E-commerce platform dengan Next.js dan integrasi payment gateway.",
  },
  {
    title: "SiCantik App",
    slug: "sicantik-app",
    category: "UI/UX",
    image:
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&q=80",
    desc: "Aplikasi booking salon dengan pengalaman pengguna yang mulus.",
  },
  {
    title: "WarungDigital",
    slug: "warung-digital",
    category: "Web",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    desc: "Dashboard analytics untuk UMKM dengan visualisasi data real-time.",
  },
];
