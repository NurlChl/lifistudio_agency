"use client";

import { motion } from "framer-motion";
import { Sparkles, Eye, Infinity as InfinityIcon, BookOpen } from "lucide-react";
import Counter from "@/components/ui/Counter";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
};

const stagger = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
};

export default function AboutClient() {
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
              About
            </p>
            <h1 className="heading-1 text-stone-900 mb-6">
              Cerita <span className="text-accent-500">Lifi</span> Studio
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Photo placeholder */}
            <motion.div
              variants={fadeUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="aspect-4/5 rounded-2xl bg-cream flex items-center justify-center"
            >
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-stone-100 mx-auto mb-4 flex items-center justify-center">
                  <span className="font-heading text-3xl text-stone-300">NC</span>
                </div>
                <p className="text-sm text-stone-400">Moh Nurul Cholil</p>
                <p className="text-xs text-stone-300">Founder</p>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              variants={fadeUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="flex flex-col justify-center"
            >
              <p className="text-stone-500 leading-relaxed mb-6">
                Halo, saya{" "}
                <strong className="text-stone-900">Moh Nurul Cholil</strong> —
                atau yang lebih dikenal sebagai{" "}
                <strong className="text-stone-900">NurlChl</strong>.
              </p>
              <p className="text-stone-500 leading-relaxed mb-6">
                Saya memulai Lifi Studio setelah{" "}
                <strong className="text-stone-900">4+ tahun</strong> berkecimpung
                di dunia web development dan desain. Dari Mojokerto, Jawa Timur,
                saya telah mengerjakan{" "}
                <strong className="text-stone-900">100+ proyek</strong> untuk{" "}
                <strong className="text-stone-900">30+ klien</strong> — mulai
                dari UKM lokal sampai perusahaan nasional.
              </p>
              <p className="text-stone-500 leading-relaxed mb-8">
                Kenapa <strong className="text-stone-900">"Lifi"</strong>? Karena
                kami percaya digital harus{" "}
                <em className="text-accent-500">hidup</em> — bukan cuma tampil,
                tapi benar-benar bekerja untuk bisnis kamu. Satu tim, semua
                solusi.
              </p>

              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-stone-100">
                {[
                  { number: 4, label: "Tahun", suffix: "+" },
                  { number: 30, label: "Klien", suffix: "+" },
                  { number: 100, label: "Proyek", suffix: "+" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="font-heading text-3xl font-semibold text-stone-900">
                      <Counter value={s.number} suffix={s.suffix} />
                    </p>
                    <p className="text-xs text-stone-400 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-500 mb-4">
              Values
            </p>
            <h2 className="heading-2 text-stone-900">
              Cara Kami Bekerja
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Quality First",
                desc: "Setiap proyek dikerjakan dengan standar tinggi. Code yang bersih, desain yang thoughtful.",
                icon: Sparkles,
              },
              {
                title: "Transparent",
                desc: "No hidden fees, no overpromising. Kami bicara apa adanya, karena trust itu segalanya.",
                icon: Eye,
              },
              {
                title: "Long-term",
                desc: "Bukan proyek sekali jadi. Kami jaga hubungan setelah delivery — support jangka panjang.",
                icon: InfinityIcon,
              },
              {
                title: "Always Learning",
                desc: "Teknologi berubah cepat. Kami selalu update biar solusi yang dikasih selalu relevan.",
                icon: BookOpen,
              },
            ].map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-center p-6 bg-white/40 rounded-2xl border border-stone-100/50 hover:bg-white hover:border-stone-100 hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-stone-900 flex items-center justify-center mx-auto mb-6 text-white">
                  <v.icon size={20} className="text-white" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-stone-900 mb-3">
                  {v.title}
                </h3>
                <p className="text-sm text-stone-500 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
