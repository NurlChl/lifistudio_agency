"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Package {
  name: string;
  tagline: string;
  price: string;
  unit: string;
  description: string;
  features: string[];
  recommended: boolean;
}

export default function PricingClient({
  pricingData,
  categoryKeys,
}: {
  pricingData: Record<string, Package[]>;
  categoryKeys: string[];
}) {
  const categories = ["All", ...categoryKeys];
  const [activeTab, setActiveTab] = useState<string>("All");

  const isAll = activeTab === "All";
  const renderKeys = isAll ? categoryKeys : [activeTab];

  return (
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

        {(!categoryKeys.length || !Object.keys(pricingData).length) ? (
          <p className="text-center text-sm text-stone-400 py-20">
            Belum ada data pricing. Silakan hubungi kami untuk informasi harga.
          </p>
        ) : (
          renderKeys.map((category) => {
            const pkgs = pricingData[category] || [];
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
                        pkg.recommended
                          ? "border-accent-500 bg-accent-50/20 shadow-md"
                          : "border-stone-100 bg-white hover:border-stone-200"
                      )}
                    >
                      {pkg.recommended && (
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
                        {pkg.features.map((f: string) => (
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
                          pkg.recommended
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
          })
        )}
      </div>
    </section>
  );
}
