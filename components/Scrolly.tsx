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
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  return (
    <div ref={ref} style={{ height }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden">{children(smooth)}</div>
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
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 26, mass: 0.4 });
  const x = useTransform(smooth, [0, 1], ["0%", travel]);

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
