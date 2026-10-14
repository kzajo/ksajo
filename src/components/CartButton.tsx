"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export function CartButton() {
  const { itemCount, openCart } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={`Ver pedido${itemCount > 0 ? ` (${itemCount} productos)` : ""}`}
      className="relative cursor-pointer rounded-full p-2 text-white/85 transition-colors hover:text-white"
    >
      <ShoppingCart className="size-5" aria-hidden="true" />
      {itemCount > 0 ? (
        <span
          aria-hidden="true"
          className="absolute -top-0.5 -right-0.5 flex size-4.5 items-center justify-center rounded-full bg-maxter text-[10px] font-bold text-white"
        >
          {itemCount > 9 ? "9+" : itemCount}
        </span>
      ) : null}
    </button>
  );
}
