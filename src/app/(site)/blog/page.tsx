import type { Metadata } from "next";
import BlogContent from "./blog-content";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artikel dan insight seputar web development, desain, dan automation dari Lifi Studio.",
};

export default function BlogPage() {
  return <BlogContent />;
}
