import { NextResponse } from 'next/server';
import { Category } from '@/lib/models/Category';
import { Service } from '@/lib/models/Service';
import { Blog } from '@/lib/models/Blog';
import { Portfolio } from '@/lib/models/Portfolio';
import { Pricing } from '@/lib/models/Pricing';
import { connectDB } from '@/lib/mongodb';

const blogCats = [
  { name: "Web Development", slug: "web-development", type: "blog" },
  { name: "UI/UX", slug: "ui-ux", type: "blog" },
  { name: "Graphic Design", slug: "graphic-design", type: "blog" },
  { name: "Automation", slug: "automation", type: "blog" }
];

const portfolioCats = [
  { name: "Web Development", slug: "web", type: "portfolio" },
  { name: "UI/UX Design", slug: "uiux", type: "portfolio" },
  { name: "Graphic Design", slug: "graphic", type: "portfolio" },
  { name: "Automation", slug: "automation", type: "portfolio" }
];

const pricingCats = [
  { name: "Web Development", slug: "web", type: "pricing" },
  { name: "UI/UX Design", slug: "uiux", type: "pricing" },
  { name: "Graphic Design", slug: "graphic", type: "pricing" },
  { name: "Automation", slug: "automation", type: "pricing" }
];

const services = [
  {
    number: "01",
    title: "Web Development",
    slug: "web-development",
    description: "Pembuatan website company profile, landing page, hingga web app kompleks (Next.js, Laravel).",
    items: ["Company Profile Website", "Landing Page", "Custom Web Application", "CMS Dashboard"],
    tech: ["Next.js", "React", "Laravel", "TailwindCSS"],
    status: "published",
    sortOrder: 1
  },
  {
    number: "02",
    title: "UI/UX Design",
    slug: "ui-ux-design",
    description: "Desain antarmuka modern dan responsif yang berfokus pada user experience premium.",
    items: ["Wireframing & Prototyping", "Design System", "Website UI Design", "Mobile App UI"],
    tech: ["Figma", "Framer", "Adobe XD"],
    status: "published",
    sortOrder: 2
  },
  {
    number: "03",
    title: "Graphic Design",
    slug: "graphic-design",
    description: "Desain visual untuk kebutuhan branding, media sosial, dan materi pemasaran.",
    items: ["Brand Identity", "Social Media Templates", "Print Design"],
    tech: ["Photoshop", "Illustrator"],
    status: "published",
    sortOrder: 3
  },
  {
    number: "04",
    title: "Automation",
    slug: "automation",
    description: "Otomatisasi alur kerja bisnis menggunakan n8n, Zapier, dan AI integrations.",
    items: ["Workflow Automation", "CRM Integration", "AI Chatbot", "Marketing Automation"],
    tech: ["n8n", "Zapier", "GoHighLevel"],
    status: "published",
    sortOrder: 4
  }
];

export async function GET() {
  try {
    await connectDB();
    const results = [];

    // Seed Categories
    for (const cat of [...blogCats, ...portfolioCats, ...pricingCats]) {
      const exists = await Category.findOne({ slug: cat.slug, type: cat.type });
      if (!exists) {
        await Category.create(cat);
        results.push(`Created category: ${cat.name} (${cat.type})`);
      } else {
        results.push(`Category exists: ${cat.name} (${cat.type})`);
      }
    }

    // Default category assignment for items without categories
    const blogRes = await Blog.updateMany({ $or: [{ category: null }, { category: "" }] }, { $set: { category: "web-development" } });
    if (blogRes.modifiedCount > 0) results.push(`Assigned default category to ${blogRes.modifiedCount} blogs`);

    const portRes = await Portfolio.updateMany({ $or: [{ category: null }, { category: "" }] }, { $set: { category: "web" } });
    if (portRes.modifiedCount > 0) results.push(`Assigned default category to ${portRes.modifiedCount} portfolios`);

    const priceRes = await Pricing.updateMany({ $or: [{ category: null }, { category: "" }] }, { $set: { category: "web" } });
    if (priceRes.modifiedCount > 0) results.push(`Assigned default category to ${priceRes.modifiedCount} pricing packages`);

    // Seed Services
    for (const srv of services) {
      const exists = await Service.findOne({ slug: srv.slug });
      if (!exists) {
        await Service.create(srv);
        results.push(`Created service: ${srv.title}`);
      } else {
        results.push(`Service exists: ${srv.title}`);
      }
    }

    return NextResponse.json({ success: true, results });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
