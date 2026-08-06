"use client";

import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/site";

export function WhatsAppFab() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      title="¿En qué te puedo ayudar?"
      className="fab-pulse fixed right-4 bottom-4 z-50 inline-flex cursor-pointer items-center gap-2 rounded-full px-5 py-4 font-semibold text-white shadow-lg transition-transform hover:-translate-y-1 sm:right-6 sm:bottom-6"
      style={{ background: "#1A51A4" }}
    >
      <MessageCircle className="size-5" aria-hidden="true" />
      <span className="hidden text-sm sm:inline">Solicitar cotización</span>
      <span className="sr-only sm:hidden">Solicitar cotización por WhatsApp</span>
    </a>
  );
}
