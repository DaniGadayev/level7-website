"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const investmentTerms = [
  { label: "Raise", value: "€300,000" },
  { label: "Instrument", value: "SAFE Note" },
  { label: "Discount", value: "20%" },
  { label: "Stage", value: "Seed" },
];

const marketData = [
  {
    label: "TAM",
    value: "$10B",
    desc: "Global Business Coaching + SMB Growth Software",
    sublabel: "Total Addressable Market",
  },
  {
    label: "SAM",
    value: "$3B",
    desc: "English-speaking SMBs actively seeking growth systems",
    sublabel: "Serviceable Addressable Market",
  },
  {
    label: "SOM",
    value: "$30M",
    desc: "3-year target representing 0.1% of SAM",
    sublabel: "Serviceable Obtainable Market",
  },
];

const traction = [
  { value: "35", label: "Employees" },
  { value: "94%", label: "Client Success Rate" },
  { value: "3x–12x", label: "Average ROI" },
  { value: "30+", label: "Active Users" },
  { value: "10+", label: "Years of Methodology" },
  { value: "26+", label: "Business Niches Served" },
];

const funds = [
  { pct: 70, amount: "€210,000", label: "Marketing", desc: "Go-to-market in English-speaking markets" },
  { pct: 20, amount: "€60,000", label: "Team & Operations", desc: "Key hires and operational infrastructure" },
  { pct: 10, amount: "€30,000", label: "Product", desc: "Feature development and AI improvements" },
];

const milestones = [
  { icon: "◆", label: "100 paying users within 6 months" },
  { icon: "▲", label: "Launch Floors 1–3 in English" },
  { icon: "◈", label: "10 certified partners onboarded" },
  { icon: "●", label: "Book published as organic growth engine" },
];

const moat = [
  { title: "Stage-Specific Guidance", desc: "No competitor maps tools to business stage. Most sell the same thing to everyone." },
  { title: "AI-Powered Tools", desc: "Every floor uses AI to deliver 10x the value at a fraction of the cost of consultants." },
  { title: "Full Journey 0→Exit", desc: "We're the only platform that follows you from first offer to full exit." },
  { title: "Gamified Progression", desc: "The 'floor' metaphor creates an addictive growth journey. Users advance, not churn." },
  { title: "Certified Partner Network", desc: "Real experts backing every floor. Technology + human expertise at scale." },
  { title: "Proven Methodology", desc: "10+ years and 26+ niches means our systems are battle-tested, not theoretical." },
];

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} className={className}>
      {children}
    </motion.section>
  );
}

