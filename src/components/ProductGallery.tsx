"use client";

import { useState } from "react";
import { SmartImage } from "@/components/SmartImage";
import type { ProductImage } from "@/lib/types";

export function ProductGallery({
  images,
  productName,
}: {
  images?: ProductImage[];
  productName: string;
}) {
  const valid = (images ?? []).filter((img) => img.url);
  const [activeIndex, setActiveIndex] = useState(0);
  const active = valid[activeIndex];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-border bg-white">
        <SmartImage
          key={active?.url ?? "placeholder"}
          src={active?.url}
          alt={active?.alt ?? productName}
          etiquetaVacia="Imagen de producto pendiente"
          className="h-full w-full object-contain p-6"
        />
      </div>

      {valid.length > 1 ? (
        <div className="grid grid-cols-4 gap-3">
          {valid.map((img, i) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-current={i === activeIndex}
              aria-label={`Ver imagen ${i + 1} de ${productName}`}
              className={`aspect-square cursor-pointer overflow-hidden rounded-lg border-2 bg-white transition-colors ${
                i === activeIndex ? "border-accent" : "border-border opacity-70 hover:opacity-100"
              }`}
            >
              <SmartImage src={img.url} alt={img.alt ?? productName} className="h-full w-full object-contain p-2" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
