import mongoose, { Schema, Document } from "mongoose";

export interface ISiteSettings extends Document {
  siteName: string;
  siteDescription: string;
  logo?: string;
  favicon?: string;
  socialLinks: {
    instagram?: string;
    twitter?: string;
    github?: string;
    linkedin?: string;
    youtube?: string;
    tiktok?: string;
  };
  contactEmail: string;
  whatsappNumber: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    latitude: string;
    longitude: string;
    region: string;
    placename: string;
  };
  openingHours: string;
  priceRange: string;
  seo: {
    title?: string;
    description?: string;
    ogImage?: string;
    keywords?: string;
  };
  updatedAt: Date;
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    siteName: { type: String, default: "Lifi Studio" },
    siteDescription: { type: String, default: "Digital Agency" },
    logo: { type: String },
    favicon: { type: String },
    socialLinks: {
      instagram: { type: String, default: "https://instagram.com/lifistudio" },
      twitter: { type: String, default: "" },
      github: { type: String, default: "https://github.com/lifistudio" },
      linkedin: { type: String, default: "" },
      youtube: { type: String, default: "" },
      tiktok: { type: String, default: "" },
    },
    contactEmail: { type: String, default: "hello@lifistudio.com" },
    whatsappNumber: { type: String, default: "+6281234567890" },
    address: {
      streetAddress: { type: String, default: "Mojokerto City Center" },
      addressLocality: { type: String, default: "Mojokerto" },
      addressRegion: { type: String, default: "Jawa Timur" },
      postalCode: { type: String, default: "61311" },
      addressCountry: { type: String, default: "ID" },
    },
    geo: {
      latitude: { type: String, default: "-7.4705" },
      longitude: { type: String, default: "112.4401" },
      region: { type: String, default: "ID-JI" },
      placename: { type: String, default: "Mojokerto" },
    },
    openingHours: { type: String, default: "Sen - Sab, 08:00 - 17:00 WIB" },
    priceRange: { type: String, default: "$$" },
    seo: {
      title: { type: String, default: "Lifi Studio — Digital Agency" },
      description: { type: String, default: "Web Development, UI/UX Design, Graphic Design, dan Automation Engineering." },
      ogImage: { type: String, default: "/logo.png" },
      keywords: { type: String, default: "web development, UI/UX design, graphic design, automation, Mojokerto" },
    },
  },
  { timestamps: true }
);

if (process.env.NODE_ENV === "development") {
  delete mongoose.models.SiteSettings;
}

export const SiteSettings =
  mongoose.models.SiteSettings ||
  mongoose.model<ISiteSettings>("SiteSettings", SiteSettingsSchema);
