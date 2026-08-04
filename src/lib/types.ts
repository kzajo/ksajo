export type Brand = "maxter" | "petromil";

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
