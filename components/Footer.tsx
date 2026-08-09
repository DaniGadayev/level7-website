import Link from "next/link";
import { LEGAL_ENTITY } from "@/lib/legal/config";
import CookieSettingsButton from "@/components/CookieSettingsButton";
import { services } from "@/lib/services";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/resources", label: "Resources" },
  { href: "/vision", label: "Vision" },
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
  "text-sm text-muted hover:text-ink transition-colors text-left py-1.5 block";

export default function Footer() {
  const { legalName, jurisdiction, registrationNumber, taxId } =
    LEGAL_ENTITY;
  const idBits = [
    registrationNumber ? `Reg. no. ${registrationNumber}` : "",
    taxId ? `Tax ID ${taxId}` : "",
  ].filter(Boolean);

  return (
    <footer className="bg-[#0A0A0A] text-white">
      {/* lime top rule, straight from the brand book */}
      <div className="h-1.5 bg-accent" />
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="mb-5 inline-flex items-center gap-2.5" aria-label="LEVEL7 home">
              <span className="relative inline-block w-9 h-7" aria-hidden="true">
                <span className="absolute inset-0 bg-[#2A2A2A] rounded-[3px]" style={{ transform: "rotate(-8deg) translate(-2px, 2px)" }} />
                <span className="absolute inset-0 bg-accent rounded-[3px] flex items-center justify-center" style={{ transform: "rotate(-4deg)" }}>
                  <span className="display text-ink text-lg leading-none">7</span>
                </span>
              </span>
              <span className="text-white font-semibold tracking-[0.35em] text-sm">LEVEL7</span>
            </Link>
            <p className="text-white/55 text-sm leading-relaxed max-w-[220px]">
              Build an Empire.
              <br />
              One Level at a Time.
            </p>
          </div>

          {/* Services, split across two columns */}
          <div className="col-span-2">
            <p className="label on-dark mb-5">Services</p>
            <div className="grid grid-cols-2 gap-x-6">
              {services.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="text-sm text-white/55 hover:text-white transition-colors py-1.5 block"
                >
                  {s.shortName}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <p className="label on-dark mb-5">Company</p>
            <div className="flex flex-col gap-0">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/55 hover:text-white transition-colors py-1.5 block"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://getbob.thelevel7.ai/"
                className="group inline-flex items-center gap-2 text-sm text-white/55 hover:text-white transition-colors py-1.5"
              >
                <span className="rounded-full bg-accent px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em] text-ink leading-none">
                  New
                </span>
                Meet BOB
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/bob-icon.png" alt="BOB" className="h-6 w-6 -my-1 object-contain" />
              </a>
            </div>
          </div>

          {/* Legal + contact */}
          <div>
            <p className="label on-dark mb-5">Legal & Contact</p>
            <div className="flex flex-col gap-0">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/55 hover:text-white transition-colors py-1.5 block"
                >
                  {link.label}
                </Link>
              ))}
              <CookieSettingsButton className="text-sm text-white/55 hover:text-white transition-colors text-left py-1.5 block" />
            </div>
          </div>
        </div>

        <div className="h-px bg-white/10 mb-8" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} {legalName}. All rights reserved.
          </p>
          <p className="text-xs text-white/40">
            Registered in {jurisdiction}
            {idBits.length ? ` · ${idBits.join(" · ")}` : ""}
          </p>
        </div>
      </div>
    </footer>
  );
}
