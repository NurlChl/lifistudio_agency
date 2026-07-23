"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
};

export default function ServicesClient({ services }: { services: any[] }) {
  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-500 mb-4">
              Services
            </p>
            <h1 className="heading-1 text-stone-900 mb-6">
              Yang Kami Tawarkan
            </h1>
            <p className="subtitle text-stone-500 max-w-xl">
              Empat pilar layanan — satu tim yang handle dari konsep sampai
              eksekusi. <strong>Kamu cukup bilang mau apa, kami urus sisanya.</strong>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="space-y-24 lg:space-y-32">
            {services.map((service: any, i: number) => {
              const isEven = i % 2 === 0;
              return (
                <div
                  key={service.number}
                  className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-start ${
                    !isEven ? "lg:direction-rtl" : ""
                  }`}
                >
                  {/* Left (Text) */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className={!isEven ? "lg:order-2 lg:direction-ltr" : ""}
                  >
                    <span className="font-heading text-6xl lg:text-8xl font-bold text-stone-100 leading-none select-none">
                      {service.number}
                    </span>
                    <h2 className="heading-2 text-stone-900 mt-4 mb-6">
                      {service.title}
                    </h2>
                    <p className="text-stone-500 leading-relaxed mb-8">
                      {service.description}
                    </p>
                    <ul className="space-y-3 mb-8">
                      {service.items.map((item: string) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-sm text-stone-600"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-500 mt-2 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {service.tech.map((t: string) => (
                        <span
                          key={t}
                          className="text-xs px-3 py-1.5 rounded-full bg-stone-50 text-stone-500 border border-stone-100"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Right (Visual Image) */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className={`relative aspect-square lg:aspect-auto lg:h-[500px] rounded-2xl bg-cream overflow-hidden flex items-center justify-center ${
                      !isEven ? "lg:order-1" : ""
                    }`}
                  >
                    {service.image ? (
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                    ) : (
                      <span className="font-heading text-8xl lg:text-9xl text-stone-200 select-none">
                        {service.number}
                      </span>
                    )}
                  </motion.div>
                </div>
              );
            })}
            {services.length === 0 && (
              <div className="text-center py-20">
                <p className="text-stone-500">Belum ada layanan yang tersedia saat ini.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-stone-900 text-white text-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            <h2 className="heading-2 text-white mb-6">
              Ada project yang mau didiskusikan?
            </h2>
            <p className="text-stone-400 max-w-lg mx-auto mb-10 text-lg leading-relaxed">
            <strong>Konsultasi gratis, tanpa kewajiban.</strong> Ceritain
            aja kebutuhan kamu, kami siapin solusinya.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-accent-500 text-white text-sm font-semibold hover:bg-accent-600 transition-all duration-300"
            >
              Hubungi Kami
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10m0 0l-4-4m4 4l-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Pricing Summary */}
      <section className="py-20 lg:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="max-w-2xl mb-12"
          >
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-500 mb-4">
              Pricing
            </p>
            <h2 className="heading-2 text-stone-900">Estimasi Harga</h2>
            <p className="text-sm text-stone-500 mt-4 leading-relaxed">
              Harga bisa berbeda tergantung kebutuhan spesifik project kamu.
              Ini estimasi untuk referensi awal.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 max-w-3xl">
            {[
              { name: "Landing Page", price: "Rp 1,5 - 3 jt", time: "1-2 minggu" },
              { name: "Company Profile", price: "Rp 3 - 6 jt", time: "2-3 minggu" },
              { name: "E-commerce", price: "Rp 5 - 12 jt", time: "4-8 minggu" },
              { name: "Web Application", price: "Rp 8 - 20 jt+", time: "6-16 minggu" },
              { name: "UI/UX Design", price: "Rp 2,5 - 8 jt", time: "2-6 minggu" },
              { name: "Brand Identity", price: "Rp 1,5 - 4 jt", time: "1-3 minggu" },
            ].map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.45, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center justify-between bg-white rounded-xl border border-stone-100 p-5 hover:border-accent-100 hover:bg-accent-50/20 transition-all duration-300"
              >
                <div>
                  <p className="font-heading font-semibold text-stone-900 text-sm">
                    {item.name}
                  </p>
                  <p className="text-xs text-stone-400 mt-0.5">{item.time}</p>
                </div>
                <p className="font-heading text-sm font-semibold text-accent-500">
                  {item.price}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="mt-8 max-w-3xl"
          >
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent-500 hover:text-accent-600 transition-colors"
            >
              Lihat detail pricing & FAQ
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8m0 0l-3-3m3 3l-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
