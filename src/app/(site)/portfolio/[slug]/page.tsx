import type { Metadata } from "next";
import PortfolioDetailContent from "./portfolio-detail-content";

export const metadata: Metadata = {
  title: "Portfolio Detail",
  description: "Detail project dari Lifi Studio.",
};

export default function PortfolioDetailPage() {
  return <PortfolioDetailContent />;
}
