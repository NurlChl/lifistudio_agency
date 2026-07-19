import mongoose from 'mongoose';
import { Category } from './src/lib/models/Category';
import { Service } from './src/lib/models/Service';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is missing");
}

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

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI as string);
    console.log("Connected to DB");

    // Seed Categories
    for (const cat of [...blogCats, ...portfolioCats]) {
      const exists = await Category.findOne({ slug: cat.slug, type: cat.type });
      if (!exists) {
        await Category.create(cat);
        console.log(`Created category: ${cat.name} (${cat.type})`);
      } else {
        console.log(`Category exists: ${cat.name} (${cat.type})`);
      }
    }

    // Seed Services
    for (const srv of services) {
      const exists = await Service.findOne({ slug: srv.slug });
      if (!exists) {
        await Service.create(srv);
        console.log(`Created service: ${srv.title}`);
      } else {
        console.log(`Service exists: ${srv.title}`);
      }
    }

    console.log("Seeding complete!");
  } catch (err) {
    console.error("Error seeding:", err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();
