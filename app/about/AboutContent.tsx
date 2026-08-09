"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { differentiators, processSteps } from "@/lib/social-proof";
import { Ticks, SectionHead, LogoStrip, TestimonialGrid } from "@/components/Hud";
import { HudOverlay, Tilt, Magnetic, ImageFrame, TextBand, Scramble } from "@/components/Scrolly";

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} className={className}>
      {children}
    </motion.section>
  );
}

const ArrowIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const timeline = [
  {
    year: "The start",
    title: "An agency that hated waste",
    desc: "We started as a digital marketing team obsessed with one question: where does the budget actually go? That obsession became our method: filter hard, warm every lead, measure everything.",
  },
  {
    year: "The turn",
    title: "We got tired of the tools",
    desc: "The software we needed did not exist, so we built it. Qualification bots, after-lead journeys, reporting that speaks revenue instead of impressions.",
  },
  {
    year: "Today",
    title: "One company, two engines",
    desc: "A growth agency for service businesses worldwide, and the software that powers it. Each side makes the other sharper.",
  },
];

export default function AboutContent() {
  return (
    <>
      <HudOverlay />
      {/* HERO */}
      <section className="relative pt-36 pb-16 md:pt-44 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.p custom={0} variants={fadeUp} initial="hidden" animate="visible" className="label mb-6">
            <span className="text-accent">ABT</span> Who we are
          </motion.p>
          <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible" className="display text-hero mb-8 max-w-5xl">
            Built to make marketing <span className="tilt-chip">accountable</span>.
          </motion.h1>
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-lg md:text-xl text-muted max-w-2xl leading-relaxed"
          >
            LEVEL7 is a growth company for service businesses. We run marketing that has to prove itself in
            your bank account, and we build the software that makes that possible.
          </motion.p>
        </div>
      </section>

      <div className="scan-rule" aria-hidden="true" />

      {/* TEAM BAND */}
      <section className="py-14 overflow-hidden" aria-hidden="true">
        <TextBand text="ACCOUNTABLE MARKETING" dir={1} />
      </section>
      <section className="pb-6">
        <div className="max-w-7xl mx-auto px-6">
          <ImageFrame
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1800&auto=format&fit=crop"
            alt="The team at work"
            caption="One team / eleven services"
            ratio="aspect-[16/8] md:aspect-[16/6]"
          />
        </div>
      </section>

      {/* STORY */}
      <Section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div custom={0} variants={fadeUp}>
            <SectionHead index="01" label="The story" title="From agency, to software, to both." className="mb-14" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {timeline.map((t, i) => (
              <motion.div key={t.title} custom={i + 1} variants={fadeUp}>
                <Tilt className="h-full">
                <Ticks className="panel hot p-8 h-full">
                  <p className="mono mb-5">
                    <span className="text-accent">T{i + 1}</span> {t.year}
                  </p>
                  <h3 className="display text-3xl mb-3">{t.title}</h3>
                  <p className="text-muted leading-relaxed text-[15px]">{t.desc}</p>
                </Ticks>
                </Tilt>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* DIFFERENTIATION */}
      <Section className="py-24 md:py-32 border-t border-line">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div custom={0} variants={fadeUp}>
            <SectionHead
              index="02"
              label="The difference"
              title="Why we succeed where other agencies fail."
              className="mb-14"
            />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {differentiators.map((d, i) => (
              <motion.div key={d.num} custom={i + 1} variants={fadeUp}>
                <Tilt className="h-full">
                <Ticks className="panel hot p-8 h-full">
                  <div className="flex items-baseline justify-between mb-6">
                    <p className="mono">
                      <span className="text-accent">{d.num}</span>
                    </p>
                    <div className="text-right">
                      <span className="display text-4xl text-accent">{d.stat}</span>
                      <p className="mono mt-1">{d.statLabel}</p>
                    </div>
                  </div>
                  <h3 className="display text-3xl mb-3">{d.title}</h3>
                  <p className="text-muted leading-relaxed text-[15px]">{d.desc}</p>
                </Ticks>
                </Tilt>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* PROCESS */}
      <Section className="py-24 md:py-32 border-t border-line">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div custom={0} variants={fadeUp}>
            <SectionHead index="03" label="How we work" title="The process, step by step." className="mb-16" />
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {processSteps.map((step, i) => (
              <motion.div key={step.num} custom={i + 1} variants={fadeUp} className="panel p-7 h-full">
                <p className="mono mb-6">
                  <span className="text-accent">{step.num}</span> / 04
                </p>
                <h3 className="display text-3xl mb-3">{step.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* PROOF */}
      <Section className="py-24 md:py-32 border-t border-line">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div custom={0} variants={fadeUp}>
            <SectionHead index="04" label="Proof" title="Clients keep the receipts." className="mb-14" />
          </motion.div>
          <motion.div custom={1} variants={fadeUp}>
            <TestimonialGrid />
          </motion.div>
          <motion.div custom={2} variants={fadeUp} className="mt-20">
            <LogoStrip />
          </motion.div>
        </div>
      </Section>

      {/* SLOGAN + CTA */}
      <Section className="relative py-24 md:py-36 border-t border-line text-center overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 h-[380px] glow pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-3xl mx-auto px-6">
          <motion.p custom={0} variants={fadeUp} className="mono mb-6">
            <span className="text-accent">●</span> The slogan says it all
          </motion.p>
          <motion.h2 custom={1} variants={fadeUp} className="display text-section mb-8">
            Build an empire. <span className="tilt-chip">One level</span> at a time.
          </motion.h2>
          <motion.p custom={2} variants={fadeUp} className="text-muted text-lg mb-10 leading-relaxed max-w-xl mx-auto">
            Wherever your business stands today, there is a next level. Tell us about yours and we will map
            the way up.
          </motion.p>
          <motion.div custom={3} variants={fadeUp}>
            <Magnetic>
              <Link href="/contact" className="btn-primary">
                Get my growth plan
                <ArrowIcon />
              </Link>
            </Magnetic>
          </motion.div>
        </div>
      </Section>
    </>
  );
}
