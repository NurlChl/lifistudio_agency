import mongoose, { Schema, Document } from "mongoose";

export interface IPortfolio extends Document {
  title: string;
  slug: string;
  description: string;
  fullDescription?: string;
  category: string;
  technologies: string[];
  images: string[];
  coverImage: string;
  liveUrl?: string;
  clientName?: string;
  projectDate: Date;
  status: "published" | "draft" | "archived";
  featured: boolean;
  testimonial?: {
    text: string;
    client: string;
    role?: string;
  };
  results?: {
    metric: string;
    value: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const PortfolioSchema = new Schema<IPortfolio>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    fullDescription: { type: String },
    category: {
      type: String,
      required: true,
    },
    technologies: [{ type: String }],
    images: [{ type: String }],
    coverImage: { type: String, required: true },
    liveUrl: { type: String },
    clientName: { type: String },
    projectDate: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["published", "draft", "archived"],
      default: "draft",
    },
    featured: { type: Boolean, default: false },
    testimonial: {
      text: { type: String },
      client: { type: String },
      role: { type: String },
    },
    results: [
      {
        metric: { type: String },
        value: { type: String },
      },
    ],
  },
  { timestamps: true }
);

PortfolioSchema.index({ category: 1, status: 1, featured: 1 });

export const Portfolio =
  mongoose.models.Portfolio ||
  mongoose.model<IPortfolio>("Portfolio", PortfolioSchema);
