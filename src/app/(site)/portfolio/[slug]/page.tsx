import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ExternalLink } from "lucide-react";

const projects = {
  "toko-online": {
    title: "TokoOnline.id",
    category: "Web Development",
    description: "E-commerce platform dengan Next.js, integrasi payment gateway Midtrans, dan dashboard real-time untuk manajemen produk, order, dan pelanggan.",
    fullDescription: `
      TokoOnline.id adalah platform e-commerce yang dibangun dengan focus pada performa dan kemudahan penggunaan. Dari halaman produk yang cepat sampai checkout yang mulus — setiap aspek dirancang untuk meningkatkan konversi.

      Fitur utama: manajemen produk dengan inventory real-time, multiple payment gateway, dashboard analitik, sistem loyalty points, dan integrasi dengan ekspedisi pengiriman Indonesia.
    `,
    tech: ["Next.js", "TypeScript", "MongoDB", "Midtrans", "Tailwind CSS"],
    results: [
      { metric: "Page Load", value: "< 1.5s" },
      { metric: "Conversion Rate", value: "+35%" },
      { metric: "Bounce Rate", value: "-22%" },
    ],
  },
  "sicantik-app": {
    title: "SiCantik App",
    category: "UI/UX Design",
    description: "UI/UX redesign untuk aplikasi booking salon. Meningkatkan konversi booking sebesar 40% melalui desain yang lebih intuitif.",
    fullDescription: "SiCantik adalah aplikasi booking salon yang populer di kota-kota besar Indonesia. Redesign ini fokus pada menyederhanakan flow booking, memperbaiki navigasi, dan menciptakan visual identity yang lebih fresh dan menarik bagi target pasar millenial dan gen Z.",
    tech: ["Figma", "User Research", "Prototyping", "Design System"],
    results: [
      { metric: "Booking Conversion", value: "+40%" },
      { metric: "User Satisfaction", value: "4.8/5" },
      { metric: "Task Completion", value: "+28%" },
    ],
  },
  "warung-digital": {
    title: "WarungDigital",
    category: "Web Development",
    description: "Platform manajemen stok & penjualan untuk UMKM dengan fitur multi-role dan laporan real-time.",
    fullDescription: "WarungDigital membantu pemilik toko kecil menengah mengelola stok, penjualan, dan keuangan dalam satu platform. Dibangun dengan Laravel dan Vue.js, aplikasi ini ringan, cepat, dan bisa diakses dari perangkat manapun.",
    tech: ["Laravel", "Vue.js", "MySQL", "REST API"],
    results: [
      { metric: "Stock Accuracy", value: "99%" },
      { metric: "Time Saved", value: "15 jam/minggu" },
    ],
  },
  "nusantara-brand": {
    title: "Nusantara Brand",
    category: "Graphic Design",
    description: "Brand identity & packaging design untuk produk lokal Nusantara yang ingin go modern tanpa kehilangan nilai tradisional.",
    fullDescription: "Brand identity untuk produk lokal yang menggabungkan elemen tradisional Nusantara dengan desain modern. Termasuk logo, packaging, dan guideline brand.",
    tech: ["Illustrator", "Photoshop", "Brand Strategy"],
    results: [
      { metric: "Brand Recall", value: "+60%" },
      { metric: "Sales Increase", value: "+25%" },
    ],
  },
  "autolead-crm": {
    title: "AutoLead CRM",
    category: "Automation",
    description: "Otomatisasi CRM dengan n8n: integrasi WhatsApp, email marketing, dan Google Sheets untuk lead management.",
    fullDescription: "AutoLead CRM adalah solusi otomatisasi yang menghubungkan berbagai tools bisnis menjadi satu workflow yang seamless. Mulai dari capture lead dari landing page, follow-up otomatis via WhatsApp, sampai reporting ke Google Sheets.",
    tech: ["n8n", "GHL", "WhatsApp API", "Google Sheets"],
    results: [
      { metric: "Lead Response Time", value: "< 1 min" },
      { metric: "Automation Rate", value: "85%" },
      { metric: "Team Efficiency", value: "+200%" },
    ],
  },
  "kopi-kita": {
    title: "KopiKita",
    category: "UI/UX Design",
    description: "Website & mobile app untuk brand coffee shop dengan sistem pre-order dan loyalty program.",
    fullDescription: "KopiKita adalah brand coffee shop modern yang membutuhkan kehadiran digital yang strong. Kami mendesain website dan mobile app dengan sistem pre-order yang memudahkan pelanggan memesan sebelum datang.",
    tech: ["Figma", "Flutter", "Firebase", "UI Design"],
    results: [
      { metric: "Pre-order Rate", value: "45%" },
      { metric: "App Rating", value: "4.9/5" },
    ],
  },
};

export default function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (params as any).slug as string;
  const project = projects[slug as keyof typeof projects];

  if (!project) {
    notFound();
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-stone-400 hover:text-stone-600 transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back to Portfolio
          </Link>

          <div className="max-w-3xl">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-500 mb-4 block">
              {project.category}
            </span>
            <h1 className="heading-1 text-stone-900 mb-6">
              {project.title}
            </h1>
            <p className="subtitle text-stone-500">{project.description}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-20">
            {/* Left — description */}
            <div className="lg:col-span-2">
              <div className="aspect-video rounded-xl bg-cream flex items-center justify-center mb-10">
                <span className="text-stone-300 font-heading text-2xl">
                  {project.title}
                </span>
              </div>

              <div className="prose prose-stone max-w-none
                prose-p:text-stone-500 prose-p:leading-relaxed
                prose-headings:font-heading prose-headings:text-stone-900">
                <p>{project.fullDescription}</p>
              </div>
            </div>

            {/* Right — sidebar */}
            <div className="space-y-8">
              <div>
                <h3 className="font-heading text-sm font-semibold text-stone-900 mb-3 uppercase tracking-wider">
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-3 py-1.5 rounded-full bg-stone-50 text-stone-600 border border-stone-100"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {project.results && (
                <div>
                  <h3 className="font-heading text-sm font-semibold text-stone-900 mb-3 uppercase tracking-wider">
                    Results
                  </h3>
                  <div className="space-y-3">
                    {project.results.map((r) => (
                      <div
                        key={r.metric}
                        className="flex justify-between items-center py-2 border-b border-stone-50 last:border-0"
                      >
                        <span className="text-sm text-stone-500">{r.metric}</span>
                        <span className="font-heading font-semibold text-stone-900">
                          {r.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-stone-900 text-white text-sm font-semibold hover:bg-stone-700 transition-all duration-300 w-full justify-center"
                >
                  Project Serupa?
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
