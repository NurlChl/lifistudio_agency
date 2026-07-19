import type { Metadata } from "next";
import BlogDetailContent from "./blog-detail-content";

export const metadata: Metadata = {
  title: "Blog Detail",
  description: "Baca artikel lengkap dari Lifi Studio.",
};

export default function BlogDetailPage() {
  return <BlogDetailContent />;
}
