export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { getServices } from "@/lib/actions/services";
import ServicesClient from "./services-client";

export const metadata: Metadata = {
  title: "Services",
  description: "Layanan digital Lifi Studio — Web Development, UI/UX Design, Graphic Design, dan Automation Engineering.",
};

export default async function ServicesPage() {
  const services = await getServices({ status: "published" });
  return <ServicesClient services={services} />;
}
