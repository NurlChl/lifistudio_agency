"use client";

import { useEffect, useState, use } from "react";
import PortfolioForm from "@/components/dashboard/PortfolioForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getPortfolioById } from "@/lib/actions";

export default function EditPortfolioPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const portfolio = await getPortfolioById(unwrappedParams.id);
      setData(portfolio);
      setLoading(false);
    }
    load();
  }, [unwrappedParams.id]);

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <Link href="/dashboard/portfolio" className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 hover:text-stone-900 mb-4 transition-colors">
          <ArrowLeft size={16} /> Back to Portfolio
        </Link>
        <h1 className="font-heading text-2xl font-semibold text-stone-900">Edit Portfolio</h1>
        <p className="text-sm text-stone-400 mt-1">Update your project details</p>
      </div>

      {loading ? (
        <div className="space-y-4 max-w-4xl mx-auto">
          <div className="h-12 bg-stone-50 rounded-xl animate-pulse" />
          <div className="h-32 bg-stone-50 rounded-xl animate-pulse" />
          <div className="h-12 bg-stone-50 rounded-xl animate-pulse" />
        </div>
      ) : data ? (
        <PortfolioForm initialData={data} />
      ) : (
        <div className="text-center text-stone-400 py-20">Project not found</div>
      )}
    </div>
  );
}
