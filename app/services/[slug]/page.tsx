import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, getService } from "@/lib/services";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = getService(params.slug);
  if (!service) return {};
  return {
    title: `${service.name} | LEVEL7`,
    description: service.blurb,
  };
}

const ArrowIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getService(params.slug);
  if (!service) notFound();

  const index = services.findIndex((s) => s.slug === service.slug);
  const next = services[(index + 1) % services.length];

  return (
    <>
      {/* Hero */}
      <section className="bg-[#0A0A0A] text-white pt-36 pb-20 md:pt-44 md:pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-white/40">
            <Link href="/services" className="hover:text-white transition-colors">
              Services
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white/70">{service.shortName}</span>
          </nav>
          <p className="label on-dark mb-6">
            Service {String(index + 1).padStart(2, "0")} of {services.length}
          </p>
          <h1 className="display text-hero mb-8 max-w-4xl">{service.name}</h1>
          <p className="text-xl md:text-2xl text-accent font-medium max-w-2xl mb-6">{service.tagline}</p>
          <p className="text-lg text-white/65 max-w-2xl leading-relaxed">{service.blurb}</p>
        </div>
      </section>

      {/* Body */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-14">
          <div className="lg:col-span-3">
            <p className="label mb-5">The story</p>
            <p className="text-lg text-ink/85 leading-relaxed mb-14">{service.intro}</p>

            <p className="label mb-8">What we actually do</p>
            <div className="space-y-8">
              {service.points.map((p, i) => (
                <div key={p.title} className="flex gap-6">
                  <span className="display text-3xl text-accent shrink-0 w-12" style={{ WebkitTextStroke: "1.2px #0A0A0A" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="font-semibold text-lg mb-2">{p.title}</h2>
                    <p className="text-muted leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-14 border-l-4 border-accent pl-6 py-2">
              <p className="text-sm font-semibold uppercase tracking-widest text-muted mb-2">The outcome</p>
              <p className="text-xl font-semibold text-ink leading-snug">{service.outcome}</p>
            </div>
          </div>

          {/* Side rail */}
          <aside className="lg:col-span-2">
            <div className="card p-8 bg-white lg:sticky lg:top-40">
              <h2 className="display text-3xl mb-4">Want this working for you?</h2>
              <p className="text-muted text-sm leading-relaxed mb-8">
                Every engagement starts with a free growth plan: which channels fit your business, what budget
                makes sense, and the return we would aim for.
              </p>
              <Link href="/contact" className="btn-primary w-full mb-4">
                Get my growth plan
                <ArrowIcon />
              </Link>
              <Link href="/services" className="btn-ghost w-full">
                See all services
              </Link>
              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-xs uppercase tracking-widest text-subtle mb-3">Up next</p>
                <Link
                  href={`/services/${next.slug}`}
                  className="group flex items-center justify-between gap-4"
                >
                  <span className="font-semibold text-ink group-hover:underline decoration-accent decoration-2 underline-offset-4">
                    {next.name}
                  </span>
                  <span className="w-8 h-8 rounded-full border-2 border-border flex items-center justify-center text-muted group-hover:bg-accent group-hover:border-ink group-hover:text-ink transition-colors shrink-0">
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
