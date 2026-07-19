import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Kenali Lifi Studio — digital agency dari Mojokerto, Jawa Timur. Web development, UI/UX design, graphic design, dan automation.",
};

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-500 mb-4">
            About
          </p>
          <h1 className="heading-1 text-stone-900 mb-6">
            Cerita <span className="text-accent-500">Lifi</span> Studio
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Photo placeholder */}
            <div className="aspect-[4/5] rounded-2xl bg-cream flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-stone-100 mx-auto mb-4 flex items-center justify-center">
                  <span className="font-heading text-3xl text-stone-300">NC</span>
                </div>
                <p className="text-sm text-stone-400">Moh Nurul Cholil</p>
                <p className="text-xs text-stone-300">Founder</p>
              </div>
            </div>

            {/* Text */}
            <div className="flex flex-col justify-center">
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
                  { number: "4+", label: "Tahun" },
                  { number: "30+", label: "Klien" },
                  { number: "100+", label: "Proyek" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="font-heading text-3xl font-semibold text-stone-900">
                      {s.number}
                    </p>
                    <p className="text-xs text-stone-400 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-500 mb-4 text-center">
            Values
          </p>
          <h2 className="heading-2 text-stone-900 text-center mb-16">
            Cara Kami Bekerja
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Quality First",
                desc: "Setiap proyek dikerjakan dengan standar tinggi. Code yang bersih, desain yang thoughtful.",
              },
              {
                title: "Transparent",
                desc: "No hidden fees, no overpromising. Kami bicara apa adanya, karena trust itu segalanya.",
              },
              {
                title: "Long-term",
                desc: "Bukan proyek sekali jadi. Kami jaga hubungan setelah delivery — support jangka panjang.",
              },
              {
                title: "Always Learning",
                desc: "Teknologi berubah cepat. Kami selalu update biar solusi yang dikasih selalu relevan.",
              },
            ].map((v) => (
              <div key={v.title} className="text-center">
                <div className="w-12 h-12 rounded-full bg-stone-900 flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-lg">◆</span>
                </div>
                <h3 className="font-heading text-lg font-semibold text-stone-900 mb-3">
                  {v.title}
                </h3>
                <p className="text-sm text-stone-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
