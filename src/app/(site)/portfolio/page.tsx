import type { Metadata } from "next";
import PortfolioContent from "./portfolio-content";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Lihat project-project yang telah kami kerjakan.",
};

export default function PortfolioPage() {
  return <PortfolioContent />;
}
