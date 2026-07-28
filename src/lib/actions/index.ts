"use server";

import { connectDB } from "@/lib/mongodb";
import { auth } from "@/lib/auth";
import { Blog, Portfolio, Contact, Pricing, SiteSettings, User } from "@/lib/models";
import { revalidatePath } from "next/cache";
import { slugify } from "@/lib/utils";
import bcrypt from "bcryptjs";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized — login diperlukan");
}

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
    Blog.find(filter).sort({ publishedAt: -1, createdAt: -1 }).skip(skip).limit(limit).lean(),
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

export async function getBlogById(id: string) {
  await connectDB();
  const post = await Blog.findById(id).lean();
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

async function generateUniqueSlug(Model: any, baseSlug: string, excludeId?: string) {
  let slug = baseSlug;
  let counter = 1;
  while (true) {
    const query: any = { slug };
    if (excludeId) query._id = { $ne: excludeId };
    const exists = await Model.findOne(query).select("_id").lean();
    if (!exists) return slug;
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
}

export async function createBlog(data: {
  title: string;
  content: string;
  excerpt?: string;
  category: string;
  coverImage?: string;
  slug?: string;
  author?: string;
  status?: "published" | "draft";
}) {
  await requireAdmin();
  const slug = await generateUniqueSlug(Blog, data.slug || slugify(data.title));
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
  title: string; slug: string; content: string; excerpt: string; category: string;
  coverImage: string; tags: string[]; status: "published" | "draft";
}>) {
  await requireAdmin();
  const update: any = { ...data };
  if (data.slug) {
    update.slug = await generateUniqueSlug(Blog, data.slug, id);
  } else if (data.title && !update.slug) {
    update.slug = await generateUniqueSlug(Blog, slugify(data.title), id);
  }
  if (data.status === "published") update.publishedAt = new Date();
  const post = await Blog.findByIdAndUpdate(id, update, { new: true });
  revalidatePath("/blog");
  revalidatePath("/dashboard/blog");
  return JSON.parse(JSON.stringify(post));
}

export async function deleteBlog(id: string) {
  await requireAdmin();
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

export async function getPortfolioById(id: string) {
  await connectDB();
  const project = await Portfolio.findById(id).lean();
  if (!project) return null;
  return JSON.parse(JSON.stringify(project));
}

export async function createPortfolio(data: {
  title: string; slug?: string; description: string; fullDescription?: string;
  category: string;
  technologies: string[]; coverImage: string; images?: string[];
  liveUrl?: string; clientName?: string; featured?: boolean;
  results?: { metric: string; value: string }[];
  testimonial?: { text: string; client: string; role?: string };
}) {
  await requireAdmin();
  const slug = await generateUniqueSlug(Portfolio, data.slug || slugify(data.title));
  const project = await Portfolio.create({ ...data, slug });
  revalidatePath("/portfolio");
  revalidatePath("/dashboard/portfolio");
  return JSON.parse(JSON.stringify(project));
}

export async function updatePortfolio(id: string, data: Partial<{
  title: string; slug: string; description: string; fullDescription: string;
  category: string; technologies: string[]; coverImage: string;
  images: string[]; liveUrl: string; clientName: string;
  featured: boolean; status: string;
  results: { metric: string; value: string }[];
  testimonial: { text: string; client: string; role?: string };
}>) {
  await requireAdmin();
  const update: any = { ...data };
  if (data.slug) {
    update.slug = await generateUniqueSlug(Portfolio, data.slug, id);
  } else if (data.title && !update.slug) {
    update.slug = await generateUniqueSlug(Portfolio, slugify(data.title), id);
  }
  const project = await Portfolio.findByIdAndUpdate(id, update, { new: true });
  revalidatePath("/portfolio");
  revalidatePath("/dashboard/portfolio");
  return JSON.parse(JSON.stringify(project));
}

export async function deletePortfolio(id: string) {
  await requireAdmin();
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
  await requireAdmin();
  await Contact.findByIdAndUpdate(id, { isRead: true });
  revalidatePath("/dashboard/contacts");
}

export async function deleteContact(id: string) {
  await requireAdmin();
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
  await requireAdmin();
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
  await requireAdmin();
  const item = await Pricing.findByIdAndUpdate(id, data, { new: true });
  revalidatePath("/pricing");
  revalidatePath("/dashboard");
  return JSON.parse(JSON.stringify(item));
}

export async function deletePricing(id: string) {
  await requireAdmin();
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
  await requireAdmin();
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
  await requireAdmin();
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
  await requireAdmin();
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
    { category: "web", name: "Landing Page", tagline: "Website 1 halaman premium", price: "1,5", unit: "jt", description: "Landing page profesional yang bikin pengunjung langsung tertarik — cocok buat campaign, product launch, atau personal branding.", features: ["Hadir online dalam hitungan hari — pake Next.js atau WordPress", "Tampil sempurna di HP, tablet, dan laptop (responsive)", "Dioptimasi biar gampang ditemukan di Google (SEO)", "Form kontak siap terima leads langsung", "Support penuh 1 bulan setelah launching"], recommended: false, sortOrder: 1 },
    { category: "web", name: "Company Profile", tagline: "Website bisnis profesional", price: "3,5", unit: "jt", description: "Website multi-halaman yang bikin bisnis kamu keliatan kredibel — company profile, portfolio, blog, semua dalam satu tempat.", features: ["Tampil profesional dengan desain premium", "Bisa dikelola sendiri — ada admin panel CMS", "SEO + schema markup biar gampang dicari", "Loading cepat, nggak bikin pengunjung kabur", "Bantuan hosting + domain setup", "1 bulan garansi support"], recommended: true, sortOrder: 2 },
    { category: "web", name: "E-Commerce", tagline: "Toko online siap jualan", price: "7", unit: "jt", description: "Toko online custom yang beneran bisa ngatur produk, terima pembayaran, dan lacak pesanan — semua dari satu dashboard.", features: ["Kelola produk dengan mudah — tambah, edit, atur stok", "Terima pembayaran via berbagai metode (transfer, QR, kartu)", "Hitung ongkir otomatis — integrasi ekspedisi", "Pantau pesanan real-time dari dashboard admin", "Buat akun buat staff dengan hak akses beda", "2 bulan garansi support"], recommended: false, sortOrder: 3 },
    { category: "web", name: "Web App Custom", tagline: "Aplikasi sesuai kebutuhan", price: "10", unit: "jt+", description: "Aplikasi web yang dibangun dari awal sesuai kebutuhan spesifik bisnis kamu — scalable, aman, dan siap dipake.", features: ["Dibangun dari nol — sesuai flow bisnis kamu", "Database yang aman & terstruktur", "Siap diintegrasi dengan sistem lain via API", "Dashboard real-time biar kamu selalu tau kondisi bisnis", "Sistem login & hak akses pengguna", "3 bulan garansi support"], recommended: false, sortOrder: 4 },
    // UI/UX packages
    { category: "uiux", name: "UI Design", tagline: "Desain landing page atau app", price: "2", unit: "jt", description: "High-fidelity UI design yang bikin produk kamu keliatan profesional — landing page, aplikasi, atau website, siap di-code.", features: ["Pertama kita bikin wireframe & sitemap — biar flow-nya jelas", "Desain hi-fi di Figma — keliatan persis kayak hasil jadi", "Di-desain buat HP, tablet, dan laptop (responsive)", "Ada component library — coding jadi lebih cepet", "1x revisi major, sisanya minor"], recommended: false, sortOrder: 1 },
    { category: "uiux", name: "UI/UX Full Package", tagline: "End-to-end desain experience", price: "4", unit: "jt", description: "Dari riset sampai handoff — product experience yang beneran dipikirkan, bukan cuma cantik.", features: ["Riset user dulu — biar desainnya sesuai kebutuhan real", "Wireframe & flow — pastikan interaksi lancar", "Desain hi-fi yang siap diimplementasi", "Design system — komponen konsisten buat seluruh produk", "Uji coba usability — cari masalah sebelum launch", "3x revisi major"], recommended: true, sortOrder: 2 },
    { category: "uiux", name: "Design System", tagline: "Sistem desain siap pakai", price: "6", unit: "jt", description: "Design system lengkap yang bikin tim develop 2x lebih cepet — plus produk keliatan konsisten dari halaman pertama sampai terakhir.", features: ["Design tokens — warna, spacing, typography yang terstandarisasi", "Component library — tinggal pake, nggak perlu desain ulang", "Dokumentasi lengkap — tim baru tinggal baca", "Handoff Figma → code yang rapi", "Brand guidelines — biar semua orang satu suara"], recommended: false, sortOrder: 3 },
    // Graphic Design packages
    { category: "graphic", name: "Logo & Brand Identity", tagline: "Identitas brand yang kuat", price: "1,5", unit: "jt", description: "Logo, warna, dan identitas visual yang bikin brand kamu gak keliatan abal-abal — dari konsep sampai file siap pake.", features: ["Logo — 3 konsep pilihan, revisi sampe pas", "Palet warna yang cocok sama karakter brand kamu", "Pemilihan typography yang konsisten", "Brand guidelines — biar desain tetap konsisten kemanapun", "Source file (AI/PSD/PNG/SVG)"], recommended: true, sortOrder: 1 },
    { category: "graphic", name: "Social Media Kit", tagline: "Template sosial media", price: "1", unit: "jt", description: "Template feed, story, dan cover yang bikin sosial media bisnis kamu keliatan profesional — tinggal isi konten.", features: ["5 set template feed Instagram yang beda", "5 set template story yang menarik", "Cover designs untuk highlight atau playlist", "Ilustrasi custom — beda dari template pasaran", "Source file — edit sendiri kapan aja"], recommended: false, sortOrder: 2 },
    { category: "graphic", name: "Brand Full Package", tagline: "Brand identity komprehensif", price: "3", unit: "jt", description: "Brand identity lengkap — dari logo, kartu nama, sampai konten sosial media — semua konsisten dan siap dipake.", features: ["Logo lengkap + alternatif layout", "Kartu nama digital + siap cetak", "Template feed & story Instagram", "Materi marketing (brosur, flyer, presentasi)", "Brand guidelines lengkap"], recommended: false, sortOrder: 3 },
    // Automation packages
    { category: "automation", name: "Workflow Setup", tagline: "Otomatis workflow dasar", price: "2", unit: "jt", description: "Bikin proses bisnis rutin kamu jalan otomatis — dari form sampe follow-up, tanpa ribet ngetik manual tiap hari.", features: ["Audit workflow — cari bagian mana yang bisa diotomatisasi", "Setup & konfigurasi n8n di server kamu", "2 workflow automation langsung jalan", "Integrasi dengan tools yang kamu pake (Google Sheet, Email, dll)", "1 bulan pantau & optimasi"], recommended: false, sortOrder: 1 },
    { category: "automation", name: "CRM + Automation", tagline: "CRM & lead management", price: "4", unit: "jt", description: "CRM lengkap dengan automation — dari lead masuk, follow-up otomatis via WA/email, sampai laporan closing — semua otomatis.", features: ["Setup GHL / CRM pilihan kamu", "n8n workflow yang menghubungkan CRM dengan tools lain", "Follow-up otomatis via WhatsApp — nggak ada lead kelewat", "Email automation untuk nurture campaign", "Lead scoring — tau mana leads yang panas", "2 bulan garansi support"], recommended: true, sortOrder: 2 },
    { category: "automation", name: "Enterprise Suite", tagline: "Otomatisasi skala besar", price: "8", unit: "jt+", description: "Enterprise-grade automation yang nyambungin banyak sistem sekaligus — plus AI integration buat decision otomatis.", features: ["Audit workflow skala enterprise — banyak sistem, banyak tim", "Integrasi multi-platform (CRM, ERP, marketplace, payment)", "AI integration — pake GPT buat klasifikasi, summarise, reply", "Custom dashboard — tau semua status dari satu tempat", "Pelatihan tim — biar mereka bisa maintain sendiri", "3 bulan garansi support"], recommended: false, sortOrder: 3 },
  ];

  await Pricing.insertMany(defaults);
  revalidatePath("/pricing");
  return { seeded: true, count: defaults.length };
}

/* ─────────── FAQ ACTIONS ─────────── */

import * as faqActions from "./faq";

export async function getFaqs(options?: { category?: "umum" | "harga" }) {
  return faqActions.getFaqs(options);
}
export async function createFaq(data: { question: string; answer: string; category: "umum" | "harga"; sortOrder?: number }) {
  return faqActions.createFaq(data);
}
export async function updateFaq(id: string, data: any) {
  return faqActions.updateFaq(id, data);
}
export async function deleteFaq(id: string) {
  return faqActions.deleteFaq(id);
}

/* ─────────── SETTINGS ACTIONS ─────────── */

import * as settingsActions from "./settings";

export async function getSiteSettings() {
  return settingsActions.getSiteSettings();
}
export async function updateSiteSettings(data: any) {
  return settingsActions.updateSiteSettings(data);
}
