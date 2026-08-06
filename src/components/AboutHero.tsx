"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { Entrance, EntranceItem } from "@/components/motion";

export function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });

  const backdropScale = useTransform(smoothProgress, [0, 1], prefersReducedMotion ? [1.15, 1.15] : [1.15, 1.32]);
  const panelScale = useTransform(smoothProgress, [0, 1], prefersReducedMotion ? [1, 1] : [1, 1.06]);
  const panelY = useTransform(smoothProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, -24]);

  return (
    <section ref={sectionRef} className="relative h-[78vh] min-h-[520px] w-full overflow-hidden bg-ink">
      {/* Ambient full-bleed backdrop: same video, blurred and cropped — the crop doesn't
          matter here since blur hides it, so it can safely fill the whole wide section. */}
      <motion.video
        src="/nosotros-video.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        style={{ scale: backdropScale }}
        className="absolute inset-0 h-full w-full object-cover blur-3xl brightness-[0.45] saturate-125"
      />
      <div aria-hidden className="absolute inset-0 bg-ink/35" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/30" />

      <div className="relative mx-auto grid h-full max-w-6xl items-center gap-10 px-6 md:grid-cols-2">
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

        {/* Crisp, uncropped foreground panel — keeps the video's real 9:16 shape. */}
        <motion.div
          style={{ scale: panelScale, y: panelY }}
          className="relative mx-auto aspect-[9/16] w-full max-w-[260px] overflow-hidden rounded-2xl shadow-2xl shadow-black/50 ring-1 ring-white/10 md:max-w-[300px]"
        >
          <video
            src="/nosotros-video.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
