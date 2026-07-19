"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ArrowLeft, ExternalLink, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const projects: Record<string, {
  title: string; category: string; description: string; fullDescription: string;
  tech: string[]; results: { metric: string; value: string }[];
  gradient: string; testimonial: { text: string; author: string; role: string };
  coverImage: string | null; images: { url: string | null; caption: string }[];
}> = {
  "toko-online": {
    title: "TokoOnline.id", category: "Web Development",
    description: "E-commerce platform dengan Next.js, integrasi payment gateway Midtrans, dan dashboard real-time.",
    fullDescription: "TokoOnline.id adalah platform e-commerce yang dibangun dengan fokus pada performa dan kemudahan penggunaan. Dari halaman produk yang cepat sampai checkout yang mulus — setiap aspek dirancang untuk meningkatkan konversi. Fitur utama: manajemen produk dengan inventory real-time, multiple payment gateway, dashboard analitik, sistem loyalty points, dan integrasi dengan ekspedisi pengiriman Indonesia.",
    tech: ["Next.js", "TypeScript", "MongoDB", "Midtrans", "Tailwind CSS"],
    results: [{ metric: "Page Load", value: "< 1.5s" }, { metric: "Conversion Rate", value: "+35%" }, { metric: "Bounce Rate", value: "-22%" }],
    gradient: "from-stone-100 to-stone-50",
    testimonial: { text: "Lifi Studio bener-bener paham kebutuhan kita. Hasilnya di luar ekspektasi — loading super cepat, dashboard-nya intuitif, dan conversion rate naik signifikan sejak migrasi.", author: "Rina Wijaya", role: "CEO, TokoOnline.id" },
    coverImage: "https://placehold.co/1200x700/78716C/FFFFFF?text=WarungDigital",
    images: [
      { url: "https://placehold.co/900x600/78716C/FFFFFF?text=Dashboard+UMKM", caption: "Dashboard manajemen stok" },
      { url: "https://placehold.co/900x600/5C8A7A/FFFFFF?text=Sales+Report", caption: "Laporan penjualan real-time" },
    ],
  },
  "sicantik-app": {
    title: "SiCantik App", category: "UI/UX Design",
    description: "UI/UX redesign untuk aplikasi booking salon. Meningkatkan konversi booking sebesar 40%.",
    fullDescription: "SiCantik adalah aplikasi booking salon yang populer di kota-kota besar Indonesia. Redesign ini fokus pada menyederhanakan flow booking, memperbaiki navigasi, dan menciptakan visual identity yang lebih fresh dan menarik bagi target pasar millenial dan gen Z. Kami melakukan user research mendalam, usability testing, dan iterasi desain berbasis data untuk memastikan setiap perubahan benar-benar meningkatkan pengalaman pengguna.",
    tech: ["Figma", "User Research", "Prototyping", "Design System"],
    results: [{ metric: "Booking Conversion", value: "+40%" }, { metric: "User Satisfaction", value: "4.8/5" }, { metric: "Task Completion", value: "+28%" }],
    gradient: "from-accent-100 to-accent-50",
    testimonial: { text: "Tim Lifi Studio berhasil bikin aplikasi kami jauh lebih mudah dipakai. Booking jadi lebih cepat, pelanggan puas, dan yang penting — pendapatan naik drastis.", author: "Dian Permata", role: "Founder, SiCantik" },
    coverImage: "https://placehold.co/1200x700/D0603A/FFFFFF?text=SiCantik+App",
    images: [
      { url: "https://placehold.co/900x600/D0603A/FFFFFF?text=Booking+Flow", caption: "Flow booking yang disederhanakan" },
      { url: "https://placehold.co/900x600/A8623A/FFFFFF?text=Dashboard+Salon", caption: "Dashboard manajemen jadwal salon" },
    ],
  },
  "warung-digital": {
    title: "WarungDigital", category: "Web Development",
    description: "Platform manajemen stok & penjualan untuk UMKM dengan fitur multi-role dan laporan real-time.",
    fullDescription: "WarungDigital membantu pemilik toko kecil menengah mengelola stok, penjualan, dan keuangan dalam satu platform. Dibangun dengan Laravel dan Vue.js, aplikasi ini ringan, cepat, dan bisa diakses dari perangkat manapun. Fitur termasuk manajemen stok otomatis, laporan penjualan harian/bulanan, multi-role (owner, staff), dan integrasi dengan printer thermal untuk struk.",
    tech: ["Laravel", "Vue.js", "MySQL", "REST API"],
    results: [{ metric: "Stock Accuracy", value: "99%" }, { metric: "Time Saved", value: "15 jam/minggu" }],
    gradient: "from-stone-100 to-cream",
    testimonial: { text: "Sebelum pakai WarungDigital, stok sering kacau dan laporan manual makan waktu berjam-jam. Sekarang semuanya otomatis. Ini game changer buat bisnis kecil kayak kami.", author: "Budi Santoso", role: "Pemilik Toko, WarungDigital" },
    coverImage: "https://placehold.co/1200x700/A8623A/FFFFFF?text=HijabStyle",
    images: [
      { url: "https://placehold.co/900x600/A8623A/FFFFFF?text=Brand+Identity", caption: "Logo dan brand guidelines" },
      { url: "https://placehold.co/900x600/D0603A/FFFFFF?text=Social+Media+Templates", caption: "Template sosial media" },
    ],
  },
  "hijab-style": {
    title: "HijabStyle", category: "Graphic Design",
    description: "Brand identity lengkap untuk fashion brand muslimah — dari logo sampai social media templates.",
    fullDescription: "HijabStyle adalah brand fashion muslimah yang membutuhkan identitas visual yang kuat dan konsisten di semua touchpoint. Kami merancang logo, brand guidelines, packaging design, dan social media templates yang mencerminkan nilai elegan, modern, dan syar'i.",
    tech: ["Illustrator", "Photoshop", "Figma", "Brand Strategy"],
    results: [{ metric: "Brand Recall", value: "+60%" }, { metric: "Sales Increase", value: "+25%" }],
    gradient: "from-accent-200 to-accent-100",
    testimonial: { text: "Brand HijabStyle jadi jauh lebih dikenal setelah rebranding sama Lifi Studio. Desainnya elegant dan bener-bener beda dari kompetitor.", author: "Siti Nurhaliza", role: "Owner, HijabStyle" },
    coverImage: "https://placehold.co/1200x700/78716C/FFFFFF?text=TravelKita",
    images: [
      { url: "https://placehold.co/900x600/78716C/FFFFFF?text=Travel+Dashboard", caption: "Dashboard pemesanan travel" },
      { url: "https://placehold.co/900x600/5C8A7A/FFFFFF?text=Itinerary+Builder", caption: "Itinerary builder interaktif" },
    ],
  },
  "travel-kita": {
    title: "TravelKita", category: "Web Development",
    description: "Platform booking travel dengan multi-vendor, sistem pembayaran, dan itinerary builder.",
    fullDescription: "TravelKita adalah platform booking travel yang menghubungkan traveler dengan penyedia jasa travel di seluruh Indonesia. Dibangun dengan Laravel dan Vue.js, platform ini mendukung multi-vendor, sistem pembayaran terintegrasi, itinerary builder interaktif, dan review system.",
    tech: ["Laravel", "Vue.js", "MySQL", "Midtrans"],
    results: [{ metric: "Vendors Onboarded", value: "200+" }, { metric: "Booking Growth", value: "+150%" }],
    gradient: "from-stone-100 to-stone-50",
    testimonial: { text: "Platform yang dibangun Lifi Studio sangat scalable. Dari 50 vendor awal, sekarang sudah 200+ dan semuanya berjalan mulus.", author: "Andi Pratama", role: "CTO, TravelKita" },
    coverImage: "https://placehold.co/1200x700/D0603A/FFFFFF?text=KlinikSehat",
    images: [
      { url: "https://placehold.co/900x600/D0603A/FFFFFF?text=Teleconsultation", caption: "Antarmuka telekonsultasi" },
      { url: "https://placehold.co/900x600/A8623A/FFFFFF?text=Patient+Dashboard", caption: "Dashboard pasien" },
    ],
  },
  "klinik-sehat": {
    title: "KlinikSehat", category: "UI/UX Design",
    description: "Redesign aplikasi klinik dengan fokus pada kemudahan pasien daftar online dan telekonsultasi.",
    fullDescription: "KlinikSehat adalah aplikasi manajemen klinik yang membutuhkan redesign total untuk meningkatkan pengalaman pasien dan staf klinik. Kami fokus pada menyederhanakan flow pendaftaran online, membuat antarmuka telekonsultasi yang intuitif, dan dashboard yang mudah dipakai oleh staf klinik dengan berbagai tingkat literasi teknologi.",
    tech: ["Figma", "Usability Testing", "Accessibility", "Design System"],
    results: [{ metric: "Registration Rate", value: "+55%" }, { metric: "Staff Efficiency", value: "+30%" }],
    gradient: "from-accent-100 to-accent-50",
    testimonial: { text: "Pasien sekarang bisa daftar online dengan mudah tanpa bantuan staf. Staf klinik juga jauh lebih efisien. Redesign ini benar-benar mengubah cara kami beroperasi.", author: "dr. Fitriani", role: "Direktur, KlinikSehat" },
    coverImage: "https://placehold.co/1200x700/5C8A7A/FFFFFF?text=AutoLead+CRM",
    images: [
      { url: "https://placehold.co/900x600/5C8A7A/FFFFFF?text=Workflow+Automation", caption: "Flow otomatisasi lead" },
      { url: "https://placehold.co/900x600/78716C/FFFFFF?text=CRM+Dashboard", caption: "Dashboard CRM real-time" },
    ],
  },
  "autolead-crm": {
    title: "AutoLead CRM", category: "Automation",
    description: "Otomatisasi CRM dengan n8n: integrasi WhatsApp, email marketing, dan Google Sheets.",
    fullDescription: "AutoLead CRM adalah solusi otomatisasi yang menghubungkan berbagai tools bisnis menjadi satu workflow yang seamless. Mulai dari capture lead dari landing page, follow-up otomatis via WhatsApp, sampai reporting ke Google Sheets — semuanya berjalan otomatis tanpa intervensi manual.",
    tech: ["n8n", "GHL", "WhatsApp API", "Google Sheets"],
    results: [{ metric: "Lead Response Time", value: "< 1 min" }, { metric: "Automation Rate", value: "85%" }, { metric: "Team Efficiency", value: "+200%" }],
    gradient: "from-stone-200 to-cream",
    testimonial: { text: "Dulu tim sales kami kewalahan handle leads. Sekarang semuanya otomatis — dari capture sampe follow-up. Waktu respon turun dari 1 jam jadi < 1 menit!", author: "Fajar Hidayat", role: "Sales Director, AutoLead" },
    coverImage: "https://placehold.co/1200x700/D0603A/FFFFFF?text=KopiKita",
    images: [
      { url: "https://placehold.co/900x600/D0603A/FFFFFF?text=Pre-order+Flow", caption: "Flow pre-order kopi" },
      { url: "https://placehold.co/900x600/A8623A/FFFFFF?text=Loyalty+Program", caption: "Program loyalty digital" },
    ],
  },
  "kopi-kita": {
    title: "KopiKita", category: "UI/UX Design",
    description: "Website & mobile app untuk brand coffee shop dengan sistem pre-order dan loyalty program.",
    fullDescription: "KopiKita adalah brand coffee shop modern yang membutuhkan kehadiran digital yang strong. Kami mendesain website dan mobile app dengan sistem pre-order yang memudahkan pelanggan memesan sebelum datang, loyalty program digital, dan integrasi dengan POS di outlet.",
    tech: ["Figma", "Flutter", "Firebase", "UI Design"],
    results: [{ metric: "Pre-order Rate", value: "45%" }, { metric: "App Rating", value: "4.9/5" }],
    gradient: "from-accent-100 to-accent-50",
    testimonial: { text: "Aplikasi KopiKita langsung disukai pelanggan. Rating 4.9 di Play Store! Fitur pre-order-nya yang paling banyak dipake — apalagi jam sibuk pagi hari.", author: "Raka Adrianto", role: "Founder, KopiKita" },
    coverImage: "https://placehold.co/1200x700/78716C/FFFFFF?text=TokoOnline.id",
    images: [
      { url: "https://placehold.co/900x600/78716C/FFFFFF?text=E-Commerce+Dashboard", caption: "Dashboard admin TokoOnline.id" },
      { url: "https://placehold.co/900x600/5C8A7A/FFFFFF?text=Product+Page", caption: "Halaman produk dengan real-time stock" },
    ],
  },
};

