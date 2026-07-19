import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPortfolioBySlug, getPortfolios } from "@/lib/actions";
import PortfolioDetailContent from "./portfolio-detail-content";

import { getSiteUrl } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPortfolioBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  const categoryLabel = CATEGORY_LABEL[project.category] || project.category;
  const ogImage = project.coverImage || getSiteUrl("/og-default.png");

  return {
    title: `${project.title} - ${categoryLabel}`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Lifi Studio Portfolio`,
      description: project.description,
      url: getSiteUrl(`/portfolio/${project.slug}`),
      siteName: "Lifi Studio",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Lifi Studio`,
      description: project.description,
      images: [ogImage],
    },
  };
}

const CATEGORY_LABEL: Record<string, string> = {
  web: "Web Development", uiux: "UI/UX Design", graphic: "Graphic Design", automation: "Automation",
};
const CATEGORY_STYLE: Record<string, string> = {
  web: "from-stone-100 to-stone-50",
  uiux: "from-accent-100 to-accent-50",
  graphic: "from-accent-200 to-accent-100",
  automation: "from-stone-200 to-cream",
};

function adaptProject(p: any) {
  return {
    title: p.title,
    slug: p.slug,
    category: CATEGORY_LABEL[p.category] || p.category,
    description: p.description,
    fullDescription: p.fullDescription || p.description,
    tech: p.technologies || [],
    results: p.results || [],
    gradient: CATEGORY_STYLE[p.category] || "from-stone-100 to-stone-50",
    testimonial: p.testimonial || null,
    coverImage: p.coverImage || null,
    images: (p.images || []).map((url: string) => ({ url, caption: "" })),
  };
}

export default async function PortfolioDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getPortfolioBySlug(slug);
  if (!project) notFound();

  // Related projects (same category, excluding current)
  const { items: related } = await getPortfolios({
    category: project.category,
    status: "published",
    limit: 3,
  });

  const adapted = adaptProject(project);
  const adaptedRelated = related
    .filter((r: any) => r.slug !== slug)
    .slice(0, 3)
    .map(adaptProject);

  return <PortfolioDetailContent project={adapted} relatedProjects={adaptedRelated} />;
}
