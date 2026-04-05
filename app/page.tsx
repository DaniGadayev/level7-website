"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const floors = [
  { num: "L", label: "Lobby", tagline: "DNA & Offer — Know who you're selling to", color: "from-white/5" },
  { num: "1", label: "Organic Marketing", tagline: "No one will find you if you don't exist", color: "from-accent/10" },
  { num: "2", label: "Paid Marketing", tagline: "A lead machine that works while you sleep", color: "from-white/5" },
  { num: "3", label: "Sales", tagline: "Leads without a sales process is a leaky bucket", color: "from-accent/10" },
  { num: "4", label: "Team & Staff", tagline: "Stop being the bottleneck in your own business", color: "from-white/5" },
  { num: "5", label: "Finance", tagline: "You're not poor in money — you're poor in information", color: "from-accent/10" },
  { num: "6", label: "Scale", tagline: "Your next growth won't come from you", color: "from-white/5" },
  { num: "7", label: "Empire", tagline: "A real business is one that works without you", color: "from-accent/10" },
];

const stats = [
  { value: "35", label: "Employees" },
  { value: "94%", label: "Client Success Rate" },
  { value: "3x–12x", label: "Average ROI" },
  { value: "30+", label: "Active Users" },
];

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.section>
  );
}

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Grid lines background */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#A3FF00 1px, transparent 1px), linear-gradient(90deg, #A3FF00 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Radial glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

        {/* Large decorative 7 */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 text-[40vw] font-bold text-white/[0.02] select-none pointer-events-none leading-none font-satoshi"
          aria-hidden
        >
          7
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 relative z-10 w-full">
          <div className="max-w-4xl">
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 border border-accent/20 rounded-full"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-xs text-text-secondary uppercase tracking-widest">
                AI-Powered Business Growth
              </span>
            </motion.div>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-5xl md:text-7xl lg:text-[90px] font-bold leading-[0.95] tracking-tight font-satoshi mb-8"
            >
              Build an Empire.
              <br />
              <span className="text-accent">One Level</span>
              <br />
              at a Time.
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-lg text-text-secondary max-w-xl mb-10 leading-relaxed"
            >
              The right tool, at the right stage, every time. LEVEL7 is an AI-powered platform with 8 floors — each one designed for exactly where you are right now.
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-accent text-background font-bold px-8 py-4 text-sm hover:bg-white transition-colors duration-200 group"
              >
                Start Your Diagnostic — Free
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 border border-white/10 text-white font-medium px-8 py-4 text-sm hover:border-accent/50 hover:text-accent transition-all duration-200"
              >
                Explore the 7 Floors
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHAT IS LEVEL7 */}
      <Section className="py-28 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.p custom={0} variants={fadeUp} className="text-xs uppercase tracking-widest text-accent mb-4">
              What is LEVEL7?
            </motion.p>
            <motion.h2 custom={1} variants={fadeUp} className="text-4xl md:text-5xl font-bold font-satoshi mb-6 leading-tight">
              Your business has a GPS now.
            </motion.h2>
            <motion.p custom={2} variants={fadeUp} className="text-text-secondary leading-relaxed mb-6">
              Most business owners are using the wrong tools at the wrong time. LEVEL7 diagnoses exactly where you are and gives you the exact product you need — not what everyone else is using.
            </motion.p>
            <motion.p custom={3} variants={fadeUp} className="text-text-secondary leading-relaxed">
              Built on 10+ years of the BMF360 methodology across 26+ business niches, LEVEL7 brings AI precision to every stage of your growth journey. From your first offer to a fully autonomous empire.
            </motion.p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: "◆", title: "Stage-Specific", desc: "No generic advice. The right tool for where you actually are." },
              { icon: "◈", title: "AI-Powered", desc: "Every floor uses AI to do the heavy lifting for you." },
              { icon: "◇", title: "Full Journey", desc: "From zero to exit — we cover every stage of growth." },
              { icon: "●", title: "Certified Partners", desc: "Real humans backing your progress at every floor." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                variants={fadeUp}
                className="border border-white/5 p-6 bg-white/[0.02] hover:border-accent/20 transition-colors duration-300 group"
              >
                <div className="text-accent text-xl mb-3">{item.icon}</div>
                <div className="text-sm font-bold mb-2 group-hover:text-accent transition-colors">{item.title}</div>
                <div className="text-xs text-text-secondary leading-relaxed">{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <div className="lime-divider max-w-7xl mx-auto px-6" />

      {/* 8 FLOORS */}
      <Section className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <motion.p custom={0} variants={fadeUp} className="text-xs uppercase tracking-widest text-accent mb-4">
            The Platform
          </motion.p>
          <motion.h2 custom={1} variants={fadeUp} className="text-4xl md:text-5xl font-bold font-satoshi mb-16 max-w-lg leading-tight">
            8 Floors. 1 Platform. Infinite Growth.
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {floors.map((floor, i) => (
              <motion.div
                key={floor.num}
                custom={i}
                variants={fadeUp}
                className={`relative p-6 border border-white/5 bg-gradient-to-br ${floor.color} to-transparent overflow-hidden group hover:border-accent/30 transition-all duration-300 cursor-pointer`}
              >
                <div className="absolute top-0 right-0 text-7xl font-bold text-white/[0.04] leading-none select-none font-satoshi translate-x-2 -translate-y-1 group-hover:text-accent/10 transition-colors">
                  {floor.num}
                </div>
                <div className="text-xs text-accent uppercase tracking-widest mb-3">
                  Floor {floor.num === "L" ? "0" : floor.num}
                </div>
                <div className="text-base font-bold mb-2 font-satoshi">{floor.label}</div>
                <div className="text-xs text-text-secondary leading-relaxed">{floor.tagline}</div>
                <div className="mt-4 w-6 h-px bg-accent/30 group-hover:w-12 transition-all duration-300" />
              </motion.div>
            ))}
          </div>

          <motion.div custom={9} variants={fadeUp} className="mt-10 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm text-accent hover:text-white transition-colors font-medium"
            >
              Explore all floors in detail
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </Section>

      <div className="lime-divider max-w-7xl mx-auto px-6" />

      {/* STATS */}
      <Section className="py-28 max-w-7xl mx-auto px-6">
        <motion.p custom={0} variants={fadeUp} className="text-xs uppercase tracking-widest text-accent mb-12 text-center">
          The Numbers
        </motion.p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} custom={i} variants={fadeUp} className="text-center group">
              <div className="text-5xl md:text-6xl font-bold font-satoshi text-white mb-3 group-hover:text-accent transition-colors duration-300">
                {stat.value}
              </div>
              <div className="text-sm text-text-secondary uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* FINAL CTA */}
      <Section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.04] to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.h2 custom={0} variants={fadeUp} className="text-4xl md:text-6xl font-bold font-satoshi mb-6 leading-tight">
            Ready to find your floor?
          </motion.h2>
          <motion.p custom={1} variants={fadeUp} className="text-text-secondary text-lg mb-10 max-w-xl mx-auto">
            Take the free AI diagnostic and get your personalized growth plan in minutes.
          </motion.p>
          <motion.div custom={2} variants={fadeUp}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-accent text-background font-bold px-10 py-5 text-base hover:bg-white transition-colors duration-200 group"
            >
              Start Your Diagnostic — Free
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </Section>
    </>
  );
}
