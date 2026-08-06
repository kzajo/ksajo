import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { ProductGallery } from "@/components/ProductGallery";
import { SpecsTable } from "@/components/SpecsTable";
import { PresentationSizes } from "@/components/PresentationSizes";
import { ProductCard } from "@/components/ProductCard";
import { MarcaBadge } from "@/components/ProductCard";
import { DocumentIcon, LockIcon } from "@/components/icons";
import { getProductBySlug, getProducts } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { BRAND_LABEL, SITE, whatsappLink } from "@/lib/site";

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Producto no encontrado" };

  return {
    title: product.name,
    description: product.short_description ?? SITE.description,
  };
}

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const relacionados = product.category
    ? (await getProducts({ categorySlug: product.category.slug })).filter((p) => p.slug !== product.slug).slice(0, 3)
    : [];

  const mensaje = `Hola, estoy interesado en el producto ${product.name}. ¿Me pueden enviar precio y disponibilidad?`;
  const viscosidad = product.specs["Viscosidad"];
  const presentacion = product.specs["Presentación"];

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <nav aria-label="Ruta de navegación" className="text-xs text-steel">
        <Link href="/" className="hover:text-ink">
          Inicio
        </Link>
        <span className="px-2" aria-hidden="true">
          /
        </span>
        <Link href="/catalogo" className="hover:text-ink">
          Catálogo
        </Link>
        {product.category ? (
          <>
            <span className="px-2" aria-hidden="true">
              /
            </span>
            <Link href={`/catalogo?categoria=${product.category.slug}`} className="hover:text-ink">
              {product.category.name}
            </Link>
          </>
        ) : null}
        <span className="px-2" aria-hidden="true">
          /
        </span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <ProductGallery images={product.images} productName={product.name} />
          <p className="text-xs text-steel-light">
            Las imágenes son de referencia. El empaque puede variar según la presentación y el lote.
          </p>
        </div>

        <div>
          <MarcaBadge brand={product.brand} />

          <h1 className="mt-3 font-heading text-3xl font-bold text-ink">{product.name}</h1>

          {product.short_description ? (
            <p className="mt-3 text-base text-steel">{product.short_description}</p>
          ) : null}

          <dl className="mt-6 grid grid-cols-2 gap-4 rounded-xl border border-border bg-surface p-5 sm:grid-cols-3">
            <div>
              <dt className="text-[11px] font-bold tracking-wider text-steel-light uppercase">Marca</dt>
              <dd className="mt-1 text-sm font-bold text-ink">{BRAND_LABEL[product.brand]}</dd>
            </div>
            {viscosidad ? (
              <div>
                <dt className="text-[11px] font-bold tracking-wider text-steel-light uppercase">Viscosidad</dt>
                <dd className="mt-1 text-sm font-bold text-ink">{viscosidad}</dd>
              </div>
            ) : null}
            {product.category ? (
              <div>
                <dt className="text-[11px] font-bold tracking-wider text-steel-light uppercase">Categoría</dt>
                <dd className="mt-1 text-sm font-bold text-ink">{product.category.name}</dd>
              </div>
            ) : null}
          </dl>

          {presentacion ? (
            <div className="mt-6">
              <h2 className="text-sm font-bold tracking-wider text-steel-light uppercase">
                Presentaciones disponibles
              </h2>
              <div className="mt-3">
                <PresentationSizes value={presentacion} />
              </div>
            </div>
          ) : null}

          <p
            className={`mt-8 font-heading text-2xl font-bold ${
              product.price === null ? "text-steel" : "text-ink"
            }`}
          >
            {formatPrice(product.price)}
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={whatsappLink(mensaje)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              Cotizar por WhatsApp
            </a>
          </div>

          {product.description ? (
            <div className="mt-10">
              <h2 className="font-heading text-lg font-bold text-ink">¿Por qué {product.name}?</h2>
              <p className="mt-2 text-sm text-steel">{product.description}</p>
            </div>
          ) : null}

          {product.datasheet_url || product.safety_sheet_url ? (
            <div className="mt-6 flex flex-wrap gap-3">
              {product.datasheet_url ? (
                <a
                  href={product.datasheet_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex cursor-pointer items-center gap-2 rounded-full bg-[#B91C2C] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#9A1622]"
                >
                  <DocumentIcon className="h-4 w-4" />
                  Ver Ficha Técnica
                </a>
              ) : null}
              {product.safety_sheet_url ? (
                <a
                  href={product.safety_sheet_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex cursor-pointer items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink-soft"
                >
                  <LockIcon className="h-4 w-4" />
                  Ver Hoja de Seguridad
                </a>
              ) : null}
            </div>
          ) : null}

          {Object.keys(product.specs).length > 0 ? (
            <div className="mt-10">
              <h2 className="font-heading text-sm font-semibold tracking-wide text-steel-light uppercase">
                Especificaciones
              </h2>
              <div className="mt-3">
                <SpecsTable specs={product.specs} />
              </div>
            </div>
          ) : null}

          <Link
            href="/catalogo"
            className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-accent-dark hover:underline"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Volver al catálogo
          </Link>
        </div>
      </div>

      {relacionados.length > 0 ? (
        <div className="mt-20 border-t border-border pt-16">
          <h2 className="font-heading text-2xl font-bold text-ink">Productos relacionados</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relacionados.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
