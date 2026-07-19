"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/* ─── Pricing Data ─── */

interface Package {
  name: string;
  tagline: string;
  price: string;
  unit: string;
  description: string;
  features: string[];
  popular: boolean;
}

const categoryKeys = [
  "Web Development",
  "UI/UX",
  "Graphic Design",
  "Automation",
] as const;

type CategoryKey = (typeof categoryKeys)[number];

const categories = ["All", ...categoryKeys] as const;

const pricingData: Record<CategoryKey, Package[]> = {
  "Web Development": [
    {
      name: "Landing Page",
      tagline: "Halaman convert tinggi",
      price: "1,5",
      unit: "jt",
      description:
        "Landing page profesional untuk campaign atau product launch.",
      features: [
        "Next.js / WordPress",
        "Responsive semua device",
        "SEO optimized",
        "Contact form integration",
        "1 bulan support gratis",
      ],
      popular: false,
    },
    {
      name: "Company Profile",
      tagline: "Wajah digital perusahaan",
      price: "3,5",
      unit: "jt",
      description:
        "Website company profile dengan CMS yang gampang diupdate.",
      features: [
        "Next.js / WordPress",
        "Responsive semua device",
        "SEO + schema markup",
        "Admin panel (CMS)",
        "Hosting setup assistance",
        "1 bulan support gratis",
      ],
      popular: true,
    },
    {
      name: "E-Commerce",
      tagline: "Toko online siap jualan",
      price: "7",
      unit: "jt",
      description:
        "E-commerce custom dengan payment gateway dan manajemen produk.",
      features: [
        "Next.js / Laravel",
        "Payment gateway",
        "Product management",
        "Order & invoice system",
        "Admin dashboard",
        "1 bulan support gratis",
      ],
      popular: false,
    },
    {
      name: "Web App Custom",
      tagline: "Aplikasi web sesuai kebutuhan",
      price: "10+",
      unit: "jt",
      description:
        "Aplikasi web kustom dengan fitur kompleks dan skalabel.",
      features: [
        "Full custom development",
        "Database design",
        "API integration",
        "Dashboard admin",
        "3 bulan support gratis",
        "Deploy & maintenance",
      ],
      popular: false,
    },
  ],
  "UI/UX": [
    {
      name: "UI Design",
      tagline: "Tampilan yang engaging",
      price: "2",
      unit: "jt",
      description:
        "Desain UI untuk landing page atau aplikasi — high fidelity prototype.",
      features: [
        "Wireframe & user flow",
        "Hi-fi prototype (Figma)",
        "Responsive design",
        "2x revisi major",
        "Handoff file siap code",
      ],
      popular: false,
    },
    {
      name: "UI/UX Full Package",
      tagline: "Desain yang ngundang konversi",
      price: "4",
      unit: "jt",
      description:
        "Riset, wireframe, prototype interaktif, sampai design system.",
      features: [
        "User research & wireframe",
        "Hi-fi prototype (Figma)",
        "Design system components",
        "Responsive design",
        "3x revisi major",
        "Handoff file siap code",
      ],
      popular: true,
    },
    {
      name: "Design System",
      tagline: "Konsistensi di setiap produk",
      price: "6",
      unit: "jt",
      description:
        "Design system lengkap untuk produk digital yang scalable.",
      features: [
        "Component library (Figma)",
        "Style guide documentation",
        "Color & typography system",
        "Iconography & illustration",
        "Code-ready tokens",
        "2x revisi major",
      ],
      popular: false,
    },
  ],
  "Graphic Design": [
    {
      name: "Logo & Brand Identity",
      tagline: "Identitas yang memorable",
      price: "1,5",
      unit: "jt",
      description:
        "Logo, brand guidelines, dan identitas visual yang kuat.",
      features: [
        "Logo (3 konsep)",
        "Brand guidelines PDF",
        "Color palette + typography",
        "Business card design",
        "Source file (AI/PSD/Figma)",
        "2x revisi",
      ],
      popular: true,
    },
    {
      name: "Social Media Kit",
      tagline: "Feed yang konsisten dan estetik",
      price: "1",
      unit: "jt",
      description:
        "Template sosial media siap pakai untuk semua platform.",
      features: [
        "5 template feed Instagram",
        "3 template story",
        "Cover Facebook/LinkedIn",
        "Color palette + fonts",
        "Source file (PSD/Figma)",
      ],
      popular: false,
    },
    {
      name: "Brand Full Package",
      tagline: "Brand identity komprehensif",
      price: "3",
      unit: "jt",
      description:
        "Semua kebutuhan branding — dari logo sampai collateral.",
      features: [
        "Logo + brand guidelines",
        "Social media templates (5 set)",
        "Business card + stationery",
        "Marketing collateral",
        "Brand photography style guide",
        "3x revisi",
      ],
      popular: false,
    },
  ],
  Automation: [
    {
      name: "Workflow Setup",
      tagline: "Mulai otomatisasi step pertama",
      price: "2",
      unit: "jt",
      description:
        "Setup workflow otomatis untuk proses bisnis yang berulang.",
      features: [
        "Workflow audit & mapping",
        "n8n / Zapier setup",
        "3 automation workflows",
        "Integration dengan tools existing",
        "Dokumentasi & training",
        "1 bulan support",
      ],
      popular: false,
    },
    {
      name: "CRM + Automation",
      tagline: "Biar kerjaan rutin beres otomatis",
      price: "4",
      unit: "jt",
      description:
        "CRM integration dengan automation pipeline untuk sales & marketing.",
      features: [
        "GHL / CRM setup",
        "Lead capture automation",
        "Email marketing pipeline",
        "Follow-up automation",
        "Dashboard & reporting",
        "1 bulan monitoring",
      ],
      popular: true,
    },
    {
      name: "Enterprise Suite",
      tagline: "Otomatisasi skala perusahaan",
      price: "8+",
      unit: "jt",
      description:
        "Enterprise-grade automation dengan AI integration custom.",
      features: [
        "Full workflow audit",
        "Multi-system integration",
        "AI integration (GPT, dll)",
        "Custom dashboard",
        "SLA & priority support",
        "3 bulan monitoring",
      ],
      popular: false,
    },
  ],
};

