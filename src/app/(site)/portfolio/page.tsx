import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Lihat project-project yang telah kami kerjakan.",
};

// Dummy portfolio data
const projects = [
  {
    id: 1,
    title: "TokoOnline.id",
    category: "Web",
    categorySlug: "web",
    description: "E-commerce platform dengan Next.js, integrasi payment gateway, dan dashboard real-time.",
    tech: ["Next.js", "MongoDB", "Midtrans"],
    image: null,
    slug: "toko-online",
  },
  {
    id: 2,
    title: "SiCantik App",
    category: "UI/UX",
    categorySlug: "uiux",
    description: "UI/UX redesign untuk aplikasi booking salon. Meningkatkan konversi booking sebesar 40%.",
    tech: ["Figma", "Prototyping", "User Research"],
    image: null,
    slug: "sicantik-app",
  },
  {
    id: 3,
    title: "WarungDigital",
    category: "Web",
    categorySlug: "web",
    description: "Platform manajemen stok & penjualan untuk UMKM dengan fitur multi-role.",
    tech: ["Laravel", "Vue.js", "MySQL"],
    image: null,
    slug: "warung-digital",
  },
  {
    id: 4,
    title: "Nusantara Brand",
    category: "Graphic",
    categorySlug: "graphic",
    description: "Brand identity & packaging design untuk produk lokal Nusantara.",
    tech: ["Illustrator", "Photoshop", "Brand Strategy"],
    image: null,
    slug: "nusantara-brand",
  },
  {
    id: 5,
    title: "AutoLead CRM",
    category: "Automation",
    categorySlug: "automation",
    description: "Otomatisasi CRM dengan n8n: integrasi WhatsApp, email, dan Google Sheets.",
    tech: ["n8n", "GHL", "WhatsApp API"],
    image: null,
    slug: "autolead-crm",
  },
  {
    id: 6,
    title: "KopiKita",
    category: "UI/UX",
    categorySlug: "uiux",
    description: "Website & mobile app untuk brand coffee shop dengan sistem pre-order.",
    tech: ["Figma", "Flutter", "Firebase"],
    image: null,
    slug: "kopi-kita",
  },
];

const categories = ["All", "Web", "UI/UX", "Graphic", "Automation"];

export default function PortfolioPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-500 mb-4">
            Portfolio
          </p>
          <h1 className="heading-1 text-stone-900 mb-6">Our Work</h1>
          <p className="subtitle text-stone-500 max-w-xl">
            Setiap project punya cerita. Berikut beberapa karya yang kami banggakan.
          </p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                className="px-5 py-2 rounded-full text-sm font-medium border border-stone-200 text-stone-600 hover:border-stone-400 hover:text-stone-900 transition-all"
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/portfolio/${project.slug}`}
                className="group block rounded-xl border border-stone-100 bg-white overflow-hidden hover:border-stone-200 hover:shadow-lg transition-all duration-500"
              >
                {/* Image Placeholder */}
                <div className="aspect-[4/3] bg-stone-50 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-3 group-hover:bg-accent-50 transition-colors">
                      <span className="text-2xl text-stone-300 group-hover:text-accent-400 transition-colors">
                        {"◆"}
                      </span>
                    </div>
                    <span className="text-xs text-stone-400 font-medium">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-accent-50 text-accent-600 font-medium">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-stone-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-stone-500 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-0.5 rounded bg-stone-50 text-stone-500"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
