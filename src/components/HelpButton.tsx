import { CircleHelp } from "lucide-react";
import { SITE } from "@/lib/site";

/** Botón de ayuda rápida junto al carrito. Por ahora enlaza al WhatsApp
 * principal del sitio — cuando haya un número dedicado para soporte, basta
 * con cambiar el href de este componente. */
export function HelpButton() {
  return (
    <a
      href={SITE.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Necesito ayuda"
      className="flex cursor-pointer items-center gap-1.5 rounded-full border border-white/25 px-3 py-1.5 text-sm font-semibold text-white/85 transition-colors hover:border-white/50 hover:text-white"
    >
      <CircleHelp className="size-4" aria-hidden="true" />
      <span className="hidden sm:inline">Necesito ayuda</span>
    </a>
  );
}
