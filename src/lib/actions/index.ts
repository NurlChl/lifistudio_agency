"use server";

import { connectDB } from "@/lib/mongodb";
import { Blog, Portfolio, Contact, Pricing, SiteSettings, User } from "@/lib/models";
import { revalidatePath } from "next/cache";
import { slugify } from "@/lib/utils";
import bcrypt from "bcryptjs";

/* ─────────── BLOG ACTIONS ─────────── */

export async function getBlogs(options?: {
  status?: string;
  category?: string;
  page?: number;
  limit?: number;
}) {
  await connectDB();
  const { status, category, page = 1, limit = 20 } = options || {};
  const filter: Record<string, unknown> = {};
  if (status) filter.status = status;
  if (category && category !== "all") filter.category = category;

  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    Blog.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Blog.countDocuments(filter),
  ]);
  return { items: JSON.parse(JSON.stringify(items)), total, page, totalPages: Math.ceil(total / limit) };
}

export async function getBlogBySlug(slug: string) {
  await connectDB();
  const post = await Blog.findOne({ slug, status: "published" }).lean();
  if (!post) return null;
  return JSON.parse(JSON.stringify(post));
}

export async function getRelatedPosts(slug: string, category: string, limit = 3) {
  await connectDB();
  const posts = await Blog.find({
    slug: { $ne: slug },
    status: "published",
    ...(category ? { category } : {}),
  })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
  return JSON.parse(JSON.stringify(posts));
}

export async function createBlog(data: {
  title: string;
  content: string;
  excerpt?: string;
  category: string;
  coverImage?: string;
  tags?: string[];
  author?: string;
  status?: "published" | "draft";
}) {
  await connectDB();
  const slug = slugify(data.title);
  const post = await Blog.create({
    ...data,
    slug,
    excerpt: data.excerpt || data.content.slice(0, 160),
    readTime: Math.max(1, Math.ceil(data.content.split(/\s+/).length / 200)),
    publishedAt: data.status === "published" ? new Date() : undefined,
  });
  revalidatePath("/blog");
  revalidatePath("/dashboard/blog");
  return JSON.parse(JSON.stringify(post));
}

export async function updateBlog(id: string, data: Partial<{
  title: string; content: string; excerpt: string; category: string;
  coverImage: string; tags: string[]; status: "published" | "draft";
}>) {
  await connectDB();
  const update: any = { ...data };
  if (data.title) update.slug = slugify(data.title);
  if (data.status === "published") update.publishedAt = new Date();
  const post = await Blog.findByIdAndUpdate(id, update, { new: true });
  revalidatePath("/blog");
  revalidatePath("/dashboard/blog");
  return JSON.parse(JSON.stringify(post));
}

export async function deleteBlog(id: string) {
  await connectDB();
  await Blog.findByIdAndDelete(id);
  revalidatePath("/blog");
  revalidatePath("/dashboard/blog");
}

/* ─────────── PORTFOLIO ACTIONS ─────────── */

export async function getPortfolios(options?: {
  category?: string;
  status?: string;
  featured?: boolean;
  page?: number;
  limit?: number;
}) {
  await connectDB();
  const { category, status, featured, page = 1, limit = 20 } = options || {};
  const filter: Record<string, unknown> = {};
  if (category && category !== "all") filter.category = category;
  if (status) filter.status = status;
  if (featured) filter.featured = true;

  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    Portfolio.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Portfolio.countDocuments(filter),
  ]);
  return { items: JSON.parse(JSON.stringify(items)), total, page, totalPages: Math.ceil(total / limit) };
}

export async function getPortfolioBySlug(slug: string) {
  await connectDB();
  const project = await Portfolio.findOne({ slug, status: "published" }).lean();
  if (!project) return null;
  return JSON.parse(JSON.stringify(project));
}

export async function createPortfolio(data: {
  title: string; description: string; fullDescription?: string;
  category: "web" | "uiux" | "graphic" | "automation";
  technologies: string[]; coverImage: string; images?: string[];
  liveUrl?: string; clientName?: string; featured?: boolean;
  results?: { metric: string; value: string }[];
  testimonial?: { text: string; client: string; role?: string };
}) {
  await connectDB();
  const slug = slugify(data.title);
  const project = await Portfolio.create({ ...data, slug });
  revalidatePath("/portfolio");
  revalidatePath("/dashboard/portfolio");
  return JSON.parse(JSON.stringify(project));
}

export async function updatePortfolio(id: string, data: Partial<{
  title: string; description: string; fullDescription: string;
  category: string; technologies: string[]; coverImage: string;
  images: string[]; liveUrl: string; clientName: string;
  featured: boolean; status: string;
  results: { metric: string; value: string }[];
  testimonial: { text: string; client: string; role?: string };
}>) {
  await connectDB();
  const update: any = { ...data };
  if (data.title) update.slug = slugify(data.title);
  const project = await Portfolio.findByIdAndUpdate(id, update, { new: true });
  revalidatePath("/portfolio");
  revalidatePath("/dashboard/portfolio");
  return JSON.parse(JSON.stringify(project));
}

