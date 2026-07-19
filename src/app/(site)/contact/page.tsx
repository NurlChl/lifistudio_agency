"use client";

import type { Metadata } from "next";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { sendContact } from "@/lib/actions/contact";
import { toast } from "react-hot-toast";

const services = [
  "Web Development",
  "UI/UX Design",
  "Graphic Design",
  "Automation",
  "Lainnya",
];

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      const form = e.currentTarget;
      const data = new FormData(form);
      await sendContact(data);
      toast.success("Pesan berhasil dikirim! Kami akan menghubungi kamu segera.");
      form.reset();
    } catch {
      toast.error("Gagal mengirim pesan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-500 mb-4">
            Contact
          </p>
          <h1 className="heading-1 text-stone-900 mb-6">
            Let&apos;s Talk
          </h1>
          <p className="subtitle text-stone-500 max-w-xl">
            Punya project atau ide? Diskusikan gratis — tanpa kewajiban. Cukup
            isi form atau chat langsung via WhatsApp.
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-stone-700 mb-2"
                  >
                    Nama <span className="text-accent-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-stone-200 bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all text-sm"
                    placeholder="Nama lengkap"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-stone-700 mb-2"
                  >
                    Email <span className="text-accent-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-stone-200 bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all text-sm"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-stone-700 mb-2"
                  >
                    No. WhatsApp
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 rounded-lg border border-stone-200 bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all text-sm"
                    placeholder="+62 812-xxxx-xxxx"
                  />
                </div>
                <div>
                  <label
                    htmlFor="service"
                    className="block text-sm font-medium text-stone-700 mb-2"
                  >
                    Layanan yang Dibutuhkan
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="w-full px-4 py-3 rounded-lg border border-stone-200 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all text-sm"
                  >
                    <option value="">Pilih layanan</option>
                    {services.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-stone-700 mb-2"
                >
                  Pesan <span className="text-accent-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-stone-200 bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all text-sm resize-none"
                  placeholder="Ceritakan project atau ide kamu..."
                />
              </div>

              <Button type="submit" size="lg" loading={loading}>
                Kirim Pesan
              </Button>
            </form>

            {/* Info */}
            <div className="space-y-10">
              <div>
                <h3 className="font-heading text-lg font-semibold text-stone-900 mb-4">
                  Lebih Cepat via WhatsApp
                </h3>
                <p className="text-sm text-stone-500 mb-4">
                  Respon lebih cepat — chat langsung ke WhatsApp kami.
                </p>
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#25D366] text-white text-sm font-semibold hover:bg-[#20BD5A] transition-all duration-300"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat WhatsApp
                </a>
              </div>

              <div className="pt-8 border-t border-stone-100">
                <h3 className="font-heading text-lg font-semibold text-stone-900 mb-4">
                  Info Kontak
                </h3>
                <div className="space-y-4 text-sm text-stone-500">
                  <p>
                    <strong className="text-stone-700">Email:</strong>{" "}
                    hello@lifistudio.com
                  </p>
                  <p>
                    <strong className="text-stone-700">Location:</strong>{" "}
                    Mojokerto, Jawa Timur, Indonesia
                  </p>
                  <p>
                    <strong className="text-stone-700">Jam Kerja:</strong>{" "}
                    Sen - Sab, 08:00 - 17:00 WIB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
