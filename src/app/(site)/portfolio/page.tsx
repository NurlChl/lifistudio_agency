import type { Metadata } from "next";
import { getPortfolios } from "@/lib/actions";
import { getCategories } from "@/lib/actions/categories";
import PortfolioContent from "./portfolio-content";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Lihat project-project yang telah kami kerjakan.",
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function PortfolioPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const page = typeof searchParams.page === "string" ? parseInt(searchParams.page, 10) : 1;
  const category = typeof searchParams.category === "string" ? searchParams.category : "All";

  const [portfolioResponse, catsResponse] = await Promise.all([
    getPortfolios({ status: "published", page, limit: 9, category: category !== "All" ? category : undefined }),
    getCategories("portfolio")
  ]);

  return <PortfolioContent 
    projects={portfolioResponse.items}
    categories={catsResponse}
    activeCategory={category}
    totalPages={portfolioResponse.totalPages}
  />;
}
