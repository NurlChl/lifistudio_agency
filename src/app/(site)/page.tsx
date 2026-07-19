import { faqSchema, breadcrumbSchema } from "@/lib/seo";

export default function Home() {
  const faqItems = [
    {
      question: "Apa saja layanan yang ditawarkan Lifi Studio?",
      answer: "Kami menawarkan 4 layanan utama: Web Development (WordPress, Next.js, Laravel), UI/UX Design (Figma, prototyping), Graphic Design (brand identity, logo), dan Automation Engineering (n8n, GHL, AI integration).",
    },
    {
      question: "Berapa lama waktu pengerjaan sebuah website?",
      answer: "Tergantung kompleksitas. Website company profile biasanya 1-2 minggu, e-commerce 3-6 minggu, dan web application custom 4-12 minggu. Kami selalu memberikan timeline yang jelas di awal.",
    },
    {
      question: "Apaya Lifi Studio menerima project dari luar kota?",
      answer: "Tentu! Kami berbasis di Mojokerto, Jawa Timur, tapi 90% klien kami dari luar kota. Semua koordinasi dilakukan secara online via WhatsApp, Zoom, atau Google Meet.",
    },
    {
      question: "Berapa biaya untuk membuat website?",
      answer: "Biaya bervariasi tergantung kebutuhan. Kami selalu transparan soal harga — konsultasi awal gratis tanpa kewajiban. Hubungi kami untuk diskusi dan penawaran.",
    },
  ];

  return (
    <>
      {/* JSON-LD: Breadcrumb + FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: "Home", url: "/" },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema(faqItems)),
        }}
      />

      {/* ─── Hero ─── */}
      <section
        aria-label="Hero"
        className="relative min-h-screen flex items-center bg-cream overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent-50 via-cream to-transparent opacity-60"
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 lg:py-40">
          <div className="max-w-3xl">
            {/* Badge */}
            <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-stone-200 bg-white/50 text-xs font-medium text-stone-500 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-500" aria-hidden="true" />
              One Studio. All Solutions.
            </p>

            {/* Main Heading */}
            <h1 className="heading-1 text-stone-900 mb-6">
              Digital yang{" "}
              <span className="text-accent-500 italic">Hidup.</span>
            </h1>

            <p className="subtitle text-stone-500 max-w-xl mb-10">
              Web development, UI/UX design, graphic design, dan automation
              engineering — semua dalam satu tim terintegrasi. Hasil maksimal,
              tanpa ribet ngurusin banyak vendor.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <a
                href="/contact"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-stone-900 text-white text-sm font-semibold hover:bg-stone-700 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
              >
                Mulai Proyek
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  <path
                    d="M3 8h10m0 0l-4-4m4 4l-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a
                href="/portfolio"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border border-stone-200 text-stone-700 text-sm font-medium hover:border-stone-400 hover:text-stone-900 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
              >
                Lihat Portfolio
              </a>
            </div>

            {/* Stats */}
            <div className="mt-16 pt-12 border-t border-stone-200/50">
              <div className="grid grid-cols-3 gap-8">
                {[
                  { number: "30+", label: "Klien Puas" },
                  { number: "100+", label: "Proyek Selesai" },
                  { number: "4+", label: "Tahun Pengalaman" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="font-heading text-3xl lg:text-4xl font-semibold text-stone-900">
                      {stat.number}
                    </p>
                    <p className="text-xs text-stone-400 mt-1 font-medium uppercase tracking-wider">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Services ─── */}
      <section aria-labelledby="services-heading" className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-500 mb-4">
              Services
            </p>
            <h2 id="services-heading" className="heading-2 text-stone-900">
              Apa yang Kami Kerjakan
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6" role="list">
            {services.map((service) => (
              <article
                key={service.title}
                className="group p-8 lg:p-10 rounded-xl border border-stone-100 bg-white hover:border-stone-200 hover:shadow-md transition-all duration-500"
              >
                <div
                  className="w-10 h-10 rounded-lg bg-accent-50 flex items-center justify-center mb-6 group-hover:bg-accent-100 transition-colors"
                  aria-hidden="true"
                >
                  <span className="text-accent-500 text-lg">{service.icon}</span>
                </div>
                <h3 className="font-heading text-xl font-semibold text-stone-900 mb-3">
                  {service.title}
                </h3>
                <p className="body-text text-sm">{service.description}</p>
                <div className="mt-6 flex flex-wrap gap-2" role="list" aria-label="Technologies">
                  {service.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-3 py-1 rounded-full bg-stone-50 text-stone-500"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Why Lifi Studio ─── */}
      <section aria-labelledby="why-heading" className="py-24 lg:py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-500 mb-4">
              Why Us
            </p>
            <h2 id="why-heading" className="heading-2 text-stone-900">
              Kenapa Pilih Lifi Studio?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {reasons.map((reason) => (
              <article key={reason.title}>
                <div
                  className="w-12 h-12 rounded-full bg-stone-900 flex items-center justify-center mb-6"
                  aria-hidden="true"
                >
                  <span className="text-stone-100 text-xl">{reason.icon}</span>
                </div>
                <h3 className="font-heading text-lg font-semibold text-stone-900 mb-3">
                  {reason.title}
                </h3>
                <p className="text-sm text-stone-500 leading-relaxed">
                  {reason.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section aria-labelledby="faq-heading" className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-500 mb-4">
              FAQ
            </p>
            <h2 id="faq-heading" className="heading-2 text-stone-900">
              Pertanyaan Umum
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqItems.map((item, i) => (
              <details
                key={i}
                className="group rounded-xl border border-stone-100 p-6 open:border-accent-100 open:bg-accent-50/20 transition-all"
              >
                <summary className="flex items-center justify-between cursor-pointer font-heading font-medium text-stone-900 list-none">
                  {item.question}
                  <span className="text-stone-400 group-open:hidden" aria-hidden="true">+</span>
                  <span className="text-stone-400 hidden group-open:inline" aria-hidden="true">−</span>
                </summary>
                <p className="mt-4 text-sm text-stone-500 leading-relaxed">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section aria-label="Contact call to action" className="py-24 lg:py-32 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="heading-2 text-white mb-6">
            Siap Bikin Project Selanjutnya?
          </h2>
          <p className="text-stone-400 max-w-lg mx-auto mb-10 text-lg leading-relaxed">
            Diskusikan gratis. Nggak ada kewajiban. Cuma ngobrol tentang ide
            kamu.
          </p>
          <a
            href="/contact"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-accent-500 text-white text-sm font-semibold hover:bg-accent-600 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-300"
          >
            Hubungi Kami
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            >
              <path
                d="M3 8h10m0 0l-4-4m4 4l-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </section>
    </>
  );
}

const services = [
  {
    icon: "⌨",
    title: "Web Development",
    description:
      "Dari WordPress company profile sampai Next.js marketplace — website cepat, aman, dan mudah dikelola.",
    tech: ["WordPress", "Next.js", "Laravel", "Vue.js"],
  },
  {
    icon: "✦",
    title: "UI/UX Design",
    description:
      "Bukan cuma cantik. Setiap pixel ada tujuannya — biar pengunjung betah dan konversi naik.",
    tech: ["Figma", "Framer", "Prototyping", "Design System"],
  },
  {
    icon: "◐",
    title: "Graphic Design",
    description:
      "Logo, brand identity, sosial media visuals — identitas visual yang bikin brand langsung dikenal.",
    tech: ["Brand Identity", "Social Media", "Print"],
  },
  {
    icon: "⚡",
    title: "Automation",
    description:
      "Otomatiskan workflow kamu. Kirim invoice, follow-up pelanggan, sinkron data tanpa ribet.",
    tech: ["n8n", "GHL", "AI Integration", "Zapier"],
  },
];

const reasons = [
  {
    icon: "●",
    title: "Integrated Service",
    description:
      "Nggak perlu hiring 4 orang atau vendor beda-beda. Semua beres dalam satu tim.",
  },
  {
    icon: "◆",
    title: "Quality Guaranteed",
    description:
      "Desain premium, code clean, delivery tepat waktu. Standar kualitas tinggi di setiap proyek.",
  },
  {
    icon: "○",
    title: "Cost Efficient",
    description:
      "Satu budget, semua beres. Lebih hemat daripada pisah-pisah vendor.",
  },
  {
    icon: "□",
    title: "Local Understanding",
    description:
      "Paham pasar Indonesia, kualitas global. Strategi yang tepat untuk brand kamu.",
  },
];
