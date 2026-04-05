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
    title: "Constant & Structured Growth",
    desc: "Growth isn't a moment — it's a system. We build processes that compound over time.",
    lottie: "https://assets3.lottiefiles.com/packages/lf20_touohxv0.json",
  },
  {
    title: "Smart Technology, 24/7",
    desc: "AI that works while you sleep. Every floor multiplies your effort without multiplying your hours.",
    lottie: "https://assets8.lottiefiles.com/packages/lf20_qp1q7mct.json",
  },
  {
    title: "Simplicity & Clarity",
    desc: "Complexity is the enemy of execution. We strip everything to its essential form so you can move fast.",
    lottie: "https://assets9.lottiefiles.com/packages/lf20_jcikwtux.json",
  },
  {
    title: "Premium Long-Term Building",
    desc: "We don't optimize for this quarter. We build businesses that last and thrive for decades.",
    lottie: "https://assets4.lottiefiles.com/packages/lf20_iorpbol0.json",
  },
];

const team = [
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
];

const stats = [
  { num: "10+", label: "Years of BMF360 Methodology" },
  { num: "26+", label: "Business Niches Served" },
  { num: "94%", label: "Client Success Rate" },
  { num: "3x–12x", label: "Average Client ROI" },
];

export default function AboutPage() {
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.p custom={0} variants={fadeUp} className="label mb-4">
                Our Story
              </motion.p>
              <motion.h1
                custom={1}
                variants={fadeUp}
                className="font-bold font-satoshi text-[#1A1A1A] mb-6"
                style={{ fontSize: "clamp(2.8rem,6vw,5rem)", lineHeight: 1.05, letterSpacing: "-0.025em" }}
              >
                Built by operators.<br />
                <span className="text-accent">For operators.</span>
              </motion.h1>
              <motion.p custom={2} variants={fadeUp} className="text-[#6B6B6B] text-xl leading-relaxed">
                LEVEL7 wasn&apos;t built in a boardroom. It was built in the trenches — working with hundreds of businesses across 26+ niches, watching the same patterns of failure and success repeat themselves.
              </motion.p>
            </div>
            <motion.div custom={3} variants={fadeUp} className="flex justify-center">
              <div id="illustration-about-hero" className="border-2 border-dashed border-[#D8D8D8] rounded-xl" style={{ width: 320, height: 320 }} />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── STORY ── */}
      <Section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <motion.p custom={0} variants={fadeUp} className="text-[#1A1A1A] leading-relaxed text-lg mb-6">
              The BMF360 methodology — developed over more than 10 years — revealed something fundamental: businesses don&apos;t fail because they&apos;re bad. They fail because they&apos;re using the right tool at the wrong stage.
            </motion.p>
            <motion.p custom={1} variants={fadeUp} className="text-[#6B6B6B] leading-relaxed mb-6">
              A Floor 4 solution applied to a Floor 1 problem destroys momentum. A Floor 1 solution at Floor 6 wastes time. Most businesses are stuck not because of lack of effort — but lack of precision.
            </motion.p>
            <motion.p custom={2} variants={fadeUp} className="text-[#6B6B6B] leading-relaxed">
              LEVEL7 is that methodology, now powered by AI. It knows exactly where you are. It gives you exactly what you need. And it scales with you — all the way from your first offer to a fully autonomous empire.
            </motion.p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                variants={fadeUp}
                className="card p-6 text-center group cursor-default"
              >
                <div className="text-3xl font-bold font-satoshi text-accent mb-2">
                  {stat.num}
                </div>
                <div className="text-xs text-[#6B6B6B] leading-relaxed">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <div className="divider" />

      {/* ── VISION ── */}
      <Section className="py-24 bg-[#1A1A1A] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.p custom={0} variants={fadeUp} className="label mb-6" style={{ color: "rgba(255,255,255,0.4)" }}>
            Vision
          </motion.p>
          <motion.blockquote
            custom={1}
            variants={fadeUp}
            className="font-bold font-satoshi text-white leading-tight"
            style={{ fontSize: "clamp(2rem,4vw,3.5rem)", letterSpacing: "-0.02em" }}
          >
            &ldquo;The world needs a GPS<br />for business growth.<br />
            <span className="text-accent">LEVEL7 is that GPS.</span>&rdquo;
          </motion.blockquote>
        </div>
      </Section>

      <div className="divider" />

      {/* ── VALUES ── */}
      <Section className="py-24 max-w-7xl mx-auto px-6">
        <motion.p custom={0} variants={fadeUp} className="label mb-4">
          Core Values
        </motion.p>
        <motion.h2
          custom={1}
          variants={fadeUp}
          className="font-bold font-satoshi text-[#1A1A1A] mb-14"
          style={{ fontSize: "clamp(2rem,4vw,3rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
        >
          What we stand for.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {values.map((val, i) => (
            <motion.div
              key={val.title}
              custom={i + 2}
              variants={fadeUp}
              className="card p-8 group cursor-default flex gap-6 items-start"
            >
              <div className="shrink-0">
                <div id={`illustration-value-${i + 1}`} className="border-2 border-dashed border-[#D8D8D8] rounded-lg" style={{ width: 64, height: 64 }} />
              </div>
              <div>
                <div className="text-base font-bold font-satoshi text-[#1A1A1A] mb-2 group-hover:text-accent transition-colors">
                  {val.title}
                </div>
                <p className="text-sm text-[#6B6B6B] leading-relaxed">{val.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <div className="divider" />

      {/* ── TEAM ── */}
      <Section className="py-24 max-w-7xl mx-auto px-6">
        <motion.p custom={0} variants={fadeUp} className="label mb-4">
          The Team
        </motion.p>
        <motion.h2
          custom={1}
          variants={fadeUp}
          className="font-bold font-satoshi text-[#1A1A1A] mb-14"
          style={{ fontSize: "clamp(2rem,4vw,3rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
        >
          The founders.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {team.map((person, i) => (
            <motion.div
              key={person.name}
              custom={i + 2}
              variants={fadeUp}
              className="card p-8 group"
            >
              <div className="flex items-start gap-5 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center text-[#1A1A1A] text-2xl font-bold font-satoshi shrink-0">
                  {person.initial}
                </div>
                <div>
                  <div className="text-xl font-bold font-satoshi text-[#1A1A1A] group-hover:text-accent transition-colors">
                    {person.name}
                  </div>
                  <div className="text-sm text-accent mt-1 font-semibold">{person.role}</div>
                  <div className="text-xs text-[#6B6B6B] mt-1">{person.credentials}</div>
                </div>
              </div>
              <p className="text-sm text-[#6B6B6B] leading-relaxed">{person.bio}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ── CTA ── */}
      <section className="py-24 bg-[#F7F7F7] border-t border-[#E5E5E5]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-bold font-satoshi text-[#1A1A1A] mb-8"
            style={{ fontSize: "clamp(2rem,4vw,3rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
          >
            Ready to build your empire?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/contact" className="btn-primary text-sm px-8 py-4">
              Start Free Diagnostic
            </Link>
            <Link href="/services" className="btn-ghost text-sm px-8 py-4">
              Explore the Floors
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
