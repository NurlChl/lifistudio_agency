#!/usr/bin/env node
import mongoose from 'mongoose';
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

// Load MONGODB_URI from .env.local — no dotenv dep
const envRaw = readFileSync(resolve(root, '.env.local'), 'utf-8');
const match = envRaw.match(/^MONGODB_URI=(.+)$/m);
if (!match) throw new Error('MONGODB_URI not found in .env.local');
const MONGODB_URI = match[1];

// Mongoose schemas — minimal, matches TS models
const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  coverImage: String,
  category: { type: String, required: true },
  tags: [String],
  author: { type: String, default: 'Lifi Studio' },
  publishedAt: Date,
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  readTime: { type: Number, default: 5 },
}, { timestamps: true });

const PortfolioSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  fullDescription: String,
  category: { type: String, required: true },
  technologies: [String],
  images: [String],
  coverImage: { type: String, required: true },
  liveUrl: String,
  clientName: String,
  projectDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
  featured: { type: Boolean, default: false },
  testimonial: {
    text: String,
    client: String,
    role: String,
  },
  results: [{ metric: String, value: String }],
}, { timestamps: true });

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
const Portfolio = mongoose.models.Portfolio || mongoose.model('Portfolio', PortfolioSchema);

// Load content from JSON files
const contentDir = resolve(root, 'content');

function loadJSON(relPath) {
  const p = resolve(contentDir, relPath);
  return existsSync(p) ? JSON.parse(readFileSync(p, 'utf-8')) : [];
}

async function push() {
  await mongoose.connect(MONGODB_URI);
  console.log(`🔌 Connected to MongoDB\n`);

  const posts = loadJSON('blog/posts.json');
  let n = 0;
  for (const post of posts) {
    await Blog.findOneAndUpdate(
      { slug: post.slug },
      { $set: { ...post, _id: undefined, createdAt: undefined, updatedAt: undefined, __v: undefined } },
      { upsert: true }
    );
    n++;
  }
  if (n) console.log(`  📝 Blog: ${n} posts synced`);

  const items = loadJSON('portfolio/items.json');
  let m = 0;
  for (const item of items) {
    await Portfolio.findOneAndUpdate(
      { slug: item.slug },
      { $set: { ...item, _id: undefined, createdAt: undefined, updatedAt: undefined, __v: undefined } },
      { upsert: true }
    );
    m++;
  }
  if (m) console.log(`  🖼️  Portfolio: ${m} items synced`);

  const total = n + m;
  if (!total) console.log('  (no content files found)');

  console.log(`\n✅ Done — ${total} items`);
  await mongoose.disconnect();
}

push().catch(e => { console.error(e); process.exit(1); });
