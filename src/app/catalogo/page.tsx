import Link from "next/link";
import type { Metadata } from "next";
import { ProductCard } from "@/components/ProductCard";
import { getCategories, getProducts, isSupabaseConfigured } from "@/lib/products";
import { BRAND_LABEL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Catálogo",
  description:
    "Catálogo de lubricantes y aceites Maxter y Petromil para motor diésel, gasolina, hidráulico y minería.",
};

const BRANDS = ["maxter", "petromil"] as const;

export const revalidate = 300;

export default async function CatalogoPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string; marca?: string }>;
}) {
  const { categoria, marca } = await searchParams;
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts({ categorySlug: categoria, brand: marca }),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="max-w-2xl">
        <h1 className="font-heading text-3xl font-bold text-ink md:text-4xl">
          Catálogo de productos
        </h1>
        <p className="mt-3 text-sm text-steel">
          Lubricantes y aceites Maxter y Petromil para motor diésel, gasolina, sistemas
          hidráulicos y minería.
        </p>
      </div>

      {!isSupabaseConfigured ? (
        <p className="mt-6 rounded-lg border border-accent/30 bg-accent/5 px-4 py-3 text-sm text-accent-dark">
          Mostrando catálogo de ejemplo — conecta Supabase (ver <code>.env.local.example</code>)
          para reemplazarlo por el inventario real.
        </p>
      ) : null}

      <div className="mt-8 flex flex-wrap gap-3">
        <FilterLink label="Todas las marcas" active={!marca} href={buildHref(categoria)} />
        {BRANDS.map((b) => (
          <FilterLink
            key={b}
            label={BRAND_LABEL[b]}
            active={marca === b}
            href={buildHref(categoria, b)}
          />
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-3">
        <FilterLink label="Todas las categorías" active={!categoria} href={buildHref(undefined, marca)} />
        {categories.map((cat) => (
          <FilterLink
            key={cat.id}
            label={cat.name}
            active={categoria === cat.slug}
            href={buildHref(cat.slug, marca)}
          />
        ))}
      </div>

      {products.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="mt-10 rounded-xl border border-border bg-surface px-6 py-10 text-center text-sm text-steel">
          No hay productos que coincidan con este filtro todavía.
        </p>
      )}
    </div>
  );
}

function buildHref(categoria?: string, marca?: string) {
  const params = new URLSearchParams();
  if (categoria) params.set("categoria", categoria);
  if (marca) params.set("marca", marca);
  const qs = params.toString();
  return qs ? `/catalogo?${qs}` : "/catalogo";
}

function FilterLink({ label, active, href }: { label: string; active: boolean; href: string }) {
  return (
    <Link
      href={href}
      className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? "border-accent bg-accent text-white"
          : "border-border bg-surface text-steel hover:border-accent hover:text-accent-dark"
      }`}
    >
      {label}
    </Link>
  );
}
