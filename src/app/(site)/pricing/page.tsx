export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";
import { getAllPricing } from "@/lib/actions";
import { getFaqs } from "@/lib/actions/faq";
import PricingClient from "./pricing-client";

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

const CATEGORY_LABEL: Record<string, string> = {
  web: "Web Development",
  uiux: "UI/UX",
  graphic: "Graphic Design",
  automation: "Automation",
};
const CATEGORY_ORDER = ["web", "uiux", "graphic", "automation"];

export default async function PricingPage() {
  const [dbPricing, faqItems] = await Promise.all([
    getAllPricing(),
    getFaqs({ category: "harga" })
  ]);

  // Group by category
  const grouped: Record<string, typeof dbPricing> = {};
  for (const item of dbPricing) {
    const label = CATEGORY_LABEL[item.category] || item.category;
    if (!grouped[label]) grouped[label] = [];
    grouped[label].push(item);
  }

  // Reorder
  const ordered: Record<string, typeof dbPricing> = {};
  for (const key of CATEGORY_ORDER) {
    const label = CATEGORY_LABEL[key];
    if (grouped[label]) ordered[label] = grouped[label];
  }

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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,var(--tw-gradient-stops))] from-accent-50/50 via-cream to-transparent" />
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

      {/* ─── Pricing Cards (Client) ─── */}
      <PricingClient pricingData={ordered} categoryKeys={Object.keys(ordered) as any} />

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
            {faqItems.map((item: any, i: number) => (
              <details
                key={i}
                className="faq-details group"
              >
                <summary className="outline-none cursor-pointer list-none select-none">
                  <div className="flex items-center justify-between font-heading font-medium text-stone-900 p-6">
                    <span className="text-left">{item.question}</span>
                    <div className="flex items-center ml-4 shrink-0">
                      <Plus className="w-5 h-5 text-stone-400 transition-transform duration-300 group-open:rotate-45" />
                    </div>
                  </div>
                </summary>
                <div className="px-6 pb-6 pt-0 text-sm text-stone-500 leading-relaxed">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
