"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ENABLED = process.env.NEXT_PUBLIC_XMAS === "true";

export default function ChristmasTheme() {
  const pathname = usePathname();

  useEffect(() => {
    if (!ENABLED) return;
    document.documentElement.classList.add("xmas");
    return () => document.documentElement.classList.remove("xmas");
  }, []);

  // ubicación de la página: añadi la clase xmas-inner para bajar el contenido y que no tape los títulos
  useEffect(() => {
    if (!ENABLED) return;
    const isHome = pathname === "/";
    document.documentElement.classList.toggle("xmas-inner", !isHome);
    return () => document.documentElement.classList.remove("xmas-inner");
  }, [pathname]);

  if (!ENABLED) return null;

  return (
    <>
      {/* Nieve */}
      <div className="xmas-snow" aria-hidden="true">
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            style={{
              left: `${(i * 97) % 100}%`,
              animationDuration: `${8 + (i % 7) * 2}s`,
              animationDelay: `${-(i % 10)}s`,
              fontSize: `${10 + (i % 5) * 4}px`,
              opacity: 0.7 + (i % 4) * 0.1,
            }}
          >
            ❄
          </span>
        ))}
      </div>

      {/* Guirnaldas */}
      <div className="xmas-garland xmas-garland--left" aria-hidden="true" />
      <div className="xmas-garland xmas-garland--right" aria-hidden="true" />

      {/* Papá Noel con trineo (imagen) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/xmas/santa-trineo.png"
        alt=""
        aria-hidden="true"
        className="xmas-sleigh"
      />
    </>
  );
}