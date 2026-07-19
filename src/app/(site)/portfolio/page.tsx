import type { Metadata } from "next";
import { getPortfolios } from "@/lib/actions";
import PortfolioContent from "./portfolio-content";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Lihat project-project yang telah kami kerjakan.",
};

export default async function PortfolioPage() {
  const { items } = await getPortfolios({ status: "published" });
  return <PortfolioContent projects={items} />;
}
