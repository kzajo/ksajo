"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { whatsappLink } from "@/lib/site";
import { buildOrderMessage } from "@/lib/whatsapp-order";
import { WhatsappIcon, CloseIcon } from "@/components/icons";
import { SmartImage } from "@/components/SmartImage";
import { MarcaBadge } from "@/components/ProductCard";

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, clearCart } = useCart();

  // Cerrar con Escape y bloquear el scroll del fondo mientras está abierto.
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  const mensaje = buildOrderMessage(items);

  return (
    <div className="fixed inset-0 z-[60]">
      <button
        type="button"
        aria-label="Cerrar pedido"
        onClick={closeCart}
        className="absolute inset-0 cursor-pointer bg-ink/50"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Tu pedido"
        className="absolute top-0 right-0 flex h-full w-full max-w-md flex-col bg-canvas shadow-2xl"
      >
        <header className="flex items-center justify-between bg-accent px-6 py-4">
          <div className="flex items-center gap-2 text-white">
            <h2 className="font-heading text-lg font-bold">Tu Pedido</h2>
            {items.length > 0 ? (
              <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-bold">
                {items.length} {items.length === 1 ? "producto" : "productos"}
              </span>
            ) : null}
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Cerrar"
            className="cursor-pointer rounded-full p-1.5 text-white/85 transition-colors hover:bg-white/10 hover:text-white"
          >
            <CloseIcon className="size-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <ShoppingCart className="size-10 text-mist" aria-hidden="true" />
              <p className="text-sm font-semibold text-ink">Tu pedido está vacío</p>
              <p className="text-xs text-steel">Agrega productos desde el catálogo para armar tu pedido.</p>
              <Link
                href="/catalogo"
                onClick={closeCart}
                className="mt-2 inline-flex cursor-pointer items-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
              >
                Ver catálogo
              </Link>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <li key={item.key} className="rounded-2xl border border-border bg-surface p-4">
                  <div className="flex gap-3">
                    <div className="size-16 shrink-0 overflow-hidden rounded-lg bg-canvas">
                      <SmartImage
                        src={item.imageUrl}
                        alt={item.name}
                        etiquetaVacia=""
                        className="h-full w-full object-contain p-1.5"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <MarcaBadge brand={item.brand} />
                          <p className="mt-1 truncate font-heading text-sm font-semibold text-ink">{item.name}</p>
                          {item.presentacion ? (
                            <p className="text-xs text-steel">Presentación: {item.presentacion}</p>
                          ) : null}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.key)}
                          aria-label={`Quitar ${item.name} del pedido`}
                          className="shrink-0 cursor-pointer rounded-full p-1.5 text-steel-light transition-colors hover:bg-canvas hover:text-maxter"
                        >
                          <Trash2 className="size-4" aria-hidden="true" />
                        </button>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-1 rounded-full border border-border bg-canvas p-0.5">
                          <button
                            type="button"
                            aria-label="Disminuir cantidad"
                            onClick={() => updateQuantity(item.key, item.quantity - 1)}
                            className="flex size-7 cursor-pointer items-center justify-center rounded-full text-steel transition-colors hover:bg-white hover:text-ink"
                          >
                            <Minus className="size-3.5" aria-hidden="true" />
                          </button>
                          <span className="w-6 text-center text-sm font-bold text-ink">{item.quantity}</span>
                          <button
                            type="button"
                            aria-label="Aumentar cantidad"
                            onClick={() => updateQuantity(item.key, item.quantity + 1)}
                            className="flex size-7 cursor-pointer items-center justify-center rounded-full text-steel transition-colors hover:bg-white hover:text-ink"
                          >
                            <Plus className="size-3.5" aria-hidden="true" />
                          </button>
                        </div>
                        <span className="text-xs font-semibold text-steel-light">Consultar precio</span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 ? (
          <footer className="border-t border-border bg-surface px-5 py-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-heading text-base font-bold text-ink">Total del pedido</span>
              <span className="font-heading text-base font-bold text-steel">Consultar precio</span>
            </div>

            <a
              href={whatsappLink(mensaje)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeCart}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[#1DAA53] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#178C44]"
            >
              <WhatsappIcon className="size-4.5" />
              Enviar Pedido por WhatsApp
            </a>
            <button
              type="button"
              onClick={clearCart}
              className="mt-2.5 w-full cursor-pointer rounded-full border border-border px-6 py-3 text-sm font-semibold text-steel transition-colors hover:border-maxter/50 hover:text-maxter"
            >
              Vaciar Carrito
            </button>
          </footer>
        ) : null}
      </aside>
    </div>
  );
}
