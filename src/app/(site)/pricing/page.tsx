import type { Metadata } from "next";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Lihat paket harga layanan Lifi Studio — Web Development, UI/UX Design, Graphic Design, dan Automation. Transparan tanpa biaya tersembunyi.",
  openGraph: {
    title: "Pricing — Lifi Studio",
    description:
      "Harga layanan digital yang transparan. Sesuai budget, tanpa biaya tersembunyi.",
  },
};

const plans = [
  {
    name: "Web Development",
    tagline: "Dari landing page sampai marketplace",
    price: "3,5",
    unit: "jt",
    description:
      "Website company profile hingga e-commerce custom dengan teknologi modern.",
    features: [
      "Next.js / WordPress / Laravel",
      "Responsive semua device",
      "SEO optimized + schema markup",
      "Admin panel (CMS)",
      "Hosting setup assistance",
      "1 bulan support gratis",
    ],
    cta: "Konsultasi Gratis",
    popular: false,
  },
  {
    name: "UI/UX Design",
    tagline: "Desain yang ngundang konversi",
    price: "2,5",
    unit: "jt",
    description:
      "Wireframe, prototype interaktif, sampai design system yang siap diimplementasi.",
    features: [
      "User research & wireframe",
      "Hi-fi prototype (Figma)",
      "Design system components",
      "Responsive design",
      "3x revisi major",
      "Handoff file siap code",
    ],
    cta: "Konsultasi Gratis",
    popular: true,
  },
  {
    name: "Graphic Design",
    tagline: "Brand identity yang memorable",
    price: "1,5",
    unit: "jt",
    description:
      "Logo, brand identity, konten sosial media — visual yang bikin brand kamu standout.",
    features: [
      "Logo + brand guidelines",
      "Business card",
      "Social media templates (3 set)",
      "Color palette + typography",
      "Source file (AI/PSD/Figma)",
      "2x revisi",
    ],
    cta: "Konsultasi Gratis",
    popular: false,
  },
  {
    name: "Automation",
    tagline: "Biar kerjaan rutin beres otomatis",
    price: "4",
    unit: "jt",
    description:
      "Otomatisasi workflow pakai n8n, GHL, dan integrasi AI — hemat puluhan jam per bulan.",
    features: [
      "Workflow audit & mapping",
      "n8n / GHL setup",
      "AI integration (GPT, dll)",
      "CRM automation",
      "Email marketing pipeline",
      "1 bulan monitoring",
    ],
    cta: "Konsultasi Gratis",
    popular: false,
  },
];

const faqItems = [
  {
    question: "Apakah harga di atas sudah termasuk domain & hosting?",
    answer:
      "Harga di atas adalah biaya jasa pembuatan/pengembangan. Domain, hosting/ server tidak termasuk dan akan disesuaikan dengan kebutuhan project. Kami bisa bantu setup-kan dengan harga terbaik.",
  },
  {
    question: "Bagaimana sistem pembayarannya?",
    answer:
      "Pembayaran dilakukan 2-3 tahap tergantung skala project: 50% DP di awal, 25% setelah progress 50%, 25% setelah selesai dan approval. Untuk project kecil bisa 50% DP + 50% pelunasan.",
  },
  {
    question: "Ada garansi kalau websitenya error?",
    answer:
      "Ya! Kami memberikan garansi 1 bulan gratis setelah launch untuk perbaikan bug dan support teknis. Untuk maintenance lanjutan tersedia paket bulanan.",
  },
  {
    question: "Apakah boleh minta revisi?",
    answer:
      "Tentu. Setiap paket sudah termasuk alokasi revisi. Revisi tambahan di luar alokasi akan dikenakan biaya sesuai kesepakatan.",
  },
];

export default function PricingPage() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Pricing", url: "/pricing" },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema(faqItems)),
        }}
      />

      {/* ─── Hero ─── */}
      <section className="relative pt-36 pb-24 lg:pt-44 lg:pb-32 bg-cream overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-accent-50/50 via-cream to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-stone-200 bg-white/50 text-xs font-medium text-stone-500 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />
            Transparan Tanpa Biaya Tersembunyi
          </p>
          <h1 className="heading-1 text-stone-900 max-w-3xl mx-auto mb-6">
            Harga yang{" "}
            <span className="text-accent-500 italic">Jelas</span>
          </h1>
          <p className="subtitle text-stone-500 max-w-xl mx-auto mb-0">
            Setiap project beda — ini estimasi harga berdasarkan rata-rata project
            yang sering kami kerjakan. Untuk harga pasti, diskusikan dulu gratis.
          </p>
        </div>
      </section>

      {/* ─── Pricing Cards ─── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, i) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border p-8 flex flex-col transition-all duration-500 hover:shadow-lg ${
                  plan.popular
                    ? "border-accent-300 bg-accent-50/20 shadow-md"
                    : "border-stone-100 bg-white hover:border-stone-200"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent-500 text-white text-xs font-semibold">
                    Most Requested
                  </span>
                )}

                <div className="mb-6">
                  <h2 className="font-heading text-lg font-semibold text-stone-900 mb-1">
                    {plan.name}
                  </h2>
                  <p className="text-xs text-stone-400">{plan.tagline}</p>
                </div>

                <div className="mb-6">
                  <span className="font-heading text-4xl font-bold text-stone-900">
                    Rp{plan.price}
                  </span>
                  <span className="text-sm text-stone-400 ml-1">
                    {plan.unit}
                  </span>
                  <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-8 flex-1" role="list">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-stone-600">
                      <Check
                        size={16}
                        className="mt-0.5 shrink-0 text-accent-500"
                        aria-hidden="true"
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`group inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 ${
                    plan.popular
                      ? "bg-accent-500 text-white hover:bg-accent-600"
                      : "bg-stone-900 text-white hover:bg-stone-700"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Note ─── */}
      <section className="pb-20 lg:pb-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="rounded-2xl border border-stone-100 bg-cream p-8 lg:p-10 text-center">
            <p className="text-sm text-stone-500 max-w-2xl mx-auto">
              <strong className="text-stone-700">Butuh paket custom?</strong>{" "}
              Setiap project punya kebutuhan beda — entah itu integrasi API
              khusus, sistem pembayaran, atau fitur unik lainnya.{" "}
              <Link
                href="/contact"
                className="text-accent-500 hover:text-accent-600 font-medium underline underline-offset-2"
              >
                Diskusikan gratis
              </Link>{" "}
              dan kami siapkan penawaran yang pas untuk kamu.
            </p>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-20 lg:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-500 mb-4">
              FAQ
            </p>
            <h2 className="heading-2 text-stone-900">
              Pertanyaan Seputar Harga
            </h2>
          </div>

          <div className="max-w-3xl space-y-4">
            {faqItems.map((item, i) => (
              <details
                key={i}
                className="group rounded-xl border border-stone-100 bg-white p-6 open:border-accent-100 open:bg-accent-50/20 transition-all"
              >
                <summary className="flex items-center justify-between cursor-pointer font-heading font-medium text-stone-900 list-none">
                  {item.question}
                  <span className="text-stone-400 text-xl leading-none group-open:hidden" aria-hidden="true">
                    +
                  </span>
                  <span className="text-stone-400 text-xl leading-none hidden group-open:inline" aria-hidden="true">
                    −
                  </span>
                </summary>
                <p className="mt-4 text-sm text-stone-500 leading-relaxed">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
