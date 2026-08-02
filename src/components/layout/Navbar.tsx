"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar({ settings }: { settings?: any }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    // Check immediately on mount (handles page refresh mid-scroll)
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const brandName = settings?.siteName || "Lifi Studio";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
      role="banner"
    >
      <nav
        className="max-w-7xl mx-auto px-6 lg:px-8 h-18 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-heading text-xl font-semibold tracking-tight text-stone-900 flex items-center gap-2"
          aria-label={`${brandName} — Home`}
        >
          {settings?.logo ? (
            <img
              src={settings.logo}
              alt={brandName}
              className="h-8 max-w-[160px] w-auto object-contain"
            />
          ) : (
            <>
              {brandName.toLowerCase()}<span className="text-accent-500">.</span>
            </>
          )}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8" role="list">
          {navLinks.map((link) => {
            const isActive = pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors duration-200 relative",
                  isActive
                    ? "text-stone-900"
                    : "text-stone-500 hover:text-stone-900"
                )}
                aria-current={isActive ? "page" : undefined}
                role="listitem"
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent-500 rounded-full" />
                )}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="text-sm font-semibold px-5 py-2.5 rounded-lg bg-stone-900 text-white hover:bg-stone-700 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
          >
            Start Project
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-stone-700 hover:text-stone-900 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </nav>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            variants={{
              initial: {
                clipPath: "circle(0% at 92% 4%)",
                opacity: 0,
              },
              animate: {
                clipPath: "circle(150% at 92% 4%)",
                opacity: 1,
                transition: {
                  type: "spring",
                  stiffness: 85,
                  damping: 20,
                },
              },
              exit: {
                clipPath: "circle(0% at 92% 4%)",
                opacity: 0,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 24,
                },
              },
            }}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed top-0 left-0 right-0 h-dvh bg-white z-50 md:hidden flex flex-col"
          >
            {/* Overlay Header */}
            <div className="h-18 flex items-center justify-between px-6 border-b border-stone-100/60">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="font-heading text-xl font-semibold tracking-tight text-stone-900"
              >
                lifi<span className="text-accent-500">.</span>
              </Link>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 text-stone-700 hover:text-stone-900 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
                aria-label="Close navigation menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Overlay Content */}
            <div className="flex-1 px-8 py-10 flex flex-col justify-between overflow-y-auto">
              <motion.nav
                variants={{
                  animate: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.1,
                    },
                  },
                }}
                className="flex flex-col gap-6"
                aria-label="Mobile navigation links"
              >
                {navLinks.map((link) => {
                  const isActive = pathname === link.href ||
                    (link.href !== "/" && pathname.startsWith(link.href));
                  return (
                    <motion.div
                      key={link.href}
                      variants={{
                        initial: { opacity: 0, x: 20 },
                        animate: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
                        exit: { opacity: 0, x: 20 }
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "text-2xl font-heading font-medium tracking-tight py-1 inline-block transition-colors",
                          isActive
                            ? "text-accent-500"
                            : "text-stone-800 hover:text-stone-950"
                        )}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.nav>

              {/* Overlay Footer Action */}
              <motion.div
                variants={{
                  initial: { opacity: 0, y: 15 },
                  animate: { opacity: 1, y: 0, transition: { delay: 0.4 } },
                  exit: { opacity: 0, y: 15 }
                }}
                className="w-full pb-6"
              >
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block text-center text-base font-semibold px-6 py-4 rounded-xl bg-stone-900 text-white hover:bg-stone-800 transition-all duration-300 shadow-md"
                >
                  Start Project
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
