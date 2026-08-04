"use client";

import { SITE } from "@/lib/site";
import { ChatIcon } from "@/components/icons";

export function WhatsAppFab() {
  return (
    <a
      href={SITE.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      title="¿En qué te puedo ayudar?"
      className="fab-pulse fixed bottom-6 right-6 z-50 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full text-white shadow-lg"
      style={{ background: "#1A51A4" }}
    >
      <ChatIcon className="h-6 w-6" />
    </a>
  );
}
