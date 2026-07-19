"use server";

import { connectDB } from "@/lib/mongodb";
import { Media } from "@/lib/models";
import { auth } from "@/lib/auth";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized — login diperlukan");
}

export async function uploadMedia(formData: FormData) {
  await requireAdmin();
  await connectDB();

  const file = formData.get("file") as File;
  if (!file) throw new Error("File is missing");

  const buffer = await file.arrayBuffer();
  const base64Image = Buffer.from(buffer).toString("base64");
  const dataURI = `data:${file.type};base64,${base64Image}`;

  const uploadResult = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      dataURI,
      { folder: "lifistudio_cms" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
  }) as any;

  const media = await Media.create({
    url: uploadResult.secure_url,
    public_id: uploadResult.public_id,
    filename: file.name,
    size: file.size,
    format: uploadResult.format,
  });

  return JSON.parse(JSON.stringify(media));
}

export async function getMedia(options?: { page?: number; limit?: number }) {
  await requireAdmin();
  await connectDB();
  const { page = 1, limit = 20 } = options || {};
  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    Media.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Media.countDocuments(),
  ]);

  return {
    items: JSON.parse(JSON.stringify(items)),
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}

export async function deleteMedia(id: string) {
  await requireAdmin();
  await connectDB();
  const media = await Media.findById(id);
  if (!media) throw new Error("Media not found");

  if (media.public_id) {
    await cloudinary.uploader.destroy(media.public_id);
  }

  await Media.findByIdAndDelete(id);
  return true;
}
