import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Globe, Smartphone } from "lucide-react";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Lihat project-project yang telah kami kerjakan.",
};

const projects = [
  {
    title: "TokoOnline.id",
    slug: "toko-online",
    category: "Web Development",
    desc: "E-commerce platform dengan Next.js, integrasi payment gateway dan manajemen stok real-time.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    icon: Globe,
    tech: ["Next.js", "MongoDB", "Midtrans"],
  },
  {
    title: "SiCantik App",
    slug: "sicantik-app",
    category: "UI/UX Design",
    desc: "Aplikasi booking salon dengan pengalaman pengguna yang seamless dan sistem manajemen jadwal.",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&q=80",
    icon: Smartphone,
    tech: ["Figma", "Prototyping", "Design System"],
  },
  {
    title: "WarungDigital",
    slug: "warung-digital",
    category: "Web Development",
    desc: "Dashboard analytics untuk UMKM dengan visualisasi data real-time dari berbagai sources.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    icon: Globe,
    tech: ["Next.js", "Chart.js", "Firebase"],
  },
  {
    title: "HijabStyle",
    slug: "hijab-style",
    category: "Graphic Design",
    desc: "Brand identity lengkap untuk fashion brand muslimah — dari logo sampai social media templates.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    icon: Smartphone,
    tech: ["Illustrator", "Photoshop", "Figma"],
  },
  {
    title: "TravelKita",
    slug: "travel-kita",
    category: "Web Development",
    desc: "Platform booking travel dengan multi-vendor, sistem pembayaran, dan itinerary builder.",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
    icon: Globe,
    tech: ["Laravel", "Vue.js", "MySQL"],
  },
  {
    title: "KlinikSehat",
    slug: "klinik-sehat",
    category: "UI/UX Design",
    desc: "Redesign aplikasi klinik dengan fokus pada kemudahan pasien daftar online dan telekonsultasi.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    icon: Smartphone,
    tech: ["Figma", "Usability Testing", "Accessibility"],
  },
];

const categories = ["All", "Web Development", "UI/UX Design", "Graphic Design"];

export default function PortfolioPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Portfolio", url: "/portfolio" },
            ])
          ),
        }}
      />

      {/* Hero */}
      <section className="relative pt-36 pb-20 lg:pt-44 lg:pb-24 bg-cream overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-500 mb-4">
            Portfolio
          </p>
          <h1 className="heading-1 text-stone-900 max-w-2xl mb-6">
            Project yang{" "}
            <span className="text-accent-500 italic">Kami Banggakan</span>
          </h1>
          <p className="subtitle text-stone-500 max-w-xl">
            Setiap project punya cerita. Ini beberapa yang paling berkesan.
          </p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {projects.map((p, i) => {
              const Icon = p.icon;
              return (
                <Link
                  key={p.slug}
                  href={`/portfolio/${p.slug}`}
                  className="group block rounded-2xl overflow-hidden border border-stone-100 bg-white hover:shadow-lg transition-all duration-500"
                >
                  {/* Image */}
                  <div className="aspect-[16/10] overflow-hidden bg-stone-50">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading={i < 3 ? "eager" : "lazy"}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon size={14} className="text-accent-500" />
                      <span className="text-xs font-medium text-accent-500 uppercase tracking-wider">
                        {p.category}
                      </span>
                    </div>
                    <h2 className="font-heading text-lg font-semibold text-stone-900 mb-2 group-hover:text-accent-500 transition-colors">
                      {p.title}
                    </h2>
                    <p className="text-sm text-stone-400 leading-relaxed line-clamp-2 mb-4">
                      {p.desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5" role="list" aria-label={`${p.title} technologies`}>
                      {p.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] px-2.5 py-1 rounded-full bg-stone-50 text-stone-400 border border-stone-100"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
