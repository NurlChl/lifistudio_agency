import mongoose, { Schema, Document } from "mongoose";

export interface IMedia extends Document {
  url: string;
  public_id?: string;
  filename: string;
  size?: number;
  format?: string;
  createdAt: Date;
  updatedAt: Date;
}

const MediaSchema = new Schema<IMedia>(
  {
    url: { type: String, required: true },
    public_id: { type: String },
    filename: { type: String, required: true },
    size: { type: Number },
    format: { type: String },
  },
  { timestamps: true }
);

MediaSchema.index({ createdAt: -1 });

export const Media =
  mongoose.models.Media || mongoose.model<IMedia>("Media", MediaSchema);
