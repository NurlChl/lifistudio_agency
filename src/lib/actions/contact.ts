"use server";

import { connectDB } from "@/lib/mongodb";
import { Contact } from "@/lib/models/Contact";
import { headers } from "next/headers";

// Simple in-memory rate limiter (per IP)
const rateLimit = new Map<string, { count: number; reset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 3; // 3 submissions per minute

function sanitize(str: string): string {
  return str
    .replace(/<[^>]*>/g, "") // Strip HTML tags
    .replace(/[<>"'\\]/g, "") // Strip dangerous chars
    .trim();
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone: string): boolean {
  return /^[\d\s+\-()]{7,20}$/.test(phone);
}

export async function sendContact(formData: FormData) {
  // Rate limiting
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "unknown";
  const now = Date.now();

  const entry = rateLimit.get(ip);
  if (entry && now < entry.reset) {
    if (entry.count >= RATE_LIMIT_MAX) {
      throw new Error("Terlalu banyak permintaan. Silakan coba lagi dalam 1 menit.");
    }
    entry.count++;
  } else {
    rateLimit.set(ip, { count: 1, reset: now + RATE_LIMIT_WINDOW });
  }

  // Extract & sanitize
  const name = sanitize(formData.get("name") as string);
  const email = sanitize(formData.get("email") as string);
  const phone = sanitize(formData.get("phone") as string || "");
  const service = sanitize(formData.get("service") as string || "");
  const message = sanitize(formData.get("message") as string);

  // Validate required fields
  if (!name || name.length < 2 || name.length > 100) {
    throw new Error("Nama harus diisi (2-100 karakter)");
  }
  if (!email || !validateEmail(email)) {
    throw new Error("Email tidak valid");
  }
  if (phone && !validatePhone(phone)) {
    throw new Error("Nomor telepon tidak valid");
  }
  if (!message || message.length < 10 || message.length > 5000) {
    throw new Error("Pesan harus diisi (10-5000 karakter)");
  }

  await connectDB();

  await Contact.create({
    name,
    email,
    phone: phone || undefined,
    service: service || undefined,
    message,
  });
}
