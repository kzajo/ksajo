import Image from "next/image";
import type { ProductImage } from "@/lib/types";

export function ProductGallery({
  images,
  productName,
}: {
  images?: ProductImage[];
  productName: string;
}) {
  const valid = (images ?? []).filter((img) => img.url);
  const main = valid[0];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-border bg-canvas">
        {main ? (
          <Image
            src={main.url}
            alt={main.alt ?? productName}
            width={640}
            height={640}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center gap-3 p-8 text-center text-mist">
            <svg
              viewBox="0 0 48 48"
              className="h-20 w-20"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden
            >
              <path d="M18 6h12v6l4 4v22a2 2 0 0 1-2 2H16a2 2 0 0 1-2-2V16l4-4Z" />
              <path d="M18 20h12M18 26h12M18 32h8" />
            </svg>
            <p className="text-xs">Imagen de producto pendiente</p>
          </div>
        )}
      </div>

      {valid.length > 1 ? (
        <div className="grid grid-cols-4 gap-3">
          {valid.slice(1).map((img) => (
            <div
              key={img.id}
              className="aspect-square overflow-hidden rounded-lg border border-border bg-canvas"
            >
              <Image
                src={img.url}
                alt={img.alt ?? productName}
                width={160}
                height={160}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
