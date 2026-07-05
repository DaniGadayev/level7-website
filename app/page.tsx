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
  Magnetic,
  Tilt,
  MouseStage,
  Scramble,
  HudOverlay,
  TextBand,
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

const heroChips = [
  { label: "GOOGLE ADS", x: "9%", y: "13%", depth: 40, rot: -6 },
  { label: "FILTERED LEADS", x: "78%", y: "20%", depth: 60, rot: 4 },
  { label: "3X-12X ROAS", x: "84%", y: "62%", depth: 30, rot: -3 },
  { label: "AFTER-LEAD", x: "66%", y: "80%", depth: 55, rot: 5 },
  { label: "AI SEARCH", x: "64%", y: "8%", depth: 45, rot: -4 },
  { label: "24/7", x: "26%", y: "10%", depth: 70, rot: 6 },
];

/* hook-safe cursor-parallax pieces (hooks must live at component top level) */
function ChipFloat({ c, mx, my }: { c: (typeof heroChips)[number]; mx: any; my: any }) {
  const x = useTransform(mx, (v: number) => v * -c.depth);
  const y = useTransform(my, (v: number) => v * -c.depth);
  return (
    <motion.span
      style={{ left: c.x, top: c.y, rotate: c.rot, x, y }}
      className="absolute hidden lg:inline-block font-mono text-[11px] tracking-[0.14em] bg-white border-2 border-ink rounded px-3 py-1.5 shadow-[3px_3px_0_#0A0A0A] select-none"
      aria-hidden="true"
    >
      <span className="text-accent mr-1.5">▮</span>
      {c.label}
    </motion.span>
  );
}

function GlowFloat({ mx, my }: { mx: any; my: any }) {
  const x = useTransform(mx, (v: number) => v * -40);
  const y = useTransform(my, (v: number) => v * -30);
  return <motion.div style={{ x, y }} className="absolute inset-x-0 top-1/4 h-[480px] glow pointer-events-none" aria-hidden="true" />;
}

function HeadlineShear({
  children,
  scrollX,
  mx,
  factor,
  className,
}: {
  children: React.ReactNode;
  scrollX: any;
  mx: any;
  factor: number;
  className: string;
}) {
  const tx = useTransform(mx, (v: number) => v * factor);
  return (
    <motion.h1 style={{ x: scrollX, translateX: tx }} className={className}>
      {children}
    </motion.h1>
  );
}

