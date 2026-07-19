export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";
import { getPortfolios } from "@/lib/actions";
import { getFaqs } from "@/lib/actions/faq";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Lifi Studio — Digital Agency | Web, Desain & Otomasi",
  description:
    "Web Development, UI/UX Design, Graphic Design, dan Automation Engineering. Satu studio, semua solusi digital. Dari Mojokerto untuk Indonesia.",
  openGraph: {
    title: "Lifi Studio — Digital Agency",
    description:
      "Web Development, UI/UX Design, Graphic Design, dan Automation Engineering — satu studio, semua solusi digital.",
  },
};

export default async function HomePage() {
  const [{ items: featured }, faqItems] = await Promise.all([
    getPortfolios({ status: "published", featured: true, limit: 3 }),
    getFaqs({ category: "umum" })
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([{ name: "Home", url: "/" }])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema(faqItems)),
        }}
      />
      <HomeClient faqItems={faqItems} featuredProjects={featured} />
    </>
  );
}
