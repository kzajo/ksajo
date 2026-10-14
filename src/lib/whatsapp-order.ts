import { BRAND_LABEL } from "@/lib/site";
import type { CartItem } from "@/lib/types";

/** Arma el texto del pedido (sin precios) para enviarlo por WhatsApp. */
export function buildOrderMessage(items: CartItem[]): string {
  if (items.length === 0) return "Hola, quiero hacer un pedido.";

  const lineas = items.map((item, i) => {
    const marca = BRAND_LABEL[item.brand];
    const presentacion = item.presentacion ? ` — Presentación: ${item.presentacion}` : "";
    return `${i + 1}. ${item.name} (${marca})${presentacion} — Cantidad: ${item.quantity}`;
  });

  return [
    "Hola, quiero hacer el siguiente pedido:",
    "",
    ...lineas,
    "",
    "Quedo atento(a), gracias.",
  ].join("\n");
}
