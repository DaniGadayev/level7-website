"use client";

/*
 * The Vision — the original LEVEL7 building, rebuilt as an elevator ride.
 * Mobile-first: each floor is a full screen, a sticky elevator display shows
 * where you are, and a lime shaft fills as you ascend. All motion is bound
 * 1:1 to scroll (no springs), per the site's smoothness rule.
 */

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion, useInView } from "framer-motion";
import { floors } from "@/lib/floors";
import { HudOverlay, Magnetic, Scramble } from "@/components/Scrolly";
import { Ticks } from "@/components/Hud";

const BOB_URL = "https://www.bob.thelevel7.ai/";

const ArrowIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

/* One floor, full-screen on mobile, alternating on desktop. Reports itself
   to the elevator display when it fills the viewport. */
function FloorSection({
  floor,
  index,
  onActive,
}: {
  floor: (typeof floors)[number];
  index: number;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.55 });

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  const flip = index % 2 === 1;

  return (
    <section
      ref={ref}
      className="relative min-h-[92svh] flex items-center border-t border-line overflow-hidden"
      aria-label={`${floor.label}: ${floor.name}`}
    >
      {/* giant floor number, structural background */}
      <span
        className="display absolute text-[46vh] leading-none text-ink/[0.05] select-none pointer-events-none right-[-2%] top-1/2 -translate-y-1/2"
        aria-hidden="true"
      >
        {floor.num}
      </span>

      <div className="relative max-w-7xl mx-auto w-full px-6 py-16">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${flip ? "" : ""}`}>
          <div className={flip ? "lg:order-2" : ""}>
            <p className="label mb-5">
              <span className="text-accent">{floor.num === "L" ? "FL.L" : `FL.${floor.num}`}</span> {floor.label}
              {floor.free && (
                <span className="ml-2 inline-block bg-accent text-ink font-bold px-2 py-0.5 rounded-sm not-italic tracking-normal">
                  FREE
                </span>
              )}
            </p>
            <h2 className="display text-4xl md:text-5xl mb-5">{floor.name}</h2>
            <p className="text-2xl md:text-3xl font-semibold text-ink leading-snug mb-8">
              &ldquo;{floor.tagline}&rdquo;
            </p>
          </div>

          <div className={flip ? "lg:order-1" : ""}>
            <Ticks className="panel p-7 md:p-8">
              <div className="mb-6">
                <p className="mono mb-2">
                  <span className="text-accent">A/</span> Who this floor is for
                </p>
                <p className="text-muted leading-relaxed">{floor.who}</p>
              </div>
              <div className="mb-6">
                <p className="mono mb-2">
                  <span className="text-accent">B/</span> How the AI runs it
                </p>
                <p className="text-muted leading-relaxed">{floor.ai}</p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-line">
                <p className="mono">Pricing</p>
                <span className={`font-semibold text-sm px-3 py-1.5 rounded ${floor.free ? "bg-accent text-ink border-2 border-ink" : "bg-panel2 text-ink border border-line"}`}>
                  {floor.pricing}
                </span>
              </div>
            </Ticks>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function VisionPage() {
  const rideRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: rideRef, offset: ["start 0.6", "end 0.9"] });
  const shaft = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const current = floors[active];

  return (
    <>
      <HudOverlay />

      {/* HERO */}
      <section className="relative pt-36 pb-16 md:pt-44 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg" aria-hidden="true" />
        <div className="absolute inset-x-0 top-1/3 h-[360px] glow pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <p className="mono mb-6">
            <span className="text-accent">●</span> <Scramble text="THE VISION / WHY LEVEL7 EXISTS" />
          </p>
          <h1 className="display text-hero mb-8">
            Build an empire. <span className="tilt-chip">One level</span> at a time.
          </h1>
          <div className="text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed space-y-4 text-left md:text-center">
            <p>
              Every business is a building. Some are still standing in the lobby, unsure who they are selling
              to. Some are stuck on the marketing floor, or drowning on the sales floor, or profitable but
              trapped, because everything still runs through the founder.
            </p>
            <p className="text-ink font-medium">
              LEVEL7 was founded on one idea: growth is not a leap. It is an elevator, and every floor has a
              different job. Scroll to take the ride.
            </p>
          </div>
        </div>
      </section>

      <div className="scan-rule" aria-hidden="true" />

      {/* THE RIDE */}
      <div ref={rideRef} className="relative">
        {/* elevator display: sticky, mobile-first */}
        <div className="sticky top-[82svh] lg:top-[118px] z-30 pointer-events-none" aria-hidden="true">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-end">
            <div className="bg-ink text-white rounded-md px-3 py-2 flex items-center gap-3 shadow-[3px_3px_0_#A3FF00]">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-[11px] tracking-[0.18em] tabular-nums">
                FL {current.num} <span className="text-white/40">/ 7</span>
              </span>
              {/* mini shaft */}
              <span className="relative w-10 h-1 bg-white/15 rounded-full overflow-hidden">
                <motion.span
                  style={reduce ? { scaleX: 1 } : { scaleX: shaft }}
                  className="absolute inset-0 origin-left bg-accent"
                />
              </span>
            </div>
          </div>
        </div>

        {/* shaft rail on the left edge */}
        <div className="absolute left-2 sm:left-4 top-0 bottom-0 w-px bg-line" aria-hidden="true">
          <motion.div
            style={reduce ? undefined : { scaleY: shaft }}
            className="absolute inset-0 origin-top bg-accent"
          />
        </div>

        {floors.map((floor, i) => (
          <FloorSection key={floor.num} floor={floor} index={i} onActive={setActive} />
        ))}
      </div>

      {/* WHICH FLOOR ARE YOU ON */}
      <section className="relative py-24 md:py-32 border-t-2 border-ink overflow-hidden bg-white">
        <div className="absolute inset-0 grid-bg" aria-hidden="true" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <p className="label justify-center mb-6">
            <span className="text-accent">NOW</span> Which floor are you on?
          </p>
          <h2 className="display text-section mb-8">
            The ride starts in the <span className="tilt-chip">lobby</span>. It is free.
          </h2>
          <p className="text-muted text-lg mb-12 max-w-xl mx-auto leading-relaxed">
            Fifteen questions, and you will know exactly where your business stands, what is keeping it there,
            and which floor to press next. No commitment, no pitch.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Magnetic>
              <a href={BOB_URL} className="btn-primary text-lg px-12 py-5">
                START WITH $0
                <ArrowIcon className="w-5 h-5" />
              </a>
            </Magnetic>
            <Magnetic strength={0.25}>
              <Link href="/contact" className="btn-ghost text-lg px-10 py-5">
                Talk to us first
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>
    </>
  );
}
