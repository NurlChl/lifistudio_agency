"use client";

import Link from "next/link";
import { ArrowLeft, Quote, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export interface ProjectData {
  title: string;
  slug: string;
  category: string;
  description: string;
  fullDescription: string;
  tech: string[];
  results: { metric: string; value: string }[];
  gradient: string;
  testimonial: { text: string; author: string; role: string } | null;
  coverImage: string | null;
  images: { url: string | null; caption: string }[];
}

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

export default function PortfolioDetailContent({
  project,
  relatedProjects,
}: {
  project: ProjectData;
  relatedProjects: ProjectData[];
}) {
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);

  function nextSlide(e?: React.MouseEvent) {
    if (e) e.stopPropagation();
    if (galleryIndex !== null && project.images) {
      setGalleryIndex((galleryIndex + 1) % project.images.length);
    }
  }

  function prevSlide(e?: React.MouseEvent) {
    if (e) e.stopPropagation();
    if (galleryIndex !== null && project.images) {
      setGalleryIndex(galleryIndex === 0 ? project.images.length - 1 : galleryIndex - 1);
    }
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (galleryIndex === null) return;
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "Escape") setGalleryIndex(null);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [galleryIndex, project.images]);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
        <div className={cn("absolute inset-0 bg-linear-to-br", project.gradient)}>
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-10 left-10 w-64 h-64 border border-stone-900/5 rounded-full" />
            <div className="absolute -top-20 -right-20 w-96 h-96 border border-stone-900/5 rounded-full" />
            <div className="absolute bottom-20 left-1/3 w-48 h-48 border border-stone-900/5 rotate-45" />
            <div className="bg-[repeating-linear-gradient(0deg,transparent,transparent_40px,rgba(0,0,0,0.02)_40px,rgba(0,0,0,0.02)_41px),repeating-linear-gradient(90deg,transparent,transparent_40px,rgba(0,0,0,0.02)_40px,rgba(0,0,0,0.02)_41px)] absolute inset-0" />
          </div>
          <div className="absolute inset-0 bg-linear-to-t from-white via-transparent to-transparent" />
        </div>

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
          
          {/* Cover Image before Grid */}
          {project.coverImage && (
            <motion.div className="mb-12 rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img src={project.coverImage} alt={project.title} className="w-full h-auto max-h-[70vh] object-cover" />
            </motion.div>
          )}

          <div className="grid lg:grid-cols-3 gap-12 lg:gap-20">
            <div className="lg:col-span-2 space-y-10">
              <motion.div 
                className="prose prose-stone prose-lg max-w-none prose-headings:font-heading prose-headings:font-semibold prose-a:text-accent-500"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                dangerouslySetInnerHTML={{ __html: project.fullDescription }}
              />

              {project.results?.length > 0 && (
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
              {project.images?.length > 0 && (
                <motion.div className="space-y-4"
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h3 className="font-heading text-lg font-semibold text-stone-900">Galeri Project</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {project.images.map((img, i) => (
                      <div 
                        key={i} 
                        className="group relative aspect-video rounded-xl overflow-hidden bg-stone-50 cursor-pointer"
                        onClick={() => img.url && setGalleryIndex(i)}
                      >
                        {img.url ? (
                          <>
                            <img src={img.url} alt={img.caption} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <div className="bg-white/90 text-stone-900 p-2 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                <Maximize2 size={16} />
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="w-full h-full bg-linear-to-br from-accent-100 to-accent-50 flex items-center justify-center">
                            <p className="text-xs text-stone-400 italic px-4 text-center">{img.caption || "Ilustrasi"}</p>
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

              {project.results?.length > 0 && (
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
                  Project Serupa? Konsultasi
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {relatedProjects?.length > 0 && (
        <section className="py-16 lg:py-24 bg-cream">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.h2 className="heading-3 text-stone-900 mb-10"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            >Project Lainnya</motion.h2>
            <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.1 } }, hidden: {} }}
            >
              {relatedProjects.map((rp) => (
                <motion.div key={rp.slug}
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }}
                >
                  <Link href={`/portfolio/${rp.slug}`}
                    className="group block rounded-2xl overflow-hidden border border-stone-100 bg-white hover:shadow-lg transition-all duration-500 hover:-translate-y-1"
                  >
                    <div className="relative aspect-16/10 overflow-hidden">
                      {rp.coverImage ? (
                        <img src={rp.coverImage} alt={rp.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                      ) : (
                        <div className={cn("absolute inset-0 bg-linear-to-br transition-transform duration-700 group-hover:scale-105", rp.gradient)}>
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
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Lightbox Slider */}
      <AnimatePresence>
        {galleryIndex !== null && project.images && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-100 bg-black/90 flex items-center justify-center backdrop-blur-sm"
            onClick={() => setGalleryIndex(null)}
          >
            <button
              onClick={() => setGalleryIndex(null)}
              className="absolute top-6 right-6 p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
            >
              <X size={24} />
            </button>

            {project.images.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-6 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all hover:scale-110 z-10"
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-6 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all hover:scale-110 z-10"
                >
                  <ChevronRight size={28} />
                </button>
              </>
            )}

            <div className="relative w-full max-w-6xl max-h-[85vh] px-4 md:px-16 flex flex-col items-center justify-center pointer-events-none">
              <motion.img
                key={galleryIndex}
                src={project.images[galleryIndex].url || ""}
                alt={project.images[galleryIndex].caption || project.title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl pointer-events-auto cursor-grab"
                onClick={(e: any) => e.stopPropagation()}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.8}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = offset.x;
                  if (swipe < -50 || velocity.x < -500) {
                    nextSlide();
                  } else if (swipe > 50 || velocity.x > 500) {
                    prevSlide();
                  }
                }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              />
              {project.images[galleryIndex].caption && (
                <p className="text-white/80 mt-4 text-center text-sm bg-black/50 px-4 py-2 rounded-full pointer-events-auto">
                  {project.images[galleryIndex].caption}
                </p>
              )}
              <p className="text-white/50 text-xs mt-2 font-medium tracking-widest pointer-events-auto">
                {galleryIndex + 1} / {project.images.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
