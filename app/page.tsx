"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { services } from "@/lib/services";
import { differentiators, processSteps } from "@/lib/social-proof";
import { SectionHead, LogoStrip, TestimonialGrid, Ticks } from "@/components/Hud";
import {
  ParallaxY,
  ImageFrame,
  CountUp,
  SlideIn,
  PinnedScene,
  useSceneStep,
  HorizontalRail,
} from "@/components/Scrolly";

const BOB_URL = "https://www.bob.thelevel7.ai/";

const ArrowIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const IMG = {
  towers: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1800&auto=format&fit=crop",
  city: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1800&auto=format&fit=crop",
  team: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1800&auto=format&fit=crop",
  chart: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1800&auto=format&fit=crop",
  laptop: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1800&auto=format&fit=crop",
};

const method = [
  {
    num: "01",
    kicker: "The filter",
    title: "Your sales team never meets a bad lead",
    body: "Eight out of ten leads were never going to buy, and most teams burn whole days finding that out. Our filtering system sorts before you ever see a name: smart qualification flows ask the right questions, score the answers, and let through only real intent with a real budget.",
    proof: "You spend your time closing, not qualifying.",
    img: IMG.laptop,
    cap: "Qualification running 24/7",
  },
  {
    num: "02",
    kicker: "The warm-up",
    title: "Leads arrive warm, not cold",
    body: "Most agencies consider the job done when the form gets submitted. That is exactly where deals are won or lost. Our after-lead journey takes over the moment someone raises a hand: instant response, helpful follow-ups, proof delivered over days. By the time your salesperson calls, the lead already knows why you are worth their money.",
    proof: "Higher trust going in. Higher close rates coming out.",
    img: IMG.team,
    cap: "The after-lead journey",
  },
  {
    num: "03",
    kicker: "The receipt",
    title: "We answer to one number: your return",
    body: "The only number that decides whether marketing works is how much money came back for every dollar in. That is the number we report, optimize for, and are comfortable being judged on. Clients typically see 3x to 12x on ad budget once optimization settles.",
    proof: "If it does not return, we change it until it does.",
    img: IMG.chart,
    cap: "Judged on the return",
  },
];

