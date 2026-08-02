"use server";

import { connectDB } from "@/lib/mongodb";
import { auth } from "@/lib/auth";
import { ApiToken, generateApiToken } from "@/lib/models/ApiToken";
import { revalidatePath } from "next/cache";

async function requireSuperadmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "superadmin") {
    throw new Error("Unauthorized — superadmin only");
  }
}

export async function getTokens() {
  await requireSuperadmin();
  await connectDB();
  const tokens = await ApiToken.find()
    .sort({ createdAt: -1 })
    .select("name prefix permissions active lastUsedAt createdAt")
    .lean();
  return JSON.parse(JSON.stringify(tokens));
}

export async function createToken(name: string) {
  await requireSuperadmin();
  if (!name?.trim()) throw new Error("Nama token wajib diisi");

  await connectDB();

  const { raw, hashed, prefix } = generateApiToken();

  await ApiToken.create({
    name: name.trim(),
    token: hashed,
    prefix,
    permissions: ["*"],
    active: true,
    createdBy: (await auth())?.user?.id,
  });

  revalidatePath("/dashboard/api-tokens");

  // Return raw token ONLY on creation
  return { raw, prefix, name: name.trim() };
}

export async function toggleToken(id: string) {
  await requireSuperadmin();
  await connectDB();

  const token = await ApiToken.findById(id);
  if (!token) throw new Error("Token tidak ditemukan");

  token.active = !token.active;
  await token.save();

  revalidatePath("/dashboard/api-tokens");
  return { active: token.active };
}

export async function deleteToken(id: string) {
  await requireSuperadmin();
  await connectDB();

  await ApiToken.findByIdAndDelete(id);
  revalidatePath("/dashboard/api-tokens");
}
