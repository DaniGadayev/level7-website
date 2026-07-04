"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { services } from "@/lib/services";
import {
  LeadsInScene,
  BusyScene,
  FilterIllustration,
  WarmingIllustration,
  RoiIllustration,
  AgencyGlyph,
  SoftwareGlyph,
} from "@/components/Illustrations";

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

const method = [
  {
    kicker: "Step one: the filter",
    title: "Your sales team never meets a bad lead",
    body: "Anyone can flood your inbox with names and phone numbers. That was never the hard part. The hard part is that eight out of ten of those names were never going to buy, and your team burns whole days finding that out. So we built a filtering system that does the sorting before you ever see a lead. Smart qualification flows ask the right questions, score the answers, and let through only the people with real intent and a real budget.",
    proof: "You spend your time closing, not qualifying.",
    art: <FilterIllustration />,
  },
  {
    kicker: "Step two: the warm-up",
    title: "Leads arrive warm, not cold",
    body: "Most agencies consider the job done when the lead form gets submitted. In our experience that is exactly where deals are won or lost. Our after-lead journey takes over the moment someone raises a hand: instant response, helpful follow-ups, proof and answers delivered over days, not seconds. By the time your salesperson calls, the lead already knows who you are and why you are worth their money.",
    proof: "Higher trust going in. Higher close rates coming out.",
    art: <WarmingIllustration />,
  },
  {
    kicker: "Step three: the receipt",
    title: "We answer to one number: your return",
    body: "Cheap leads are nice. Quality leads are better. But the only number that decides whether marketing is working is how much money came back for every dollar that went in. That is the number we report, the number we optimize for, and the number we are comfortable being judged on. Our clients typically see returns between 3x and 12x on their ad budget once optimization settles in.",
    proof: "If it does not return, we change it until it does.",
    art: <RoiIllustration />,
  },
];

const steps = [
  {
    n: "01",
    title: "Strategy",
    desc: "We dig into your business, your numbers and your market, then build a plan around what a customer is actually worth to you.",
  },
  {
    n: "02",
    title: "Funnels",
    desc: "Campaigns, landing pages, filtering flows and follow-up sequences get built as one connected system, not as separate pieces.",
  },
  {
    n: "03",
    title: "Daily optimization",
    desc: "Real people review your numbers every day and make small corrections constantly. That is where returns are made.",
  },
  {
    n: "04",
    title: "Scale",
    desc: "Once the math proves itself, we raise budgets methodically and protect your return while the volume grows.",
  },
];

const stats = [
  { value: "3x-12x", label: "Return on ad spend" },
  { value: "12", label: "Services under one roof" },
  { value: "30+", label: "Businesses growing with us" },
  { value: "24/7", label: "Systems working for you" },
];

