"use client";
 
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { BRAND_LABEL } from "@/lib/site";
import type { Brand, Category, Product } from "@/lib/types";
 
const BRANDS: Brand[] = ["maxter", "petromil"];
 
export function CatalogoFiltros({
  categorias,
  productos,
  categoriaInicial,
}: {
  categorias: Category[];
  productos: Product[];
  categoriaInicial?: string;
}) {
  const [categoria, setCategoria] = useState<string>(
    categorias.some((c) => c.slug === categoriaInicial) ? categoriaInicial! : "todas",
  );
  const [marca, setMarca] = useState<Brand | "todas">("todas");
  const [busqueda, setBusqueda] = useState("");
 
  const resultados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    return productos.filter((p) => {
      if (categoria !== "todas" && p.category?.slug !== categoria) return false;
      if (marca !== "todas" && p.brand !== marca) return false;
      if (!q) return true;
      const specsText = Object.entries(p.specs)
        .map(([k, v]) => `${k} ${v}`)
        .join(" ");
      return [p.name, p.short_description ?? "", specsText].join(" ").toLowerCase().includes(q);
    });
  }, [productos, categoria, marca, busqueda]);
 
  const hayFiltros = categoria !== "todas" || marca !== "todas" || busqueda !== "";
 
  return (
    <div className="mt-8">
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-2 text-sm font-bold tracking-wide text-steel-light uppercase">
          <SlidersHorizontal className="size-4" aria-hidden="true" />
          Categorías
        </div>
 
        <div role="group" aria-label="Filtrar por categoría" className="flex flex-wrap gap-2">
          <FiltroBoton activo={categoria === "todas"} onClick={() => setCategoria("todas")}>
            Todas ({productos.length})
          </FiltroBoton>
          {categorias.map((c) => {
            const total = productos.filter((p) => p.category?.slug === c.slug).length;
            return (
              <FiltroBoton key={c.id} activo={categoria === c.slug} onClick={() => setCategoria(c.slug)}>
                {c.name} ({total})
              </FiltroBoton>
            );
          })}
        </div>
 
        <div className="flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div role="group" aria-label="Filtrar por marca" className="flex flex-wrap gap-2">
            <FiltroBoton activo={marca === "todas"} onClick={() => setMarca("todas")} variante="sutil">
              Todas las marcas
            </FiltroBoton>
            {BRANDS.map((b) => (
              <FiltroBoton key={b} activo={marca === b} onClick={() => setMarca(b)} variante="sutil">
                {BRAND_LABEL[b]}
              </FiltroBoton>
            ))}
          </div>
 
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-steel-light" aria-hidden="true" />
            <input
              type="search"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar por nombre o especificación"
              aria-label="Buscar productos"
              className="w-full rounded-full border border-border bg-surface py-2.5 pr-3 pl-9 text-sm outline-none placeholder:text-steel-light focus-visible:ring-2 focus-visible:ring-accent"
            />
          </div>
        </div>
      </div>
 
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <p aria-live="polite" className="text-sm text-steel">
          Mostrando <strong className="text-ink">{resultados.length}</strong>{" "}
          {resultados.length === 1 ? "producto" : "productos"}
        </p>
        {hayFiltros && (
          <button
            type="button"
            onClick={() => {
              setCategoria("todas");
              setMarca("todas");
              setBusqueda("");
            }}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border px-3 py-2 text-xs font-bold transition-colors hover:border-accent"
          >
            <X className="size-3.5" aria-hidden="true" />
            Limpiar filtros
          </button>
        )}
      </div>
 
      {resultados.length > 0 ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resultados.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-xl border border-dashed border-border bg-surface p-12 text-center">
          <p className="text-lg font-bold text-ink">No encontramos productos con esos filtros</p>
          <p className="mt-2 text-sm text-steel">
            Intenta con otra categoría, otra marca o un término de búsqueda diferente.
          </p>
        </div>
      )}
    </div>
  );
}
 
function FiltroBoton({
  activo,
  onClick,
  children,
  variante = "solido",
}: {
  activo: boolean;
  onClick: () => void;
  children: React.ReactNode;
  variante?: "solido" | "sutil";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={activo}
      className={`shrink-0 cursor-pointer rounded-full border px-4 py-2.5 text-sm font-bold whitespace-nowrap transition-colors ${
        activo
          ? variante === "solido"
            ? "border-accent bg-accent text-white"
            : "border-ink bg-ink text-white"
          : "border-border bg-surface text-steel hover:border-accent/60 hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}