import { getSiteUrl } from "@/lib/utils";

export function organizationSchema(settings?: any) {
  const brandName = settings?.siteName || "Lifi Studio";
  const siteUrl = getSiteUrl();
  const description = settings?.seo?.description || settings?.siteDescription || "Web Development, UI/UX Design, Graphic Design, dan Automation Engineering.";

  const socials = [
    settings?.socialLinks?.instagram,
    settings?.socialLinks?.github,
    settings?.socialLinks?.twitter,
    settings?.socialLinks?.linkedin,
  ].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brandName,
    url: siteUrl,
    description: description,
    foundingDate: "2022",
    founder: {
      "@type": "Person",
      name: "Moh Nurul Cholil",
      alternateName: "NurlChl",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: settings?.address?.addressLocality || "Mojokerto",
      addressRegion: settings?.address?.addressRegion || "Jawa Timur",
      addressCountry: settings?.address?.addressCountry || "ID",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: settings?.whatsappNumber || "+62-812-3456-7890",
      contactType: "customer service",
      availableLanguage: ["Indonesian", "English"],
    },
    sameAs: socials.length > 0 ? socials : [
      "https://instagram.com/lifistudio",
      "https://github.com/lifistudio",
    ],
  };
}

export function localBusinessSchema(settings?: any) {
  const brandName = settings?.siteName || "Lifi Studio";
  const siteUrl = getSiteUrl();
  const description = settings?.seo?.description || settings?.siteDescription || "Digital agency specializing in web development, UI/UX design, graphic design, and automation engineering.";
  const logoUrl = settings?.logo ? getSiteUrl(settings.logo) : getSiteUrl("/logo.png");
  const ogImgUrl = settings?.seo?.ogImage ? getSiteUrl(settings.seo.ogImage) : getSiteUrl("/logo.png");

  const socials = [
    settings?.socialLinks?.instagram,
    settings?.socialLinks?.github,
    settings?.socialLinks?.twitter,
    settings?.socialLinks?.linkedin,
  ].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${siteUrl}/#localbusiness`,
    name: brandName,
    image: ogImgUrl,
    description: description,
    priceRange: settings?.priceRange || "$$",
    telephone: settings?.whatsappNumber || "+62-812-3456-7890",
    url: siteUrl,
    logo: logoUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings?.address?.streetAddress || "Mojokerto City Center",
      addressLocality: settings?.address?.addressLocality || "Mojokerto",
      addressRegion: settings?.address?.addressRegion || "Jawa Timur",
      postalCode: settings?.address?.postalCode || "61311",
      addressCountry: settings?.address?.addressCountry || "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: settings?.geo?.latitude || "-7.4705",
      longitude: settings?.geo?.longitude || "112.4401",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      opens: "08:00",
      closes: "17:00"
    },
    sameAs: socials.length > 0 ? socials : [
      "https://instagram.com/lifistudio",
      "https://github.com/lifistudio",
    ],
    areaServed: "Indonesia",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Web Development",
            description:
              "WordPress, Next.js, Laravel, Vue.js development services.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "UI/UX Design",
            description: "User interface and user experience design services.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Graphic Design",
            description:
              "Brand identity, logo, and visual design services.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Automation Engineering",
            description:
              "Workflow automation with n8n, GHL, and AI integration.",
          },
        },
      ],
    },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: getSiteUrl(item.url),
    })),
  };
}

export function articleSchema(post: {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    url: getSiteUrl(`/blog/${post.slug}`),
    publisher: {
      "@type": "Organization",
      name: "Lifi Studio",
    },
  };
}

export function faqSchema(questions: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };
}
