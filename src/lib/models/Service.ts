import mongoose, { Schema, Document } from "mongoose";

export interface IService extends Document {
  number: string;
  title: string;
  slug: string;
  description: string;
  items: string[];
  tech: string[];
  image?: string;
  sortOrder: number;
  status: "published" | "draft";
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    number: { type: String, required: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    items: [{ type: String }],
    tech: [{ type: String }],
    image: { type: String, default: "" },
    sortOrder: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["published", "draft"],
      default: "draft",
    },
  },
  { timestamps: true }
);

ServiceSchema.index({ sortOrder: 1 });

if (process.env.NODE_ENV === "development") {
  delete mongoose.models.Service;
}

export const Service =
  mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);
