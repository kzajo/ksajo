import Link from "next/link";
import { SmartImage } from "@/components/SmartImage";
import { BRAND_LABEL } from "@/lib/site";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";
 
export function MarcaBadge({ brand }: { brand: Product["brand"] }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold tracking-[0.14em] text-white uppercase ${
        brand === "maxter" ? "bg-maxter" : "bg-petromil"
      }`}
    >
      {BRAND_LABEL[brand]}
    </span>
  );
}
 
export function ProductCard({ product }: { product: Product }) {
  const image = (product.images ?? []).filter((img) => img.url)[0];
  const viscosidad = product.specs["Viscosidad"];
 
  return (
    <Link
      href={`/catalogo/${product.slug}`}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-canvas shadow-sm shadow-ink/5 transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-xl hover:shadow-ink/10"
    >
      <div className="relative aspect-square overflow-hidden bg-white">
        <SmartImage
          src={image?.url}
          alt={image?.alt ?? product.name}
          etiquetaVacia={`Agregar imagen de ${product.name}`}
          className="h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <MarcaBadge brand={product.brand} />
        </div>
        {viscosidad ? (
          <span className="absolute top-3 right-3 rounded-md bg-ink/85 px-2 py-1 text-[10px] font-bold tracking-wider text-white">
            {viscosidad}
          </span>
        ) : null}
      </div>
 
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-steel-light">
          {product.category ? <span>{product.category.name}</span> : null}
        </div>
        <h3 className="font-heading text-base font-semibold text-ink transition-colors group-hover:text-accent-dark">
          {product.name}
        </h3>
        {product.short_description ? (
          <p className="text-sm text-steel">{product.short_description}</p>
        ) : null}
        <p
          className={`mt-auto pt-1 font-heading text-sm font-semibold ${
            product.price === null ? "text-steel-light" : "text-ink"
          }`}
        >
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
 