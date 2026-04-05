"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const floors = [
  {
    num: "L",
    label: "Lobby",
    name: "DNA & Offer",
    tagline: "You don't need a better product. You need to know who you're selling to.",
    who: "Starting out or stuck with a vague offer. No stable income, no defined audience.",
    ai: "Answer 15 questions → AI builds your value proposition + tells you which floor to start on.",
    pricing: "Free",
    free: true,
    lottie: "https://assets9.lottiefiles.com/packages/lf20_jcikwtux.json",
  },
  {
    num: "1",
    label: "Floor 1",
    name: "Organic Marketing",
    tagline: "No one will find you if you don't exist.",
    who: "Has a defined offer but zero digital presence. Not publishing content. Not on any platform.",
    ai: "Define audience + offer → AI generates platform-optimized content weekly. You just hit publish.",
    pricing: "Monthly subscription",
    free: false,
    lottie: "https://assets2.lottiefiles.com/packages/lf20_sy6mqxhp.json",
  },
  {
    num: "2",
    label: "Floor 2",
    name: "Paid Marketing",
    tagline: "A lead machine that works while you sleep.",
    who: "Organic is working but volume is too small. Needs leads without the time dependency.",
    ai: "Automatic campaign optimization, performance alerts, audience expansion — around the clock.",
    pricing: "Monthly subscription + % of media budget",
    free: false,
    lottie: "https://assets3.lottiefiles.com/packages/lf20_touohxv0.json",
  },
  {
    num: "3",
    label: "Floor 3",
    name: "Sales",
    tagline: "Leads without a sales process is a leaky bucket.",
    who: "Has leads but isn't closing. Every call is different. No defined structure.",
    ai: "Auto-builds sales scripts by business type. AI coach analyzes call recordings with scoring.",
    pricing: "Monthly subscription + one-time setup fee",
    free: false,
    lottie: "https://assets7.lottiefiles.com/packages/lf20_yd8fbnml.json",
  },
  {
    num: "4",
    label: "Floor 4",
    name: "Team & Staff",
    tagline: "Your business is stuck because it's built around you, not a system.",
    who: "Sales are good but overwhelmed. Everything runs through the founder.",
    ai: "Smart ops dashboard aggregating all departments. AI writes SOPs and job descriptions.",
    pricing: "Monthly subscription + partner coaching",
    free: false,
    lottie: "https://assets5.lottiefiles.com/packages/lf20_nkpgztkh.json",
  },
  {
    num: "5",
    label: "Floor 5",
    name: "Finance",
    tagline: "You're not poor in money. You're poor in financial information.",
    who: "Has stable revenue but no visibility on where money goes. Discovers problems too late.",
    ai: "Real-time financial dashboard — profit, cash flow, money leak alerts, forecasting.",
    pricing: "Software subscription + one-time course + partner",
    free: false,
    lottie: "https://assets6.lottiefiles.com/packages/lf20_vctzcmit.json",
  },
  {
    num: "6",
    label: "Floor 6",
    name: "Scale",
    tagline: "Your next growth won't come from you — it'll come from the system you build.",
    who: "Profitable business with a small team. Growth is stuck. Wants to become a brand.",
    ai: "Automatic KPI tracking, ambassador identification, community management, media monitoring.",
    pricing: "High subscription + intensive partner coaching",
    free: false,
    lottie: "https://assets4.lottiefiles.com/packages/lf20_iorpbol0.json",
  },
  {
    num: "7",
    label: "Floor 7",
    name: "Empire",
    tagline: "A real business is one that works without you.",
    who: "Large profitable business where the founder is still the bottleneck.",
    ai: "Founder dashboard: sees everything, manages nothing. AI replaces founder in routine decisions.",
    pricing: "Senior partner coaching + software",
    free: false,
    lottie: "https://assets8.lottiefiles.com/packages/lf20_qp1q7mct.json",
  },
];

