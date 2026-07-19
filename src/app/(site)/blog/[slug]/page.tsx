import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogBySlug, getRelatedPosts } from "@/lib/actions";
import BlogDetailContent from "./blog-detail-content";

import { getSiteUrl } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) return { title: "Blog Not Found" };

  const ogImage = post.coverImage || getSiteUrl("/og-default.png");

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Lifi Studio Blog`,
      description: post.excerpt,
      url: getSiteUrl(`/blog/${post.slug}`),
      siteName: "Lifi Studio",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Lifi Studio`,
      description: post.excerpt,
      images: [ogImage],
    },
  };
}

import { getCategories } from "@/lib/actions/categories";

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

function adaptPost(p: any, categoryName: string) {
  const style = CATEGORY_STYLE[categoryName] || DEFAULT_STYLE;
  return {
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    content: p.content,
    category: categoryName,
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
  
  const [post, categories] = await Promise.all([
    getBlogBySlug(slug),
    getCategories("blog")
  ]);
  
  if (!post) notFound();

  const related = await getRelatedPosts(slug, post.category, 3);
  
  const getCategoryName = (slug: string) => {
    const found = categories.find((c: any) => c.slug === slug);
    return found ? found.name : slug;
  };

  const adapted = adaptPost(post, getCategoryName(post.category));
  const adaptedRelated = related.map((r: any) => adaptPost(r, getCategoryName(r.category)));

  return <BlogDetailContent post={adapted} relatedPosts={adaptedRelated} />;
}
