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
      <section className="relative pt-36 pb-16 md:pt-44 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-6">
          <nav aria-label="Breadcrumb" className="mono mb-8">
            <Link href="/services" className="hover:text-white transition-colors">
              Services
            </Link>
            <span className="mx-2 text-faint">/</span>
            <span className="text-white/70">{service.shortName}</span>
          </nav>
          <p className="label mb-6">
            <span className="text-accent">{String(index + 1).padStart(2, "0")}</span> of 11
          </p>
          <h1 className="display text-hero mb-8 max-w-4xl">{service.name}</h1>
          <p className="text-xl md:text-2xl text-accent font-medium max-w-2xl mb-6">{service.tagline}</p>
          <p className="text-lg text-muted max-w-2xl leading-relaxed">{service.blurb}</p>
        </div>
      </section>

      <div className="scan-rule" aria-hidden="true" />

      {/* Body */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3">
            <p className="label mb-5">
              <span className="text-accent">A</span> The story
            </p>
            <p className="text-lg text-white/85 leading-relaxed mb-14">{service.intro}</p>

            <p className="label mb-8">
              <span className="text-accent">B</span> What we actually do
            </p>
            <div className="space-y-4">
              {service.points.map((p, i) => (
                <div key={p.title} className="panel p-6 flex gap-6">
                  <span className="display text-3xl text-accent shrink-0 w-12">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="font-semibold text-lg text-white mb-2">{p.title}</h2>
                    <p className="text-muted leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 border-l-2 border-accent pl-6 py-2">
              <p className="mono mb-2">The outcome</p>
              <p className="text-xl font-semibold text-white leading-snug">{service.outcome}</p>
            </div>
          </div>

          {/* Side rail */}
          <aside className="lg:col-span-2">
            <div className="panel p-8 lg:sticky lg:top-40">
              <h2 className="display text-3xl mb-4">Want this working for you?</h2>
              <p className="text-muted text-sm leading-relaxed mb-8">
                Every engagement starts with a free growth plan: which channels fit your business, what budget
                makes sense, and the return we would aim for.
              </p>
              <Link href="/contact" className="btn-primary w-full mb-3">
                Get my growth plan
                <ArrowIcon />
              </Link>
              <Link href="/services" className="btn-ghost w-full">
                See all services
              </Link>
              <div className="mt-8 pt-6 border-t border-line">
                <p className="mono mb-3">Up next</p>
                <Link href={`/services/${next.slug}`} className="group flex items-center justify-between gap-4">
                  <span className="font-semibold text-white group-hover:text-accent transition-colors">
                    {next.name}
                  </span>
                  <span className="w-8 h-8 rounded border border-line flex items-center justify-center text-muted group-hover:bg-accent group-hover:border-accent group-hover:text-void transition-colors shrink-0">
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