/* ─── Client Component ─── */

export default function PricingClient() {
  const [activeTab, setActiveTab] = useState<(typeof categories)[number]>("All");

  const isAll = activeTab === "All";
  const renderKeys: CategoryKey[] = isAll
    ? [...categoryKeys]
    : [activeTab as CategoryKey];

  return (
    <>
      {/* ─── Pricing Cards ─── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Tab filter */}
          <div className="flex flex-wrap gap-2 mb-14 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  activeTab === cat
                    ? "bg-stone-900 text-white shadow-sm"
                    : "bg-white text-stone-500 border border-stone-200 hover:border-stone-300 hover:text-stone-700"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Package grid */}
          {renderKeys.map((category) => {
            const pkgs = pricingData[category];
            return (
            <div key={category} className="mb-16 last:mb-0">
              {isAll && (
                <h3 className="font-heading text-xl font-semibold text-stone-900 mb-8 text-center lg:text-left">
                  {category}
                </h3>
              )}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pkgs.map((pkg, i) => (
                  <motion.div
                    key={pkg.name}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      duration: 0.4,
                      delay: i * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={cn(
                      "relative rounded-2xl border p-8 flex flex-col transition-all duration-500 hover:shadow-lg",
                      pkg.popular
                        ? "border-accent-500 bg-accent-50/20 shadow-md"
                        : "border-stone-100 bg-white hover:border-stone-200"
                    )}
                  >
                    {pkg.popular && (
                      <span className="absolute -top-3 right-6 px-4 py-1 rounded-full bg-accent-500 text-white text-xs font-semibold">
                        Rekomendasi
                      </span>
                    )}

                    <div className="mb-6">
                      <h2 className="font-heading text-lg font-semibold text-stone-900 mb-1">
                        {pkg.name}
                      </h2>
                      <p className="text-xs text-stone-400">{pkg.tagline}</p>
                    </div>

                    <div className="mb-6">
                      <span className="font-heading text-4xl font-bold text-stone-900">
                        Rp{pkg.price}
                      </span>
                      <span className="text-sm text-stone-400 ml-1">
                        {pkg.unit}
                      </span>
                      <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                        {pkg.description}
                      </p>
                    </div>

                    <ul className="space-y-3 mb-8 flex-1" role="list">
                      {pkg.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-3 text-sm text-stone-600"
                        >
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
                      className={cn(
                        "group inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500",
                        pkg.popular
                          ? "bg-accent-500 text-white hover:bg-accent-600"
                          : "bg-stone-900 text-white hover:bg-stone-700"
                      )}
                    >
                      Konsultasi Gratis
                      <ArrowRight
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
        </div>
      </section>
    </>
  );
}
