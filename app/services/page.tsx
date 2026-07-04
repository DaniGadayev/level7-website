import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services | LEVEL7",
  description:
    "Twelve digital marketing services under one roof: AI search optimization, SEO, paid media on every platform, native advertising, CRM automation and websites. All measured by one number, your return.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0A0A0A] text-white pt-36 pb-20 md:pt-44 md:pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <p className="label on-dark mb-6">The services</p>
          <h1 className="display text-hero mb-8 max-w-4xl">
            Everything under <span className="tilt-chip">one roof</span>.
          </h1>
          <p className="text-lg md:text-xl text-white/65 max-w-2xl leading-relaxed">
            Most businesses juggle a media buyer here, an SEO freelancer there, and a web developer somewhere
            else. Nobody sees the whole picture, so nobody owns the result. We do it differently. One team runs
            all twelve channels, every channel feeds the same lead system, and everything answers to the same
            number: your return.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="card group p-7 flex flex-col bg-white"
              >
                <div className="flex items-start justify-between mb-5">
                  <span className="display text-3xl text-subtle group-hover:text-ink transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="w-9 h-9 rounded-full border-2 border-border flex items-center justify-center text-muted group-hover:bg-accent group-hover:border-ink group-hover:text-ink transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
                <h2 className="font-semibold text-xl text-ink mb-2">{s.name}</h2>
                <p className="text-sm font-medium text-ink/70 mb-3">{s.tagline}</p>
                <p className="text-sm text-muted leading-relaxed">{s.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[#0A0A0A] text-white rounded-3xl px-8 py-16 md:px-16 md:py-20 text-center">
            <h2 className="display text-section mb-6">Not sure where to start?</h2>
            <p className="text-white/60 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              You should not have to be. Tell us about your business and we will map the mix of channels that
              fits your market, your margins and your goals.
            </p>
            <Link href="/contact" className="btn-primary on-dark">
              Get my growth plan
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
