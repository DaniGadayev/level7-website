"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { HeroIllustration, AgencyGlyph, SoftwareGlyph } from "@/components/Illustrations";

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

const values = [
  {
    title: "Judged by the return",
    desc: "Every campaign, page and sequence we build answers to one number: how much money it brought back. If we cannot measure it, we do not sell it.",
  },
  {
    title: "Systems over heroics",
    desc: "Great months should not depend on someone having a great week. We build systems that filter, warm and follow up on every lead, every time.",
  },
  {
    title: "Simplicity and clarity",
    desc: "You will always know what we are doing, why we are doing it, and what it returned. Reports in plain language, numbers you can check.",
  },
  {
    title: "Built for the long game",
    desc: "Quick wins are nice. Compounding is better. We build assets that keep working: rankings, audiences, automations and trust.",
  },
];

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

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 pt-32 md:pt-40 text-center">
          <motion.p custom={0} variants={fadeUp} initial="hidden" animate="visible" className="label justify-center mb-6">
            Who we are
          </motion.p>
          <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible" className="display text-hero mb-7">
            Built to make marketing{" "}
            <span className="tilt-chip">accountable</span>.
          </motion.h1>
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-4 leading-relaxed"
          >
            LEVEL7 is a growth company for service businesses. We run marketing that has to prove itself in
            your bank account, and we build the software that makes that possible.
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          <div className="sm:hidden">
            <HeroIllustration viewBox="20 120 680 430" />
          </div>
          <div className="hidden sm:block">
            <HeroIllustration />
          </div>
        </motion.div>
      </section>

      {/* STORY TIMELINE */}
      <Section className="py-24 md:py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <motion.p custom={0} variants={fadeUp} className="label mb-5">
            The story
          </motion.p>
          <motion.h2 custom={1} variants={fadeUp} className="display text-section mb-16 max-w-3xl">
            From agency, to software, to both.
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {timeline.map((t, i) => (
              <motion.div key={t.title} custom={i + 2} variants={fadeUp} className="card p-8 bg-white">
                <p className="label mb-4">{t.year}</p>
                <h3 className="display text-3xl mb-3">{t.title}</h3>
                <p className="text-muted leading-relaxed text-[15px]">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* TWO ENGINES */}
      <Section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.p custom={0} variants={fadeUp} className="label mb-5">
            What we do
          </motion.p>
          <motion.h2 custom={1} variants={fadeUp} className="display text-section mb-16 max-w-3xl">
            The agency and the software feed each other.
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div custom={2} variants={fadeUp} className="card p-8 md:p-10">
              <AgencyGlyph />
              <h3 className="display text-3xl md:text-4xl mt-6 mb-3">The growth agency</h3>
              <p className="text-muted leading-relaxed mb-6">
                Twelve services under one roof, run by one team that sees the whole picture. Every channel
                feeds the same lead system: filtered on the way in, warmed after they arrive, measured by
                what came back.
              </p>
              <Link href="/services" className="inline-flex items-center gap-2 font-semibold text-ink underline decoration-accent decoration-[3px] underline-offset-4 hover:decoration-ink transition-colors">
                See the services
                <ArrowIcon />
              </Link>
            </motion.div>
            <motion.div custom={3} variants={fadeUp} className="card p-8 md:p-10">
              <SoftwareGlyph />
              <h3 className="display text-3xl md:text-4xl mt-6 mb-3">The software we build</h3>
              <p className="text-muted leading-relaxed mb-6">
                The tools we wished existed, so we built them. BOB, our AI employee, answers, qualifies and
                follows up with leads around the clock, trained on the same method our own team runs.
              </p>
              <a href="https://getbob.thelevel7.ai/" className="inline-flex items-center gap-2 font-semibold text-ink underline decoration-accent decoration-[3px] underline-offset-4 hover:decoration-ink transition-colors">
                Meet BOB
                <ArrowIcon />
              </a>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* VALUES */}
      <Section className="py-24 md:py-32 bg-[#0A0A0A] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.p custom={0} variants={fadeUp} className="label on-dark mb-5">
            How we work
          </motion.p>
          <motion.h2 custom={1} variants={fadeUp} className="display text-section mb-16 max-w-3xl">
            The rules we do not break.
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                custom={i + 2}
                variants={fadeUp}
                className="rounded-2xl border-2 border-white/12 p-8 hover:border-accent transition-colors duration-200"
              >
                <span className="display text-2xl text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-semibold text-xl text-white mt-3 mb-3">{v.title}</h3>
                <p className="text-white/55 leading-relaxed text-[15px]">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* SLOGAN + CTA */}
      <Section className="py-24 md:py-32 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <motion.p custom={0} variants={fadeUp} className="label justify-center mb-6">
            The slogan says it all
          </motion.p>
          <motion.h2 custom={1} variants={fadeUp} className="display text-section mb-8">
            Build an empire. <span className="tilt-chip">One level</span> at a time.
          </motion.h2>
          <motion.p custom={2} variants={fadeUp} className="text-muted text-lg mb-10 leading-relaxed max-w-xl mx-auto">
            Wherever your business stands today, there is a next level. Tell us about yours and we will map
            the way up.
          </motion.p>
          <motion.div custom={3} variants={fadeUp}>
            <Link href="/contact" className="btn-primary">
              Get my growth plan
              <ArrowIcon />
            </Link>
          </motion.div>
        </div>
      </Section>
    </>
  );
}
