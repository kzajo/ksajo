"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Entrance, EntranceItem } from "@/components/motion";

export function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [1.05, 1.05] : [1.05, 1.2]);

  return (
    <section ref={sectionRef} className="relative h-[70vh] min-h-[420px] w-full overflow-hidden bg-ink">
      <motion.video
        src="/nosotros-video.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        style={{ scale }}
        className="absolute inset-0 h-full w-full object-contain"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />
      <div className="relative flex h-full items-end">
        <div className="mx-auto w-full max-w-4xl px-6 pb-12">
          <Entrance>
            <EntranceItem>
              <p className="font-heading text-xs font-semibold uppercase tracking-widest text-accent-light">
                Sobre Kzajo
              </p>
            </EntranceItem>
            <EntranceItem>
              <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-white md:text-5xl">
                Empresa norte santandereana líder en lubricantes
              </h1>
            </EntranceItem>
          </Entrance>
        </div>
      </div>
    </section>
  );
}