/* ── HERO: game camera — cursor parallax + scroll shear ── */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const xLeft = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const xRight = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const gridScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);

  return (
    <section ref={ref} className="relative min-h-[106vh] overflow-hidden">
      <MouseStage className="relative min-h-[106vh] flex flex-col justify-center">
        {(mx, my) => (
          <>
            <motion.div style={reduce ? undefined : { scale: gridScale }} className="absolute inset-0 grid-bg" aria-hidden="true" />
            {reduce ? (
              <div className="absolute inset-x-0 top-1/4 h-[480px] glow pointer-events-none" aria-hidden="true" />
            ) : (
              <GlowFloat mx={mx} my={my} />
            )}

            {/* floating service chips, each on its own depth plane */}
            {!reduce && heroChips.map((c) => <ChipFloat key={c.label} c={c} mx={mx} my={my} />)}

            {/* rotating starburst badge */}
            <div className="absolute right-[8%] top-[30%] hidden xl:block" aria-hidden="true">
              <div className="relative w-28 h-28 spin-slow">
                <svg viewBox="0 0 112 112" className="w-full h-full">
                  <path
                    id="circ"
                    d="M56,56 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"
                    fill="none"
                  />
                  <text className="font-mono" fontSize="10.5" letterSpacing="2.5" fill="#0A0A0A">
                    <textPath href="#circ">START WITH $0 • START WITH $0 • START WITH $0 •</textPath>
                  </text>
                </svg>
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-10 h-10 bg-accent border-2 border-ink rounded-sm flex items-center justify-center display text-xl" style={{ transform: "rotate(-6deg)" }}>
                    7
                  </span>
                </span>
              </div>
            </div>

            <motion.div style={reduce ? undefined : { opacity: fade }} className="relative max-w-[92rem] mx-auto w-full px-6 pt-32">
              <div className="flex items-center justify-between mb-10 md:mb-14">
                <p className="mono">
                  <span className="text-accent">●</span> <Scramble text="GROWTH MARKETING + SOFTWARE" />
                </p>
                <p className="mono hidden sm:block">
                  <Scramble text="FOR SERVICE BUSINESSES / WORLDWIDE" />
                </p>
                <p className="mono hidden md:block">
                  <Scramble text="EST. RETURN 3X-12X" />
                </p>
              </div>

              {reduce ? (
                <>
                  <h1 className="display text-hero whitespace-nowrap">Marketing that</h1>
                  <h1 className="display text-hero text-right whitespace-nowrap">
                    <span className="tilt-chip">pays</span> for itself.
                  </h1>
                </>
              ) : (
                <>
                  <HeadlineShear scrollX={xLeft} mx={mx} factor={-14} className="display text-hero whitespace-nowrap">
                    Marketing that
                  </HeadlineShear>
                  <HeadlineShear scrollX={xRight} mx={mx} factor={14} className="display text-hero text-right whitespace-nowrap">
                    <span className="tilt-chip">pays</span> for itself.
                  </HeadlineShear>
                </>
              )}

              <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                <p className="text-lg text-muted leading-relaxed max-w-xl">
                  LEVEL7 runs your marketing end to end. We generate the leads, filter out the noise, and warm
                  up the rest before your team ever picks up the phone. Then we measure the only thing that
                  matters: how much came back.
                </p>
                <div className="flex flex-wrap gap-4 md:justify-end">
                  <Magnetic>
                    <a href={BOB_URL} className="btn-primary">
                      START WITH $0
                      <ArrowIcon />
                    </a>
                  </Magnetic>
                  <Magnetic strength={0.25}>
                    <Link href="/services" className="btn-ghost">
                      Explore our services
                    </Link>
                  </Magnetic>
                </div>
              </div>

              <div className="mt-14 md:mt-16 flex items-center gap-4">
                <motion.span
                  aria-hidden="true"
                  animate={reduce ? undefined : { y: [0, 8, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  className="text-ink font-bold"
                >
                  ↓
                </motion.span>
                <p className="mono">
                  <Scramble text="SCROLL / THE PAGE PLAYS ITSELF" />
                </p>
              </div>
            </motion.div>
          </>
        )}
      </MouseStage>
    </section>
  );
}

/* ── STATS ── */
function StatsBand() {
  return (
    <section className="relative border-y-2 border-ink bg-white overflow-hidden">
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

/* ── METHOD: pinned scrollytelling ── */
function MethodScene() {
  return <PinnedScene height="340vh">{(progress) => <MethodFrames progress={progress} />}</PinnedScene>;
}

function MethodFrames({ progress }: { progress: ReturnType<typeof useSpring> }) {
  const step = useSceneStep(progress, method.length);
  const railScale = useTransform(progress, [0, 1], [0, 1]);

  return (
    <div className="relative h-full flex flex-col justify-center overflow-hidden bg-panel2">
      <div className="absolute inset-0 grid-bg" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto w-full px-6">
        <p className="label mb-8">
          <span className="text-accent">02</span> The method / scroll to play
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
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
                <p className="display text-7xl md:text-8xl text-ink/10 mb-4">{m.num}</p>
                <p className="mono mb-3">
                  <span className="text-accent">{"//"}</span> {m.kicker}
                </p>
                <h3 className="display text-4xl md:text-5xl mb-5">{m.title}</h3>
                <p className="text-muted leading-relaxed mb-5 max-w-xl">{m.body}</p>
                <p className="font-semibold text-ink border-l-4 border-accent pl-4">{m.proof}</p>
              </motion.div>
            ))}
          </div>

          <div className="relative aspect-[4/3] hidden lg:block">
            {method.map((m, i) => (
              <motion.div
                key={m.num}
                initial={false}
                animate={{
                  opacity: step === i ? 1 : 0,
                  scale: step === i ? 1 : 1.06,
                  rotate: step === i ? 0 : i % 2 ? 2 : -2,
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <div className="ticks relative h-full overflow-hidden rounded-md border-2 border-ink shadow-[8px_8px_0_#A3FF00]">
                  <span className="tick-b absolute inset-0 pointer-events-none z-20" aria-hidden="true" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={m.img}
                    alt=""
                    loading={i === 0 ? "eager" : "lazy"}
                    className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 brightness-[0.85]"
                  />
                  <div className="absolute inset-0 bg-accent/15 mix-blend-multiply" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/70 via-transparent to-transparent" />
                  <p className="mono absolute bottom-4 left-5 z-20 !text-white">
                    <span className="text-accent">▮</span> {m.cap}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex items-center gap-4">
          <div className="relative h-1 bg-line flex-1 overflow-hidden rounded-full">
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

/* ── SERVICES: horizontal filmstrip ── */
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
            <span className="mono !text-faint group-hover:!text-ink transition-colors">
              {String(i + 1).padStart(2, "0")} / 11
            </span>
            <span className="w-8 h-8 rounded border-2 border-ink flex items-center justify-center text-ink group-hover:bg-accent transition-colors">
              <ArrowIcon className="w-3.5 h-3.5" />
            </span>
          </div>
          <h3 className="display text-3xl mb-3">{s.shortName}</h3>
          <p className="text-sm font-semibold text-ink mb-3">{s.tagline}</p>
          <p className="text-sm text-muted leading-relaxed">{s.blurb}</p>
        </Link>
      ))}
      <Link
        href="/services"
        className="panel hot group flex w-[300px] md:w-[360px] shrink-0 items-center justify-center p-7 border-dashed border-2 border-ink"
      >
        <span className="inline-flex items-center gap-2 font-semibold text-ink text-lg">
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
      <HudOverlay />
      <Hero />
      <StatsBand />

      {/* conveyor of giant type */}
      <section className="py-14 border-b border-line overflow-hidden" aria-hidden="true">
        <TextBand text="PAYS FOR ITSELF" dir={1} />
        <TextBand text="FILTER • WARM • RETURN" dir={-1} className="mt-2" />
      </section>

      {/* CITY BAND */}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-12">
              <SlideIn dir={-1}>
                <Tilt>
                  <Ticks className="panel hot p-8 md:p-10 h-full">
                    <p className="mono mb-6">
                      <span className="text-accent">A/</span> The growth agency
                    </p>
                    <h3 className="display text-4xl mb-4">Marketing, run for you</h3>
                    <p className="text-muted leading-relaxed mb-8">
                      Full-service digital marketing for service businesses that want results they can count.
                      Paid media on every platform, social, search, automation and websites. Eleven services,
                      one team, one goal: a return you can read in your bank account.
                    </p>
                    <Link href="/services" className="inline-flex items-center gap-2 font-semibold text-ink underline decoration-accent decoration-[3px] underline-offset-4">
                      See all 11 services
                      <ArrowIcon />
                    </Link>
                  </Ticks>
                </Tilt>
              </SlideIn>
              <SlideIn dir={1}>
                <Tilt>
                  <Ticks className="panel hot p-8 md:p-10 h-full">
                    <p className="mono mb-6">
                      <span className="text-accent">B/</span> The software we build
                    </p>
                    <h3 className="display text-4xl mb-4">The tools behind it</h3>
                    <p className="text-muted leading-relaxed mb-8">
                      The same systems that run our campaigns are products in their own right. BOB, our AI
                      employee, answers, qualifies and follows up with your leads around the clock, exactly
                      the way our own team does it.
                    </p>
                    <a href={BOB_URL} className="inline-flex items-center gap-2 font-semibold text-ink underline decoration-accent decoration-[3px] underline-offset-4">
                      Meet BOB
                      <ArrowIcon />
                    </a>
                  </Ticks>
                </Tilt>
              </SlideIn>
            </div>
          </div>
        </section>

      <MethodScene />
      <ServicesRail />

      {/* DIFFERENTIATION */}
        <section className="py-24 md:py-32 border-t border-line">
          <div className="max-w-7xl mx-auto px-6">
            <SlideIn dir={-1}>
              <SectionHead index="04" label="The difference" title="Why we win where others burn budgets." className="mb-14" />
            </SlideIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {differentiators.map((d, i) => (
                <SlideIn key={d.num} dir={i % 2 ? 1 : -1}>
                  <Tilt>
                    <Ticks className="panel hot p-8 h-full">
                      <div className="flex items-baseline justify-between mb-6">
                        <p className="mono">
                          <span className="text-accent">{d.num}</span>
                        </p>
                        <div className="text-right">
                          <span className="display text-4xl bg-accent px-2 rounded-sm" style={{ boxShadow: "3px 3px 0 #0A0A0A" }}>
                            {d.stat}
                          </span>
                          <p className="mono mt-2">{d.statLabel}</p>
                        </div>
                      </div>
                      <h3 className="display text-3xl mb-3">{d.title}</h3>
                      <p className="text-muted leading-relaxed text-[15px]">{d.desc}</p>
                    </Ticks>
                  </Tilt>
                </SlideIn>
              ))}
            </div>
          </div>
        </section>

      {/* PROCESS */}
      <section className="py-24 md:py-32 border-t border-line overflow-hidden bg-panel2">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
            <div className="lg:col-span-3">
              <SlideIn dir={-1}>
                <SectionHead index="05" label="How an engagement runs" title="From first call to scaled budgets." className="mb-12" />
              </SlideIn>
              <div className="space-y-4">
                {processSteps.map((step, i) => (
                  <SlideIn key={step.num} dir={-1} distance={50 + i * 25}>
                    <div className="panel hot p-6 flex gap-6 items-start">
                      <span className="display text-4xl bg-accent border-2 border-ink rounded px-2 shrink-0" style={{ transform: "rotate(-3deg)" }}>
                        {step.num}
                      </span>
                      <div>
                        <h3 className="font-semibold text-lg text-ink mb-1">{step.title}</h3>
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
      <section className="relative py-28 md:py-40 border-t-2 border-ink overflow-hidden bg-white">
        <div className="absolute inset-0 grid-bg" aria-hidden="true" />
        <ParallaxY from={40} to={-40} className="absolute inset-x-0 bottom-0 h-[420px] glow pointer-events-none">
          <span />
        </ParallaxY>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <p className="mono mb-8">
            <span className="text-accent">●</span> <Scramble text="FREE GROWTH PLAN / NO STRINGS" />
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
            <Magnetic>
              <a href={BOB_URL} className="btn-primary text-lg px-12 py-5">
                START WITH $0
                <ArrowIcon className="w-5 h-5" />
              </a>
            </Magnetic>
            <Magnetic strength={0.25}>
              <Link href="/contact" className="btn-ghost text-lg px-10 py-5">
                Get my growth plan
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>
    </>
  );
}
