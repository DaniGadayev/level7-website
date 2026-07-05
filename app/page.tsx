"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { services } from "@/lib/services";
import { differentiators, processSteps } from "@/lib/social-proof";
import { Ticks, SectionHead, LogoStrip, TestimonialGrid } from "@/components/Hud";

const BOB_URL = "https://www.bob.thelevel7.ai/";

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

const stats = [
  { value: "3X-12X", label: "Return on ad spend" },
  { value: "150+", label: "Businesses growing with us" },
  { value: "11", label: "Services under one roof" },
  { value: "24/7", label: "Systems working for you" },
];

const method = [
  {
    num: "01",
    kicker: "The filter",
    title: "Your sales team never meets a bad lead",
    body: "Anyone can flood your inbox with names and phone numbers. The hard part is that eight out of ten of those names were never going to buy, and your team burns whole days finding that out. Our filtering system does the sorting before you ever see a lead: smart qualification flows ask the right questions, score the answers, and let through only the people with real intent and a real budget.",
    proof: "You spend your time closing, not qualifying.",
  },
  {
    num: "02",
    kicker: "The warm-up",
    title: "Leads arrive warm, not cold",
    body: "Most agencies consider the job done when the lead form gets submitted. In our experience that is exactly where deals are won or lost. Our after-lead journey takes over the moment someone raises a hand: instant response, helpful follow-ups, proof and answers delivered over days, not seconds. By the time your salesperson calls, the lead already knows who you are and why you are worth their money.",
    proof: "Higher trust going in. Higher close rates coming out.",
  },
  {
    num: "03",
    kicker: "The receipt",
    title: "We answer to one number: your return",
    body: "Cheap leads are nice. Quality leads are better. But the only number that decides whether marketing is working is how much money came back for every dollar that went in. That is the number we report, the number we optimize for, and the number we are comfortable being judged on. Our clients typically see returns between 3x and 12x on their ad budget once optimization settles in.",
    proof: "If it does not return, we change it until it does.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO — hyperframe: framed void, towering split type, mono telemetry */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg" aria-hidden="true" />
        <div className="absolute inset-x-0 top-1/3 h-[420px] glow pointer-events-none" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-6 pt-36 md:pt-44 pb-14">
          {/* telemetry topline */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-between mb-10 md:mb-14"
          >
            <p className="mono">
              <span className="text-accent">●</span> Growth marketing + software
            </p>
            <p className="mono hidden sm:block">For service businesses / worldwide</p>
            <p className="mono hidden md:block">EST. return 3x-12x</p>
          </motion.div>

          {/* headline: split like a frame's two edges */}
          <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible" className="display text-hero">
            Marketing that
          </motion.h1>
          <motion.h1
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="display text-hero text-right"
          >
            <span className="tilt-chip">pays</span> for itself.
          </motion.h1>

          <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
            <motion.p custom={3} variants={fadeUp} initial="hidden" animate="visible" className="text-lg text-muted leading-relaxed max-w-xl">
              LEVEL7 runs your marketing end to end. We generate the leads, filter out the noise, and warm up
              the rest before your team ever picks up the phone. Then we measure the only thing that matters:
              how much came back.
            </motion.p>
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-4 md:justify-end"
            >
              <a href={BOB_URL} className="btn-primary">
                START WITH $0
                <ArrowIcon />
              </a>
              <Link href="/services" className="btn-ghost">
                Explore our services
              </Link>
            </motion.div>
          </div>
        </div>

        {/* scanline rule */}
        <div className="scan-rule" aria-hidden="true" />

        {/* stats strip */}
        <div className="relative max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5 }}
            >
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* services marquee */}
        <div className="border-y border-line py-4 overflow-hidden" aria-hidden="true">
          <div className="marquee-track">
            {[0, 1].map((half) => (
              <div key={half} className="flex items-center shrink-0">
                {services.map((s, i) => (
                  <span key={`${half}-${s.slug}`} className="flex items-center whitespace-nowrap">
                    <span className="mono mx-6 !text-white/50">
                      <span className="text-accent mr-2">{String(i + 1).padStart(2, "0")}</span>
                      {s.shortName}
                    </span>
                    <span className="w-2 h-2 bg-accent inline-block" style={{ transform: "rotate(-8deg)" }} />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TWO ENGINES */}
      <Section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div custom={0} variants={fadeUp}>
            <SectionHead index="01" label="What we are" title="One company. Two engines." className="mb-6" />
          </motion.div>
          <motion.p custom={1} variants={fadeUp} className="text-muted text-lg max-w-2xl mb-14 leading-relaxed">
            We started as marketers. Then we got tired of the tools, so we built our own. Today those two
            sides feed each other: the agency work sharpens the software, and the software gives our clients
            an edge nobody can buy off the shelf.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div custom={2} variants={fadeUp}>
              <Ticks className="panel hot p-8 md:p-10 h-full">
                <p className="mono mb-6">
                  <span className="text-accent">A/</span> The growth agency
                </p>
                <h3 className="display text-4xl md:text-5xl mb-4">Marketing, run for you</h3>
                <p className="text-muted leading-relaxed mb-8">
                  Full-service digital marketing for service businesses that want results they can count.
                  Paid media on every platform, social, search, automation and websites. Eleven services, one
                  team, one goal: a return you can read in your bank account.
                </p>
                <Link href="/services" className="inline-flex items-center gap-2 font-semibold text-accent hover:underline underline-offset-4">
                  See all 11 services
                  <ArrowIcon />
                </Link>
              </Ticks>
            </motion.div>

            <motion.div custom={3} variants={fadeUp}>
              <Ticks className="panel hot p-8 md:p-10 h-full">
                <p className="mono mb-6">
                  <span className="text-accent">B/</span> The software we build
                </p>
                <h3 className="display text-4xl md:text-5xl mb-4">The tools behind it</h3>
                <p className="text-muted leading-relaxed mb-8">
                  The same systems that run our campaigns are products in their own right. BOB, our AI
                  employee, answers, qualifies and follows up with your leads around the clock, exactly the
                  way our own team does it.
                </p>
                <a href={BOB_URL} className="inline-flex items-center gap-2 font-semibold text-accent hover:underline underline-offset-4">
                  Meet BOB
                  <ArrowIcon />
                </a>
              </Ticks>
            </motion.div>
          </div>
        </div>
      </Section>

      <div className="divider" />

      {/* THE METHOD — typographic ledger rows */}
      <Section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div custom={0} variants={fadeUp}>
            <SectionHead
              index="02"
              label="Why businesses stay"
              title={
                <>
                  Leads are easy. <span className="tilt-chip">Returns</span> are the job.
                </>
              }
              className="mb-6"
            />
          </motion.div>
          <motion.p custom={1} variants={fadeUp} className="text-muted text-lg max-w-2xl leading-relaxed mb-16">
            Here is the whole method, in the order your leads experience it.
          </motion.p>

          <div className="border-t border-line">
            {method.map((m, i) => (
              <motion.div
                key={m.num}
                custom={i + 2}
                variants={fadeUp}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-12 border-b border-line group"
              >
                <div className="lg:col-span-2">
                  <span className="display text-6xl md:text-7xl text-white/15 group-hover:text-accent transition-colors duration-300">
                    {m.num}
                  </span>
                </div>
                <div className="lg:col-span-4">
                  <p className="mono mb-3">
                    <span className="text-accent">{"//"}</span> {m.kicker}
                  </p>
                  <h3 className="display text-3xl md:text-4xl">{m.title}</h3>
                </div>
                <div className="lg:col-span-6">
                  <p className="text-muted leading-relaxed mb-5">{m.body}</p>
                  <p className="font-semibold text-white border-l-2 border-accent pl-4">{m.proof}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* SERVICES */}
      <Section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[500px] glow pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div custom={0} variants={fadeUp}>
            <SectionHead index="03" label="The services" title="Everything under one roof." className="mb-6" />
          </motion.div>
          <motion.p custom={1} variants={fadeUp} className="text-muted text-lg max-w-2xl mb-14 leading-relaxed">
            Eleven ways to grow, run by one team that sees the whole picture. Pick one, or let the strategy
            decide which mix your business actually needs.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {services.map((s, i) => (
              <motion.div key={s.slug} custom={Math.min(i, 6)} variants={fadeUp}>
                <Link href={`/services/${s.slug}`} className="panel hot group block h-full p-6">
                  <div className="flex items-start justify-between mb-5">
                    <span className="mono !text-faint group-hover:!text-accent transition-colors">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="w-8 h-8 rounded border border-line flex items-center justify-center text-muted group-hover:bg-accent group-hover:border-accent group-hover:text-void transition-colors">
                      <ArrowIcon className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg text-white mb-2">{s.name}</h3>
                  <p className="text-sm text-muted leading-relaxed">{s.tagline}</p>
                </Link>
              </motion.div>
            ))}
            {/* the twelfth cell: CTA */}
            <motion.div custom={6} variants={fadeUp}>
              <Link href="/services" className="panel hot group flex h-full min-h-[170px] items-center justify-center p-6 border-dashed">
                <span className="inline-flex items-center gap-2 font-semibold text-accent">
                  Explore all services in depth
                  <ArrowIcon />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </Section>

      <div className="divider" />

      {/* DIFFERENTIATION */}
      <Section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div custom={0} variants={fadeUp}>
            <SectionHead
              index="04"
              label="The difference"
              title="Why we win where others burn budgets."
              className="mb-14"
            />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {differentiators.map((d, i) => (
              <motion.div key={d.num} custom={i + 1} variants={fadeUp}>
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
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* PROCESS */}
      <Section className="py-24 md:py-32 border-t border-line">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div custom={0} variants={fadeUp}>
            <SectionHead index="05" label="How an engagement runs" title="From first call to scaled budgets." className="mb-16" />
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
          <motion.p custom={6} variants={fadeUp} className="text-muted mt-10 max-w-2xl leading-relaxed">
            Optimization usually takes one to three months to settle. After that, our clients receive their
            results with the kind of consistency that makes planning next quarter a calmer conversation.
          </motion.p>
        </div>
      </Section>

      {/* PROOF */}
      <Section className="py-24 md:py-32 border-t border-line">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div custom={0} variants={fadeUp}>
            <SectionHead index="06" label="Proof" title="Clients keep the receipts." className="mb-14" />
          </motion.div>
          <motion.div custom={1} variants={fadeUp}>
            <TestimonialGrid />
          </motion.div>
          <motion.div custom={2} variants={fadeUp} className="mt-20">
            <LogoStrip />
          </motion.div>
        </div>
      </Section>

      {/* FINAL CTA */}
      <Section className="relative py-28 md:py-40 border-t border-line overflow-hidden">
        <div className="absolute inset-0 grid-bg" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-[400px] glow pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.p custom={0} variants={fadeUp} className="mono mb-8">
            <span className="text-accent">●</span> Free growth plan / no strings
          </motion.p>
          <motion.h2 custom={1} variants={fadeUp} className="display text-hero mb-8">
            Let&apos;s find out what your marketing <span className="tilt-chip">could return</span>.
          </motion.h2>
          <motion.p custom={2} variants={fadeUp} className="text-muted text-lg mb-12 max-w-xl mx-auto leading-relaxed">
            Tell us about your business. We will come back with a concrete plan: which channels, what budget,
            and the return we would aim for. If it is not a fit, we will tell you that too.
          </motion.p>
          <motion.div custom={3} variants={fadeUp} className="flex flex-wrap gap-4 justify-center">
            <a href={BOB_URL} className="btn-primary text-lg px-12 py-5">
              START WITH $0
              <ArrowIcon className="w-5 h-5" />
            </a>
            <Link href="/contact" className="btn-ghost text-lg px-10 py-5">
              Get my growth plan
            </Link>
          </motion.div>
        </div>
      </Section>
    </>
  );
}
