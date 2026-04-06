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

const floors = [
  { num: "L", label: "Lobby", sub: "DNA & Offer", tagline: "Know who you're selling to", price: "Free" },
  { num: "1", label: "Organic Marketing", sub: "Content System", tagline: "No one will find you if you don't exist", price: "Monthly" },
  { num: "2", label: "Paid Marketing", sub: "Lead Machine", tagline: "A lead machine that works while you sleep", price: "Subscription + media %" },
  { num: "3", label: "Sales", sub: "Conversion Engine", tagline: "Leads without a sales process is a leaky bucket", price: "Subscription + setup" },
  { num: "4", label: "Team & Staff", sub: "Operations Layer", tagline: "Built around you is the bottleneck", price: "Subscription + coaching" },
  { num: "5", label: "Finance", sub: "Financial Control", tagline: "You're not poor in money — you're poor in information", price: "Software + course" },
  { num: "6", label: "Scale", sub: "Growth System", tagline: "Your next growth won't come from you", price: "High subscription" },
  { num: "7", label: "Empire", sub: "Full Autonomy", tagline: "A real business is one that works without you", price: "Partner + software" },
];

const promises = [
  {
    title: "No agency fees",
    sub: "Keep the budget, fire the agency",
    desc: "Stop paying retainers for mediocre results. LEVEL7 does everything an agency does — automatically, for a fraction of the cost.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <rect width="40" height="40" rx="12" fill="#A3FF00" fillOpacity="0.12"/>
        <path d="M12 21l6 6 10-14" stroke="#A3FF00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "AI runs 24/7",
    sub: "Campaigns optimized while you sleep",
    desc: "Your AI system monitors, optimizes, and scales campaigns around the clock. No account managers. No missed opportunities.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <rect width="40" height="40" rx="12" fill="#A3FF00" fillOpacity="0.12"/>
        <circle cx="20" cy="20" r="8" stroke="#A3FF00" strokeWidth="2.5"/>
        <path d="M20 12v8l5 3" stroke="#A3FF00" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "Leads on autopilot",
    sub: "Your pipeline fills itself",
    desc: "From content creation to paid ads to follow-up sequences — the entire lead generation engine runs without your daily involvement.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <rect width="40" height="40" rx="12" fill="#A3FF00" fillOpacity="0.12"/>
        <path d="M10 30 L20 10 L30 30" stroke="#A3FF00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 24h12" stroke="#A3FF00" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

const steps = [
  { n: "01", title: "Tell us about your business", desc: "Answer a short AI diagnostic. 5 minutes. No fluff. We identify exactly where you are and what you need." },
  { n: "02", title: "AI builds your growth system", desc: "Campaigns, content, sales sequences — all built and deployed automatically based on your business profile." },
  { n: "03", title: "Leads come in. You close them.", desc: "Your pipeline fills itself. You stay focused on what only you can do: closing deals and delivering results." },
];

const HERO_SVG = `<style>
  @keyframes riseUp {
    from { transform: translateY(40px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  @keyframes drawLine {
    from { stroke-dashoffset: 200; }
    to { stroke-dashoffset: 0; }
  }
  @keyframes moveDot {
    0% { transform: translateX(0); opacity: 0; }
    20% { opacity: 1; }
    100% { transform: translateX(120px); opacity: 0.8; }
  }
  @keyframes moveDotRight {
    0% { transform: translateX(0); opacity: 0; }
    20% { opacity: 1; }
    100% { transform: translateX(-120px); opacity: 0.8; }
  }
  @keyframes drawChart {
    from { stroke-dashoffset: 120; }
    to { stroke-dashoffset: 0; }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes bobHead {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-2px); }
  }
  .b1 { animation: riseUp 0.7s ease-out 0.1s both; }
  .b2 { animation: riseUp 0.7s ease-out 0.25s both; }
  .b3 { animation: riseUp 0.7s ease-out 0.35s both; }
  .b4 { animation: riseUp 0.7s ease-out 0.45s both; }
  .b5 { animation: riseUp 0.7s ease-out 0.2s both; }
  .b6 { animation: riseUp 0.7s ease-out 0.3s both; }
  .b7 { animation: riseUp 0.7s ease-out 0.4s both; }
  .b8 { animation: riseUp 0.7s ease-out 0.5s both; }
  .person-left { animation: fadeIn 0.5s ease-out 0.8s both; }
  .person-right { animation: fadeIn 0.5s ease-out 0.9s both; }
  .chart-line {
    stroke-dasharray: 120;
    animation: drawChart 1.2s ease-out 1s both;
  }
  .chart-line-r {
    stroke-dasharray: 120;
    animation: drawChart 1.2s ease-out 1.1s both;
  }
  .dot1 { animation: moveDot 2.5s ease-in-out 1.2s infinite; }
  .dot2 { animation: moveDot 2.5s ease-in-out 1.8s infinite; }
  .dot3 { animation: moveDot 2.5s ease-in-out 2.4s infinite; }
  .dot4 { animation: moveDotRight 2.5s ease-in-out 1.4s infinite; }
  .dot5 { animation: moveDotRight 2.5s ease-in-out 2s infinite; }
  .head-left { animation: bobHead 3s ease-in-out 1.5s infinite; transform-origin: 148px 295px; }
  .head-right { animation: bobHead 3s ease-in-out 2s infinite; transform-origin: 970px 290px; }
  .dash-line {
    stroke-dasharray: 8,5;
    animation: drawLine 1.5s ease-out 1.3s both;
  }
</style>
<svg width="100%" viewBox="0 0 1200 440" xmlns="http://www.w3.org/2000/svg">
  <!-- LEFT BUILDINGS -->
  <g class="b1">
    <rect x="30" y="120" width="60" height="280" fill="none" stroke="#1A1A1A" stroke-width="1.5" rx="2"/>
    <rect x="40" y="135" width="14" height="10" fill="none" stroke="#1A1A1A" stroke-width="1"/>
    <rect x="60" y="135" width="14" height="10" fill="none" stroke="#1A1A1A" stroke-width="1"/>
    <rect x="40" y="155" width="14" height="10" fill="none" stroke="#1A1A1A" stroke-width="1"/>
    <rect x="60" y="155" width="14" height="10" fill="none" stroke="#1A1A1A" stroke-width="1"/>
    <rect x="40" y="175" width="14" height="10" fill="none" stroke="#1A1A1A" stroke-width="1"/>
    <rect x="60" y="175" width="14" height="10" fill="none" stroke="#1A1A1A" stroke-width="1"/>
    <rect x="40" y="195" width="14" height="10" fill="none" stroke="#1A1A1A" stroke-width="1"/>
    <rect x="60" y="195" width="14" height="10" fill="none" stroke="#1A1A1A" stroke-width="1"/>
    <rect x="40" y="235" width="14" height="10" fill="#A3FF00"/>
    <rect x="60" y="235" width="14" height="10" fill="none" stroke="#1A1A1A" stroke-width="1"/>
  </g>
  <g class="b2">
    <rect x="98" y="170" width="50" height="230" fill="none" stroke="#1A1A1A" stroke-width="1.5" rx="2"/>
    <rect x="106" y="182" width="12" height="9" fill="none" stroke="#1A1A1A" stroke-width="1"/>
    <rect x="124" y="182" width="12" height="9" fill="none" stroke="#1A1A1A" stroke-width="1"/>
    <rect x="106" y="200" width="12" height="9" fill="none" stroke="#1A1A1A" stroke-width="1"/>
    <rect x="124" y="200" width="12" height="9" fill="none" stroke="#1A1A1A" stroke-width="1"/>
    <rect x="124" y="236" width="12" height="9" fill="#A3FF00"/>
  </g>
  <g class="b3">
    <rect x="155" y="200" width="45" height="200" fill="none" stroke="#1A1A1A" stroke-width="1.5" rx="2"/>
    <rect x="163" y="212" width="11" height="8" fill="none" stroke="#1A1A1A" stroke-width="1"/>
    <rect x="178" y="212" width="11" height="8" fill="none" stroke="#1A1A1A" stroke-width="1"/>
    <rect x="163" y="228" width="11" height="8" fill="none" stroke="#1A1A1A" stroke-width="1"/>
    <rect x="178" y="244" width="11" height="8" fill="#A3FF00"/>
  </g>
  <g class="b4">
    <rect x="207" y="240" width="35" height="160" fill="none" stroke="#1A1A1A" stroke-width="1.5" rx="2"/>
    <rect x="214" y="252" width="9" height="7" fill="none" stroke="#1A1A1A" stroke-width="1"/>
    <rect x="227" y="252" width="9" height="7" fill="none" stroke="#1A1A1A" stroke-width="1"/>
    <rect x="214" y="267" width="9" height="7" fill="none" stroke="#1A1A1A" stroke-width="1"/>
  </g>
  <!-- LEFT PERSON -->
  <g class="person-left">
    <rect x="60" y="330" width="140" height="8" fill="none" stroke="#1A1A1A" stroke-width="1.5" rx="1"/>
    <line x1="70" y1="338" x2="70" y2="380" stroke="#1A1A1A" stroke-width="1.5"/>
    <line x1="190" y1="338" x2="190" y2="380" stroke="#1A1A1A" stroke-width="1.5"/>
    <rect x="100" y="278" width="65" height="48" fill="none" stroke="#1A1A1A" stroke-width="1.5" rx="3"/>
    <line x1="132" y1="326" x2="132" y2="330" stroke="#1A1A1A" stroke-width="1.5"/>
    <line x1="120" y1="330" x2="144" y2="330" stroke="#1A1A1A" stroke-width="1.5"/>
    <polyline class="chart-line" points="112,312 120,304 128,308 136,296 144,300 152,288" fill="none" stroke="#A3FF00" stroke-width="2" stroke-linecap="round"/>
    <g class="head-left">
      <circle cx="148" cy="295" r="12" fill="none" stroke="#1A1A1A" stroke-width="1.5"/>
    </g>
    <path d="M140,307 Q135,330 130,338" fill="none" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M148,308 Q152,330 158,338" fill="none" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M138,315 Q120,320 108,328" fill="none" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M150,315 Q162,320 164,328" fill="none" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round"/>
    <rect x="126" y="338" width="40" height="5" fill="none" stroke="#1A1A1A" stroke-width="1.5" rx="1"/>
    <line x1="130" y1="343" x2="128" y2="360" stroke="#1A1A1A" stroke-width="1.5"/>
    <line x1="162" y1="343" x2="164" y2="360" stroke="#1A1A1A" stroke-width="1.5"/>
    <line x1="124" y1="360" x2="170" y2="360" stroke="#1A1A1A" stroke-width="1.5"/>
  </g>
  <!-- MOVING DOTS LEFT -->
  <circle class="dot1" cx="20" cy="310" r="4" fill="#A3FF00"/>
  <circle class="dot2" cx="20" cy="330" r="3" fill="#A3FF00" opacity="0.7"/>
  <circle class="dot3" cx="20" cy="295" r="2.5" fill="#A3FF00" opacity="0.5"/>
  <!-- DASHED LINES LEFT -->
  <path class="dash-line" d="M20,310 L88,310" stroke="#A3FF00" stroke-width="1.2" fill="none" stroke-linecap="round"/>
  <path class="dash-line" d="M20,295 L88,308" stroke="#A3FF00" stroke-width="1.2" fill="none" stroke-linecap="round" style="animation-delay:1.5s"/>
  <!-- RIGHT BUILDINGS -->
  <g class="b5">
    <rect x="1110" y="100" width="65" height="300" fill="none" stroke="#1A1A1A" stroke-width="1.5" rx="2"/>
    <rect x="1120" y="115" width="14" height="10" fill="none" stroke="#1A1A1A" stroke-width="1"/>
    <rect x="1140" y="115" width="14" height="10" fill="none" stroke="#1A1A1A" stroke-width="1"/>
    <rect x="1120" y="135" width="14" height="10" fill="none" stroke="#1A1A1A" stroke-width="1"/>
    <rect x="1140" y="155" width="14" height="10" fill="#A3FF00"/>
    <rect x="1120" y="175" width="14" height="10" fill="none" stroke="#1A1A1A" stroke-width="1"/>
    <rect x="1140" y="195" width="14" height="10" fill="none" stroke="#1A1A1A" stroke-width="1"/>
  </g>
  <g class="b6">
    <rect x="1038" y="155" width="55" height="245" fill="none" stroke="#1A1A1A" stroke-width="1.5" rx="2"/>
    <rect x="1047" y="168" width="12" height="9" fill="none" stroke="#1A1A1A" stroke-width="1"/>
    <rect x="1065" y="186" width="12" height="9" fill="#A3FF00"/>
    <rect x="1047" y="204" width="12" height="9" fill="none" stroke="#1A1A1A" stroke-width="1"/>
  </g>
  <g class="b7">
    <rect x="975" y="195" width="48" height="205" fill="none" stroke="#1A1A1A" stroke-width="1.5" rx="2"/>
    <rect x="983" y="208" width="11" height="8" fill="none" stroke="#1A1A1A" stroke-width="1"/>
    <rect x="999" y="224" width="11" height="8" fill="none" stroke="#1A1A1A" stroke-width="1"/>
    <rect x="983" y="240" width="11" height="8" fill="#A3FF00"/>
  </g>
  <g class="b8">
    <rect x="930" y="230" width="38" height="170" fill="none" stroke="#1A1A1A" stroke-width="1.5" rx="2"/>
    <rect x="938" y="242" width="9" height="7" fill="none" stroke="#1A1A1A" stroke-width="1"/>
    <rect x="952" y="257" width="9" height="7" fill="none" stroke="#1A1A1A" stroke-width="1"/>
  </g>
  <!-- RIGHT PERSON -->
  <g class="person-right">
    <rect x="900" y="345" width="120" height="6" fill="none" stroke="#1A1A1A" stroke-width="1.5" rx="1"/>
    <line x1="910" y1="351" x2="910" y2="375" stroke="#1A1A1A" stroke-width="1.5"/>
    <line x1="1010" y1="351" x2="1010" y2="375" stroke="#1A1A1A" stroke-width="1.5"/>
    <rect x="900" y="318" width="120" height="5" fill="none" stroke="#1A1A1A" stroke-width="1.5" rx="1"/>
    <line x1="915" y1="323" x2="915" y2="351" stroke="#1A1A1A" stroke-width="1.5"/>
    <line x1="1005" y1="323" x2="1005" y2="351" stroke="#1A1A1A" stroke-width="1.5"/>
    <g class="head-right">
      <circle cx="970" cy="290" r="13" fill="none" stroke="#1A1A1A" stroke-width="1.5"/>
    </g>
    <path d="M962,303 Q958,330 955,345" fill="none" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M972,304 Q976,330 980,345" fill="none" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M958,345 Q958,360 952,370" fill="none" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M978,345 Q980,362 988,370" fill="none" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round"/>
    <rect x="940" y="326" width="55" height="32" fill="none" stroke="#1A1A1A" stroke-width="1.5" rx="2"/>
    <rect x="942" y="328" width="51" height="26" fill="none" stroke="#1A1A1A" stroke-width="1" rx="1"/>
    <polyline class="chart-line-r" points="948,348 954,342 960,345 966,338 972,340 978,334 984,336" fill="none" stroke="#A3FF00" stroke-width="2" stroke-linecap="round"/>
    <path d="M960,310 Q952,320 945,328" fill="none" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M972,310 Q978,320 990,328" fill="none" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round"/>
  </g>
  <!-- MOVING DOTS RIGHT -->
  <circle class="dot4" cx="1180" cy="300" r="4" fill="#A3FF00"/>
  <circle class="dot5" cx="1180" cy="320" r="3" fill="#A3FF00" opacity="0.7"/>
  <!-- DASHED LINES RIGHT -->
  <path class="dash-line" d="M1180,300 L1112,300" stroke="#A3FF00" stroke-width="1.2" fill="none" stroke-linecap="round" style="animation-delay:1.6s"/>
  <path class="dash-line" d="M1180,320 L1112,315" stroke="#A3FF00" stroke-width="1.2" fill="none" stroke-linecap="round" style="animation-delay:1.9s"/>
  <!-- Ground -->
  <line x1="0" y1="400" x2="250" y2="400" stroke="#1A1A1A" stroke-width="1" opacity="0.2"/>
  <line x1="880" y1="400" x2="1200" y2="400" stroke="#1A1A1A" stroke-width="1" opacity="0.2"/>
</svg>`;

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="flex flex-col overflow-hidden" style={{ minHeight: "100svh", background: "#FFFFFF" }}>

        {/* ── DESKTOP: illustration at top, headline centered in the clear center zone ── */}
        <div className="hidden md:block relative w-full flex-shrink-0">

          {/* Headline — z-10, centered in the empty middle of the SVG (x 250–930 / 1200) */}
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="font-bold font-satoshi text-[#1A1A1A] text-center"
              style={{
                width: "46%",
                fontSize: "clamp(2rem, 4.2vw, 68px)",
                lineHeight: 1.06,
                letterSpacing: "-0.03em",
              }}
            >
              Build an Empire.<br />One Level at a Time.
            </motion.h1>
          </div>

          {/* Illustration — behind headline */}
          <motion.div
            id="illustration-hero"
            className="w-full"
            style={{ display: "block" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            dangerouslySetInnerHTML={{ __html: HERO_SVG }}
          />
        </div>

        {/* ── MOBILE: headline only, no illustration ── */}
        <div className="md:hidden flex items-center justify-center px-6" style={{ paddingTop: 120, paddingBottom: 40 }}>
          <h1
            className="font-bold font-satoshi text-[#1A1A1A] text-center"
            style={{ fontSize: "clamp(2.6rem, 9vw, 4rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
          >
            Build an Empire.<br />One Level at a Time.
          </h1>
        </div>

        {/* ── Badge + subtext + CTA — centered below illustration ── */}
        <div className="flex flex-col items-center justify-center text-center px-6 pt-8 pb-16 flex-1">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-[#E5E5E5] bg-[#F7F7F7] text-[11px] font-bold uppercase tracking-[0.1em] text-[#6B6B6B]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            AI-Powered Lead Generation
          </motion.div>

          <motion.p
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-lg md:text-xl text-[#6B6B6B] max-w-xl mx-auto mb-10 leading-relaxed"
          >
            LEVEL7 is the AI system that generates leads automatically, runs your campaigns 24/7, and grows your business — without an agency.
          </motion.p>

          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <Link href="/contact" className="btn-primary text-base px-8 py-4">
              Start Free — No Agency Needed
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── SOCIAL PROOF BAR ── */}
      <div className="bg-[#F7F7F7] border-y border-[#E5E5E5] py-10">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-center text-[11px] uppercase tracking-[0.12em] text-[#AAAAAA] font-bold mb-8">
            Trusted by 30+ businesses across Europe
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            {["E-Commerce", "Real Estate", "Coaching", "SaaS", "Consulting", "Retail"].map((n) => (
              <div key={n} className="px-5 py-2 rounded-full border border-[#E5E5E5] bg-white text-sm text-[#AAAAAA] font-medium">
                {n}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-12">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#1A1A1A] font-satoshi">94%</div>
              <div className="text-xs text-[#6B6B6B] uppercase tracking-wider mt-1">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#1A1A1A] font-satoshi">3x–12x</div>
              <div className="text-xs text-[#6B6B6B] uppercase tracking-wider mt-1">Average ROI</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#1A1A1A] font-satoshi">30+</div>
              <div className="text-xs text-[#6B6B6B] uppercase tracking-wider mt-1">Active Clients</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#1A1A1A] font-satoshi">35</div>
              <div className="text-xs text-[#6B6B6B] uppercase tracking-wider mt-1">Specialists</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3 PROMISES ── */}
      <Section className="py-28 max-w-7xl mx-auto px-6">
        <motion.p custom={0} variants={fadeUp} className="label mb-4 text-center">
          Why LEVEL7
        </motion.p>
        <motion.h2
          custom={1}
          variants={fadeUp}
          className="text-center font-bold font-satoshi text-[#1A1A1A] mb-16"
          style={{ fontSize: "clamp(2rem,4vw,3rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
        >
          Everything an agency does.<br />At a fraction of the cost.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promises.map((p, i) => (
            <motion.div
              key={p.title}
              custom={i + 2}
              variants={fadeUp}
              className="card p-8 group cursor-default"
            >
              <div className="mb-5">{p.icon}</div>
              <h3 className="text-xl font-bold font-satoshi text-[#1A1A1A] mb-1 group-hover:text-accent transition-colors">{p.title}</h3>
              <p className="text-sm font-semibold text-[#6B6B6B] mb-3">{p.sub}</p>
              <p className="text-sm text-[#6B6B6B] leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <div className="divider" />

      {/* ── 8 FLOORS OVERVIEW ── */}
      <Section className="py-28 bg-[#F7F7F7]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.p custom={0} variants={fadeUp} className="label mb-4">
            The Platform
          </motion.p>
          <motion.h2
            custom={1}
            variants={fadeUp}
            className="font-bold font-satoshi text-[#1A1A1A] mb-4"
            style={{ fontSize: "clamp(2rem,4vw,3rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
          >
            One platform. Seven stages.<br />Built for where you are right now.
          </motion.h2>
          <motion.p custom={2} variants={fadeUp} className="text-[#6B6B6B] text-lg mb-16 max-w-xl leading-relaxed">
            Most tools are built for everyone. LEVEL7 is built for exactly where you are. No more. No less.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {floors.map((floor, i) => (
              <motion.div
                key={floor.num}
                custom={i}
                variants={fadeUp}
                className="bg-white border border-[#E5E5E5] rounded-2xl p-6 group cursor-pointer hover:border-accent hover:-translate-y-1 transition-all duration-200 hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)]"
              >
                <div className="text-3xl font-bold text-accent font-satoshi mb-3" style={{ letterSpacing: "-0.03em" }}>
                  {floor.num === "L" ? "L" : floor.num}
                </div>
                <div className="text-xs text-[#AAAAAA] uppercase tracking-widest font-bold mb-1">
                  {floor.sub}
                </div>
                <div className="text-sm font-bold text-[#1A1A1A] font-satoshi mb-2 group-hover:text-accent transition-colors">
                  {floor.label}
                </div>
                <div className="text-xs text-[#6B6B6B] leading-relaxed mb-4">{floor.tagline}</div>
                <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#F7F7F7] border border-[#E5E5E5] text-[10px] font-bold text-[#AAAAAA] uppercase tracking-wider">
                  {floor.num === "L" ? "Free" : floor.price}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div custom={9} variants={fadeUp} className="mt-10 text-center">
            <Link href="/services" className="btn-ghost text-sm px-6 py-3">
              Explore all floors in detail
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </Section>

      <div className="divider" />

      {/* ── HOW IT WORKS ── */}
      <Section className="py-28 max-w-7xl mx-auto px-6">
        <motion.p custom={0} variants={fadeUp} className="label mb-4">
          How It Works
        </motion.p>
        <motion.h2
          custom={1}
          variants={fadeUp}
          className="font-bold font-satoshi text-[#1A1A1A] mb-16"
          style={{ fontSize: "clamp(2rem,4vw,3rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
        >
          Three steps to your<br />growth system.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-8 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px bg-[#E5E5E5]" />
          {steps.map((step, i) => (
            <motion.div key={step.n} custom={i + 2} variants={fadeUp} className="relative">
              <div className="w-16 h-16 rounded-2xl bg-[#F7F7F7] border border-[#E5E5E5] flex items-center justify-center text-2xl font-bold font-satoshi text-accent mb-6 relative z-10">
                {step.n}
              </div>
              <h3 className="text-lg font-bold font-satoshi text-[#1A1A1A] mb-3">{step.title}</h3>
              <p className="text-sm text-[#6B6B6B] leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <div className="divider" />

      {/* ── FINAL CTA ── */}
      <Section className="py-32 bg-[#1A1A1A] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.div
            custom={0}
            variants={fadeUp}
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-white/10 text-[11px] font-bold uppercase tracking-[0.1em] text-white/50"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Free diagnostic — no commitment
          </motion.div>
          <motion.h2
            custom={1}
            variants={fadeUp}
            className="font-bold font-satoshi text-white mb-6"
            style={{ fontSize: "clamp(2.2rem,5vw,4rem)", lineHeight: 1.05, letterSpacing: "-0.025em" }}
          >
            Ready to replace<br />your agency?
          </motion.h2>
          <motion.p custom={2} variants={fadeUp} className="text-white/60 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
            Take the free AI diagnostic. 5 minutes. Get your personalized growth system — no agency required.
          </motion.p>
          <motion.div custom={3} variants={fadeUp}>
            <Link href="/contact" className="btn-primary text-base px-10 py-5">
              Start Your Free Diagnostic
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </Section>
    </>
  );
}
