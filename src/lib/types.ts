export type Brand = "maxter" | "petromil" | "beg";

export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  sort_order: number;
};

export type ProductImage = {
  id: string;
  url: string;
  alt: string | null;
  sort_order: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: Brand;
  category_id: string | null;
  category?: Category | null;
  short_description: string | null;
  description: string | null;
  specs: Record<string, string>;
  /** Precio en COP. null = "Consultar precio". */
  price: number | null;
  is_active: boolean;
  images?: ProductImage[];
  datasheet_url?: string | null;
  safety_sheet_url?: string | null;
};
/** Un ítem dentro del carrito de pedido (toma-pedido por WhatsApp). */
export type CartItem = {
  /** id del producto + presentación, único dentro del carrito */
  key: string;
  productId: string;
  slug: string;
  name: string;
  brand: Brand;
  imageUrl?: string | null;
  /** Tamaño elegido, ej. "15 GAL". null si el producto no tiene presentaciones. */
  presentacion: string | null;
  quantity: number;
};