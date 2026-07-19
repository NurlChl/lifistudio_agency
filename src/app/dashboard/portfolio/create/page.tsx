"use client";

import PortfolioForm from "@/components/dashboard/PortfolioForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CreatePortfolioPage() {
  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <Link href="/dashboard/portfolio" className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 hover:text-stone-900 mb-4 transition-colors">
          <ArrowLeft size={16} /> Back to Portfolio
        </Link>
        <h1 className="font-heading text-2xl font-semibold text-stone-900">Create Portfolio</h1>
        <p className="text-sm text-stone-400 mt-1">Add a new project to your portfolio</p>
      </div>

      <PortfolioForm />
    </div>
  );
}
