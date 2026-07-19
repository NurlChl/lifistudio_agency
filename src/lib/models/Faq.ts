import mongoose, { Schema, Document } from "mongoose";

export interface IFaq extends Document {
  question: string;
  answer: string;
  category: "umum" | "harga";
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const FaqSchema = new Schema<IFaq>(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    category: { type: String, enum: ["umum", "harga"], default: "umum", required: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

FaqSchema.index({ category: 1, sortOrder: 1 });

if (process.env.NODE_ENV === "development") {
  delete mongoose.models.Faq;
}

export const Faq = mongoose.models.Faq || mongoose.model<IFaq>("Faq", FaqSchema);
