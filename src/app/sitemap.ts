import { MetadataRoute } from "next";
import { connectDB } from "@/lib/mongodb";
import { Portfolio, Blog } from "@/lib/models";
import { getSiteUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();

  // Fetch blogs
  let blogs: any[] = [];
  try {
    await connectDB();
    blogs = await Blog.find({ status: "published" }).select("slug updatedAt").lean();
  } catch (e) {
    console.error("Failed to fetch blogs for sitemap", e);
  }

  // Fetch portfolios
  let portfolios: any[] = [];
  try {
    portfolios = await Portfolio.find({ status: "published" }).select("slug updatedAt").lean();
  } catch (e) {
    console.error("Failed to fetch portfolios for sitemap", e);
  }

  const staticPages = [
    "",
    "/services",
    "/portfolio",
    "/blog",
    "/about",
    "/contact",
    "/pricing",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const blogPages = blogs.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const portfolioPages = portfolios.map((project) => ({
    url: `${baseUrl}/portfolio/${project.slug}`,
    lastModified: project.updatedAt ? new Date(project.updatedAt) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages, ...portfolioPages];
}
