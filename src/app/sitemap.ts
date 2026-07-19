import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://lifistudio.com";

  const staticPages = [
    { url: baseUrl, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/about`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/services`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/portfolio`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/blog`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/contact`, priority: 0.7, changeFrequency: "monthly" as const },
  ];

  // Portfolio pages
  const portfolioSlugs = [
    "toko-online", "sicantik-app", "warung-digital",
    "nusantara-brand", "autolead-crm", "kopi-kita",
  ];
  const portfolioPages = portfolioSlugs.map((slug) => ({
    url: `${baseUrl}/portfolio/${slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  // Blog posts
  const blogSlugs = [
    "memilih-tech-stack-2026", "otomatisasi-crm-n8n",
    "tips-desain-website-profesional", "brand-identity-umkm",
    "nextjs-vs-wordpress-2026",
  ];
  const blogPages = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    priority: 0.6,
    changeFrequency: "monthly" as const,
  }));

  return [...staticPages, ...portfolioPages, ...blogPages];
}
