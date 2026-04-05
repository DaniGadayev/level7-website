"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
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

export default function InvestorsPage() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#A3FF00 1px, transparent 1px), linear-gradient(90deg, #A3FF00 1px, transparent 1px)",
            backgroundSize: "100px 100px",
          }}
        />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/[0.04] rounded-full blur-[140px] pointer-events-none" />

        {/* Large decorative text */}
        <div
          className="absolute right-0 top-0 text-[25vw] font-bold select-none pointer-events-none leading-none font-satoshi text-white/[0.02]"
          aria-hidden
        >
          €300K
        </div>

        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto px-6 relative z-10"
        >
          <motion.div
            custom={0}
            variants={fadeUp}
            className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 border border-accent/20"
          >
            <span className="w-1.5 h-1.5 bg-accent animate-pulse rounded-full" />
            <span className="text-xs text-accent uppercase tracking-widest">Seed Round — Open</span>
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUp}
            className="text-5xl md:text-7xl font-bold font-satoshi mb-6 leading-tight"
          >
            Join Us at the<br />
            <span className="text-accent">Ground Floor.</span>
          </motion.h1>
          <motion.p custom={2} variants={fadeUp} className="text-text-secondary text-xl max-w-2xl leading-relaxed">
            We're raising €300,000 to take LEVEL7 global. Product is live. Traction is real. The window is open.
          </motion.p>
        </motion.div>
      </section>

      {/* The Ask */}
      <Section className="py-24 max-w-7xl mx-auto px-6">
        <motion.p custom={0} variants={fadeUp} className="text-xs uppercase tracking-widest text-accent mb-4">
          The Ask
        </motion.p>
        <motion.h2 custom={1} variants={fadeUp} className="text-4xl font-bold font-satoshi mb-12">
          The investment terms.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {[
            { label: "Raise", value: "€300,000" },
            { label: "Instrument", value: "SAFE Note" },
            { label: "Discount", value: "20%" },
            { label: "Stage", value: "Seed" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              custom={i + 2}
              variants={fadeUp}
              className="border border-white/5 p-8 bg-white/[0.02] hover:border-accent/20 transition-colors text-center"
            >
              <div className="text-3xl font-bold font-satoshi text-accent mb-2">{item.value}</div>
              <div className="text-xs uppercase tracking-widest text-text-secondary">{item.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div custom={6} variants={fadeUp} className="border border-accent/20 bg-accent/5 p-6">
          <div className="text-sm text-text-secondary leading-relaxed">
            <span className="text-accent font-bold">Entity:</span> D.T LEVEL 7 TECHNOLOGY LIMITED (Cyprus)
            <span className="mx-4 text-white/10">|</span>
            <span className="text-accent font-bold">Product:</span> Live and generating revenue
            <span className="mx-4 text-white/10">|</span>
            <span className="text-accent font-bold">Active Users:</span> 30 paying clients
          </div>
        </motion.div>
      </Section>

      <div className="lime-divider max-w-7xl mx-auto px-6" />

      {/* Market */}
      <Section className="py-24 max-w-7xl mx-auto px-6">
        <motion.p custom={0} variants={fadeUp} className="text-xs uppercase tracking-widest text-accent mb-4">
          Market Opportunity
        </motion.p>
        <motion.h2 custom={1} variants={fadeUp} className="text-4xl font-bold font-satoshi mb-12">
          A $10B market growing at 12.3% CAGR.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
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
          ].map((item, i) => (
            <motion.div
              key={item.label}
              custom={i + 2}
              variants={fadeUp}
              className="border border-white/5 p-8 bg-white/[0.02] hover:border-accent/20 transition-colors group"
            >
              <div className="text-xs text-accent uppercase tracking-widest mb-2">{item.sublabel}</div>
              <div className="text-5xl font-bold font-satoshi text-white mb-4 group-hover:text-accent transition-colors">{item.value}</div>
              <div className="text-xs text-accent font-bold mb-2">{item.label}</div>
              <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div custom={5} variants={fadeUp} className="text-center">
          <span className="text-text-secondary text-sm">Market growing at </span>
          <span className="text-accent font-bold text-lg">12.3% CAGR</span>
          <span className="text-text-secondary text-sm"> → projected </span>
          <span className="text-white font-bold">$13B by 2035</span>
        </motion.div>
      </Section>

      <div className="lime-divider max-w-7xl mx-auto px-6" />

      {/* Traction */}
      <Section className="py-24 max-w-7xl mx-auto px-6">
        <motion.p custom={0} variants={fadeUp} className="text-xs uppercase tracking-widest text-accent mb-4">
          Traction
        </motion.p>
        <motion.h2 custom={1} variants={fadeUp} className="text-4xl font-bold font-satoshi mb-12">
          This isn't theory. It's working.
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { value: "35", label: "Employees" },
            { value: "94%", label: "Client Success Rate" },
            { value: "3x–12x", label: "Average ROI" },
            { value: "30+", label: "Active Users" },
            { value: "10+", label: "Years of Methodology" },
            { value: "26+", label: "Business Niches Served" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i + 2}
              variants={fadeUp}
              className="border border-white/5 p-6 bg-white/[0.02] text-center hover:border-accent/20 transition-colors group"
            >
              <div className="text-3xl font-bold font-satoshi text-white mb-2 group-hover:text-accent transition-colors">{stat.value}</div>
              <div className="text-xs text-text-secondary uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </Section>

      <div className="lime-divider max-w-7xl mx-auto px-6" />

      {/* Use of Funds */}
      <Section className="py-24 max-w-7xl mx-auto px-6">
        <motion.p custom={0} variants={fadeUp} className="text-xs uppercase tracking-widest text-accent mb-4">
          Use of Funds
        </motion.p>
        <motion.h2 custom={1} variants={fadeUp} className="text-4xl font-bold font-satoshi mb-12">
          Where €300,000 goes.
        </motion.h2>

        <div className="space-y-4">
          {[
            { pct: 70, amount: "€210,000", label: "Marketing", desc: "Go-to-market in English-speaking markets" },
            { pct: 20, amount: "€60,000", label: "Team & Operations", desc: "Key hires and operational infrastructure" },
            { pct: 10, amount: "€30,000", label: "Product", desc: "Feature development and AI improvements" },
          ].map((item, i) => (
            <motion.div key={item.label} custom={i + 2} variants={fadeUp} className="group">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-4">
                  <span className="text-accent font-bold font-satoshi text-2xl w-14">{item.pct}%</span>
                  <div>
                    <span className="text-white font-bold">{item.label}</span>
                    <span className="text-text-secondary text-sm ml-3">{item.desc}</span>
                  </div>
                </div>
                <span className="text-text-secondary text-sm font-mono">{item.amount}</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                  className="h-full bg-accent"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <div className="lime-divider max-w-7xl mx-auto px-6" />

      {/* Milestones */}
      <Section className="py-24 max-w-7xl mx-auto px-6">
        <motion.p custom={0} variants={fadeUp} className="text-xs uppercase tracking-widest text-accent mb-4">
          Milestones
        </motion.p>
        <motion.h2 custom={1} variants={fadeUp} className="text-4xl font-bold font-satoshi mb-12">
          The 6-month roadmap.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: "◆", label: "100 paying users within 6 months" },
            { icon: "▲", label: "Launch Floors 1–3 in English" },
            { icon: "◈", label: "10 certified partners onboarded" },
            { icon: "●", label: "Book published as organic growth engine" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              custom={i + 2}
              variants={fadeUp}
              className="flex items-center gap-4 border border-white/5 p-6 bg-white/[0.02] hover:border-accent/20 transition-colors group"
            >
              <span className="text-accent text-xl shrink-0">{item.icon}</span>
              <span className="text-sm text-white group-hover:text-accent transition-colors">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </Section>

      <div className="lime-divider max-w-7xl mx-auto px-6" />

      {/* Competitive Advantage */}
      <Section className="py-24 max-w-7xl mx-auto px-6">
        <motion.p custom={0} variants={fadeUp} className="text-xs uppercase tracking-widest text-accent mb-4">
          Competitive Moat
        </motion.p>
        <motion.h2 custom={1} variants={fadeUp} className="text-4xl font-bold font-satoshi mb-12">
          Why LEVEL7 wins.
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "Stage-Specific Guidance", desc: "No competitor maps tools to business stage. Most sell the same thing to everyone." },
            { title: "AI-Powered Tools", desc: "Every floor uses AI to deliver 10x the value at a fraction of the cost of consultants." },
            { title: "Full Journey 0→Exit", desc: "We're the only platform that follows you from first offer to full exit." },
            { title: "Gamified Progression", desc: "The 'floor' metaphor creates an addictive growth journey. Users advance, not churn." },
            { title: "Certified Partner Network", desc: "Real experts backing every floor. Technology + human expertise at scale." },
            { title: "Proven Methodology", desc: "10+ years and 26+ niches means our systems are battle-tested, not theoretical." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              custom={i + 2}
              variants={fadeUp}
              className="border border-white/5 p-6 bg-white/[0.02] hover:border-accent/20 transition-all duration-300 group"
            >
              <div className="w-6 h-px bg-accent mb-4 group-hover:w-12 transition-all duration-300" />
              <div className="text-sm font-bold mb-2 group-hover:text-accent transition-colors">{item.title}</div>
              <p className="text-xs text-text-secondary leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.04] to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-bold font-satoshi mb-6"
          >
            Let's build it together.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-text-secondary text-lg mb-10"
          >
            Reach out directly. We respond to every serious inquiry personally.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Link
              href="/contact?subject=investor"
              className="inline-flex items-center gap-3 bg-accent text-background font-bold px-10 py-5 text-base hover:bg-white transition-colors duration-200 group"
            >
              Contact for Investor Inquiry
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
