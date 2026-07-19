"use server";

import { connectDB } from "@/lib/mongodb";
import { Category } from "@/lib/models";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized — login diperlukan");
}

export async function getCategories(type?: "blog" | "portfolio" | "pricing") {
  await connectDB();
  const filter = type ? { type } : {};
  const categories = await Category.find(filter).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(categories));
}

export async function createCategory(data: { name: string; slug: string; type: "blog" | "portfolio" | "pricing"; description?: string }) {
  await requireAdmin();
  await connectDB();
  const category = await Category.create(data);
  revalidatePath("/dashboard/categories");
  return JSON.parse(JSON.stringify(category));
}

export async function updateCategory(id: string, data: Partial<{ name: string; slug: string; description: string }>) {
  await requireAdmin();
  await connectDB();
  const category = await Category.findByIdAndUpdate(id, data, { new: true });
  revalidatePath("/dashboard/categories");
  return JSON.parse(JSON.stringify(category));
}

export async function deleteCategory(id: string) {
  await requireAdmin();
  await connectDB();
  await Category.findByIdAndDelete(id);
  revalidatePath("/dashboard/categories");
}
