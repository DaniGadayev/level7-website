import Link from "next/link";
import { LEGAL_ENTITY } from "@/lib/legal/config";
import CookieSettingsButton from "@/components/CookieSettingsButton";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy & Cookies" },
  { href: "/terms", label: "Terms & Legal Notice" },
  { href: "/accessibility", label: "Accessibility" },
  { href: "/legal", label: "Legal Center" },
];

const linkClass =
  "text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors text-left";

export default function Footer() {
  const { legalName, jurisdiction, registrationNumber, emails } = LEGAL_ENTITY;
  // Only show the reg number once a real value replaces the placeholder.
  const hasRegNo = !registrationNumber.startsWith("[");

  return (
    <footer className="border-t border-[#E5E5E5] bg-[#F7F7F7]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="LEVEL7" className="h-8 w-auto" />
            </div>
            <p className="text-[#6B6B6B] text-sm leading-relaxed max-w-[200px]">
              Build an Empire.
              <br />
              One Level at a Time.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="label mb-5">Navigation</p>
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <p className="label mb-5">Legal</p>
            <div className="flex flex-col gap-3">
              {legalLinks.map((link) => (
                <Link key={link.href} href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              ))}
              <CookieSettingsButton className={linkClass} />
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="label mb-5">Contact</p>
            <div className="flex flex-col gap-3">
              <a href={`mailto:${emails.general}`} className={linkClass}>
                {emails.general}
              </a>
              <a href={`mailto:${emails.privacy}`} className={linkClass}>
                {emails.privacy}
              </a>
              <p className="text-sm text-[#6B6B6B]">thelevel7.ai</p>
            </div>
          </div>
        </div>

        <div className="divider mb-8" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="text-xs text-[#AAAAAA]">
            © {new Date().getFullYear()} {legalName}. All rights reserved.
          </p>
          <p className="text-xs text-[#AAAAAA]">
            Registered in {jurisdiction}
            {hasRegNo ? ` · Reg. no. ${registrationNumber}` : ""}
          </p>
        </div>
      </div>
    </footer>
  );
}
