import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#E5E5E5] bg-[#F7F7F7]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-5">
              <span className="text-2xl font-bold text-[#1A1A1A] font-satoshi">LEVEL</span>
              <span className="text-2xl font-bold text-accent font-satoshi">7</span>
            </div>
            <p className="text-[#6B6B6B] text-sm leading-relaxed max-w-[200px]">
              Build an Empire.<br />One Level at a Time.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="label mb-5">Navigation</p>
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="label mb-5">Contact</p>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:Dani@bmf360.co.il"
                className="text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
              >
                Dani@bmf360.co.il
              </a>
              <p className="text-sm text-[#6B6B6B]">thelevel7.ai</p>
            </div>
          </div>
        </div>

        <div className="divider mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#AAAAAA]">
            © 2026 D.T LEVEL 7 TECHNOLOGY LIMITED. All rights reserved.
          </p>
          <p className="text-xs text-[#AAAAAA]">Registered in Cyprus</p>
        </div>
      </div>
    </footer>
  );
}
