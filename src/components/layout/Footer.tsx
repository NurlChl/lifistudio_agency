import Link from "next/link";

interface FooterProps {
  settings?: any;
}

export default function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const servicesLinks = [
    { label: "Web Development", href: "/services" },
    { label: "UI/UX Design", href: "/services" },
    { label: "Graphic Design", href: "/services" },
    { label: "Automation", href: "/services" },
  ];

  const companyLinks = [
    { label: "About", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  const connectLinks = [
    { label: "Instagram", href: settings?.socialLinks?.instagram || "#" },
    { label: "GitHub", href: settings?.socialLinks?.github || "#" },
    { label: "LinkedIn", href: settings?.socialLinks?.linkedin || "#" },
    { label: "Twitter", href: settings?.socialLinks?.twitter || "#" },
  ].filter(link => link.href !== "#" && link.href !== "");

  const addressString = settings?.address?.streetAddress
    ? `${settings.address.addressLocality}, ${settings.address.addressRegion}, ${settings.address.addressCountry}`
    : "Mojokerto, Jawa Timur, Indonesia";

  return (
    <footer role="contentinfo" className="bg-stone-900 text-stone-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="font-heading text-2xl font-semibold text-white"
              aria-label={`${settings?.siteName || "Lifi Studio"} — Home`}
            >
              {(settings?.siteName || "Lifi Studio").toLowerCase()}
              <span className="text-accent-400">.</span>
            </Link>
            <p className="mt-4 text-sm text-stone-400 leading-relaxed max-w-xs">
              {settings?.siteDescription ||
                "Web development, UI/UX design, graphic design, dan automation engineering — satu studio, semua solusi digital."}
            </p>
          </div>

          {/* Services Group */}
          <div>
            <h2 className="font-heading text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Services
            </h2>
            <ul className="space-y-3" role="list">
              {servicesLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-stone-400 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Group */}
          <div>
            <h2 className="font-heading text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Company
            </h2>
            <ul className="space-y-3" role="list">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-stone-400 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Group */}
          {connectLinks.length > 0 && (
            <div>
              <h2 className="font-heading text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                Connect
              </h2>
              <ul className="space-y-3" role="list">
                {connectLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-stone-400 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 rounded"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-stone-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-stone-500">
          <p>
            &copy; {currentYear} {settings?.siteName || "Lifi Studio"}. All rights reserved.
          </p>
          <address className="not-italic text-stone-500">
            Built with care in{" "}
            <span className="text-stone-400">{addressString}</span>
          </address>
        </div>
      </div>
    </footer>
  );
}
