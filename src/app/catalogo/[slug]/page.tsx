import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/ProductGallery";
import { SpecsTable } from "@/components/SpecsTable";
import { PresentationSizes } from "@/components/PresentationSizes";
import { DocumentIcon, LockIcon } from "@/components/icons";
import { getProductBySlug } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { BRAND_LABEL, SITE } from "@/lib/site";

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

  const brandColor = product.brand === "maxter" ? "bg-maxter" : "bg-petromil";
  const whatsappHref = `${SITE.whatsappHref}?text=${encodeURIComponent(
    `Hola, me interesa el producto ${product.name}`,
  )}`;
  const viscosidad = product.specs["Viscosidad"];
  const presentacion = product.specs["Presentación"];

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <Link href="/catalogo" className="text-sm text-steel hover:text-ink">
        ← Volver al catálogo
      </Link>

      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <ProductGallery images={product.images} productName={product.name} />

        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-steel-light">
            <span className={`h-1.5 w-1.5 rounded-full ${brandColor}`} aria-hidden />
            {BRAND_LABEL[product.brand]}
            {product.category ? <span>· {product.category.name}</span> : null}
          </div>

          <h1 className="mt-2 font-heading text-3xl font-bold text-ink">{product.name}</h1>

          {product.short_description ? (
            <p className="mt-3 text-base text-steel">{product.short_description}</p>
          ) : null}

          {viscosidad ? (
            <p className="mt-4 text-sm font-semibold text-ink">
              Viscosidad: <span className="font-normal text-steel">{viscosidad}</span>
            </p>
          ) : null}

          {presentacion ? (
            <div className="mt-5">
              <PresentationSizes value={presentacion} />
            </div>
          ) : null}

          <p
            className={`mt-6 font-heading text-2xl font-bold ${
              product.price === null ? "text-steel" : "text-ink"
            }`}
          >
            {formatPrice(product.price)}
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
            >
              Cotizar por WhatsApp
            </a>
          </div>

          {product.description ? (
            <div className="mt-10">
              <h2 className="font-heading text-lg font-bold text-ink">
                ¿Por qué {product.name}?
              </h2>
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
              <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-steel-light">
                Especificaciones
              </h2>
              <div className="mt-3">
                <SpecsTable specs={product.specs} />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
