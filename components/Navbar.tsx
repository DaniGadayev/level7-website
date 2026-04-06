"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

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
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link href="/" className="shrink-0 flex items-center">
          <span className="text-[22px] font-bold tracking-tight text-[#1A1A1A] font-satoshi">LEVEL</span>
          <span className="text-[22px] font-bold text-accent font-satoshi">7</span>
        </Link>

        {/* Desktop Nav Links — centered */}
        <div className="hidden md:flex items-center gap-2 flex-1 justify-center">
          {links.map((link) => (
            <NavLink key={link.href} href={link.href} active={pathname === link.href}>
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block shrink-0">
          <Link href="/contact" className="btn-primary text-sm px-5 py-2.5">
            Start Free
          </Link>
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
                    pathname === link.href
                      ? "text-[#1A1A1A] bg-[#F7F7F7]"
                      : "text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F7F7F7]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="btn-primary mt-3 text-center"
              >
                Start Free
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
