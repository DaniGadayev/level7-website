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

function FloorSection({
  floor,
  index,
}: {
  floor: (typeof floors)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isEven = index % 2 === 0;

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="py-24 border-b border-white/5 relative overflow-hidden"
    >
      {/* Large decorative floor number */}
      <div
        className={`absolute top-0 ${isEven ? "right-0" : "left-0"} text-[20vw] font-bold select-none pointer-events-none leading-none font-satoshi text-white/[0.025]`}
        aria-hidden
      >
        {floor.num}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Floor label */}
          <div className="lg:col-span-3">
            <motion.div custom={0} variants={fadeUp}>
              <div className="text-xs uppercase tracking-widest text-accent mb-3">
                {floor.num === "L" ? "Lobby" : `Floor ${floor.num}`}
              </div>
              <div className="text-6xl font-bold font-satoshi text-white/10 mb-4">
                {floor.num}
              </div>
              <div className="text-xl font-bold font-satoshi text-white mb-2">
                {floor.name}
              </div>
              <div className="text-sm text-text-secondary mb-6 leading-relaxed">
                {floor.pricing}
              </div>
              {floor.num === "L" && (
                <span className="inline-block bg-accent/10 text-accent text-xs font-bold px-3 py-1 border border-accent/20">
                  FREE
                </span>
              )}
            </motion.div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-9">
            <motion.h3
              custom={1}
              variants={fadeUp}
              className="text-3xl md:text-4xl font-bold font-satoshi text-white mb-6 leading-tight"
            >
              "{floor.tagline}"
            </motion.h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Who It's For", content: floor.who },
                { label: "The Problem", content: floor.problem },
                { label: "The Product", content: floor.product },
                { label: "AI Role", content: floor.ai },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  custom={i + 2}
                  variants={fadeUp}
                  className="border border-white/5 p-6 bg-white/[0.02] hover:border-accent/15 transition-colors duration-300"
                >
                  <div className="text-xs uppercase tracking-widest text-accent mb-3">
                    {item.label}
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {item.content}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

const floors = [
  {
    num: "L",
    name: "DNA & Offer",
    tagline: "You don't need a better product — you need to know who you're selling to",
    who: "Wants to build a business or has something small and undefined. No stable income, no employees, lots of confusion about what they're selling and to whom.",
    problem: "No defined offer. Tries to sell to everyone — sells to no one.",
    product: "AI diagnostic tool — smart questionnaire that auto-generates a value proposition. Weekly online workshop for those who need guidance.",
    ai: "Client answers questions → AI builds the offer. Client receives ready value proposition + recommendation for which floor to start on.",
    pricing: "Free — No commitment required",
  },
  {
    num: "1",
    name: "Organic Marketing",
    tagline: "No one will find you if you don't exist",
    who: "Has a defined offer but zero presence. Not creating content, not on any platform.",
    problem: "No digital presence. Not quality — quantity. Simply not putting enough content into the world.",
    product: "AI content system — generates weekly content ready to publish. Platform adaptation. SOP for converting content into leads.",
    ai: "Client defines audience and offer → AI generates platform-optimized content. Client just hits publish.",
    pricing: "Monthly SaaS subscription",
  },
  {
    num: "2",
    name: "Paid Marketing",
    tagline: "A lead machine that works while you sleep",
    who: "Has organic working but volume is too small. Dependent on their own time.",
    problem: "Not enough leads. Organic is good but insufficient. Needs a system that generates leads without time dependency.",
    product: "AI ad system — manages campaigns, integrates with organic. Smart targeting. Full automation and optimization.",
    ai: "Automatic campaign optimization, performance alerts, identifying new audiences.",
    pricing: "Monthly subscription + % of media budget",
  },
  {
    num: "3",
    name: "Sales",
    tagline: "Leads without a sales process is a leaky bucket",
    who: "Has leads but isn't closing. No defined process. Every call is different.",
    problem: "No defined sales process. Improvising every call. Not a persuasion problem — a structure problem.",
    product: "End-to-end sales process. Call script + meeting script. Custom pitch deck. Sales course. AI sales coach with real-time feedback.",
    ai: "Auto-builds sales process by business type. AI coach for call practice with scoring and analysis.",
    pricing: "Monthly subscription + one-time setup fee",
  },
  {
    num: "4",
    name: "Team & Staff",
    tagline: "Your business is stuck because it's built around you, not a system",
    who: "Has good sales but overwhelmed. Everything goes through them.",
    problem: "No time. Needs to hire but no process to do it right.",
    product: "Recruitment process. Onboarding system. Operational SOPs. Management dashboard (marketing + sales + ops).",
    ai: "Smart dashboard aggregating all departments. Automated alerts. AI helps write SOPs and job descriptions.",
    pricing: "Monthly subscription + short partner coaching",
  },
  {
    num: "5",
    name: "Finance",
    tagline: "You're not poor in money — you're poor in financial information",
    who: "Has stable revenue but doesn't understand where the money goes.",
    problem: "No financial control. No defined financial management. Discovers problems too late.",
    product: "Financial management system for SMBs. Course on reading numbers and making decisions. Focused implementation with certified finance partner.",
    ai: "Smart financial dashboard — profit, expenses, cash flow in real time. Money leak alerts. Profitability recommendations. Cash flow forecasting.",
    pricing: "Software subscription + one-time course + partner coaching",
  },
  {
    num: "6",
    name: "Scale",
    tagline: "Your next growth won't come from you — it'll come from the system you build",
    who: "Profitable business with small team that wants to become a brand. Growth is stuck.",
    problem: "Missing management and control processes, no entry-level products to attract new audiences, no ambassadors, no PR, no community.",
    product: "Team management and control system with KPIs. Building entry products. Ambassador program. PR strategy. Community building.",
    ai: "Team management system with automatic KPIs. Potential ambassador identification from client base. Smart community system. Media and PR monitoring.",
    pricing: "High subscription + intensive partner coaching",
  },
  {
    num: "7",
    name: "Empire",
    tagline: "A real business is one that works without you",
    who: "Entrepreneur with large profitable business still too dependent on them. They are the bottleneck.",
    problem: "Growth to dozens of team members requires a completely different organizational structure.",
    product: "Organizational structure for dozens of employees. Authority transfer process. Building middle management layer. Exit preparation.",
    ai: "Founder dashboard — sees everything without managing anything. AI replaces founder in routine decisions. Real-time company valuation. Full organizational management system.",
    pricing: "Senior partner intensive coaching + software",
  },
];

export default function ServicesPage() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#A3FF00 1px, transparent 1px), linear-gradient(90deg, #A3FF00 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto px-6 relative z-10"
        >
          <motion.p custom={0} variants={fadeUp} className="text-xs uppercase tracking-widest text-accent mb-4">
            The Platform
          </motion.p>
          <motion.h1
            custom={1}
            variants={fadeUp}
            className="text-5xl md:text-7xl font-bold font-satoshi mb-6 leading-tight"
          >
            The right tool,<br />
            <span className="text-accent">at the right stage</span>,<br />
            every time.
          </motion.h1>
          <motion.p custom={2} variants={fadeUp} className="text-text-secondary text-xl max-w-2xl leading-relaxed">
            LEVEL7 is built on one insight: most businesses fail not because they're bad businesses — but because they're using the wrong tools at the wrong stage. 8 floors. Each one precision-built for exactly where you are.
          </motion.p>
        </motion.div>
      </section>

      <div className="lime-divider max-w-7xl mx-auto px-6 mb-0" />

      {/* Floors */}
      {floors.map((floor, i) => (
        <FloorSection key={floor.num} floor={floor} index={i} />
      ))}

      {/* CTA */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.03] to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-bold font-satoshi mb-6"
          >
            Not sure which floor you're on?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-text-secondary text-lg mb-10"
          >
            Take the free AI diagnostic — it takes 5 minutes and tells you exactly where to start.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-accent text-background font-bold px-10 py-5 text-base hover:bg-white transition-colors duration-200 group"
            >
              Start Free Diagnostic
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
