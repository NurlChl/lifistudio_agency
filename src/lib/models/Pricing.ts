import mongoose, { Schema, Document } from "mongoose";

export interface IPricing extends Document {
  category: string;
  name: string;
  tagline: string;
  price: string;
  unit: string;
  description: string;
  features: string[];
  recommended: boolean;
  cta: string;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const PricingSchema = new Schema<IPricing>(
  {
    category: {
      type: String,
      required: true,
    },
    name: { type: String, required: true },
    tagline: { type: String },
    price: { type: String, required: true },
    unit: { type: String, default: "jt" },
    description: { type: String, required: true },
    features: [{ type: String }],
    recommended: { type: Boolean, default: false },
    cta: { type: String, default: "Konsultasi Gratis" },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

PricingSchema.index({ category: 1, sortOrder: 1 });

export const Pricing =
  mongoose.models.Pricing || mongoose.model<IPricing>("Pricing", PricingSchema);
