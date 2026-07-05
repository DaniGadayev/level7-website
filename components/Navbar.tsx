"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { services } from "@/lib/services";

const BOB_URL = "https://www.bob.thelevel7.ai/";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services", dropdown: true },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

// Active on exact match or sub-page (e.g. /services/seo highlights Services).
function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation
  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  const openServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const scheduleCloseServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setServicesOpen(false), 150);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 bg-[#FBFBF8]/90 backdrop-blur-md transition-all duration-300 ${
        scrolled ? "border-b border-line" : ""
      }`}
    >
      {/* Announcement bar */}
      <a href={BOB_URL} className="group block bg-accent text-[#0A0A0A]">
        <div className="max-w-3xl mx-auto px-6 py-2 text-center text-[12px] sm:text-[13px] font-medium leading-snug">
          <span className="align-middle inline-block font-bold uppercase tracking-wider bg-[#0A0A0A] text-accent px-1.5 py-0.5 rounded text-[10px] mr-1.5">
            New
          </span>
          <span className="align-middle">
            Meet <strong className="font-bold">BOB</strong>, the AI employee we built for your busywork.
          </span>{" "}
          <span className="align-middle font-semibold whitespace-nowrap underline underline-offset-2 decoration-2 group-hover:no-underline">
            Try it free
          </span>
        </div>
      </a>

      <nav className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between gap-8">
        {/* Logo — lime tilted chip lockup, readable on dark */}
        <Link href="/" className="shrink-0 flex items-center gap-2.5" aria-label="LEVEL7 home">
          <span className="relative inline-block w-9 h-7" aria-hidden="true">
            <span className="absolute inset-0 bg-[#222] rounded-[3px]" style={{ transform: "rotate(-8deg) translate(-2px, 2px)" }} />
            <span className="absolute inset-0 bg-accent rounded-[3px] flex items-center justify-center" style={{ transform: "rotate(-4deg)" }}>
              <span className="display text-[#0A0A0A] text-lg leading-none">7</span>
            </span>
          </span>
          <span className="text-ink font-semibold tracking-[0.35em] text-sm">LEVEL7</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
          {links.map((link) =>
            link.dropdown ? (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={openServices}
                onMouseLeave={scheduleCloseServices}
              >
                <button
                  className="relative px-4 py-2 text-sm font-medium group inline-flex items-center gap-1.5"
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                  onClick={() => setServicesOpen((v) => !v)}
                >
                  <span
                    className={`transition-colors duration-200 ${
                      isActive(pathname, link.href) || servicesOpen ? "text-ink" : "text-muted group-hover:text-ink"
                    }`}
                  >
                    {link.label}
                  </span>
                  <svg
                    className={`w-3.5 h-3.5 text-muted transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                  </svg>
                  <span
                    className={`absolute bottom-0 left-4 right-4 h-0.5 bg-accent origin-left transition-transform duration-200 ${
                      isActive(pathname, link.href) ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </button>

                {/* Mega dropdown */}
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[680px]"
                    >
                      <div className="bg-white border-2 border-ink rounded-lg shadow-[8px_8px_0_rgba(163,255,0,0.9)] p-6">
                        <div className="grid grid-cols-3 gap-1">
                          {services.map((s, i) => (
                            <Link
                              key={s.slug}
                              href={`/services/${s.slug}`}
                              className="group/item px-3 py-2.5 rounded-md hover:bg-panel2 transition-colors"
                            >
                              <span className="block font-mono text-[10px] tracking-[0.15em] text-faint mb-1">
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              <span className="block text-sm font-semibold text-ink group-hover/item:underline decoration-accent decoration-2 underline-offset-2 transition-colors">
                                {s.shortName}
                              </span>
                              <span className="block text-xs text-muted mt-0.5 leading-snug">{s.tagline}</span>
                            </Link>
                          ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-line flex items-center justify-between">
                          <span className="mono">11 services / one team / one number</span>
                          <Link href="/services" className="text-sm font-semibold text-ink underline decoration-accent decoration-2 underline-offset-4">
                            All services
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <NavLink key={link.href} href={link.href} active={isActive(pathname, link.href)}>
                {link.label}
              </NavLink>
            )
          )}
        </div>

        {/* CTAs */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <a
            href="https://getbob.thelevel7.ai/login"
            className="text-sm font-medium text-muted hover:text-ink px-4 py-2.5 rounded border border-line hover:border-ink transition-colors"
          >
            Log In
          </a>
          <a href={BOB_URL} className="btn-primary text-sm px-5 py-2.5">
            START WITH $0
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-ink p-2 -mr-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <div className="w-6 flex flex-col gap-[5px]">
            <span className={`block h-0.5 bg-ink rounded-full transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block h-0.5 bg-ink rounded-full transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 bg-ink rounded-full transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden bg-[#FBFBF8] border-b border-line max-h-[calc(100vh-7rem)] overflow-y-auto"
          >
            <div className="px-6 py-5 flex flex-col gap-1">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className={`text-base font-medium px-4 py-3 rounded transition-colors ${
                  pathname === "/" ? "text-ink bg-panel2" : "text-muted hover:text-ink hover:bg-panel2"
                }`}
              >
                Home
              </Link>
              {/* Services accordion */}
              <button
                onClick={() => setMobileServicesOpen((v) => !v)}
                className={`flex items-center justify-between text-base font-medium px-4 py-3 rounded transition-colors ${
                  isActive(pathname, "/services") ? "text-ink bg-panel2" : "text-muted hover:text-ink hover:bg-panel2"
                }`}
                aria-expanded={mobileServicesOpen}
              >
                Services
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <AnimatePresence>
                {mobileServicesOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="pl-4 flex flex-col">
                      {services.map((s) => (
                        <Link
                          key={s.slug}
                          href={`/services/${s.slug}`}
                          onClick={() => setMobileOpen(false)}
                          className="text-sm text-muted hover:text-ink px-4 py-2.5 rounded hover:bg-panel2 transition-colors"
                        >
                          {s.shortName}
                        </Link>
                      ))}
                      <Link
                        href="/services"
                        onClick={() => setMobileOpen(false)}
                        className="text-sm font-semibold text-accent px-4 py-2.5"
                      >
                        All services
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {links
                .filter((l) => !l.dropdown && l.href !== "/")
                .map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`text-base font-medium px-4 py-3 rounded transition-colors ${
                      isActive(pathname, link.href) ? "text-ink bg-panel2" : "text-muted hover:text-ink hover:bg-panel2"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              <a
                href="https://getbob.thelevel7.ai/login"
                onClick={() => setMobileOpen(false)}
                className="mt-3 text-center text-base font-medium text-ink px-4 py-3 rounded border-2 border-ink"
              >
                Log In
              </a>
              <a href={BOB_URL} onClick={() => setMobileOpen(false)} className="btn-primary mt-2 text-center">
                START WITH $0
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link href={href} className="relative px-4 py-2 text-sm font-medium group">
      <span className={`transition-colors duration-200 ${active ? "text-ink" : "text-muted group-hover:text-ink"}`}>
        {children}
      </span>
      <motion.span
        className="absolute bottom-0 left-4 right-4 h-0.5 bg-accent origin-left"
        initial={false}
        animate={{ scaleX: active ? 1 : 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      />
    </Link>
  );
}
