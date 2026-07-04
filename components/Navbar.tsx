"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { services } from "@/lib/services";

const links = [
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
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
        scrolled ? "border-b border-[#E8E8E3] shadow-[0_2px_20px_rgba(10,10,10,0.04)]" : ""
      }`}
    >
      {/* Announcement bar */}
      <a href="https://getbob.thelevel7.ai/" className="group block bg-[#0A0A0A] text-white">
        <div className="max-w-3xl mx-auto px-6 py-2 text-center text-[12px] sm:text-[13px] font-medium leading-snug">
          <span className="align-middle inline-block font-bold uppercase tracking-wider bg-accent text-[#0A0A0A] px-1.5 py-0.5 rounded text-[10px] mr-1.5">
            New
          </span>
          <span className="align-middle text-white/85">
            Meet <strong className="font-bold text-white">BOB</strong>, the AI employee we built for your busywork.
          </span>{" "}
          <span className="align-middle font-semibold whitespace-nowrap text-accent underline underline-offset-2 decoration-2 group-hover:no-underline">
            Try it free
          </span>
        </div>
      </a>

      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link href="/" className="shrink-0 flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="LEVEL7" height={32} className="h-8 w-auto" />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-2 flex-1 justify-center">
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
                      <div className="bg-white border-2 border-ink rounded-2xl shadow-[8px_8px_0_rgba(163,255,0,0.9)] p-6">
                        <div className="grid grid-cols-3 gap-1">
                          {services.map((s) => (
                            <Link
                              key={s.slug}
                              href={`/services/${s.slug}`}
                              className="group/item px-3 py-2.5 rounded-xl hover:bg-cream transition-colors"
                            >
                              <span className="block text-sm font-semibold text-ink group-hover/item:underline decoration-accent decoration-2 underline-offset-2">
                                {s.shortName}
                              </span>
                              <span className="block text-xs text-muted mt-0.5 leading-snug">{s.tagline}</span>
                            </Link>
                          ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                          <span className="text-xs text-muted">Twelve services. One team. One number that matters.</span>
                          <Link
                            href="/services"
                            className="text-sm font-semibold text-ink underline decoration-accent decoration-2 underline-offset-4 hover:decoration-ink"
                          >
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

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <a
            href="https://getbob.thelevel7.ai/login"
            className="text-sm font-semibold text-ink px-4 py-2.5 rounded-full border-2 border-border hover:border-ink transition-colors"
          >
            Log In
          </a>
          <Link href="/contact" className="btn-primary text-sm px-5 py-2.5" style={{ boxShadow: "3px 3px 0 #0A0A0A" }}>
            Get my growth plan
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-ink p-2 -mr-2"
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-white border-b border-border max-h-[calc(100vh-7rem)] overflow-y-auto"
          >
            <div className="px-6 py-5 flex flex-col gap-1">
              {/* Services accordion */}
              <button
                onClick={() => setMobileServicesOpen((v) => !v)}
                className={`flex items-center justify-between text-base font-medium px-4 py-3 rounded-xl transition-colors ${
                  isActive(pathname, "/services") ? "text-ink bg-cream" : "text-muted hover:text-ink hover:bg-cream"
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
                          className="text-sm text-muted hover:text-ink px-4 py-2.5 rounded-lg hover:bg-cream transition-colors"
                        >
                          {s.shortName}
                        </Link>
                      ))}
                      <Link
                        href="/services"
                        onClick={() => setMobileOpen(false)}
                        className="text-sm font-semibold text-ink px-4 py-2.5 underline decoration-accent decoration-2 underline-offset-4"
                      >
                        All services
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {links
                .filter((l) => !l.dropdown)
                .map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`text-base font-medium px-4 py-3 rounded-xl transition-colors ${
                      isActive(pathname, link.href) ? "text-ink bg-cream" : "text-muted hover:text-ink hover:bg-cream"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              <a
                href="https://getbob.thelevel7.ai/login"
                onClick={() => setMobileOpen(false)}
                className="mt-3 text-center text-base font-semibold text-ink px-4 py-3 rounded-xl border-2 border-border"
              >
                Log In
              </a>
              <Link href="/contact" onClick={() => setMobileOpen(false)} className="btn-primary mt-2 text-center">
                Get my growth plan
              </Link>
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
