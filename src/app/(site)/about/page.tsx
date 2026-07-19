import type { Metadata } from "next";
import AboutClient from "./about-client";

export const metadata: Metadata = {
  title: "About",
  description: "Kenali Lifi Studio — digital agency dari Mojokerto, Jawa Timur. Web development, UI/UX design, graphic design, dan automation.",
};

export default function AboutPage() {
  return <AboutClient />;
}
