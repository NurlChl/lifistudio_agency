import type { Metadata } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { organizationSchema, localBusinessSchema } from "@/lib/seo";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://lifistudio.com"),
  title: {
    default: "Lifi Studio — Digital Agency | Web, Desain & Otomasi",
    template: "%s | Lifi Studio",
  },
  description:
    "Web Development, UI/UX Design, Graphic Design, dan Automation Engineering. Satu studio, semua solusi digital. Dari Mojokerto untuk Indonesia.",
  keywords: [
    "web development",
    "UI/UX design",
    "graphic design",
    "automation",
    "n8n",
    "Next.js",
    "WordPress",
    "digital agency",
    "Mojokerto",
    "Lifi Studio",
  ],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Lifi Studio",
    title: "Lifi Studio — Digital Agency",
    description:
      "Web Development, UI/UX Design, Graphic Design, dan Automation Engineering.",
    url: "https://lifistudio.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lifi Studio — Digital Agency",
    description:
      "Web Development, UI/UX Design, Graphic Design, dan Automation Engineering.",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
  },
  alternates: {
    canonical: "https://lifistudio.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${dmSans.variable} ${outfit.variable} h-full antialiased`}
    >
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema()),
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
