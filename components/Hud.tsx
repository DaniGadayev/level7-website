/* HYPERFRAME primitives: corner-ticked frames, mono labels, proof strips. */

import { testimonials, clients } from "@/lib/social-proof";

/** Container with the four corner ticks. Must wrap relatively-positioned content. */
export function Ticks({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`ticks relative ${className}`}>
      <span className="tick-b absolute inset-0 pointer-events-none" aria-hidden="true" />
      {children}
    </div>
  );
}

/** Mono topline: // INDEX — LABEL */
export function SectionHead({
  index,
  label,
  title,
  className = "",
}: {
  index: string;
  label: string;
  title: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="label mb-5">
        <span className="text-accent">{index}</span> {label}
      </p>
      <h2 className="display text-section">{title}</h2>
    </div>
  );
}

/** Client name strip — text logos in mono caps. */
export function LogoStrip({ heading = "Trusted by service businesses worldwide" }: { heading?: string }) {
  return (
    <div>
      <p className="mono text-center mb-8">{heading}</p>
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
        {clients.map((c) => (
          <span
            key={c}
            className="font-display text-2xl md:text-3xl tracking-wide text-white/30 hover:text-white/70 transition-colors select-none"
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Testimonial panels. */
export function TestimonialGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {testimonials.map((t) => (
        <Ticks key={t.name} className="panel hot p-8 flex flex-col">
          <p className="mono mb-6">
            <span className="text-accent">▮</span> {t.stat}
          </p>
          <p className="text-[17px] leading-relaxed text-white/85 mb-8 flex-1">
            &ldquo;{t.quote}&rdquo;
          </p>
          <div>
            <p className="font-semibold text-white">{t.name}</p>
            <p className="mono mt-1">{t.role}</p>
          </div>
        </Ticks>
      ))}
    </div>
  );
}
