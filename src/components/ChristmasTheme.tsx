"use client";

import { useEffect } from "react";

const ENABLED = process.env.NEXT_PUBLIC_XMAS === "true";

export default function ChristmasTheme() {
  useEffect(() => {
    if (!ENABLED) return;
    document.documentElement.classList.add("xmas");
    return () => document.documentElement.classList.remove("xmas");
  }, []);

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

      {/* Guirnalda en el encabezado */}
      <div className="xmas-garland" aria-hidden="true" />

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