function FloorSection({ floor, index }: { floor: (typeof floors)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="py-20 border-b border-[#E5E5E5] last:border-0"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${!isEven ? "lg:flex lg:flex-row-reverse" : ""}`}>
          {/* Lottie */}
          <motion.div
            custom={0}
            variants={fadeUp}
            className="flex items-center justify-center bg-[#F7F7F7] rounded-3xl p-12 min-h-[320px]"
          >
            <div
              id={floor.num === "L" ? "illustration-lobby" : `illustration-floor${floor.num}`}
              className="border-2 border-dashed border-[#D8D8D8] rounded-xl"
              style={{ width: 240, height: 240 }}
            />
          </motion.div>

          {/* Content */}
          <div className={isEven ? "" : "lg:pr-8"}>
            {/* Floor badge */}
            <motion.div custom={1} variants={fadeUp} className="flex items-center gap-3 mb-6">
              <div
                className="text-6xl font-bold font-satoshi leading-none select-none"
                style={{ color: "#A3FF00", letterSpacing: "-0.04em" }}
              >
                {floor.num}
              </div>
              <div>
                <div className="text-[10px] label">{floor.label}</div>
                {floor.free && (
                  <span className="inline-flex mt-1 items-center px-2.5 py-0.5 rounded-full bg-accent text-[#1A1A1A] text-[10px] font-bold uppercase tracking-wider">
                    FREE
                  </span>
                )}
              </div>
            </motion.div>

            <motion.h2
              custom={2}
              variants={fadeUp}
              className="font-bold font-satoshi text-[#1A1A1A] mb-4"
              style={{ fontSize: "clamp(1.8rem,3vw,2.5rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
            >
              {floor.name}
            </motion.h2>

            <motion.p custom={3} variants={fadeUp} className="text-lg text-[#6B6B6B] mb-8 leading-relaxed italic">
              &ldquo;{floor.tagline}&rdquo;
            </motion.p>

            <div className="space-y-4">
              <motion.div custom={4} variants={fadeUp} className="p-5 rounded-2xl bg-[#F7F7F7] border border-[#E5E5E5]">
                <div className="text-[10px] label mb-1.5">Who It&apos;s For</div>
                <p className="text-sm text-[#6B6B6B] leading-relaxed">{floor.who}</p>
              </motion.div>
              <motion.div custom={5} variants={fadeUp} className="p-5 rounded-2xl bg-[#F7F7F7] border border-[#E5E5E5]">
                <div className="text-[10px] label mb-1.5">AI Role</div>
                <p className="text-sm text-[#6B6B6B] leading-relaxed">{floor.ai}</p>
              </motion.div>
            </div>

            <motion.div custom={6} variants={fadeUp} className="mt-6 flex items-center gap-3">
              <span className="inline-flex items-center px-4 py-2 rounded-full border border-[#E5E5E5] text-sm font-semibold text-[#1A1A1A]">
                {floor.pricing}
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesPage() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <>
      {/* ── HERO ── */}
      <section className="pt-36 pb-20 border-b border-[#E5E5E5]">
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto px-6"
        >
          <motion.p custom={0} variants={fadeUp} className="label mb-4">
            The Platform
          </motion.p>
          <motion.h1
            custom={1}
            variants={fadeUp}
            className="font-bold font-satoshi text-[#1A1A1A] mb-6"
            style={{ fontSize: "clamp(2.8rem,6vw,5rem)", lineHeight: 1.05, letterSpacing: "-0.025em" }}
          >
            The right tool.<br />
            The right stage.<br />
            <span className="text-accent">Every time.</span>
          </motion.h1>
          <motion.p custom={2} variants={fadeUp} className="text-[#6B6B6B] text-xl max-w-2xl leading-relaxed">
            Businesses don&apos;t fail because they&apos;re bad — they fail because they&apos;re using the wrong tools at the wrong stage. Eight floors. Each one precision-built for exactly where you are.
          </motion.p>
        </motion.div>
      </section>

      {/* ── FLOORS ── */}
      <div>
        {floors.map((floor, i) => (
          <FloorSection key={floor.num} floor={floor} index={i} />
        ))}
      </div>

      {/* ── CTA ── */}
      <section className="py-28 bg-[#1A1A1A] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-bold font-satoshi text-white mb-6"
            style={{ fontSize: "clamp(2rem,4vw,3.5rem)", lineHeight: 1.05, letterSpacing: "-0.025em" }}
          >
            Not sure which floor<br />you&apos;re on?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white/60 text-lg mb-10 leading-relaxed"
          >
            Take the free AI diagnostic — 5 minutes, and you&apos;ll know exactly where to start.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/contact" className="btn-primary text-base px-10 py-5">
              Start Free Diagnostic
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
