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

/* ─────────────────────────────────────────────
   About Hero SVG — 320×320
   Two operators with data flows + growth arc
───────────────────────────────────────────── */
const SVG_ABOUT_HERO = `<style>
  @keyframes ahFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes ahDraw  { from{stroke-dashoffset:300} to{stroke-dashoffset:0} }
  @keyframes ahPop   { from{opacity:0;transform:scale(0)} to{opacity:1;transform:scale(1)} }
  @keyframes ahPulse { 0%,100%{opacity:1;r:4} 50%{opacity:0.3;r:6} }
  @keyframes ahSpin  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  .ah-left  { animation: ahFloat 3.5s ease-in-out infinite; transform-origin: 100px 155px; }
  .ah-right { animation: ahFloat 3.5s ease-in-out 1.2s infinite; transform-origin: 220px 155px; }
  .ah-arc   { stroke-dasharray:300; animation: ahDraw 1.8s ease-out 0.4s both; }
  .ah-bar1  { transform-origin: 148px 240px; animation: ahPop 0.5s ease-out 0.8s both; }
  .ah-bar2  { transform-origin: 163px 240px; animation: ahPop 0.5s ease-out 1.0s both; }
  .ah-bar3  { transform-origin: 178px 240px; animation: ahPop 0.5s ease-out 1.2s both; }
  .ah-d1   { animation: ahPulse 2s ease-in-out 0.5s infinite; }
  .ah-d2   { animation: ahPulse 2s ease-in-out 1.1s infinite; }
  .ah-d3   { animation: ahPulse 2s ease-in-out 1.7s infinite; }
  .ah-ring { transform-origin: 160px 155px; animation: ahSpin 12s linear infinite; }
</style>
<svg viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">

  <!-- Orbit ring -->
  <circle class="ah-ring" cx="160" cy="155" r="90" stroke="#E5E5E5" stroke-width="1" stroke-dasharray="6,8"/>

  <!-- Growth arc (top) -->
  <path class="ah-arc" d="M 60 220 Q 100 120 160 100 Q 220 80 270 100" stroke="#A3FF00" stroke-width="2" stroke-linecap="round" fill="none"/>

  <!-- Left person -->
  <g class="ah-left">
    <circle cx="100" cy="130" r="22" stroke="#1A1A1A" stroke-width="1.8" fill="white"/>
    <!-- face simplified -->
    <circle cx="100" cy="126" r="8" stroke="#1A1A1A" stroke-width="1.4" fill="none"/>
    <path d="M88,142 Q88,136 100,136 Q112,136 112,142" stroke="#1A1A1A" stroke-width="1.4" stroke-linecap="round" fill="none"/>
    <!-- laptop -->
    <rect x="80" y="160" width="40" height="26" rx="3" stroke="#1A1A1A" stroke-width="1.4" fill="none"/>
    <polyline points="87,178 93,172 99,175 105,168 111,171" stroke="#A3FF00" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  </g>

  <!-- Right person -->
  <g class="ah-right">
    <circle cx="220" cy="130" r="22" stroke="#1A1A1A" stroke-width="1.8" fill="white"/>
    <circle cx="220" cy="126" r="8" stroke="#1A1A1A" stroke-width="1.4" fill="none"/>
    <path d="M208,142 Q208,136 220,136 Q232,136 232,142" stroke="#1A1A1A" stroke-width="1.4" stroke-linecap="round" fill="none"/>
    <!-- tablet -->
    <rect x="204" y="160" width="32" height="38" rx="4" stroke="#1A1A1A" stroke-width="1.4" fill="none"/>
    <rect x="208" y="164" width="24" height="22" rx="2" fill="#F7F7F7"/>
    <rect class="ah-bar1" x="211" y="174" width="5" height="8" rx="1" fill="#A3FF00"/>
    <rect class="ah-bar2" x="218" y="170" width="5" height="12" rx="1" fill="#A3FF00" opacity="0.7"/>
    <rect class="ah-bar3" x="225" y="167" width="5" height="15" rx="1" fill="#A3FF00" opacity="0.5"/>
  </g>

  <!-- Connection line between them -->
  <line x1="124" y1="155" x2="196" y2="155" stroke="#E5E5E5" stroke-width="1.5" stroke-dasharray="5,4"/>
  <circle cx="160" cy="155" r="8" fill="#A3FF00"/>
  <text x="160" y="159" text-anchor="middle" fill="#1A1A1A" font-size="8" font-family="sans-serif" font-weight="bold">AI</text>

  <!-- Floating data dots -->
  <circle class="ah-d1" cx="55"  cy="120" r="4" fill="#A3FF00"/>
  <circle class="ah-d2" cx="270" cy="140" r="3" fill="#A3FF00"/>
  <circle class="ah-d3" cx="160" cy="48"  r="3" fill="#A3FF00"/>

  <!-- Ground base line -->
  <line x1="50" y1="255" x2="270" y2="255" stroke="#E5E5E5" stroke-width="1" stroke-linecap="round"/>
</svg>`;

/* ─────────────────────────────────────────────
   Value icons — 64×64 each
───────────────────────────────────────────── */
const SVG_VALUE_1 = `<style>
  @keyframes v1g { from{transform:scaleY(0)} to{transform:scaleY(1)} }
  .v1-b1{transform-origin:20px 52px;animation:v1g .5s ease-out .1s both}
  .v1-b2{transform-origin:32px 52px;animation:v1g .5s ease-out .25s both}
  .v1-b3{transform-origin:44px 52px;animation:v1g .5s ease-out .4s both}
</style>
<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect class="v1-b1" x="14" y="38" width="12" height="14" rx="2" fill="#E5E5E5"/>
  <rect class="v1-b2" x="26" y="28" width="12" height="24" rx="2" fill="#A3FF00" opacity="0.7"/>
  <rect class="v1-b3" x="38" y="18" width="12" height="34" rx="2" fill="#A3FF00"/>
  <polyline points="20,38 32,28 44,18" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <circle cx="44" cy="18" r="3" fill="#1A1A1A"/>
</svg>`;

