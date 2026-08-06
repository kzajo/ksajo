import type { Metadata } from "next";
import { CatalogoFiltros } from "@/components/CatalogoFiltros";
import { getCategories, getProducts, isSupabaseConfigured } from "@/lib/products";

export const metadata: Metadata = {
  title: "Catálogo",
  description:
    "Catálogo de lubricantes y aceites Maxter y Petromil para motor diésel, gasolina, hidráulico y minería.",
};

export const revalidate = 300;

export default async function CatalogoPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const { categoria } = await searchParams;
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="max-w-2xl">
        <h1 className="font-heading text-3xl font-bold text-ink md:text-4xl">
          Catálogo de productos
        </h1>
        <p className="mt-3 text-sm text-steel">
          Lubricantes y aceites Maxter y Petromil para motor diésel, gasolina, sistemas
          hidráulicos y minería. Filtra por categoría, marca o busca por especificación.
        </p>
      </div>

      {!isSupabaseConfigured ? (
        <p className="mt-6 rounded-lg border border-accent/30 bg-accent/5 px-4 py-3 text-sm text-accent-dark">
          Mostrando catálogo de ejemplo — conecta Supabase (ver <code>.env.local.example</code>)
          para reemplazarlo por el inventario real.
        </p>
      ) : null}

      <CatalogoFiltros categorias={categories} productos={products} categoriaInicial={categoria} />
    </div>
  );
}
