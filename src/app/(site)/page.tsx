import type { Metadata } from "next";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Lifi Studio — Digital Agency | Web, Desain & Otomasi",
  description:
    "Web Development, UI/UX Design, Graphic Design, dan Automation Engineering. Satu studio, semua solusi digital. Dari Mojokerto untuk Indonesia.",
  openGraph: {
    title: "Lifi Studio — Digital Agency",
    description:
      "Web Development, UI/UX Design, Graphic Design, dan Automation Engineering — satu studio, semua solusi digital.",
  },
};

const faqItems = [
  {
    q: "Apa saja layanan yang ditawarkan Lifi Studio?",
    a: "Kami menawarkan 4 layanan utama: Web Development (WordPress, Next.js, Laravel), UI/UX Design (Figma, prototyping), Graphic Design (brand identity, logo), dan Automation Engineering (n8n, GHL, AI integration).",
  },
  {
    q: "Berapa lama waktu pengerjaan sebuah website?",
    a: "Tergantung kompleksitas. Website company profile biasanya 1-2 minggu, e-commerce 3-6 minggu, dan web application custom 4-12 minggu. Kami selalu memberikan timeline yang jelas di awal.",
  },
  {
    q: "Apakah Lifi Studio menerima project dari luar kota?",
    a: "Tentu! Kami berbasis di Mojokerto, Jawa Timur, tapi 90% klien kami dari luar kota. Semua koordinasi dilakukan secara online via WhatsApp, Zoom, atau Google Meet.",
  },
  {
    q: "Berapa biaya untuk membuat website?",
    a: "Biaya bervariasi tergantung kebutuhan. Mulai dari Rp1,5jt untuk landing page sederhana hingga Rp10jt+ untuk web app custom. Konsultasi awal gratis tanpa kewajiban.",
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([{ name: "Home", url: "/" }])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema(faqItems)),
        }}
      />
      <HomeClient faqItems={faqItems} />
    </>
  );
}
