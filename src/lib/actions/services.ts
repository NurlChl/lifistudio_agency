"use server";

import { connectDB } from "@/lib/mongodb";
import { Service } from "@/lib/models";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

// Hot-reload trigger comment to clear mongoose cache

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized — login diperlukan");
}

export async function getServices(options?: { status?: string }) {
  try {
    await connectDB();
    const filter = options?.status ? { status: options.status } : {};
    const services = await Service.find(filter).sort({ sortOrder: 1 }).lean();
    return JSON.parse(JSON.stringify(services));
  } catch (e) {
    console.error("Failed to fetch services, returning fallback:", e);
    return [
      {
        number: "01",
        title: "Web Development",
        description: "WordPress, Next.js, Laravel, Vue.js development services. Solusi performa tinggi, SEO-friendly, dan scalable.",
        items: ["Landing Page & Company Profile", "E-commerce System", "SaaS & Web Application", "Custom Dashboard & CMS"],
        tech: ["React / Next.js", "PHP / Laravel", "WordPress", "Tailwind CSS"],
        status: "published"
      },
      {
        number: "02",
        title: "UI/UX Design",
        description: "Desain antarmuka modern, intuitif, berorientasi konversi, dan berpusat pada pengguna (user-centered design).",
        items: ["Figma Wireframing & Prototyping", "User Journey Mapping", "Design System Creation", "Responsive Web & App Design"],
        tech: ["Figma", "Adobe CC", "Miro"],
        status: "published"
      },
      {
        number: "03",
        title: "Graphic Design",
        description: "Identitas visual profesional untuk memperkuat brand positioning Anda di pasar digital maupun cetak.",
        items: ["Logo & Brand Identity", "Marketing Assets Design", "Social Media Templates", "Company Profile Design"],
        tech: ["Illustrator", "Photoshop", "Indesign"],
        status: "published"
      },
      {
        number: "04",
        title: "Automation Engineering",
        description: "Otomatisasi alur kerja (workflow automation) untuk menghemat waktu operasional dan mengurangi human-error.",
        items: ["API Integration", "n8n Workflow Design", "CRM & Lead Automation", "AI Agents Integration"],
        tech: ["n8n", "Make.com", "GoHighLevel", "OpenAI API"],
        status: "published"
      }
    ];
  }
}

export async function createService(data: {
  number: string;
  title: string;
  slug: string;
  description: string;
  items: string[];
  tech: string[];
  image?: string;
  sortOrder?: number;
  status?: "published" | "draft";
}) {
  await requireAdmin();
  await connectDB();
  const service = await Service.create(data);
  revalidatePath("/services");
  revalidatePath("/dashboard/services");
  return JSON.parse(JSON.stringify(service));
}

export async function updateService(id: string, data: Partial<{
  number: string;
  title: string;
  slug: string;
  description: string;
  items: string[];
  tech: string[];
  image: string;
  sortOrder: number;
  status: "published" | "draft";
}>) {
  await requireAdmin();
  await connectDB();
  const service = await Service.findByIdAndUpdate(id, data, { new: true });
  revalidatePath("/services");
  revalidatePath("/dashboard/services");
  return JSON.parse(JSON.stringify(service));
}

export async function deleteService(id: string) {
  await requireAdmin();
  await connectDB();
  await Service.findByIdAndDelete(id);
  revalidatePath("/services");
  revalidatePath("/dashboard/services");
}
