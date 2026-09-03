"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";

/** Inicio = blanco, Catálogo = negro (ink), Nosotros = azul, Contacto = gris — colores de marca. */
const CURTAIN_COLORS: Record<string, string> = {
  "/": "#ffffff",
  "/catalogo": "var(--color-ink)",
  "/transporte": "var(--color-accent-dark)",
  "/nosotros": "var(--color-accent)",
  "/contacto": "var(--color-steel)",
};
const DEFAULT_COLOR = "var(--color-accent)";

type Phase = "idle" | "covering" | "covered" | "revealing";

const PageTransitionContext = createContext<{ navigate: (href: string) => void } | null>(null);

export function usePageTransition() {
  const ctx = useContext(PageTransitionContext);
  if (!ctx) throw new Error("usePageTransition must be used within PageTransitionProvider");
  return ctx;
}

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const [color, setColor] = useState(DEFAULT_COLOR);
  const pendingHref = useRef<string | null>(null);

  function navigate(href: string) {
    if (phase !== "idle" || href === pathname) return;
    if (prefersReducedMotion) {
      router.push(href);
      return;
    }
    setColor(CURTAIN_COLORS[href] ?? DEFAULT_COLOR);
    pendingHref.current = href;
    setPhase("covering");
  }

  useEffect(() => {
    if (phase === "covered" && pendingHref.current === pathname) {
      pendingHref.current = null;
      const id = requestAnimationFrame(() => setPhase("revealing"));
      return () => cancelAnimationFrame(id);
    }
  }, [pathname, phase]);

  // Safety net: if navigation (route compile, data fetch, etc.) takes longer
  // than expected, don't leave the curtain stuck covering the screen forever.
  useEffect(() => {
    if (phase !== "covered") return;
    const timeout = setTimeout(() => {
      pendingHref.current = null;
      setPhase("revealing");
    }, 4000);
    return () => clearTimeout(timeout);
  }, [phase]);

  return (
    <PageTransitionContext.Provider value={{ navigate }}>
      {children}
      <motion.div
        aria-hidden
        style={{ background: color }}
        className={`fixed inset-0 z-[999] origin-left ${phase === "idle" ? "pointer-events-none" : ""}`}
        initial={false}
        animate={{ scaleX: phase === "covering" || phase === "covered" ? 1 : 0 }}
        transition={{ duration: 0.1, ease: [0.76, 0, 0.24, 1] }}
        onAnimationComplete={() => {
          if (phase === "covering") {
            setPhase("covered");
            if (pendingHref.current) router.push(pendingHref.current);
          } else if (phase === "revealing") {
            setPhase("idle");
          }
        }}
      />
    </PageTransitionContext.Provider>
  );
}
