"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  if (totalPages <= 1) return null;

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      {currentPage > 1 ? (
        <Link
          href={createPageUrl(currentPage - 1)}
          className="p-2 rounded-lg border border-stone-200 text-stone-500 hover:bg-stone-50 transition-all"
        >
          <ChevronLeft size={20} />
        </Link>
      ) : (
        <div className="p-2 rounded-lg border border-stone-100 text-stone-300 cursor-not-allowed">
          <ChevronLeft size={20} />
        </div>
      )}

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={createPageUrl(page)}
          className={`w-10 h-10 flex items-center justify-center rounded-lg border font-medium text-sm transition-all ${
            currentPage === page
              ? "bg-stone-900 border-stone-900 text-white"
              : "border-stone-200 text-stone-500 hover:bg-stone-50"
          }`}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages ? (
        <Link
          href={createPageUrl(currentPage + 1)}
          className="p-2 rounded-lg border border-stone-200 text-stone-500 hover:bg-stone-50 transition-all"
        >
          <ChevronRight size={20} />
        </Link>
      ) : (
        <div className="p-2 rounded-lg border border-stone-100 text-stone-300 cursor-not-allowed">
          <ChevronRight size={20} />
        </div>
      )}
    </div>
  );
}
