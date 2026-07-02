"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

// Active on exact match or sub-page (e.g. /resources/my-article highlights Resources).
function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
        scrolled ? "border-b border-[#E5E5E5]" : ""
      }`}
    >
      {/* Announcement bar */}
      <a
        href="https://www.bob.thelevel7.ai/"
        className="group block bg-accent text-[#0A0A0A]"
      >
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-center gap-x-2 gap-y-1 flex-wrap text-center text-[12px] sm:text-[13px] font-medium leading-snug">
          <span className="shrink-0 font-extrabold uppercase tracking-wider bg-[#0A0A0A] text-accent px-1.5 py-0.5 rounded text-[10px] leading-none">
            NEW
          </span>
          <span>
            Meet <strong className="font-bold">BOB</strong>, your AI agent that runs the busywork 24/7.
          </span>
          <span className="font-semibold underline underline-offset-2 decoration-2 group-hover:no-underline whitespace-nowrap">
            Try it free
          </span>
          <svg className="shrink-0 w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </div>
      </a>

      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link href="/" className="shrink-0 flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="LEVEL7" height={32} className="h-8 w-auto" />
        </Link>

        {/* Desktop Nav Links — centered */}
        <div className="hidden md:flex items-center gap-2 flex-1 justify-center">
          {links.map((link) => (
            <NavLink key={link.href} href={link.href} active={isActive(pathname, link.href)}>
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <a
            href="https://getbob.thelevel7.ai/login"
            className="text-sm font-semibold text-[#1A1A1A] px-4 py-2.5 rounded-full border border-[#E5E5E5] hover:border-[#1A1A1A] transition-colors"
          >
            Log In
          </a>
          <a
            href="https://www.bob.thelevel7.ai/"
            className="btn-primary text-sm px-5 py-2.5"
          >
            Get Your AI Agent
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-[#1A1A1A] p-2 -mr-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 flex flex-col gap-[5px]">
            <span className={`block h-0.5 bg-[#1A1A1A] rounded-full transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block h-0.5 bg-[#1A1A1A] rounded-full transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 bg-[#1A1A1A] rounded-full transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
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
            className="md:hidden overflow-hidden bg-white border-b border-[#E5E5E5]"
          >
            <div className="px-6 py-5 flex flex-col gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-base font-medium px-4 py-3 rounded-xl transition-colors ${
                    isActive(pathname, link.href)
                      ? "text-[#1A1A1A] bg-[#F7F7F7]"
                      : "text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F7F7F7]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://getbob.thelevel7.ai/login"
                onClick={() => setMobileOpen(false)}
                className="mt-3 text-center text-base font-semibold text-[#1A1A1A] px-4 py-3 rounded-xl border border-[#E5E5E5]"
              >
                Log In
              </a>
              <a
                href="https://www.bob.thelevel7.ai/"
                onClick={() => setMobileOpen(false)}
                className="btn-primary mt-2 text-center"
              >
                Get Your AI Agent
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
      <span className={`transition-colors duration-200 ${active ? "text-[#1A1A1A]" : "text-[#6B6B6B] group-hover:text-[#1A1A1A]"}`}>
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
