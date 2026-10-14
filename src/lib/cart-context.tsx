"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { CartItem } from "@/lib/types";

const STORAGE_KEY = "kzajo-cart";

function cartItemKey(productId: string, presentacion: string | null): string {
  return presentacion ? `${productId}::${presentacion}` : productId;
}

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, "key">) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Cargar el carrito guardado al montar (solo en el navegador).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- carga única desde localStorage (fuente externa) al montar
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      // localStorage no disponible o datos corruptos: seguimos con carrito vacío.
    } finally {
      setHydrated(true);
    }
  }, []);

  // Guardar cada vez que cambie, una vez ya se hidrató desde localStorage.
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignorar errores de cuota/privacidad.
    }
  }, [items, hydrated]);

  const addItem = useCallback((item: Omit<CartItem, "key">) => {
    const key = cartItemKey(item.productId, item.presentacion);
    setItems((prev) => {
      const existente = prev.find((i) => i.key === key);
      if (existente) {
        return prev.map((i) => (i.key === key ? { ...i, quantity: i.quantity + item.quantity } : i));
      }
      return [...prev, { ...item, key }];
    });
    setIsOpen(true);
  }, []);

  const updateQuantity = useCallback((key: string, quantity: number) => {
    setItems((prev) =>
      quantity <= 0 ? prev.filter((i) => i.key !== key) : prev.map((i) => (i.key === key ? { ...i, quantity } : i)),
    );
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);

  const value = useMemo(
    () => ({
      items,
      itemCount,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    }),
    [items, itemCount, isOpen, addItem, updateQuantity, removeItem, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
