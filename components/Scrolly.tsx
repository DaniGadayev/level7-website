"use client";

/*
 * Scroll-motion engine. Every element here is driven by scroll position,
 * so the page plays like footage the user scrubs with their thumb.
 * Transforms and opacity only; everything respects prefers-reduced-motion.
 */

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  useMotionValueEvent,
  useInView,
  useVelocity,
  useMotionValue,
  type MotionValue,
} from "framer-motion";

/** Vertical parallax: children drift slower/faster than the page. */
export function ParallaxY({
  children,
  from = 60,
  to = -60,
  className = "",
}: {
  children: React.ReactNode;
  from?: number;
  to?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [from, to]);
  return (
    <motion.div ref={ref} style={reduce ? undefined : { y }} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * Framed image window: the photo is oversized and slides inside its frame as
 * the frame crosses the viewport. Duotone treatment keeps it on-brand.
 */
export function ImageFrame({
  src,
  alt = "",
  caption,
  ratio = "aspect-[16/9]",
  className = "",
}: {
  src: string;
  alt?: string;
  caption?: string;
  ratio?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.18, 1.12, 1.18]);

  return (
    <div ref={ref} className={`ticks relative overflow-hidden rounded-md border border-line bg-panel ${className}`}>
      <span className="tick-b absolute inset-0 pointer-events-none z-20" aria-hidden="true" />
      <div className={`relative ${ratio} overflow-hidden`}>
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          style={reduce ? undefined : { y, scale }}
          className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 brightness-[0.72]"
        />
        {/* lime duotone + vignette */}
        <div className="absolute inset-0 bg-accent/10 mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/40 pointer-events-none" />
      </div>
      {caption && (
        <p className="mono absolute bottom-3 left-4 z-20">
          <span className="text-accent">▮</span> {caption}
        </p>
      )}
    </div>
  );
}

/** Number that counts up when it enters the viewport. */
export function CountUp({
  to,
  prefix = "",
  suffix = "",
  duration = 1.4,
  className = "",
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setVal(to);
      return;
    }
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(to * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {val}
      {suffix}
    </span>
  );
}

/** Slides in horizontally as it enters the viewport, scroll-scrubbed. */
export function SlideIn({
  children,
  dir = 1,
  distance = 90,
  className = "",
}: {
  children: React.ReactNode;
  dir?: 1 | -1;
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start center"] });
  const x = useTransform(scrollYProgress, [0, 1], [distance * dir, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <motion.div ref={ref} style={reduce ? undefined : { x, opacity }} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * Pinned scene: the container is tall, the content sticks fullscreen, and
 * `children(progress)` renders against 0→1 scroll progress. This is the
 * scrollytelling primitive behind the method scene.
 */
export function PinnedScene({
  height = "300vh",
  children,
}: {
  height?: string;
  children: (progress: MotionValue<number>) => React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <div ref={ref} style={{ height }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden">{children(scrollYProgress)}</div>
    </div>
  );
}

/** Step controller for a pinned scene: tells you which step is active. */
export function useSceneStep(progress: MotionValue<number>, steps: number) {
  const [step, setStep] = useState(0);
  useMotionValueEvent(progress, "change", (v) => {
    const s = Math.min(steps - 1, Math.floor(v * steps));
    setStep(s < 0 ? 0 : s);
  });
  return step;
}

/**
 * Horizontal rail: a tall pinned section where the track translates sideways
 * as the user scrolls down, like dragging a filmstrip.
 */
export function HorizontalRail({
  height = "260vh",
  travel = "-62%",
  children,
  header,
}: {
  height?: string;
  travel?: string;
  children: React.ReactNode;
  header?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", travel]);

  if (reduce) {
    return (
      <section>
        {header}
        <div className="flex gap-3 overflow-x-auto px-6 pb-8">{children}</div>
      </section>
    );
  }

  return (
    <div ref={ref} style={{ height }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        {header}
        <motion.div style={{ x }} className="flex gap-3 pl-6 md:pl-12 w-max">
          {children}
        </motion.div>
      </div>
    </div>
  );
}

/** Marquee whose direction/speed rides the scroll. */
export function ScrollMarquee({ children, base = -10 }: { children: React.ReactNode; base?: number }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const raw = useTransform(scrollY, (v) => (v * base) / 40);
  const x = useSpring(raw, { stiffness: 60, damping: 20, mass: 0.5 });
  return (
    <div className="overflow-hidden">
      <motion.div style={reduce ? undefined : { x }} className="flex w-max">
        {children}
      </motion.div>
    </div>
  );
}

/* ───────────────────────── GAME LAYER ───────────────────────── */

/** Magnetic wrapper: the child leans toward the cursor like a game button. */
export function Magnetic({ children, strength = 0.35 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [pos, setPos] = useState({ x: 0, y: 0 });

  if (reduce) return <>{children}</>;

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        setPos({ x: (e.clientX - r.left - r.width / 2) * strength, y: (e.clientY - r.top - r.height / 2) * strength });
      }}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 220, damping: 16, mass: 0.4 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

/** 3D tilt card: rotates toward the cursor like a game asset. */
export function Tilt({ children, max = 8, className = "" }: { children: React.ReactNode; max?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [rot, setRot] = useState({ x: 0, y: 0 });

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      style={{ transformStyle: "preserve-3d", perspective: 900 }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        setRot({ x: -py * max, y: px * max });
      }}
      onMouseLeave={() => setRot({ x: 0, y: 0 })}
      animate={{ rotateX: rot.x, rotateY: rot.y }}
      transition={{ type: "spring", stiffness: 260, damping: 18, mass: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Skews content by scroll velocity — motion you can feel, like game camera lag. */
export function VelocitySkew({ children, factor = 0.06, className = "" }: { children: React.ReactNode; factor?: number; className?: string }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { stiffness: 300, damping: 50, mass: 0.6 });
  const skew = useTransform(smooth, [-1600, 1600], [-factor * 100, factor * 100]);
  return (
    <motion.div style={reduce ? undefined : { skewY: skew }} className={className}>
      {children}
    </motion.div>
  );
}

/** Mouse-parallax stage: layered children drift with the cursor (game camera). */
export function MouseStage({
  children,
  className = "",
}: {
  children: (mx: MotionValue<number>, my: MotionValue<number>) => React.ReactNode;
  className?: string;
}) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 });
  return (
    <div
      className={className}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      {children(sx, sy)}
    </div>
  );
}

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&/=+*";

/** Text decodes into place when it enters the viewport. */
export function Scramble({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (!inView || reduce) {
      setOut(text);
      return;
    }
    let frame = 0;
    let raf: number;
    const total = 26;
    const tick = () => {
      frame++;
      const reveal = Math.floor((frame / total) * text.length);
      setOut(
        text
          .split("")
          .map((ch, i) => {
            if (ch === " ") return " ";
            if (i < reveal) return ch;
            return SCRAMBLE_CHARS[Math.floor((i * 7 + frame * 13) % SCRAMBLE_CHARS.length)];
          })
          .join("")
      );
      if (frame < total) raf = requestAnimationFrame(tick);
      else setOut(text);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, text, reduce]);

  return (
    <span ref={ref} className={className}>
      {out}
    </span>
  );
}

/** Fixed HUD: viewport corner brackets, scroll %, and a live progress bar. */
export function HudOverlay() {
  const { scrollYProgress } = useScroll();
  const pctRef = useRef<HTMLSpanElement>(null);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (pctRef.current) pctRef.current.textContent = String(Math.round(v * 100)).padStart(3, "0") + "%";
  });

  return (
    <div className="pointer-events-none fixed inset-0 z-40 hidden md:block" aria-hidden="true">
      {/* progress bar */}
      <motion.div style={{ scaleX: scrollYProgress }} className="absolute top-0 left-0 right-0 h-[3px] origin-left bg-accent" />
      {/* corner brackets */}
      <div className="absolute bottom-5 left-5 w-6 h-6 border-l-2 border-b-2 border-ink/25" />
      <div className="absolute bottom-5 right-5 w-6 h-6 border-r-2 border-b-2 border-ink/25" />
      {/* telemetry readout */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <span className="mono !text-[10px]">LVL7.SYS</span>
        <span className="w-24 h-px bg-ink/15 relative overflow-hidden">
          <motion.span style={{ scaleX: scrollYProgress }} className="absolute inset-0 origin-left bg-accent" />
        </span>
        <span ref={pctRef} className="mono !text-[10px] tabular-nums">000%</span>
      </div>
    </div>
  );
}

/** Giant outlined text band that slides with scroll; two of these in opposite
    directions make the "conveyor" moment. */
export function TextBand({
  text,
  dir = 1,
  className = "",
}: {
  text: string;
  dir?: 1 | -1;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], [dir * 6 + "%", dir * -14 + "%"]);
  const items = Array.from({ length: 4 }, () => text);
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={reduce ? undefined : { x }} className="flex w-max whitespace-nowrap items-center gap-8">
        {items.map((t, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className={`display text-[clamp(3.5rem,9vw,9rem)] ${i % 2 ? "outline-type" : ""}`}>{t}</span>
            <span className="w-4 h-4 bg-accent inline-block shrink-0" style={{ transform: "rotate(-8deg)" }} />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
