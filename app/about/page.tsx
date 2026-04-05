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

const values = [
  {
    icon: "▲",
    title: "Constant & Structured Growth",
    desc: "Growth isn't a moment — it's a system. We build processes that compound over time, not quick wins that fade.",
  },
  {
    icon: "◈",
    title: "Smart Technology, 24/7",
    desc: "AI that works while you sleep. Every floor uses technology to multiply your effort without multiplying your hours.",
  },
  {
    icon: "◇",
    title: "Simplicity & Clarity",
    desc: "Complexity is the enemy of execution. We strip everything to its essential form so you can move fast.",
  },
  {
    icon: "◆",
    title: "Premium Long-Term Building",
    desc: "We don't optimize for this quarter. We build businesses that last — and thrive for decades.",
  },
];

export default function AboutPage() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-accent/[0.04] rounded-full blur-[120px] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, #A3FF00 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto px-6 relative z-10"
        >
          <motion.p custom={0} variants={fadeUp} className="text-xs uppercase tracking-widest text-accent mb-4">
            Our Story
          </motion.p>
          <motion.h1
            custom={1}
            variants={fadeUp}
            className="text-5xl md:text-7xl font-bold font-satoshi mb-8 leading-tight"
          >
            Built on a decade<br />
            of <span className="text-accent">real results</span>.
          </motion.h1>
        </motion.div>
      </section>

      {/* Story */}
      <Section className="pb-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <motion.p custom={0} variants={fadeUp} className="text-text-secondary leading-relaxed text-lg mb-6">
              LEVEL7 wasn't built in a boardroom. It was built in the trenches — working with hundreds of businesses across 26+ niches, watching the same patterns of failure and success repeat themselves.
            </motion.p>
            <motion.p custom={1} variants={fadeUp} className="text-text-secondary leading-relaxed mb-6">
              The BMF360 methodology — developed over more than 10 years — revealed something fundamental: businesses don't fail because they're bad. They fail because they're using the right tool at the wrong stage. A Floor 4 solution applied to a Floor 1 problem destroys momentum.
            </motion.p>
            <motion.p custom={2} variants={fadeUp} className="text-text-secondary leading-relaxed">
              LEVEL7 is that methodology, now powered by AI. It knows exactly where you are. It gives you exactly what you need. And it scales with you — all the way from your first offer to a fully autonomous empire.
            </motion.p>
          </div>

          <div className="space-y-4">
            {[
              { num: "10+", label: "Years of BMF360 Methodology" },
              { num: "26+", label: "Business Niches Served" },
              { num: "94%", label: "Client Success Rate" },
              { num: "3x–12x", label: "Average Client ROI" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                variants={fadeUp}
                className="flex items-center gap-6 border border-white/5 p-6 bg-white/[0.02] hover:border-accent/20 transition-colors"
              >
                <div className="text-3xl font-bold font-satoshi text-accent w-28 shrink-0">{stat.num}</div>
                <div className="text-sm text-text-secondary">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <div className="lime-divider max-w-7xl mx-auto px-6" />

      {/* Vision */}
      <Section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/[0.025] to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.p custom={0} variants={fadeUp} className="text-xs uppercase tracking-widest text-accent mb-6">
            Vision
          </motion.p>
          <motion.blockquote
            custom={1}
            variants={fadeUp}
            className="text-3xl md:text-5xl font-bold font-satoshi leading-tight text-white"
          >
            "The world needs a GPS<br />for business growth.<br />
            <span className="text-accent">LEVEL7 is that GPS.</span>"
          </motion.blockquote>
        </div>
      </Section>

      <div className="lime-divider max-w-7xl mx-auto px-6" />

      {/* Values */}
      <Section className="py-24 max-w-7xl mx-auto px-6">
        <motion.p custom={0} variants={fadeUp} className="text-xs uppercase tracking-widest text-accent mb-4">
          Core Values
        </motion.p>
        <motion.h2 custom={1} variants={fadeUp} className="text-4xl font-bold font-satoshi mb-16">
          What we stand for.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((val, i) => (
            <motion.div
              key={val.title}
              custom={i + 2}
              variants={fadeUp}
              className="border border-white/5 p-8 bg-white/[0.02] hover:border-accent/20 transition-all duration-300 group"
            >
              <div className="text-2xl text-accent mb-4">{val.icon}</div>
              <div className="text-lg font-bold font-satoshi mb-3 group-hover:text-accent transition-colors">{val.title}</div>
              <p className="text-sm text-text-secondary leading-relaxed">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <div className="lime-divider max-w-7xl mx-auto px-6" />

      {/* Team */}
      <Section className="py-24 max-w-7xl mx-auto px-6">
        <motion.p custom={0} variants={fadeUp} className="text-xs uppercase tracking-widest text-accent mb-4">
          The Team
        </motion.p>
        <motion.h2 custom={1} variants={fadeUp} className="text-4xl font-bold font-satoshi mb-16">
          The founders.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              name: "Dani Gadayev",
              role: "CEO & Co-Founder",
              credentials: "MBA + BA Management & Public Policy",
              bio: "Finance & Business Expert. Founder of BMF360. 10+ years helping businesses across 26+ niches find their growth path. The strategic vision behind LEVEL7.",
              initial: "D",
            },
            {
              name: "Tal Liberman",
              role: "CTO & Co-Founder",
              credentials: "BSc Computer Science",
              bio: "Former Tech Lead. Founder of BMF360. The technical architect turning methodology into AI-powered products. Builder of the intelligence layer across all 8 floors.",
              initial: "T",
            },
          ].map((person, i) => (
            <motion.div
              key={person.name}
              custom={i + 2}
              variants={fadeUp}
              className="border border-white/5 p-8 bg-white/[0.02] hover:border-accent/20 transition-all duration-300 group"
            >
              <div className="flex items-start gap-6 mb-6">
                {/* Avatar placeholder */}
                <div className="w-16 h-16 bg-accent/10 border border-accent/20 flex items-center justify-center text-accent text-2xl font-bold font-satoshi shrink-0">
                  {person.initial}
                </div>
                <div>
                  <div className="text-xl font-bold font-satoshi group-hover:text-accent transition-colors">{person.name}</div>
                  <div className="text-sm text-accent mt-1">{person.role}</div>
                  <div className="text-xs text-text-secondary mt-1">{person.credentials}</div>
                </div>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">{person.bio}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.03] to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl font-bold font-satoshi mb-6"
          >
            Ready to build your empire?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-accent text-background font-bold px-8 py-4 hover:bg-white transition-colors duration-200"
            >
              Start Free Diagnostic
            </Link>
            <Link
              href="/investors"
              className="inline-flex items-center justify-center gap-2 border border-white/10 text-white font-medium px-8 py-4 hover:border-accent/50 hover:text-accent transition-all duration-200"
            >
              Investor Information
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
