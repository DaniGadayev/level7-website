import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/services";
import { HudOverlay, SlideIn, Magnetic, Scramble } from "@/components/Scrolly";

export const metadata: Metadata = {
  title: "Services | LEVEL7",
  description:
    "Eleven digital marketing services under one roof: paid media on every platform, social, SEO and AI search, CRM automation and websites. All measured by one number, your return.",
};

const ArrowIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

export default function ServicesPage() {
  return (
    <>
      <HudOverlay />
      {/* Hero */}
      <section className="relative pt-36 pb-16 md:pt-44 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-6">
          <p className="label mb-6">
            <span className="text-accent">SRV</span> The services
          </p>
          <h1 className="display text-hero mb-8 max-w-4xl">
            Everything under <span className="tilt-chip">one roof</span>.
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-2xl leading-relaxed">
            Most businesses juggle a media buyer here, an SEO freelancer there, and a web developer somewhere
            else. Nobody sees the whole picture, so nobody owns the result. We do it differently. One team runs
            all eleven channels, every channel feeds the same lead system, and everything answers to the same
            number: your return.
          </p>
        </div>
      </section>

      <div className="scan-rule" aria-hidden="true" />

      {/* Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {services.map((s, i) => (
              <SlideIn key={s.slug} dir={i % 3 === 0 ? -1 : 1} distance={40 + (i % 3) * 20}>
              <Link href={`/services/${s.slug}`} className="panel hot group flex flex-col p-7 h-full">
                <div className="flex items-start justify-between mb-6">
                  <span className="mono !text-faint group-hover:!text-accent transition-colors">
                    {String(i + 1).padStart(2, "0")} / 11
                  </span>
                  <span className="w-9 h-9 rounded border border-line flex items-center justify-center text-muted group-hover:bg-accent group-hover:border-accent group-hover:text-void transition-colors">
                    <ArrowIcon className="w-4 h-4" />
                  </span>
                </div>
                <h2 className="font-semibold text-xl text-ink mb-2">{s.name}</h2>
                <p className="text-sm font-semibold text-ink mb-3">{s.tagline}</p>
                <p className="text-sm text-muted leading-relaxed">{s.blurb}</p>
              </Link>
              </SlideIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative panel p-10 md:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 glow pointer-events-none" aria-hidden="true" />
            <div className="relative">
              <h2 className="display text-section mb-6">Not sure where to start?</h2>
              <p className="text-muted text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                You should not have to be. Tell us about your business and we will map the mix of channels
                that fits your market, your margins and your goals.
              </p>
              <Magnetic>
                <Link href="/contact" className="btn-primary">
                  Get my growth plan
                  <ArrowIcon />
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
