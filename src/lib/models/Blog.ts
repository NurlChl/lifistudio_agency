import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt?: Date;
  status: "published" | "draft";
  readTime: number;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String },
    category: { type: String, required: true },
    tags: [{ type: String }],
    author: { type: String, default: "Lifi Studio" },
    publishedAt: { type: Date },
    status: {
      type: String,
      enum: ["published", "draft"],
      default: "draft",
    },
    readTime: { type: Number, default: 5 },
  },
  { timestamps: true }
);

BlogSchema.index({ slug: 1, status: 1 });
BlogSchema.index({ category: 1, tags: 1 });

export const Blog =
  mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);
