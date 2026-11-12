"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

type Phase = "idle" | "covering" | "covered" | "revealing";

/** Tiempo mínimo que se mantiene cubierta la pantalla, para que la animación
 * siempre se alcance a ver aunque la página siguiente cargue al instante. */
const MIN_COVERED_MS = 650;

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
  const pendingHref = useRef<string | null>(null);
  const coveredAt = useRef(0);

  function navigate(href: string) {
    if (phase !== "idle" || href === pathname) return;
    if (prefersReducedMotion) {
      router.push(href);
      return;
    }
    pendingHref.current = href;
    setPhase("covering");
  }

  useEffect(() => {
    if (phase !== "covered" || pendingHref.current !== pathname) return;
    const elapsed = Date.now() - coveredAt.current;
    const wait = Math.max(0, MIN_COVERED_MS - elapsed);
    const id = setTimeout(() => {
      pendingHref.current = null;
      setPhase("revealing");
    }, wait);
    return () => clearTimeout(id);
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

  const visible = phase === "covering" || phase === "covered";

  return (
    <PageTransitionContext.Provider value={{ navigate }}>
      {children}
      <motion.div
        aria-hidden
        className={`fixed inset-0 z-[999] origin-left overflow-hidden ${phase === "idle" ? "pointer-events-none" : ""}`}
        style={{
          backgroundImage:
            "linear-gradient(120deg, var(--color-accent-dark) 0%, var(--color-accent) 30%, var(--color-accent-light) 50%, var(--color-accent) 70%, var(--color-accent-dark) 100%)",
        }}
        initial={false}
        animate={{ scaleX: visible ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        onAnimationComplete={() => {
          if (phase === "covering") {
            coveredAt.current = Date.now();
            setPhase("covered");
            if (pendingHref.current) router.push(pendingHref.current);
          } else if (phase === "revealing") {
            setPhase("idle");
          }
        }}
      >
        {visible && (
          <>
            {/* Franja de brillo que recorre la cortina, efecto metal pulido */}
            <motion.div
              aria-hidden
              className="absolute inset-y-0 w-1/3 bg-white/25 blur-xl"
              initial={{ x: "-120%" }}
              animate={{ x: "320%" }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              style={{ transform: "skewX(-20deg)" }}
            />

            <div className="flex h-full w-full items-center justify-center">
              <motion.div
                initial={{ scale: 0.3, rotate: -20, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 16 }}
                className="relative"
              >
                <motion.div
                  className="relative grid size-20 place-items-center overflow-hidden rounded-full bg-ink shadow-xl shadow-ink/40"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Image src="/logo-white.webp" alt="" aria-hidden width={91} height={46} className="h-7 w-auto" />
                  {/* Brillo diagonal sobre el logo */}
                  <motion.div
                    aria-hidden
                    className="absolute inset-y-0 w-1/2 bg-white/30 blur-md"
                    initial={{ x: "-150%" }}
                    animate={{ x: "250%" }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                    style={{ transform: "skewX(-20deg)" }}
                  />
                </motion.div>
              </motion.div>
            </div>
          </>
        )}
      </motion.div>
    </PageTransitionContext.Provider>
  );
}
