import type { Metadata } from "next";
import { getBlogs } from "@/lib/actions";
import { getCategories } from "@/lib/actions/categories";
import BlogContent from "./blog-content";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artikel dan insight seputar web development, desain, dan automation dari Lifi Studio.",
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function BlogPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const page = typeof searchParams.page === "string" ? parseInt(searchParams.page, 10) : 1;
  const category = typeof searchParams.category === "string" ? searchParams.category : "All";
  
  const [blogsResponse, catsResponse] = await Promise.all([
    getBlogs({ status: "published", page, limit: 9, category: category !== "All" ? category : undefined }),
    getCategories("blog")
  ]);

  return <BlogContent 
    posts={blogsResponse.items} 
    categories={catsResponse} 
    activeCategory={category} 
    totalPages={blogsResponse.totalPages}
  />;
}