const SVG_VALUE_2 = `<style>
  @keyframes v2spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes v2blink { 0%,100%{opacity:1} 50%{opacity:0.2} }
  .v2-gear{transform-origin:32px 32px;animation:v2spin 6s linear infinite}
  .v2-dot{animation:v2blink 1.2s ease-in-out infinite}
</style>
<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g class="v2-gear">
    <circle cx="32" cy="32" r="10" stroke="#1A1A1A" stroke-width="1.5"/>
    <circle cx="32" cy="32" r="4" fill="#A3FF00"/>
    <!-- gear teeth -->
    <rect x="29.5" y="16" width="5" height="7" rx="1" fill="#1A1A1A"/>
    <rect x="29.5" y="41" width="5" height="7" rx="1" fill="#1A1A1A"/>
    <rect x="16" y="29.5" width="7" height="5" rx="1" fill="#1A1A1A"/>
    <rect x="41" y="29.5" width="7" height="5" rx="1" fill="#1A1A1A"/>
    <rect x="20" y="20" width="5" height="5" rx="1" fill="#1A1A1A" transform="rotate(45 22.5 22.5)"/>
    <rect x="39" y="39" width="5" height="5" rx="1" fill="#1A1A1A" transform="rotate(45 41.5 41.5)"/>
    <rect x="20" y="39" width="5" height="5" rx="1" fill="#1A1A1A" transform="rotate(45 22.5 41.5)"/>
    <rect x="39" y="20" width="5" height="5" rx="1" fill="#1A1A1A" transform="rotate(45 41.5 22.5)"/>
  </g>
  <circle class="v2-dot" cx="50" cy="14" r="4" fill="#A3FF00"/>
</svg>`;

const SVG_VALUE_3 = `<style>
  @keyframes v3draw { from{stroke-dashoffset:120} to{stroke-dashoffset:0} }
  @keyframes v3fade { from{opacity:0} to{opacity:1} }
  .v3-diamond{stroke-dasharray:120;animation:v3draw 1s ease-out .2s both}
  .v3-dot{animation:v3fade .4s ease-out .9s both}
</style>
<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Diamond -->
  <polygon class="v3-diamond" points="32,10 52,32 32,54 12,32" stroke="#1A1A1A" stroke-width="1.8" fill="none" stroke-linejoin="round"/>
  <!-- Inner diamond -->
  <polygon points="32,22 42,32 32,42 22,32" fill="#A3FF00" opacity="0.3"/>
  <!-- Center dot -->
  <circle class="v3-dot" cx="32" cy="32" r="4" fill="#A3FF00"/>
</svg>`;

const SVG_VALUE_4 = `<style>
  @keyframes v4rise { from{transform:translateY(10px);opacity:0} to{transform:translateY(0);opacity:1} }
  @keyframes v4glow { 0%,100%{fill:#A3FF00} 50%{fill:#E5E5E5} }
  .v4-l1{animation:v4rise .5s ease-out .1s both}
  .v4-l2{animation:v4rise .5s ease-out .3s both}
  .v4-l3{animation:v4rise .5s ease-out .5s both}
  .v4-star{animation:v4glow 2s ease-in-out infinite}
</style>
<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Pyramid layers bottom→top -->
  <g class="v4-l1">
    <rect x="10" y="48" width="44" height="8" rx="2" fill="#E5E5E5" stroke="#1A1A1A" stroke-width="1"/>
  </g>
  <g class="v4-l2">
    <rect x="18" y="36" width="28" height="10" rx="2" fill="#A3FF00" opacity="0.5" stroke="#1A1A1A" stroke-width="1"/>
  </g>
  <g class="v4-l3">
    <rect x="24" y="24" width="16" height="10" rx="2" fill="#A3FF00" stroke="#1A1A1A" stroke-width="1"/>
  </g>
  <!-- Star/crown top -->
  <circle class="v4-star" cx="32" cy="18" r="4"/>
</svg>`;

const VALUE_SVGS = [SVG_VALUE_1, SVG_VALUE_2, SVG_VALUE_3, SVG_VALUE_4];

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const values = [
  {
    title: "Constant & Structured Growth",
    desc: "Growth isn't a moment — it's a system. We build processes that compound over time.",
  },
  {
    title: "Smart Technology, 24/7",
    desc: "AI that works while you sleep. Every floor multiplies your effort without multiplying your hours.",
  },
  {
    title: "Simplicity & Clarity",
    desc: "Complexity is the enemy of execution. We strip everything to its essential form so you can move fast.",
  },
  {
    title: "Premium Long-Term Building",
    desc: "We don't optimize for this quarter. We build businesses that last and thrive for decades.",
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

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
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
              <div
                id="illustration-about-hero"
                style={{ width: 320, height: 320 }}
                dangerouslySetInnerHTML={{ __html: SVG_ABOUT_HERO }}
              />
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
            Seven floors. One direction.<br />Build an Empire.<br />
            <span className="text-accent">One Level at a Time.</span>
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
                <div
                  id={`illustration-value-${i + 1}`}
                  style={{ width: 64, height: 64 }}
                  dangerouslySetInnerHTML={{ __html: VALUE_SVGS[i] }}
                />
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
