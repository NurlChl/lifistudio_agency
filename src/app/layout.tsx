import type { Metadata } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { organizationSchema, localBusinessSchema } from "@/lib/seo";
import { getSiteSettings } from "@/lib/actions";
import { getSiteUrl } from "@/lib/utils";

const dmSans = DM_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const siteUrl = getSiteUrl();

  const title = settings?.seo?.title || "Lifi Studio — Digital Agency | Web, Desain & Otomasi";
  const description = settings?.seo?.description || settings?.siteDescription || "Web Development, UI/UX Design, Graphic Design, dan Automation Engineering.";
  const keywordsStr = settings?.seo?.keywords || "web development, UI/UX design, graphic design, automation, Mojokerto";
  const keywords = keywordsStr.split(",").map((k: string) => k.trim());

  const lat = settings?.geo?.latitude || "-7.4705";
  const lng = settings?.geo?.longitude || "112.4401";
  const geoRegion = settings?.geo?.region || "ID-JI";
  const geoPlacename = settings?.geo?.placename || "Mojokerto";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s | ${settings?.siteName || "Lifi Studio"}`,
    },
    description,
    other: {
      "geo.region": geoRegion,
      "geo.placename": geoPlacename,
      "geo.position": `${lat};${lng}`,
      "ICBM": `${lat}, ${lng}`,
    },
    keywords,
    openGraph: {
      type: "website",
      locale: "id_ID",
      siteName: settings?.siteName || "Lifi Studio",
      title,
      description,
      url: siteUrl,
      images: [
        {
          url: settings?.seo?.ogImage ? getSiteUrl(settings.seo.ogImage) : getSiteUrl("/logo.png"),
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [settings?.seo?.ogImage ? getSiteUrl(settings.seo.ogImage) : getSiteUrl("/logo.png")],
    },
    robots: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
    icons: {
      icon: [
        { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon.ico" },
      ],
      shortcut: ["/favicon.ico"],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
    manifest: "/site.webmanifest",
    alternates: {
      canonical: siteUrl,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html
      lang="id"
      className={`${dmSans.variable} ${outfit.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema(settings)),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema(settings)),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-stone-800 font-body selection:bg-accent-200 selection:text-stone-900">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              fontFamily: "Outfit, sans-serif",
              fontSize: "14px",
              borderRadius: "12px",
              padding: "12px 16px",
              border: "1px solid #e8e2da",
            },
            success: {
              iconTheme: { primary: "#2d7d46", secondary: "#fff" },
            },
            error: {
              iconTheme: { primary: "#b33a3a", secondary: "#fff" },
            },
          }}
        />
      </body>
    </html>
  );
}
