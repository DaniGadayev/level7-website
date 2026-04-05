import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/investors", label: "Investors" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#070707]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <span className="text-2xl font-bold text-white font-satoshi">LEVEL</span>
              <span className="text-2xl font-bold text-accent font-satoshi">7</span>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">
              Build an Empire.<br />One Level at a Time.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="text-xs text-text-secondary uppercase tracking-widest mb-4">Navigation</p>
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-text-secondary hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs text-text-secondary uppercase tracking-widest mb-4">Contact</p>
            <a
              href="mailto:Dani@bmf360.co.il"
              className="text-sm text-text-secondary hover:text-accent transition-colors"
            >
              Dani@bmf360.co.il
            </a>
            <p className="text-sm text-text-secondary mt-2">thelevel7.ai</p>
          </div>
        </div>

        <div className="lime-divider mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-secondary">
            © 2026 D.T LEVEL 7 TECHNOLOGY LIMITED. All rights reserved.
          </p>
          <p className="text-xs text-text-secondary">
            Registered in Cyprus
          </p>
        </div>
      </div>
    </footer>
  );
}
