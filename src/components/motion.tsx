"use client";

import { animate, motion, useInView, useReducedMotion, type Variants } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Scroll-triggered reveal for sections below the fold. */
export function ScrollReveal({
  children,
  delayMs = 0,
  className = "",
}: {
  children: ReactNode;
  delayMs?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: delayMs / 1000, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/** Plays immediately on mount (not scroll-triggered) — for above-the-fold hero content. */
export function Entrance({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div initial="hidden" animate="show" variants={staggerContainer} className={className}>
      {children}
    </motion.div>
  );
}

export function EntranceItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * "Escalonado" sliding text button: on hover, each letter slides up and out
 * while an identical copy slides up from below to replace it, with a small
 * per-letter delay creating a diagonal wave. Purely decorative — the real
 * accessible label lives on the parent link via aria-label.
 */
export function StaggerText({ text }: { text: string }) {
  const letters = Array.from(text);
  const perLetterDelay = 0.02;

  return (
    <span aria-hidden="true" className="relative inline-block overflow-hidden align-top">
      <span className="invisible whitespace-pre">{text}</span>
      <span className="absolute inset-0 flex">
        {letters.map((ch, i) => (
          <motion.span
            key={`top-${i}`}
            className="inline-block whitespace-pre"
            variants={{ rest: { y: 0 }, hover: { y: "-100%" } }}
            transition={{ duration: 0.35, ease: EASE, delay: i * perLetterDelay }}
          >
            {ch}
          </motion.span>
        ))}
      </span>
      <span className="absolute inset-0 flex">
        {letters.map((ch, i) => (
          <motion.span
            key={`bottom-${i}`}
            className="inline-block whitespace-pre"
            variants={{ rest: { y: "100%" }, hover: { y: 0 } }}
            transition={{ duration: 0.35, ease: EASE, delay: i * perLetterDelay }}
          >
            {ch}
          </motion.span>
        ))}
      </span>
    </span>
  );
}

/** Animates a number counting up from 0 once it scrolls into view. */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  duration = 1.6,
  format = false,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  /** Format with Spanish (es-CO) thousands separators, e.g. 11000 -> "11.000". */
  format?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView || prefersReducedMotion) return;
    const controls = animate(0, value, {
      duration,
      ease: EASE,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, value, duration, prefersReducedMotion]);

  const shown = prefersReducedMotion ? value : display;

  return (
    <span ref={ref}>
      {prefix}
      {format ? shown.toLocaleString("es-CO") : shown}
      {suffix}
    </span>
  );
}
