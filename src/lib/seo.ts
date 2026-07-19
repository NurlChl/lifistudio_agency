export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Lifi Studio",
    url: "https://lifistudio.com",
    description:
      "Web Development, UI/UX Design, Graphic Design, dan Automation Engineering.",
    foundingDate: "2022",
    founder: {
      "@type": "Person",
      name: "Moh Nurul Cholil",
      alternateName: "NurlChl",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mojokerto",
      addressRegion: "Jawa Timur",
      addressCountry: "ID",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+62-812-xxx-xxxx",
      contactType: "customer service",
      availableLanguage: ["Indonesian", "English"],
    },
    sameAs: [
      "https://instagram.com/lifistudio",
      "https://github.com/lifistudio",
    ],
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    name: "Lifi Studio",
    description:
      "Digital agency specializing in web development, UI/UX design, graphic design, and automation engineering.",
    priceRange: "$$",
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
      item: `https://lifistudio.com${item.url}`,
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
    url: `https://lifistudio.com/blog/${post.slug}`,
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
