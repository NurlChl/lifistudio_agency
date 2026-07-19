import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  type: "blog" | "portfolio" | "pricing";
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    type: { type: String, enum: ["blog", "portfolio", "pricing"], required: true },
    description: { type: String },
  },
  { timestamps: true }
);

CategorySchema.index({ type: 1, slug: 1 }, { unique: true });

export const Category =
  mongoose.models.Category || mongoose.model<ICategory>("Category", CategorySchema);
