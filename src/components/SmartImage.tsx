"use client";

import { useEffect, useRef, useState } from "react";

type SmartImageProps = {
  src?: string | null;
  alt: string;
  className?: string;
  /** Texto que se muestra mientras la imagen no exista todavía (o el producto no tenga foto cargada). */
  etiquetaVacia?: string;
};

/**
 * Muestra una imagen de producto (URL de Supabase Storage o externa). Si no hay `src`,
 * o la imagen falla al cargar, en lugar de romperse muestra un marcador de posición
 * discreto — así el catálogo se ve completo aunque todavía falten fotos por subir.
 */
export function SmartImage({ src, alt, className, etiquetaVacia }: SmartImageProps) {
  const [error, setError] = useState(!src);
  const ref = useRef<HTMLImageElement>(null);

  // Si la imagen falló antes de que React hidratara, `onError` nunca se ejecuta:
  // al montar comprobamos el estado real del elemento. Si `src` cambia, el
  // llamador debe pasar una `key` distinta (ver ProductGallery) para remontar.
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setError(true);
  }, []);

  if (error || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-2 bg-canvas p-4 text-center text-mist ${className ?? ""}`}
      >
        <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
          <path d="M18 6h12v6l4 4v22a2 2 0 0 1-2 2H16a2 2 0 0 1-2-2V16l4-4Z" />
          <path d="M18 20h12M18 26h12M18 32h8" />
        </svg>
        <span className="text-[11px] leading-tight font-medium text-steel">
          {etiquetaVacia ?? "Imagen próximamente"}
        </span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- URL dinámica de Supabase Storage: necesita el fallback `onError` de <img>, next/image no lo soporta igual.
    <img
      ref={ref}
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setError(true)}
      className={className}
    />
  );
}
