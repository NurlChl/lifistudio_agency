import type { Metadata } from "next";
import { getBlogs } from "@/lib/actions";
import BlogContent from "./blog-content";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artikel dan insight seputar web development, desain, dan automation dari Lifi Studio.",
};

export default async function BlogPage() {
  const { items } = await getBlogs({ status: "published" });
  return <BlogContent posts={items} />;
}