const relatedMap: Record<string, string[]> = {
  "toko-online": ["warung-digital", "travel-kita"],
  "sicantik-app": ["klinik-sehat", "kopi-kita"],
  "warung-digital": ["toko-online", "travel-kita"],
  "hijab-style": ["kopi-kita", "sicantik-app"],
  "travel-kita": ["toko-online", "warung-digital"],
  "klinik-sehat": ["sicantik-app", "kopi-kita"],
  "autolead-crm": ["toko-online", "warung-digital"],
  "kopi-kita": ["sicantik-app", "hijab-style"],
};

function AnimatedCounter({ value, label }: { value: string; label: string }) {
  return (
    <motion.div className="text-center p-4"
      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="block font-heading text-2xl lg:text-3xl font-semibold text-stone-900 mb-1">{value}</span>
      <span className="text-xs text-stone-400 uppercase tracking-wider">{label}</span>
    </motion.div>
  );
}

export default function PortfolioDetailContent() {
  const params = useParams();
  const slug = params.slug as string;
  const project = projects[slug];
  if (!project) notFound();

  const relatedSlugs = relatedMap[slug] || [];
  const relatedProjects = relatedSlugs.map((s) => projects[s]).filter(Boolean).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
        {project.coverImage ? (
          <div className="absolute inset-0">
            <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent" />
          </div>
        ) : (
          <div className={cn("absolute inset-0 bg-gradient-to-br", project.gradient)}>
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-10 left-10 w-64 h-64 border border-stone-900/5 rounded-full" />
              <div className="absolute -top-20 -right-20 w-96 h-96 border border-stone-900/5 rounded-full" />
              <div className="absolute bottom-20 left-1/3 w-48 h-48 border border-stone-900/5 rotate-45" />
              <div className="bg-[repeating-linear-gradient(0deg,transparent,transparent_40px,rgba(0,0,0,0.02)_40px,rgba(0,0,0,0.02)_41px),repeating-linear-gradient(90deg,transparent,transparent_40px,rgba(0,0,0,0.02)_40px,rgba(0,0,0,0.02)_41px)] absolute inset-0" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
          </div>
        )}

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm text-stone-400 hover:text-stone-600 transition-colors mb-8">
            <ArrowLeft size={16} /> Kembali ke Portfolio
          </Link>
          <div className="max-w-3xl">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-500 mb-4 block">{project.category}</span>
            <motion.h1 className="heading-1 text-stone-900 mb-6"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >{project.title}</motion.h1>
            <motion.p className="subtitle text-stone-500"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >{project.description}</motion.p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-20">
            <div className="lg:col-span-2 space-y-10">
              <motion.div className="prose prose-stone max-w-none prose-p:text-stone-500 prose-p:leading-relaxed prose-headings:font-heading prose-headings:text-stone-900"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-lg leading-relaxed">{project.fullDescription}</p>
              </motion.div>

              {project.results && (
                <motion.div className="grid grid-cols-2 lg:grid-cols-3 gap-6 p-8 rounded-2xl bg-cream border border-stone-100"
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {project.results.map((r) => <AnimatedCounter key={r.metric} value={r.value} label={r.metric} />)}
                </motion.div>
              )}

              {project.testimonial && (
                <motion.div className="relative p-8 rounded-2xl bg-white border border-stone-100 shadow-md"
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Quote className="text-accent-200 absolute top-6 left-6" size={32} />
                  <blockquote className="relative z-10 pt-6">
                    <p className="text-stone-500 leading-relaxed italic mb-6">&ldquo;{project.testimonial.text}&rdquo;</p>
                    <footer>
                      <p className="font-heading font-semibold text-stone-900 text-sm">{project.testimonial.author}</p>
                      <p className="text-xs text-stone-400">{project.testimonial.role}</p>
                    </footer>
                  </blockquote>
                </motion.div>
              )}

              {/* Image gallery */}
              {project.images && project.images.length > 0 && (
                <motion.div className="space-y-4"
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h3 className="font-heading text-lg font-semibold text-stone-900">Galeri Project</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {project.images.map((img, i) => (
                      <div key={i} className="relative aspect-video rounded-xl overflow-hidden bg-stone-50">
                        {img.url ? (
                          <img src={img.url} alt={img.caption} className="w-full h-full object-cover" loading="lazy" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-accent-100 to-accent-50 flex items-center justify-center">
                            <p className="text-xs text-stone-400 italic px-4 text-center">{img.caption}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <div className="space-y-8">
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <h3 className="font-heading text-sm font-semibold text-stone-900 mb-3 uppercase tracking-wider">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="text-xs px-3 py-1.5 rounded-full bg-stone-50 text-stone-600 border border-stone-100">{t}</span>
                  ))}
                </div>
              </motion.div>

              {project.results && (
                <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h3 className="font-heading text-sm font-semibold text-stone-900 mb-3 uppercase tracking-wider">Results</h3>
                  <div className="space-y-3">
                    {project.results.map((r) => (
                      <div key={r.metric} className="flex justify-between items-center py-2 border-b border-stone-50 last:border-0">
                        <span className="text-sm text-stone-500">{r.metric}</span>
                        <span className="font-heading font-semibold text-stone-900">{r.value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              <motion.div className="pt-4" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-stone-900 text-white text-sm font-semibold hover:bg-stone-700 transition-all duration-300 w-full justify-center">
                  Project Serupa? <ExternalLink size={16} />
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {relatedProjects.length > 0 && (
        <section className="py-16 lg:py-24 bg-cream">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.h2 className="heading-3 text-stone-900 mb-10"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            >Project Lainnya</motion.h2>
            <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.1 } }, hidden: {} }}
            >
              {relatedProjects.map((rp) => {
                const relatedSlug = Object.entries(projects).find(([, v]) => v.title === rp.title)?.[0];
                return (
                  <motion.div key={rp.title}
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }}
                  >
                    <Link href={`/portfolio/${relatedSlug}`}
                      className="group block rounded-2xl overflow-hidden border border-stone-100 bg-white hover:shadow-lg transition-all duration-500 hover:-translate-y-1"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        {rp.coverImage ? (
                          <img src={rp.coverImage} alt={rp.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                        ) : (
                          <div className={cn("absolute inset-0 bg-gradient-to-br transition-transform duration-700 group-hover:scale-105", rp.gradient)}>
                            <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_12px,rgba(0,0,0,0.03)_12px,rgba(0,0,0,0.03)_24px)] opacity-30" />
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-accent-500">{rp.category}</span>
                        <h3 className="font-heading text-base font-semibold text-stone-900 mt-1 group-hover:text-accent-500 transition-colors">{rp.title}</h3>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      )}
    </>
  );
}
