import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogBySlug, getRelatedPosts } from "@/lib/actions";
import BlogDetailContent from "./blog-detail-content";

export const metadata: Metadata = {
  title: "Blog Detail",
  description: "Baca artikel lengkap dari Lifi Studio.",
};

const CATEGORY_STYLE: Record<string, { gradient: string; pattern: string }> = {
  "Web Development": { gradient: "from-accent-100 to-accent-50", pattern: "diagonal-lines" },
  "UI/UX": { gradient: "from-accent-200 to-accent-50", pattern: "grid" },
  "Graphic Design": { gradient: "from-stone-100 to-cream", pattern: "diagonal-lines" },
  Automation: { gradient: "from-stone-200 to-stone-100", pattern: "dots" },
};
const DEFAULT_STYLE = { gradient: "from-stone-100 to-cream", pattern: "grid" };

function formatDate(d: string | Date) {
  return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

function adaptPost(p: any) {
  const style = CATEGORY_STYLE[p.category] || DEFAULT_STYLE;
  return {
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    content: p.content,
    category: p.category,
    date: formatDate(p.publishedAt || p.createdAt),
    readTime: `${p.readTime} min`,
    author: p.author || "Lifi Studio",
    coverImage: p.coverImage || null,
    gradient: style.gradient,
    pattern: style.pattern,
    images: (p.images || []).map((url: string) => ({ url, caption: "" })),
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(slug, post.category, 3);

  const adapted = adaptPost(post);
  const adaptedRelated = related.map(adaptPost);

  return <BlogDetailContent post={adapted} relatedPosts={adaptedRelated} />;
}
