"use client";

import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/site";

export function WhatsAppFab() {
  const pathname = usePathname();
  // Las fichas de producto ya traen su propio botón "Cotizar por WhatsApp" en el
  // contenido — el flotante ahí es redundante y en móvil queda encima del título.
  const isProductPage = /^\/catalogo\/.+/.test(pathname);
  if (isProductPage) return null;

  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      title="¿En qué te puedo ayudar?"
      className="fab-pulse fixed right-4 bottom-4 z-50 inline-flex cursor-pointer items-center gap-2 rounded-full p-3.5 font-semibold text-white shadow-lg transition-transform hover:-translate-y-1 sm:right-6 sm:bottom-6 sm:px-5 sm:py-4"
      style={{ background: "#1A51A4" }}
    >
      <MessageCircle className="size-5" aria-hidden="true" />
      <span className="hidden text-sm sm:inline">Solicitar cotización</span>
      <span className="sr-only sm:hidden">Solicitar cotización por WhatsApp</span>
    </a>
  );
}
