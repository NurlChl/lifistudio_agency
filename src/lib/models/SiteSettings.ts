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
  seo: {
    title?: string;
    description?: string;
    ogImage?: string;
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
      instagram: { type: String },
      twitter: { type: String },
      github: { type: String },
      linkedin: { type: String },
      youtube: { type: String },
      tiktok: { type: String },
    },
    contactEmail: { type: String },
    whatsappNumber: { type: String },
    seo: {
      title: { type: String },
      description: { type: String },
      ogImage: { type: String },
    },
  },
  { timestamps: true }
);

export const SiteSettings =
  mongoose.models.SiteSettings ||
  mongoose.model<ISiteSettings>("SiteSettings", SiteSettingsSchema);
