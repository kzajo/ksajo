"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

// Referencias de array estables entre renders: si estos arrays se crean
// nuevos en cada render, la memoización interna de useTransform se rompe
// y el valor animado deja de sincronizarse con el DOM.
const RANGE_NORMAL = [0.15, 0.55];
const RANGE_REDUCED = [0, 0.01];
const Y_OUT = [520, 0];
const ROTATE_OUT = [60, 0];

export function CamionReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const range = prefersReducedMotion ? RANGE_REDUCED : RANGE_NORMAL;
  // y empieza bien abajo del área visible (overflow-hidden la recorta), así
  // el texto queda oculto sin depender de opacity — que en pruebas mostró un
  // bug de renderizado al combinarse con el relleno background-clip:text.
  const textY = useTransform(scrollYProgress, range, Y_OUT);
  const textRotateX = useTransform(scrollYProgress, range, ROTATE_OUT);

  return (
    <section ref={sectionRef} className="relative h-[200vh] bg-ink">
      <div
        className="sticky top-0 flex h-screen items-center justify-center overflow-hidden"
        style={{ perspective: 1200 }}
      >
        <div className="mx-auto w-full max-w-md px-6">
          <Image
            src="/camion.png"
            alt="Camión de reparto Kzajo"
            width={1536}
            height={1024}
            className="h-auto w-full rounded-2xl bg-white shadow-2xl shadow-black/50"
          />
        </div>
        <motion.h2
          aria-hidden="true"
          style={{ y: textY, rotateX: textRotateX }}
          className="camion-headline pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center font-heading text-6xl leading-[0.82] font-black uppercase sm:text-7xl md:text-8xl lg:text-9xl"
        >
          <span>Movemos</span>
          <span>Colombia</span>
        </motion.h2>
      </div>
    </section>
  );
}
