"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { differentiators } from "@/lib/social-proof";
import { Ticks, SectionHead, TestimonialGrid, LogoStrip } from "@/components/Hud";
import { HudOverlay, Tilt, Magnetic } from "@/components/Scrolly";

/*
 * The after-lead page. Sent to leads right after they leave their details,
 * so its one job is to set expectations and build trust before the first call.
 */

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

const together = [
  {
    num: "01",
    title: "A first conversation",
    desc: "A short call to understand your business, your goals and your numbers. No pitch, no pressure. We are checking fit in both directions.",
  },
  {
    num: "02",
    title: "A business and marketing questionnaire",
    desc: "A focused mapping of your offer, your audience and what a customer is worth to you. This is the raw material your strategy gets built from.",
  },
  {
    num: "03",
    title: "Building your marketing funnels",
    desc: "If we both decide to move forward, we build the system: campaigns, filtering flows and the after-lead journey, all wired to one number, your return.",
  },
];

export default function WelcomePage() {
  return (
    <>
      <HudOverlay />
      {/* HERO — mobile-first: short, warm, expectation-setting */}
      <section className="relative pt-36 pb-14 md:pt-44 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg" aria-hidden="true" />
        <div className="absolute inset-x-0 top-1/4 h-[360px] glow pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.p custom={0} variants={fadeUp} initial="hidden" animate="visible" className="mono mb-6">
            <span className="text-accent">●</span> Your details are in
          </motion.p>
          <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible" className="display text-hero mb-6">
            <span className="tilt-chip">Welcome</span>.
          </motion.h1>
          <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible" className="text-xl md:text-2xl text-ink font-medium mb-4">
            We will be in touch very soon.
          </motion.p>
          <motion.p custom={3} variants={fadeUp} initial="hidden" animate="visible" className="text-muted text-lg max-w-xl mx-auto leading-relaxed">
            Until then, two minutes of reading. This page explains who you are about to talk to, how we work,
            and what happens next. So the first call already feels like the second one.
          </motion.p>
        </div>
      </section>

      <div className="scan-rule" aria-hidden="true" />

      {/* HONESTY SECTION */}
      <Section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div custom={0} variants={fadeUp}>
            <SectionHead index="01" label="A word before we talk" title="Digital marketing is a crowded field." className="mb-8" />
          </motion.div>
          <motion.div custom={1} variants={fadeUp} className="space-y-5 text-lg text-muted leading-relaxed">
            <p>
              Everyone promises leads. Everyone shows screenshots. You have probably been burned at least
              once, and honestly, that is exactly why this page exists.
            </p>
            <p>
              We choose the clients we work with carefully, because our reputation is built on one thing:
              results that show up in your revenue, not in a slide deck. When we say yes to a business, it is
              because we believe we can multiply what it puts in.
            </p>
            <p className="text-ink font-medium">
              The clients we do take on get results beyond anything they were promised before. That is the
              standard you should hold us to.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* DIFFERENTIATION */}
      <Section className="py-20 md:py-28 border-t border-line">
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

      {/* WHAT WE DO TOGETHER */}
      <Section className="py-20 md:py-28 border-t border-line">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div custom={0} variants={fadeUp}>
            <SectionHead index="03" label="Next steps" title="What are we going to do together?" className="mb-14" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {together.map((t, i) => (
              <motion.div key={t.num} custom={i + 1} variants={fadeUp}>
                <Tilt className="h-full">
                <Ticks className="panel hot p-8 h-full">
                  <p className="mono mb-6">
                    <span className="text-accent">{t.num}</span> / 03
                  </p>
                  <h3 className="display text-3xl mb-3">{t.title}</h3>
                  <p className="text-muted leading-relaxed text-[15px]">{t.desc}</p>
                </Ticks>
                </Tilt>
              </motion.div>
            ))}
          </div>
          <motion.div custom={4} variants={fadeUp} className="text-center">
            <Magnetic>
              <Link href="/contact" className="btn-primary text-lg px-10 py-5">
                Book your call now
                <ArrowIcon className="w-5 h-5" />
              </Link>
            </Magnetic>
            <p className="mono mt-4">Or just wait, we are already on it.</p>
          </motion.div>
        </div>
      </Section>

      {/* PROOF */}
      <Section className="py-20 md:py-28 border-t border-line">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div custom={0} variants={fadeUp}>
            <SectionHead index="04" label="Clients speak" title="Do not take our word for it." className="mb-14" />
          </motion.div>
          <motion.div custom={1} variants={fadeUp}>
            <TestimonialGrid />
          </motion.div>
          <motion.div custom={2} variants={fadeUp} className="mt-16">
            <LogoStrip />
          </motion.div>
        </div>
      </Section>
    </>
  );
}