export default function InvestorsPage() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <>
      {/* ── HERO ── */}
      <section className="pt-36 pb-20 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/[0.04] rounded-full blur-[140px] pointer-events-none" />

        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto px-6 relative z-10"
        >
          <motion.div
            custom={0}
            variants={fadeUp}
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-accent/20 bg-accent/[0.06]"
          >
            <span className="w-1.5 h-1.5 bg-accent animate-pulse rounded-full" />
            <span className="text-[11px] text-accent font-bold uppercase tracking-[0.1em]">Seed Round — Open</span>
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUp}
            className="text-5xl md:text-7xl font-bold font-satoshi mb-6 leading-tight"
          >
            Join Us at the<br />
            <span className="text-accent">Ground Floor.</span>
          </motion.h1>
          <motion.p custom={2} variants={fadeUp} className="text-[#888] text-xl max-w-2xl leading-relaxed">
            We&apos;re raising €300,000 to take LEVEL7 global. Product is live. Traction is real. The window is open.
          </motion.p>
        </motion.div>
      </section>

      {/* ── INVESTMENT TERMS ── */}
      <Section className="py-24 max-w-7xl mx-auto px-6">
        <motion.p custom={0} variants={fadeUp} className="label mb-4">The Ask</motion.p>
        <motion.h2 custom={1} variants={fadeUp} className="text-4xl font-bold font-satoshi mb-12">
          The investment terms.
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {investmentTerms.map((item, i) => (
            <motion.div
              key={item.label}
              custom={i + 2}
              variants={fadeUp}
              className="card p-8 text-center group"
            >
              <div className="text-3xl font-bold font-satoshi text-accent mb-2 group-hover:scale-105 transition-transform">
                {item.value}
              </div>
              <div className="text-xs text-[#555] uppercase tracking-wider">{item.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div custom={6} variants={fadeUp} className="bg-[#141414] border border-accent/15 rounded-2xl p-6">
          <div className="flex flex-wrap gap-4 text-sm text-[#666]">
            <span><span className="text-accent font-bold">Entity:</span> D.T LEVEL 7 TECHNOLOGY LIMITED (Cyprus)</span>
            <span className="text-[#333]">|</span>
            <span><span className="text-accent font-bold">Product:</span> Live and generating revenue</span>
            <span className="text-[#333]">|</span>
            <span><span className="text-accent font-bold">Active Users:</span> 30 paying clients</span>
          </div>
        </motion.div>
      </Section>

      <div className="divider" />

      {/* ── MARKET ── */}
      <Section className="py-24 max-w-7xl mx-auto px-6 bg-[#0D0D0D]">
        <motion.p custom={0} variants={fadeUp} className="label mb-4">Market Opportunity</motion.p>
        <motion.h2 custom={1} variants={fadeUp} className="text-4xl font-bold font-satoshi mb-12">
          A $10B market growing at 12.3% CAGR.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {marketData.map((item, i) => (
            <motion.div
              key={item.label}
              custom={i + 2}
              variants={fadeUp}
              className="card p-8 group"
            >
              <div className="text-[10px] label mb-2">{item.sublabel}</div>
              <div className="text-5xl font-bold font-satoshi text-white mb-3 group-hover:text-accent transition-colors">
                {item.value}
              </div>
              <div className="text-xs text-accent font-bold mb-2 uppercase tracking-wider">{item.label}</div>
              <p className="text-sm text-[#666] leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div custom={5} variants={fadeUp} className="text-center">
          <span className="text-[#888] text-sm">Market growing at </span>
          <span className="text-accent font-bold text-lg">12.3% CAGR</span>
          <span className="text-[#888] text-sm"> → projected </span>
          <span className="text-white font-bold">$13B by 2035</span>
        </motion.div>
      </Section>

      <div className="divider" />

      {/* ── TRACTION ── */}
      <Section className="py-24 max-w-7xl mx-auto px-6">
        <motion.p custom={0} variants={fadeUp} className="label mb-4">Traction</motion.p>
        <motion.h2 custom={1} variants={fadeUp} className="text-4xl font-bold font-satoshi mb-12">
          This isn&apos;t theory. It&apos;s working.
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {traction.map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i + 2}
              variants={fadeUp}
              className="card p-6 text-center group"
            >
              <div className="text-3xl font-bold font-satoshi text-white mb-2 group-hover:text-accent transition-colors">
                {stat.value}
              </div>
              <div className="text-xs text-[#555] uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </Section>

      <div className="divider" />

      {/* ── USE OF FUNDS ── */}
      <Section className="py-24 max-w-7xl mx-auto px-6 bg-[#0D0D0D]">
        <motion.p custom={0} variants={fadeUp} className="label mb-4">Use of Funds</motion.p>
        <motion.h2 custom={1} variants={fadeUp} className="text-4xl font-bold font-satoshi mb-12">
          Where €300,000 goes.
        </motion.h2>

        <div className="space-y-5">
          {funds.map((item, i) => (
            <motion.div key={item.label} custom={i + 2} variants={fadeUp}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-5">
                  <span className="text-accent font-bold font-satoshi text-2xl w-14">{item.pct}%</span>
                  <div>
                    <span className="text-white font-bold">{item.label}</span>
                    <span className="text-[#555] text-sm ml-3">{item.desc}</span>
                  </div>
                </div>
                <span className="text-[#555] text-sm font-mono shrink-0">{item.amount}</span>
              </div>
              <div className="h-1.5 bg-[#1E1E1E] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                  className="h-full bg-accent rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <div className="divider" />

      {/* ── MILESTONES ── */}
      <Section className="py-24 max-w-7xl mx-auto px-6">
        <motion.p custom={0} variants={fadeUp} className="label mb-4">Milestones</motion.p>
        <motion.h2 custom={1} variants={fadeUp} className="text-4xl font-bold font-satoshi mb-12">
          The 6-month roadmap.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {milestones.map((item, i) => (
            <motion.div
              key={item.label}
              custom={i + 2}
              variants={fadeUp}
              className="card p-6 flex items-center gap-4 group"
            >
              <span className="text-accent text-xl shrink-0">{item.icon}</span>
              <span className="text-sm text-white group-hover:text-accent transition-colors font-medium">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </Section>

      <div className="divider" />

      {/* ── COMPETITIVE MOAT ── */}
      <Section className="py-24 max-w-7xl mx-auto px-6 bg-[#0D0D0D]">
        <motion.p custom={0} variants={fadeUp} className="label mb-4">Competitive Moat</motion.p>
        <motion.h2 custom={1} variants={fadeUp} className="text-4xl font-bold font-satoshi mb-12">
          Why LEVEL7 wins.
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {moat.map((item, i) => (
            <motion.div
              key={item.title}
              custom={i + 2}
              variants={fadeUp}
              className="card p-6 group"
            >
              <div className="w-6 h-0.5 bg-accent rounded-full mb-4 group-hover:w-12 transition-all duration-300" />
              <div className="text-sm font-bold mb-2 group-hover:text-accent transition-colors font-satoshi">{item.title}</div>
              <p className="text-xs text-[#555] leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ── CTA ── */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.03] to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold font-satoshi mb-6 leading-tight"
          >
            Let&apos;s build it together.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[#888] text-lg mb-10"
          >
            Reach out directly. We respond to every serious inquiry personally.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              href="/contact?subject=investor"
              className="btn-primary text-base px-10 py-5 glow-accent"
            >
              Contact for Investor Inquiry
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
