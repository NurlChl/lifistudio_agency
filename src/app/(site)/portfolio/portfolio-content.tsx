"use client";

import Link from "next/link";
import { Globe, Smartphone, Palette, Cpu } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const projects = [
  { title: "TokoOnline.id", slug: "toko-online", category: "Web Development", desc: "E-commerce platform dengan Next.js, integrasi payment gateway dan manajemen stok real-time.", tech: ["Next.js", "MongoDB", "Midtrans"], color: "stone", gradient: "from-stone-100 to-stone-50", pattern: "grid", coverImage: "https://placehold.co/800x600/78716C/FFFFFF?text=TokoOnline.id" },
  { title: "SiCantik App", slug: "sicantik-app", category: "UI/UX Design", desc: "Aplikasi booking salon dengan pengalaman pengguna yang seamless dan sistem manajemen jadwal.", tech: ["Figma", "Prototyping", "Design System"], color: "accent", gradient: "from-accent-100 to-accent-50", pattern: "dots", coverImage: "https://placehold.co/800x600/D0603A/FFFFFF?text=SiCantik+App" },
  { title: "WarungDigital", slug: "warung-digital", category: "Web Development", desc: "Dashboard analytics untuk UMKM dengan visualisasi data real-time dari berbagai sources.", tech: ["Next.js", "Chart.js", "Firebase"], color: "stone", gradient: "from-stone-100 to-stone-50", pattern: "diagonal-lines", coverImage: "https://placehold.co/800x600/78716C/FFFFFF?text=WarungDigital" },
  { title: "HijabStyle", slug: "hijab-style", category: "Graphic Design", desc: "Brand identity lengkap untuk fashion brand muslimah — dari logo sampai social media templates.", tech: ["Illustrator", "Photoshop", "Figma"], color: "purple", gradient: "from-accent-200 to-accent-100", pattern: "diagonal-lines", coverImage: "https://placehold.co/800x600/A8623A/FFFFFF?text=HijabStyle" },
  { title: "TravelKita", slug: "travel-kita", category: "Web Development", desc: "Platform booking travel dengan multi-vendor, sistem pembayaran, dan itinerary builder.", tech: ["Laravel", "Vue.js", "MySQL"], color: "stone", gradient: "from-stone-100 to-stone-50", pattern: "grid", coverImage: "https://placehold.co/800x600/78716C/FFFFFF?text=TravelKita" },
  { title: "KlinikSehat", slug: "klinik-sehat", category: "UI/UX Design", desc: "Redesign aplikasi klinik dengan fokus pada kemudahan pasien daftar online dan telekonsultasi.", tech: ["Figma", "Usability Testing", "Accessibility"], color: "accent", gradient: "from-accent-100 to-accent-50", pattern: "dots", coverImage: "https://placehold.co/800x600/D0603A/FFFFFF?text=KlinikSehat" },
  { title: "AutoLead CRM", slug: "autolead-crm", category: "Automation", desc: "Otomatisasi CRM dengan n8n: integrasi WhatsApp, email marketing, dan Google Sheets.", tech: ["n8n", "GHL", "WhatsApp API"], color: "teal", gradient: "from-stone-200 to-cream", pattern: "dots", coverImage: "https://placehold.co/800x600/5C8A7A/FFFFFF?text=AutoLead+CRM" },
  { title: "KopiKita", slug: "kopi-kita", category: "UI/UX Design", desc: "Website & mobile app untuk brand coffee shop dengan sistem pre-order dan loyalty program.", tech: ["Figma", "Flutter", "Firebase"], color: "accent", gradient: "from-accent-100 to-accent-50", pattern: "grid", coverImage: "https://placehold.co/800x600/D0603A/FFFFFF?text=KopiKita" },
];

function CategoryIcon({ category }: { category: string }) {
  if (category.includes("Web")) return <Globe size={14} />;
  if (category.includes("UI/UX")) return <Smartphone size={14} />;
  if (category.includes("Graphic")) return <Palette size={14} />;
  return <Cpu size={14} />;
}

function ProjectThumb({ project }: { project: typeof projects[number] }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-stone-50">
      {project.coverImage ? (
        <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
      ) : (
        <div className={cn("absolute inset-0 bg-gradient-to-br transition-all duration-700 group-hover:scale-105", project.gradient)}>
          <div className={cn("absolute inset-0 opacity-30 transition-opacity duration-500 group-hover:opacity-10",
            project.pattern === "grid" && "bg-[repeating-linear-gradient(0deg,transparent,transparent_24px,rgba(0,0,0,0.04)_24px,rgba(0,0,0,0.04)_25px),repeating-linear-gradient(90deg,transparent,transparent_24px,rgba(0,0,0,0.04)_24px,rgba(0,0,0,0.04)_25px)]",
            project.pattern === "dots" && "bg-[radial-gradient(rgba(0,0,0,0.08)_1px,transparent_1px)] bg-[length:16px_16px]",
            project.pattern === "diagonal-lines" && "bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.05)_10px,rgba(0,0,0,0.05)_20px)]"
          )} />
          <div className="absolute -bottom-8 -right-8 w-48 h-48 rounded-full bg-white/10" />
          <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full bg-white/5" />
        </div>
      )}
      <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/60 transition-all duration-500 flex items-center justify-center">
        <span className="text-white font-heading font-semibold text-sm opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">Lihat Detail</span>
      </div>
      <div className="absolute top-4 left-4">
        <span className={cn("inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider shadow-sm backdrop-blur-sm",
          project.color === "stone" && "bg-white/80 text-stone-700",
          project.color === "accent" && "bg-accent-500/80 text-white",
          project.color === "purple" && "bg-accent-500/80 text-white",
          project.color === "teal" && "bg-stone-900/70 text-white",
        )}>
          <CategoryIcon category={project.category} />
          {project.category}
        </span>
      </div>
    </div>
  );
}

export default function PortfolioContent() {
  return (
    <>
      <section className="relative pt-36 pb-20 lg:pt-44 lg:pb-24 bg-cream overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-500 mb-4">Portfolio</p>
          <h1 className="heading-1 text-stone-900 max-w-2xl mb-6">
            Project yang <span className="text-accent-500 italic">Kami Banggakan</span>
          </h1>
          <p className="subtitle text-stone-500 max-w-xl">Setiap project punya cerita. Ini beberapa yang paling berkesan.</p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            variants={{ visible: { transition: { staggerChildren: 0.08 } }, hidden: {} }}
          >
            {projects.map((p) => (
              <motion.div key={p.slug}
                variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }}
              >
                <Link href={`/portfolio/${p.slug}`}
                  className="group block rounded-2xl overflow-hidden border border-stone-100 bg-white hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
                >
                  <ProjectThumb project={p} />
                  <div className="p-6">
                    <h2 className="font-heading text-lg font-semibold text-stone-900 mb-2 group-hover:text-accent-500 transition-colors">{p.title}</h2>
                    <p className="text-sm text-stone-400 leading-relaxed line-clamp-2 mb-4">{p.desc}</p>
                    <div className="flex flex-wrap gap-1.5" role="list" aria-label={`${p.title} technologies`}>
                      {p.tech.map((t) => (
                        <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-stone-50 text-stone-400 border border-stone-100">{t}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
