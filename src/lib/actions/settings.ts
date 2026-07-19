"use server";

import { connectDB } from "@/lib/mongodb";
import { SiteSettings } from "@/lib/models/SiteSettings";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized — login diperlukan");
}

export async function getSiteSettings() {
  try {
    await connectDB();
    let settings = await SiteSettings.findOne().lean();
    if (!settings) {
      // Create default settings document
      const created = await SiteSettings.create({});
      settings = await SiteSettings.findById(created._id).lean();
    }
    return JSON.parse(JSON.stringify(settings));
  } catch (e) {
    console.error("Failed to fetch settings from DB, returning defaults:", e);
    return {
      siteName: "Lifi Studio",
      siteDescription: "Web Development, UI/UX Design, Graphic Design, dan Automation Engineering — satu studio, semua solusi digital.",
      contactEmail: "hello@lifistudio.com",
      whatsappNumber: "+6281234567890",
      openingHours: "Sen - Sab, 08:00 - 17:00 WIB",
      priceRange: "$$",
      address: {
        streetAddress: "Mojokerto City Center",
        addressLocality: "Mojokerto",
        addressRegion: "Jawa Timur",
        postalCode: "61311",
        addressCountry: "ID",
      },
      geo: {
        latitude: "-7.4705",
        longitude: "112.4401",
        region: "ID-JI",
        placename: "Mojokerto",
      },
      socialLinks: {
        instagram: "https://instagram.com/lifistudio",
        github: "https://github.com/lifistudio",
      },
      seo: {
        title: "Lifi Studio — Digital Agency | Web, Desain & Otomasi",
        description: "Web Development, UI/UX Design, Graphic Design, dan Automation Engineering.",
        keywords: "web development, UI/UX design, graphic design, automation, Mojokerto",
      }
    };
  }
}

export async function updateSiteSettings(data: any) {
  await requireAdmin();
  await connectDB();
  
  let settings = await SiteSettings.findOne();
  if (!settings) {
    settings = await SiteSettings.create(data);
  } else {
    // Update existing document
    Object.assign(settings, data);
    await settings.save();
  }
  
  // Revalidate public pages to reflect new settings
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/services");
  revalidatePath("/pricing");
  revalidatePath("/contact");
  
  return JSON.parse(JSON.stringify(settings));
}
