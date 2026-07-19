"use client";

import BlogForm from "@/components/dashboard/BlogForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CreateBlogPage() {
  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <Link href="/dashboard/blog" className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 hover:text-stone-900 mb-4 transition-colors">
          <ArrowLeft size={16} /> Back to Blog
        </Link>
        <h1 className="font-heading text-2xl font-semibold text-stone-900">Create Post</h1>
        <p className="text-sm text-stone-400 mt-1">Write a new article for your blog</p>
      </div>

      <BlogForm />
    </div>
  );
}
