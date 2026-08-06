"use client";

import { useEffect, useRef, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/lib/types";

/** Carrusel horizontal de productos destacados (se mueve solo y también con flechas). */
export function DestacadosSlider({ productos }: { productos: Product[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pausado, setPausado] = useState(false);

  const mover = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const alFinal = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    const alInicio = el.scrollLeft <= 4;

    if (dir === 1 && alFinal) {
      el.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }
    if (dir === -1 && alInicio) {
      el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
      return;
    }
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  useEffect(() => {
    if (pausado) return;
    const t = setInterval(() => mover(1), 3500);
    return () => clearInterval(t);
  }, [pausado]);

  if (productos.length === 0) return null;

  return (
    <div
      className="relative"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onTouchStart={() => setPausado(true)}
    >
      <div className="mb-5 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => mover(-1)}
          className="grid size-11 cursor-pointer place-items-center rounded-full border border-border bg-surface transition-colors hover:border-accent hover:text-accent-dark"
        >
          ‹<span className="sr-only">Anterior</span>
        </button>
        <button
          type="button"
          onClick={() => mover(1)}
          className="grid size-11 cursor-pointer place-items-center rounded-full border border-border bg-surface transition-colors hover:border-accent hover:text-accent-dark"
        >
          ›<span className="sr-only">Siguiente</span>
        </button>
      </div>

      <div
        ref={ref}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {productos.map((p) => (
          <div key={p.id} className="w-[80%] shrink-0 snap-start sm:w-[48%] lg:w-[31%] xl:w-[24%]">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
