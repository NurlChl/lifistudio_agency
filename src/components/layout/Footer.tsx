import Link from "next/link";

const footerLinks = {
  Services: [
    { label: "Web Development", href: "/services" },
    { label: "UI/UX Design", href: "/services" },
    { label: "Graphic Design", href: "/services" },
    { label: "Automation", href: "/services" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  Connect: [
    { label: "Instagram", href: "#", rel: "noopener noreferrer" },
    { label: "GitHub", href: "#", rel: "noopener noreferrer" },
    { label: "LinkedIn", href: "#", rel: "noopener noreferrer" },
    { label: "Twitter", href: "#", rel: "noopener noreferrer" },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer role="contentinfo" className="bg-stone-900 text-stone-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="font-heading text-2xl font-semibold text-white"
              aria-label="Lifi Studio — Home"
            >
              lifi<span className="text-accent-400">.</span>
            </Link>
            <p className="mt-4 text-sm text-stone-400 leading-relaxed max-w-xs">
              Web development, UI/UX design, graphic design, dan automation
              engineering — satu studio, semua solusi digital.
            </p>
          </div>

          {/* Link Groups */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h2 className="font-heading text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                {title}
              </h2>
              <ul className="space-y-3" role="list">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-stone-400 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 rounded"
                      {...(link.rel ? { rel: link.rel } : {})}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-stone-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-stone-500">
          <p>
            &copy; {currentYear} Lifi Studio. All rights reserved.
          </p>
          <address className="not-italic text-stone-500">
            Built with care in{" "}
            <span className="text-stone-400">Mojokerto, Jawa Timur, Indonesia</span>
          </address>
        </div>
      </div>
    </footer>
  );
}