/* ── HERO: headline halves shear apart as you scroll ── */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  const xLeft = useTransform(smooth, [0, 1], ["0%", "-16%"]);
  const xRight = useTransform(smooth, [0, 1], ["0%", "16%"]);
  const fade = useTransform(smooth, [0, 0.7], [1, 0]);
  const gridScale = useTransform(smooth, [0, 1], [1, 1.25]);
  const glowY = useTransform(smooth, [0, 1], ["0%", "40%"]);

  return (
    <section ref={ref} className="relative min-h-[108vh] overflow-hidden flex flex-col justify-center">
      <motion.div style={reduce ? undefined : { scale: gridScale }} className="absolute inset-0 grid-bg" aria-hidden="true" />
      <motion.div style={reduce ? undefined : { y: glowY }} className="absolute inset-x-0 top-1/4 h-[480px] glow pointer-events-none" aria-hidden="true" />

      <motion.div style={reduce ? undefined : { opacity: fade }} className="relative max-w-[92rem] mx-auto w-full px-6 pt-28">
        {/* telemetry topline */}
        <div className="flex items-center justify-between mb-10 md:mb-16">
          <p className="mono">
            <span className="text-accent">●</span> Growth marketing + software
          </p>
          <p className="mono hidden sm:block">For service businesses / worldwide</p>
          <p className="mono hidden md:block">EST. return 3x-12x</p>
        </div>

        <motion.h1 style={reduce ? undefined : { x: xLeft }} className="display text-hero whitespace-nowrap">
          Marketing that
        </motion.h1>
        <motion.h1 style={reduce ? undefined : { x: xRight }} className="display text-hero text-right whitespace-nowrap">
          <span className="tilt-chip">pays</span> for itself.
        </motion.h1>

        <div className="mt-10 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
          <p className="text-lg text-muted leading-relaxed max-w-xl">
            LEVEL7 runs your marketing end to end. We generate the leads, filter out the noise, and warm up
            the rest before your team ever picks up the phone. Then we measure the only thing that matters:
            how much came back.
          </p>
          <div className="flex flex-wrap gap-4 md:justify-end">
            <a href={BOB_URL} className="btn-primary">
              START WITH $0
              <ArrowIcon />
            </a>
            <Link href="/services" className="btn-ghost">
              Explore our services
            </Link>
          </div>
        </div>

        {/* scroll cue */}
        <div className="mt-16 md:mt-20 flex items-center gap-4">
          <motion.span
            aria-hidden="true"
            animate={reduce ? undefined : { y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="text-accent"
          >
            ↓
          </motion.span>
          <p className="mono">Scroll / the page plays itself</p>
        </div>
      </motion.div>
    </section>
  );
}

/* ── STATS: numbers count up, band drifts on scroll ── */
function StatsBand() {
  return (
    <section className="relative border-y border-line overflow-hidden">
      <div className="scan-rule absolute top-0 inset-x-0" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <p className="stat-value">
            <CountUp to={3} />
            x-
            <CountUp to={12} />x
          </p>
          <p className="stat-label">Return on ad spend</p>
        </div>
        <div>
          <p className="stat-value">
            <CountUp to={150} suffix="+" />
          </p>
          <p className="stat-label">Businesses growing with us</p>
        </div>
        <div>
          <p className="stat-value">
            <CountUp to={11} />
          </p>
          <p className="stat-label">Services under one roof</p>
        </div>
        <div>
          <p className="stat-value">
            <CountUp to={24} />
            /7
          </p>
          <p className="stat-label">Systems working for you</p>
        </div>
      </div>
    </section>
  );
}

/* ── METHOD: pinned scrollytelling scene ── */
function MethodScene() {
  return (
    <PinnedScene height="340vh">
      {(progress) => <MethodFrames progress={progress} />}
    </PinnedScene>
  );
}

function MethodFrames({ progress }: { progress: ReturnType<typeof useSpring> }) {
  const step = useSceneStep(progress, method.length);
  const railScale = useTransform(progress, [0, 1], [0, 1]);

  return (
    <div className="relative h-full flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 grid-bg" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto w-full px-6">
        <p className="label mb-8">
          <span className="text-accent">02</span> The method / scroll to play
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* text side */}
          <div className="relative min-h-[520px] sm:min-h-[420px]">
            {method.map((m, i) => (
              <motion.div
                key={m.num}
                initial={false}
                animate={{
                  opacity: step === i ? 1 : 0,
                  y: step === i ? 0 : step > i ? -28 : 28,
                }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
                style={{ pointerEvents: step === i ? "auto" : "none" }}
              >
                <p className="display text-7xl md:text-8xl text-white/10 mb-4">{m.num}</p>
                <p className="mono mb-3">
                  <span className="text-accent">{"//"}</span> {m.kicker}
                </p>
                <h3 className="display text-4xl md:text-5xl mb-5">{m.title}</h3>
                <p className="text-muted leading-relaxed mb-5 max-w-xl">{m.body}</p>
                <p className="font-semibold text-white border-l-2 border-accent pl-4">{m.proof}</p>
              </motion.div>
            ))}
          </div>

          {/* image side */}
          <div className="relative aspect-[4/3] hidden lg:block">
            {method.map((m, i) => (
              <motion.div
                key={m.num}
                initial={false}
                animate={{
                  opacity: step === i ? 1 : 0,
                  scale: step === i ? 1 : 1.06,
                  rotate: step === i ? 0 : i % 2 ? 1.5 : -1.5,
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <div className="ticks relative h-full overflow-hidden rounded-md border border-line">
                  <span className="tick-b absolute inset-0 pointer-events-none z-20" aria-hidden="true" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={m.img}
                    alt=""
                    loading={i === 0 ? "eager" : "lazy"}
                    className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 brightness-[0.7]"
                  />
                  <div className="absolute inset-0 bg-accent/10 mix-blend-overlay" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
                  <p className="mono absolute bottom-4 left-5 z-20">
                    <span className="text-accent">▮</span> {m.cap}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* progress rail */}
        <div className="mt-12 flex items-center gap-4">
          <div className="relative h-px bg-line flex-1 overflow-hidden">
            <motion.div style={{ scaleX: railScale }} className="absolute inset-0 origin-left bg-accent" />
          </div>
          <p className="mono tabular-nums">
            {String(step + 1).padStart(2, "0")} / {String(method.length).padStart(2, "0")}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── SERVICES: horizontal filmstrip driven by vertical scroll ── */
function ServicesRail() {
  return (
    <HorizontalRail
      height="280vh"
      travel="-68%"
      header={
        <div className="max-w-7xl mx-auto w-full px-6 mb-10">
          <SectionHead index="03" label="The services / scroll sideways" title="Everything under one roof." />
        </div>
      }
    >
      {services.map((s, i) => (
        <Link
          key={s.slug}
          href={`/services/${s.slug}`}
          className="panel hot group block w-[300px] md:w-[360px] shrink-0 p-7"
        >
          <div className="flex items-start justify-between mb-8">
            <span className="mono !text-faint group-hover:!text-accent transition-colors">
              {String(i + 1).padStart(2, "0")} / 11
            </span>
            <span className="w-8 h-8 rounded border border-line flex items-center justify-center text-muted group-hover:bg-accent group-hover:border-accent group-hover:text-void transition-colors">
              <ArrowIcon className="w-3.5 h-3.5" />
            </span>
          </div>
          <h3 className="display text-3xl mb-3">{s.shortName}</h3>
          <p className="text-sm font-medium text-accent/90 mb-3">{s.tagline}</p>
          <p className="text-sm text-muted leading-relaxed">{s.blurb}</p>
        </Link>
      ))}
      <Link
        href="/services"
        className="panel hot group flex w-[300px] md:w-[360px] shrink-0 items-center justify-center p-7 border-dashed"
      >
        <span className="inline-flex items-center gap-2 font-semibold text-accent text-lg">
          All services
          <ArrowIcon />
        </span>
      </Link>
    </HorizontalRail>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBand />

      {/* CITY BAND: full-bleed parallax window */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <ImageFrame
            src={IMG.towers}
            alt="Skyscrapers shot from below"
            caption="Build an empire / one level at a time"
            ratio="aspect-[16/8] md:aspect-[16/6]"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 items-start">
            <SlideIn dir={-1}>
              <h2 className="display text-section">
                One company. <span className="tilt-chip">Two engines</span>.
              </h2>
            </SlideIn>
            <SlideIn dir={1}>
              <p className="text-muted text-lg leading-relaxed">
                We started as marketers. Then we got tired of the tools, so we built our own. Today those two
                sides feed each other: the agency work sharpens the software, and the software gives our
                clients an edge nobody can buy off the shelf.
              </p>
            </SlideIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
            <SlideIn dir={-1}>
              <Ticks className="panel hot p-8 md:p-10 h-full">
                <p className="mono mb-6">
                  <span className="text-accent">A/</span> The growth agency
                </p>
                <h3 className="display text-4xl mb-4">Marketing, run for you</h3>
                <p className="text-muted leading-relaxed mb-8">
                  Full-service digital marketing for service businesses that want results they can count.
                  Paid media on every platform, social, search, automation and websites. Eleven services, one
                  team, one goal: a return you can read in your bank account.
                </p>
                <Link href="/services" className="inline-flex items-center gap-2 font-semibold text-accent hover:underline underline-offset-4">
                  See all 11 services
                  <ArrowIcon />
                </Link>
              </Ticks>
            </SlideIn>
            <SlideIn dir={1}>
              <Ticks className="panel hot p-8 md:p-10 h-full">
                <p className="mono mb-6">
                  <span className="text-accent">B/</span> The software we build
                </p>
                <h3 className="display text-4xl mb-4">The tools behind it</h3>
                <p className="text-muted leading-relaxed mb-8">
                  The same systems that run our campaigns are products in their own right. BOB, our AI
                  employee, answers, qualifies and follows up with your leads around the clock, exactly the
                  way our own team does it.
                </p>
                <a href={BOB_URL} className="inline-flex items-center gap-2 font-semibold text-accent hover:underline underline-offset-4">
                  Meet BOB
                  <ArrowIcon />
                </a>
              </Ticks>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* METHOD: pinned cinematic scene */}
      <MethodScene />

      {/* SERVICES: horizontal rail */}
      <ServicesRail />

      {/* DIFFERENTIATION */}
      <section className="py-24 md:py-32 border-t border-line">
        <div className="max-w-7xl mx-auto px-6">
          <SlideIn dir={-1}>
            <SectionHead index="04" label="The difference" title="Why we win where others burn budgets." className="mb-14" />
          </SlideIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {differentiators.map((d, i) => (
              <SlideIn key={d.num} dir={i % 2 ? 1 : -1}>
                <Ticks className="panel hot p-8 h-full">
                  <div className="flex items-baseline justify-between mb-6">
                    <p className="mono">
                      <span className="text-accent">{d.num}</span>
                    </p>
                    <div className="text-right">
                      <span className="display text-4xl text-accent">{d.stat}</span>
                      <p className="mono mt-1">{d.statLabel}</p>
                    </div>
                  </div>
                  <h3 className="display text-3xl mb-3">{d.title}</h3>
                  <p className="text-muted leading-relaxed text-[15px]">{d.desc}</p>
                </Ticks>
              </SlideIn>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS with drifting image */}
      <section className="py-24 md:py-32 border-t border-line overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
            <div className="lg:col-span-3">
              <SlideIn dir={-1}>
                <SectionHead index="05" label="How an engagement runs" title="From first call to scaled budgets." className="mb-12" />
              </SlideIn>
              <div className="space-y-3">
                {processSteps.map((step, i) => (
                  <SlideIn key={step.num} dir={-1} distance={50 + i * 25}>
                    <div className="panel p-6 flex gap-6 items-start">
                      <span className="display text-4xl text-accent shrink-0 w-14">{step.num}</span>
                      <div>
                        <h3 className="font-semibold text-lg text-white mb-1">{step.title}</h3>
                        <p className="text-sm text-muted leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  </SlideIn>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2 hidden lg:block">
              <ParallaxY from={80} to={-80}>
                <ImageFrame src={IMG.city} alt="City lights at night" caption="Optimization never sleeps" ratio="aspect-[3/4]" />
              </ParallaxY>
            </div>
          </div>
          <p className="text-muted mt-10 max-w-2xl leading-relaxed">
            Optimization usually takes one to three months to settle. After that, our clients receive their
            results with the kind of consistency that makes planning next quarter a calmer conversation.
          </p>
        </div>
      </section>

      {/* PROOF */}
      <section className="py-24 md:py-32 border-t border-line">
        <div className="max-w-7xl mx-auto px-6">
          <SlideIn dir={-1}>
            <SectionHead index="06" label="Proof" title="Clients keep the receipts." className="mb-14" />
          </SlideIn>
          <TestimonialGrid />
          <div className="mt-20">
            <LogoStrip />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-28 md:py-40 border-t border-line overflow-hidden">
        <div className="absolute inset-0 grid-bg" aria-hidden="true" />
        <ParallaxY from={40} to={-40} className="absolute inset-x-0 bottom-0 h-[420px] glow pointer-events-none">
          <span />
        </ParallaxY>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <p className="mono mb-8">
            <span className="text-accent">●</span> Free growth plan / no strings
          </p>
          <SlideIn dir={-1}>
            <h2 className="display text-hero mb-8">
              Let&apos;s find out what your marketing <span className="tilt-chip">could return</span>.
            </h2>
          </SlideIn>
          <p className="text-muted text-lg mb-12 max-w-xl mx-auto leading-relaxed">
            Tell us about your business. We will come back with a concrete plan: which channels, what budget,
            and the return we would aim for. If it is not a fit, we will tell you that too.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href={BOB_URL} className="btn-primary text-lg px-12 py-5">
              START WITH $0
              <ArrowIcon className="w-5 h-5" />
            </a>
            <Link href="/contact" className="btn-ghost text-lg px-10 py-5">
              Get my growth plan
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