export async function deletePortfolio(id: string) {
  await connectDB();
  await Portfolio.findByIdAndDelete(id);
  revalidatePath("/portfolio");
  revalidatePath("/dashboard/portfolio");
}

/* ─────────── CONTACT ACTIONS ─────────── */

export async function getContacts(options?: { isRead?: boolean; page?: number; limit?: number }) {
  await connectDB();
  const { isRead, page = 1, limit = 50 } = options || {};
  const filter: Record<string, unknown> = {};
  if (isRead !== undefined) filter.isRead = isRead;

  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    Contact.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Contact.countDocuments(filter),
  ]);
  return { items: JSON.parse(JSON.stringify(items)), total, page, totalPages: Math.ceil(total / limit) };
}

export async function markContactRead(id: string) {
  await connectDB();
  await Contact.findByIdAndUpdate(id, { isRead: true });
  revalidatePath("/dashboard/contacts");
}

export async function deleteContact(id: string) {
  await connectDB();
  await Contact.findByIdAndDelete(id);
  revalidatePath("/dashboard/contacts");
}

/* ─────────── PRICING ACTIONS ─────────── */

export async function getPricingByCategory(category: string) {
  await connectDB();
  const items = await Pricing.find({ category })
    .sort({ sortOrder: 1 })
    .lean();
  return JSON.parse(JSON.stringify(items));
}

export async function getAllPricing() {
  await connectDB();
  const items = await Pricing.find().sort({ category: 1, sortOrder: 1 }).lean();
  return JSON.parse(JSON.stringify(items));
}

export async function createPricing(data: {
  category: "web" | "uiux" | "graphic" | "automation";
  name: string; tagline: string; price: string; unit: string;
  description: string; features: string[]; recommended?: boolean;
  sortOrder?: number;
}) {
  await connectDB();
  const item = await Pricing.create(data);
  revalidatePath("/pricing");
  revalidatePath("/dashboard");
  return JSON.parse(JSON.stringify(item));
}

export async function updatePricing(id: string, data: Partial<{
  name: string; tagline: string; price: string; unit: string;
  description: string; features: string[]; recommended: boolean;
  category: string; sortOrder: number;
}>) {
  await connectDB();
  const item = await Pricing.findByIdAndUpdate(id, data, { new: true });
  revalidatePath("/pricing");
  revalidatePath("/dashboard");
  return JSON.parse(JSON.stringify(item));
}

export async function deletePricing(id: string) {
  await connectDB();
  await Pricing.findByIdAndDelete(id);
  revalidatePath("/pricing");
  revalidatePath("/dashboard");
}

/* ─────────── DASHBOARD STATS ─────────── */

export async function getDashboardStats() {
  await connectDB();
  const [totalPortfolio, totalBlog, totalContacts, unreadContacts] = await Promise.all([
    Portfolio.countDocuments({ status: "published" }),
    Blog.countDocuments({ status: "published" }),
    Contact.countDocuments(),
    Contact.countDocuments({ isRead: false }),
  ]);
  return { totalPortfolio, totalBlog, totalContacts, unreadContacts };
}

/* ─────────── USER ACTIONS ─────────── */

export async function getUsers() {
  await connectDB();
  const users = await User.find()
    .select("-password -verificationToken -emailChangeToken -newEmail -resetPasswordToken -resetPasswordExpires")
    .sort({ createdAt: -1 })
    .lean();
  return JSON.parse(JSON.stringify(users));
}

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
  role?: "superadmin" | "admin";
}) {
  await connectDB();
  const hashedPassword = await bcrypt.hash(data.password, 12);
  const user = await User.create({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    role: data.role || "admin",
    isVerified: true,
  });
  const { password, ...safe } = user.toObject();
  revalidatePath("/dashboard/users");
  return JSON.parse(JSON.stringify(safe));
}

export async function updateUser(id: string, data: Partial<{
  name: string;
  email: string;
  password: string;
  role: "superadmin" | "admin";
}>) {
  await connectDB();
  const update: any = { ...data };
  if (data.password) {
    update.password = await bcrypt.hash(data.password, 12);
  } else {
    delete update.password;
  }
  const user = await User.findByIdAndUpdate(id, update, { new: true })
    .select("-password -verificationToken -emailChangeToken -newEmail -resetPasswordToken -resetPasswordExpires");
  revalidatePath("/dashboard/users");
  return JSON.parse(JSON.stringify(user));
}

export async function deleteUser(id: string) {
  await connectDB();
  await User.findByIdAndDelete(id);
  revalidatePath("/dashboard/users");
}

/* ─────────── SEED DEFAULT PRICING ─────────── */

