import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description: "Layanan digital Lifi Studio — Web Development, UI/UX Design, Graphic Design, dan Automation Engineering.",
};

const services = [
  {
    number: "01",
    title: "Web Development",
    description:
      "Kami membangun website dan web application yang cepat, aman, dan scalable. Dari company profile sederhana sampai platform kompleks — semua dikerjakan dengan standar kode yang bersih dan performa optimal.",
    items: [
      "Company Profile & Brand Website",
      "E-commerce (WooCommerce / Custom)",
      "Web Application (Next.js, Laravel, Vue)",
      "Landing Pages & Microsite",
      "CMS Integration",
    ],
    tech: ["WordPress", "Next.js", "Laravel", "Vue.js", "Tailwind", "MongoDB"],
  },
  {
    number: "02",
    title: "UI/UX Design",
    description:
      "Desain yang bukan cuma cantik — tapi juga fungsional. Setiap pixel dan interaksi dirancang untuk memberikan pengalaman terbaik bagi pengguna dan mendorong konversi.",
    items: [
      "Discovery & Research",
      "Wireframe & Prototype",
      "Visual Design & Design System",
      "Usability Testing",
      "Developer Handoff",
    ],
    tech: ["Figma", "Adobe Suite", "Framer", "Prototyping"],
  },
  {
    number: "03",
    title: "Graphic Design",
    description:
      "Identitas visual yang kuat adalah fondasi brand yang sukses. Dari logo sampai sosial media visuals — kami ciptakan tampilan yang konsisten dan berkesan.",
    items: [
      "Brand Identity & Logo",
      "Social Media Templates",
      "Marketing Collateral",
      "Presentation Design",
      "Icon & Illustration",
    ],
    tech: ["Illustrator", "Photoshop", "InDesign", "After Effects"],
  },
  {
    number: "04",
    title: "Automation Engineering",
    description:
      "Otomatisasi workflow bisnis kamu dengan teknologi terkini. Hemat waktu, kurangi human error, dan skala operasi tanpa harus nambah tim.",
    items: [
      "CRM & Lead Management (GHL)",
      "Workflow Automation (n8n)",
      "AI Integration (ChatGPT, Custom AI)",
      "Email Marketing Automation",
      "Cross-Platform Data Sync",
    ],
    tech: ["n8n", "GHL", "AI Tools", "Zapier", "WhatsApp API"],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-500 mb-4">
            Services
          </p>
          <h1 className="heading-1 text-stone-900 mb-6">
            Yang Kami Tawarkan
          </h1>
          <p className="subtitle text-stone-500 max-w-xl">
            Empat pilar layanan — satu tim. Dari konsep sampai eksekusi, kami
            handle semuanya.
          </p>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="space-y-24 lg:space-y-32">
            {services.map((service, i) => (
              <div
                key={service.number}
                className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-start ${
                  i % 2 === 1 ? "lg:direction-rtl" : ""
                }`}
              >
                {/* Left */}
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <span className="font-heading text-6xl lg:text-8xl font-bold text-stone-100 leading-none">
                    {service.number}
                  </span>
                  <h2 className="heading-2 text-stone-900 mt-4 mb-6">
                    {service.title}
                  </h2>
                  <p className="text-stone-500 leading-relaxed mb-8">
                    {service.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {service.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm text-stone-600"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-500 mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {service.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-3 py-1.5 rounded-full bg-stone-50 text-stone-500"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right - Visual */}
                <div
                  className={`aspect-square lg:aspect-auto lg:h-[500px] rounded-2xl bg-cream flex items-center justify-center ${
                    i % 2 === 1 ? "lg:order-1" : ""
                  }`}
                >
                  <span className="font-heading text-8xl lg:text-9xl text-stone-200 select-none">
                    {service.number}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-stone-900 text-white text-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="heading-2 text-white mb-6">
            Tertarik dengan salah satu layanan?
          </h2>
          <p className="text-stone-400 max-w-lg mx-auto mb-10 text-lg leading-relaxed">
            Diskusikan kebutuhan kamu — gratis, tanpa kewajiban.
          </p>
          <a
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
          </a>
        </div>
      </section>
    </>
  );
}