export default function HomePage() {
  return (
    <>
      {/* HERO — Lemonade structure: copy centered between two scenes that
          bleed off the page edges and share one ground line */}
      <section className="bg-white overflow-hidden">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,660px)_minmax(0,1fr)] lg:items-end lg:gap-2 pt-28 md:pt-36">
          {/* left scene: filtered leads walking in */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block self-end -ml-6"
            aria-hidden="true"
          >
            <LeadsInScene />
          </motion.div>

          {/* centered copy */}
          <div className="text-center px-6 lg:pb-24">
            <motion.p custom={0} variants={fadeUp} initial="hidden" animate="visible" className="label justify-center mb-5">
              Growth marketing, plus the software behind it
            </motion.p>
            <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible" className="display text-hero mb-6">
              Marketing that{" "}
              <span className="tilt-chip">pays</span>
              <br />
              for itself.
            </motion.h1>

            {/* mobile: one short line, then the scene, then the buttons */}
            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="lg:hidden text-lg text-muted max-w-md mx-auto mb-2 leading-relaxed"
            >
              We run your marketing, filter your leads, and measure one thing: how much came back.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden -mx-6"
              aria-hidden="true"
            >
              <BusyScene viewBox="0 88 460 444" />
            </motion.div>

            {/* desktop: the full paragraph */}
            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="hidden lg:block text-xl text-muted max-w-xl mx-auto mb-9 leading-relaxed"
            >
              LEVEL7 runs your marketing end to end. We generate the leads, filter out the noise, and warm up
              the rest before your team ever picks up the phone. Then we measure the only thing that matters:
              how much came back.
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-4 justify-center mt-6 lg:mt-0"
            >
              <Link href="/contact" className="btn-primary">
                Get my growth plan
                <ArrowIcon />
              </Link>
              <Link href="/services" className="btn-ghost">
                Explore our services
              </Link>
            </motion.div>
          </div>

          {/* right scene: the busy business */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block self-end -mr-6"
            aria-hidden="true"
          >
            <BusyScene />
          </motion.div>
        </div>

        {/* services marquee */}
        <div className="bg-[#0A0A0A] py-5 overflow-hidden" aria-hidden="true">
          <div className="marquee-track">
            {[0, 1].map((half) => (
              <div key={half} className="flex items-center shrink-0">
                {services.map((s) => (
                  <span key={`${half}-${s.slug}`} className="flex items-center text-white/60 text-sm font-medium whitespace-nowrap">
                    <span className="mx-6">{s.shortName}</span>
                    <span className="w-2.5 h-2.5 bg-accent inline-block" style={{ transform: "rotate(-8deg)" }} />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <Section className="py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((s, i) => (
            <motion.div key={s.label} custom={i} variants={fadeUp} className="text-center lg:text-left">
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* TWO ENGINES */}
      <Section className="py-24 md:py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <motion.p custom={0} variants={fadeUp} className="label mb-5">
            What we are
          </motion.p>
          <motion.h2 custom={1} variants={fadeUp} className="display text-section mb-6 max-w-3xl">
            One company. Two engines.
          </motion.h2>
          <motion.p custom={2} variants={fadeUp} className="text-muted text-lg max-w-2xl mb-14 leading-relaxed">
            We started as marketers. Then we got tired of the tools, so we built our own. Today those two sides
            feed each other: the agency work sharpens the software, and the software gives our clients an edge
            nobody can buy off the shelf.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div custom={3} variants={fadeUp} className="card p-8 md:p-10 bg-white">
              <AgencyGlyph />
              <h3 className="display text-3xl md:text-4xl mt-6 mb-3">The growth agency</h3>
              <p className="text-muted leading-relaxed mb-6">
                Full-service digital marketing for businesses that want results they can count. Search, social,
                paid media, native, automation and websites. Twelve services, one team, one goal: a return you
                can read in your bank account.
              </p>
              <Link href="/services" className="inline-flex items-center gap-2 font-semibold text-ink underline decoration-accent decoration-[3px] underline-offset-4 hover:decoration-ink transition-colors">
                See all 12 services
                <ArrowIcon />
              </Link>
            </motion.div>

            <motion.div custom={4} variants={fadeUp} className="card p-8 md:p-10 bg-white">
              <SoftwareGlyph />
              <h3 className="display text-3xl md:text-4xl mt-6 mb-3">The software we build</h3>
              <p className="text-muted leading-relaxed mb-6">
                The same systems that run our campaigns are products in their own right. BOB, our AI employee,
                answers, qualifies and follows up with your leads around the clock, exactly the way our own
                team does it.
              </p>
              <a href="https://getbob.thelevel7.ai/" className="inline-flex items-center gap-2 font-semibold text-ink underline decoration-accent decoration-[3px] underline-offset-4 hover:decoration-ink transition-colors">
                Meet BOB
                <ArrowIcon />
              </a>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* THE METHOD */}
      <div className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <Section>
            <motion.p custom={0} variants={fadeUp} className="label mb-5">
              Why businesses stay with us
            </motion.p>
            <motion.h2 custom={1} variants={fadeUp} className="display text-section mb-6 max-w-4xl">
              Leads are easy. <span className="tilt-chip">Returns</span> are the job.
            </motion.h2>
            <motion.p custom={2} variants={fadeUp} className="text-muted text-lg max-w-2xl leading-relaxed">
              Here is the whole method, in the order your leads experience it.
            </motion.p>
          </Section>

          <div className="mt-20 space-y-24 md:space-y-32">
            {method.map((m, i) => (
              <Section key={m.title}>
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center`}>
                  <motion.div custom={0} variants={fadeUp} className={i % 2 === 1 ? "lg:order-2" : ""}>
                    <p className="label mb-4">{m.kicker}</p>
                    <h3 className="display text-4xl md:text-5xl mb-6">{m.title}</h3>
                    <p className="text-muted leading-relaxed mb-6 text-[17px]">{m.body}</p>
                    <p className="font-semibold text-ink border-l-4 border-accent pl-4">{m.proof}</p>
                  </motion.div>
                  <motion.div custom={1} variants={fadeUp} className={`max-w-md mx-auto w-full ${i % 2 === 1 ? "lg:order-1" : ""}`} aria-hidden="true">
                    {m.art}
                  </motion.div>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <Section className="py-24 md:py-32 bg-[#0A0A0A] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.p custom={0} variants={fadeUp} className="label on-dark mb-5">
            The services
          </motion.p>
          <motion.h2 custom={1} variants={fadeUp} className="display text-section mb-6">
            Everything under one roof.
          </motion.h2>
          <motion.p custom={2} variants={fadeUp} className="text-white/60 text-lg max-w-2xl mb-14 leading-relaxed">
            Twelve ways to grow, run by one team that sees the whole picture. Pick one, or let the strategy
            decide which mix your business actually needs.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((s, i) => (
              <motion.div key={s.slug} custom={Math.min(i, 6)} variants={fadeUp}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group block h-full rounded-2xl border-2 border-white/12 p-6 transition-all duration-200 hover:border-accent hover:-translate-y-1 focus-visible:border-accent"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="display text-2xl text-white/25 group-hover:text-accent transition-colors">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="w-8 h-8 rounded-full border-2 border-white/15 flex items-center justify-center text-white/40 group-hover:bg-accent group-hover:border-accent group-hover:text-ink transition-colors">
                      <ArrowIcon className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg text-white mb-2">{s.name}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{s.tagline}</p>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div custom={7} variants={fadeUp} className="mt-12">
            <Link href="/services" className="btn-ghost on-dark">
              Explore all services in depth
              <ArrowIcon />
            </Link>
          </motion.div>
        </div>
      </Section>

      {/* PROCESS */}
      <Section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.p custom={0} variants={fadeUp} className="label mb-5">
            How an engagement runs
          </motion.p>
          <motion.h2 custom={1} variants={fadeUp} className="display text-section mb-16 max-w-3xl">
            From first call to scaled budgets.
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div key={step.n} custom={i + 2} variants={fadeUp} className="card p-7 bg-white">
                <div className="display text-5xl text-accent mb-5" style={{ WebkitTextStroke: "1.5px #0A0A0A" }}>
                  {step.n}
                </div>
                <h3 className="font-semibold text-lg mb-3">{step.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.p custom={6} variants={fadeUp} className="text-muted mt-12 max-w-2xl leading-relaxed">
            Optimization usually takes one to three months to settle. After that, our clients receive their
            results with the kind of consistency that makes planning next quarter a calmer conversation.
          </motion.p>
        </div>
      </Section>

      {/* FINAL CTA */}
      <Section className="py-28 md:py-36 bg-[#0A0A0A] text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.p custom={0} variants={fadeUp} className="label on-dark justify-center mb-8">
            Free growth plan, no strings
          </motion.p>
          <motion.h2 custom={1} variants={fadeUp} className="display text-hero mb-8">
            Let&apos;s find out what your marketing{" "}
            <span className="tilt-chip">could return</span>.
          </motion.h2>
          <motion.p custom={2} variants={fadeUp} className="text-white/60 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
            Tell us about your business. We will come back with a concrete plan: which channels, what budget,
            and the return we would aim for. If it is not a fit, we will tell you that too.
          </motion.p>
          <motion.div custom={3} variants={fadeUp}>
            <Link href="/contact" className="btn-primary on-dark text-lg px-12 py-5">
              Get my growth plan
              <ArrowIcon className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </Section>
    </>
  );
}
