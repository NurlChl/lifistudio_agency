import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/actions";
import { getSiteUrl } from "@/lib/utils";
import ContactClient from "./contact-client";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const description = "Diskusikan project web development, desain grafis, UI/UX, atau otomatisasi secara gratis dengan Lifi Studio Mojokerto.";

  return {
    title: "Contact",
    description,
    openGraph: {
      title: `Contact Us | ${settings?.siteName || "Lifi Studio"}`,
      description,
      url: getSiteUrl("/contact"),
    },
  };
}

export default async function ContactPage() {
  const settings = await getSiteSettings();
  return <ContactClient settings={settings} />;
}
