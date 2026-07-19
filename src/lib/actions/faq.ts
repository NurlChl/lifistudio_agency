"use server";

import { connectDB } from "@/lib/mongodb";
import { Faq } from "@/lib/models";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized — login diperlukan");
}

export async function getFaqs(options?: { category?: "umum" | "harga" }) {
  try {
    await connectDB();
    
    const count = await Faq.countDocuments();
    if (count === 0) {
      const defaults = [
        { question: "Apa saja layanan yang ditawarkan Lifi Studio?", answer: "Kami menawarkan 4 layanan utama: Web Development (WordPress, Next.js, Laravel), UI/UX Design (Figma, prototyping), Graphic Design (brand identity, logo), dan Automation Engineering (n8n, GHL, AI integration).", category: "umum", sortOrder: 1 },
        { question: "Berapa lama waktu pengerjaan sebuah website?", answer: "Tergantung kompleksitas. Website company profile biasanya 1-2 minggu, e-commerce 3-6 minggu, dan web application custom 4-12 minggu. Kami selalu memberikan timeline yang jelas di awal.", category: "umum", sortOrder: 2 },
        { question: "Apakah Lifi Studio menerima project dari luar kota?", answer: "Tentu! Kami berbasis di Mojokerto, Jawa Timur, tapi 90% klien kami dari luar kota. Semua koordinasi dilakukan secara online via WhatsApp, Zoom, atau Google Meet.", category: "umum", sortOrder: 3 },
        { question: "Berapa biaya untuk membuat website?", answer: "Biaya bervariasi tergantung kebutuhan. Mulai dari Rp1,5jt untuk landing page sederhana hingga Rp10jt+ untuk web app custom. Konsultasi awal gratis tanpa kewajiban.", category: "umum", sortOrder: 4 },
        { question: "Apakah harga di atas sudah termasuk domain & hosting?", answer: "Harga di atas adalah biaya jasa pembuatan/pengembangan. Domain, hosting/ server tidak termasuk dan akan disesuaikan dengan kebutuhan project. Kami bisa bantu setup-kan dengan harga terbaik.", category: "harga", sortOrder: 1 },
        { question: "Bagaimana sistem pembayarannya?", answer: "Pembayaran dilakukan 2-3 tahap tergantung skala project: 50% DP di awal, 25% setelah progress 50%, 25% setelah selesai dan approval. Untuk project kecil bisa 50% DP + 50% pelunasan.", category: "harga", sortOrder: 2 },
        { question: "Ada garansi kalau websitenya error?", answer: "Ya! Kami memberikan garansi 1 bulan gratis setelah launch untuk perbaikan bug dan support teknis. Untuk maintenance lanjutan tersedia paket bulanan.", category: "harga", sortOrder: 3 },
        { question: "Apakah boleh minta revisi?", answer: "Tentu. Setiap paket sudah termasuk alokasi revisi. Revisi tambahan di luar alokasi akan dikenakan biaya sesuai kesepakatan.", category: "harga", sortOrder: 4 },
      ];
      await Faq.insertMany(defaults);
    }

    const filter = options?.category ? { category: options.category } : {};
    const faqs = await Faq.find(filter).sort({ sortOrder: 1, createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(faqs));
  } catch (e) {
    console.error("Failed to fetch FAQs, returning fallback:", e);
    const defaults = [
      { question: "Apa saja layanan yang ditawarkan Lifi Studio?", answer: "Kami menawarkan 4 layanan utama: Web Development (WordPress, Next.js, Laravel), UI/UX Design (Figma, prototyping), Graphic Design (brand identity, logo), dan Automation Engineering (n8n, GHL, AI integration).", category: "umum", sortOrder: 1 },
      { question: "Berapa lama waktu pengerjaan sebuah website?", answer: "Tergantung kompleksitas. Website company profile biasanya 1-2 minggu, e-commerce 3-6 minggu, dan web application custom 4-12 minggu. Kami selalu memberikan timeline yang jelas di awal.", category: "umum", sortOrder: 2 },
      { question: "Apakah Lifi Studio menerima project dari luar kota?", answer: "Tentu! Kami berbasis di Mojokerto, Jawa Timur, tapi 90% klien kami dari luar kota. Semua koordinasi dilakukan secara online via WhatsApp, Zoom, atau Google Meet.", category: "umum", sortOrder: 3 },
      { question: "Berapa biaya untuk membuat website?", answer: "Biaya bervariasi tergantung kebutuhan. Mulai dari Rp1,5jt untuk landing page sederhana hingga Rp10jt+ untuk web app custom. Konsultasi awal gratis tanpa kewajiban.", category: "umum", sortOrder: 4 },
      { question: "Apakah harga di atas sudah termasuk domain & hosting?", answer: "Harga di atas adalah biaya jasa pembuatan/pengembangan. Domain, hosting/ server tidak termasuk dan akan disesuaikan dengan kebutuhan project. Kami bisa bantu setup-kan dengan harga terbaik.", category: "harga", sortOrder: 1 },
      { question: "Bagaimana sistem pembayarannya?", answer: "Pembayaran dilakukan 2-3 tahap tergantung skala project: 50% DP di awal, 25% setelah progress 50%, 25% setelah selesai dan approval. Untuk project kecil bisa 50% DP + 50% pelunasan.", category: "harga", sortOrder: 2 },
      { question: "Ada garansi kalau websitenya error?", answer: "Ya! Kami memberikan garansi 1 bulan gratis setelah launch untuk perbaikan bug dan support teknis. Untuk maintenance lanjutan tersedia paket bulanan.", category: "harga", sortOrder: 3 },
      { question: "Apakah boleh minta revisi?", answer: "Tentu. Setiap paket sudah termasuk alokasi revisi. Revisi tambahan di luar alokasi akan dikenakan biaya sesuai kesepakatan.", category: "harga", sortOrder: 4 },
    ];
    if (options?.category) {
      return defaults.filter(f => f.category === options.category);
    }
    return defaults;
  }
}

export async function createFaq(data: {
  question: string;
  answer: string;
  category: "umum" | "harga";
  sortOrder?: number;
}) {
  await requireAdmin();
  await connectDB();
  const faq = await Faq.create(data);
  revalidatePath("/");
  revalidatePath("/pricing");
  revalidatePath("/dashboard/faq");
  return JSON.parse(JSON.stringify(faq));
}

export async function updateFaq(id: string, data: Partial<{
  question: string;
  answer: string;
  category: "umum" | "harga";
  sortOrder: number;
}>) {
  await requireAdmin();
  await connectDB();
  const faq = await Faq.findByIdAndUpdate(id, data, { new: true });
  revalidatePath("/");
  revalidatePath("/pricing");
  revalidatePath("/dashboard/faq");
  return JSON.parse(JSON.stringify(faq));
}

export async function deleteFaq(id: string) {
  await requireAdmin();
  await connectDB();
  await Faq.findByIdAndDelete(id);
  revalidatePath("/");
  revalidatePath("/pricing");
  revalidatePath("/dashboard/faq");
}