export async function seedDefaultPricing() {
  await connectDB();
  const existing = await Pricing.countDocuments();
  if (existing > 0) return { seeded: false, message: "Pricing data exists" };

  const defaults = [
    // Web Development packages
    { category: "web", name: "Landing Page", tagline: "Website 1 halaman premium", price: "1,5", unit: "jt", description: "Landing page profesional untuk campaign, product launch, atau personal branding.", features: ["Next.js / WordPress", "Responsive design", "SEO optimized", "Kontak form", "1 bulan support"], recommended: false, sortOrder: 1 },
    { category: "web", name: "Company Profile", tagline: "Website bisnis profesional", price: "3,5", unit: "jt", description: "Website multi-halaman untuk bisnis — company profile, portfolio, blog.", features: ["Next.js / WordPress", "Responsive semua device", "SEO + schema markup", "Admin panel CMS", "Hosting setup", "1 bulan support"], recommended: true, sortOrder: 2 },
    { category: "web", name: "E-Commerce", tagline: "Toko online siap jualan", price: "7", unit: "jt", description: "E-commerce custom dengan manajemen produk, payment gateway, dan dashboard.", features: ["Manajemen produk", "Payment gateway", "Integrasi expedisi", "Dashboard admin", "Multi-role user", "2 bulan support"], recommended: false, sortOrder: 3 },
    { category: "web", name: "Web App Custom", tagline: "Aplikasi sesuai kebutuhan", price: "10", unit: "jt+", description: "Aplikasi web custom dengan fitur kompleks dan arsitektur scalable.", features: ["Full-stack development", "Database design", "REST API", "Dashboard real-time", "Authentication", "3 bulan support"], recommended: false, sortOrder: 4 },
    // UI/UX packages
    { category: "uiux", name: "UI Design", tagline: "Desain landing page atau app", price: "2", unit: "jt", description: "High-fidelity UI design untuk landing page, aplikasi, atau website.", features: ["Wireframe & sitemap", "Hi-fi prototype (Figma)", "Responsive design", "Component library", "1x revisi major"], recommended: false, sortOrder: 1 },
    { category: "uiux", name: "UI/UX Full Package", tagline: "End-to-end desain experience", price: "4", unit: "jt", description: "User research, wireframe, prototype, design system, sampai handoff siap code.", features: ["User research", "Wireframe & flow", "Hi-fi prototype", "Design system", "Usability testing", "3x revisi major"], recommended: true, sortOrder: 2 },
    { category: "uiux", name: "Design System", tagline: "Sistem desain siap pakai", price: "6", unit: "jt", description: "Design system lengkap untuk product digital dengan dokumentasi dan component library.", features: ["Design tokens", "Component library", "Documentation", "Figma + code handoff", "Brand guidelines"], recommended: false, sortOrder: 3 },
    // Graphic Design packages
    { category: "graphic", name: "Logo & Brand Identity", tagline: "Identitas brand yang kuat", price: "1,5", unit: "jt", description: "Logo, color palette, typography, dan brand guidelines.", features: ["Logo (3 konsep)", "Color palette", "Typography", "Brand guidelines", "Source file"], recommended: true, sortOrder: 1 },
    { category: "graphic", name: "Social Media Kit", tagline: "Template sosial media", price: "1", unit: "jt", description: "Template feed, story, dan cover untuk sosial media bisnis kamu.", features: ["Feed templates (5 set)", "Story templates (5 set)", "Cover designs", "Custom illustrations", "Source file"], recommended: false, sortOrder: 2 },
    { category: "graphic", name: "Brand Full Package", tagline: "Brand identity komprehensif", price: "3", unit: "jt", description: "Complete brand identity — dari logo sampai marketing collateral.", features: ["Logo & identity", "Business card", "Social media kit", "Marketing collateral", "Brand guidelines"], recommended: false, sortOrder: 3 },
    // Automation packages
    { category: "automation", name: "Workflow Setup", tagline: "Otomatis workflow dasar", price: "2", unit: "jt", description: "Setup workflow automation dengan n8n untuk proses bisnis rutin.", features: ["Workflow audit", "n8n setup & config", "2 workflow automation", "Integrasi standar", "1 bulan monitoring"], recommended: false, sortOrder: 1 },
    { category: "automation", name: "CRM + Automation", tagline: "CRM & lead management", price: "4", unit: "jt", description: "Full CRM setup dengan automation — capture lead sampai follow-up otomatis.", features: ["GHL / CRM setup", "n8n workflow", "WhatsApp integration", "Email automation", "Lead scoring", "2 bulan support"], recommended: true, sortOrder: 2 },
    { category: "automation", name: "Enterprise Suite", tagline: "Otomatisasi skala besar", price: "8", unit: "jt+", description: "Enterprise-grade automation dengan multi-system integration dan AI.", features: ["Full workflow audit", "Multi-platform integrasi", "AI integration (GPT)", "Custom dashboard", "Team training", "3 bulan support"], recommended: false, sortOrder: 3 },
  ];

  await Pricing.insertMany(defaults);
  revalidatePath("/pricing");
  return { seeded: true, count: defaults.length };
}
