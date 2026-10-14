"use client";

import { useState } from "react";
import { Check, Minus, Plus, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { parsePresentations } from "@/lib/presentations";
import type { Product } from "@/lib/types";

export function AddToCartForm({ product }: { product: Product }) {
  const { addItem } = useCart();
  const presentaciones = parsePresentations(product.specs["Presentación"]);
  const [presentacion, setPresentacion] = useState<string | null>(presentaciones[0] ?? null);
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);

  const image = (product.images ?? []).filter((img) => img.url)[0];

  function handleAgregar() {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      brand: product.brand,
      imageUrl: image?.url ?? null,
      presentacion,
      quantity: cantidad,
    });
    setAgregado(true);
    setTimeout(() => setAgregado(false), 1800);
  }

  return (
    <div className="mt-6 flex flex-col gap-4 rounded-xl border border-border bg-surface p-5">
      {presentaciones.length > 1 ? (
        <div>
          <span className="text-[11px] font-bold tracking-wider text-steel-light uppercase">Presentación</span>
          <div role="group" aria-label="Elegir presentación" className="mt-2 flex flex-wrap gap-2">
            {presentaciones.map((size) => (
              <button
                key={size}
                type="button"
                aria-pressed={presentacion === size}
                onClick={() => setPresentacion(size)}
                className={`cursor-pointer rounded-full border px-3.5 py-2 text-xs font-bold whitespace-nowrap transition-colors ${
                  presentacion === size
                    ? "border-accent bg-accent text-white"
                    : "border-border bg-canvas text-steel hover:border-accent/60 hover:text-ink"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-4">
        <div>
          <span className="text-[11px] font-bold tracking-wider text-steel-light uppercase">Cantidad</span>
          <div className="mt-2 flex items-center gap-1 rounded-full border border-border bg-canvas p-1">
            <button
              type="button"
              aria-label="Disminuir cantidad"
              onClick={() => setCantidad((c) => Math.max(1, c - 1))}
              className="flex size-8 cursor-pointer items-center justify-center rounded-full text-steel transition-colors hover:bg-white hover:text-ink"
            >
              <Minus className="size-4" aria-hidden="true" />
            </button>
            <input
              type="number"
              min={1}
              inputMode="numeric"
              value={cantidad}
              onChange={(e) => setCantidad(Math.max(1, Number(e.target.value) || 1))}
              aria-label="Cantidad"
              className="w-12 bg-transparent text-center text-sm font-bold text-ink outline-none"
            />
            <button
              type="button"
              aria-label="Aumentar cantidad"
              onClick={() => setCantidad((c) => c + 1)}
              className="flex size-8 cursor-pointer items-center justify-center rounded-full text-steel transition-colors hover:bg-white hover:text-ink"
            >
              <Plus className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAgregar}
          className={`ml-auto inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white transition-colors sm:flex-initial ${
            agregado ? "bg-green-600" : "bg-accent hover:bg-accent-dark"
          }`}
        >
          {agregado ? (
            <>
              <Check className="size-4" aria-hidden="true" />
              Agregado al pedido
            </>
          ) : (
            <>
              <ShoppingCart className="size-4" aria-hidden="true" />
              Agregar al pedido
            </>
          )}
        </button>
      </div>
    </div>
  );
}
