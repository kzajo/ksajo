"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { BRAND_LABEL } from "@/lib/site";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const brandColor = product.brand === "maxter" ? "bg-maxter" : "bg-petromil";
  const image = (product.images ?? []).filter((img) => img.url)[0];

  return (
    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.25, ease: "easeOut" }}>
      <Link
        href={`/catalogo/${product.slug}`}
        className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm shadow-ink/5 transition-shadow hover:shadow-xl hover:shadow-ink/10"
      >
        <div className={`h-1.5 w-full ${brandColor}`} aria-hidden />

        <div className="flex aspect-[4/3] items-center justify-center bg-canvas">
          {image ? (
            <Image
              src={image.url}
              alt={image.alt ?? product.name}
              width={400}
              height={300}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <svg
              viewBox="0 0 48 48"
              className="h-16 w-16 text-mist transition-transform duration-300 group-hover:scale-105"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden
            >
              <path d="M18 6h12v6l4 4v22a2 2 0 0 1-2 2H16a2 2 0 0 1-2-2V16l4-4Z" />
              <path d="M18 20h12M18 26h12M18 32h8" />
            </svg>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-2 p-5">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-steel-light">
            <span className={`h-1.5 w-1.5 rounded-full ${brandColor}`} aria-hidden />
            {BRAND_LABEL[product.brand]}
            {product.category ? <span>· {product.category.name}</span> : null}
          </div>
          <h3 className="font-heading text-base font-semibold text-ink transition-colors group-hover:text-accent-dark">
            {product.name}
          </h3>
          {product.short_description ? (
            <p className="text-sm text-steel">{product.short_description}</p>
          ) : null}
          <p
            className={`mt-1 font-heading text-sm font-semibold ${
              product.price === null ? "text-steel-light" : "text-ink"
            }`}
          >
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
