import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { PLACEHOLDER_CATEGORIES, PLACEHOLDER_PRODUCTS } from "@/lib/placeholder-data";
import type { Category, Product } from "@/lib/types";

export { isSupabaseConfigured };

export async function getCategories(): Promise<Category[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return PLACEHOLDER_CATEGORIES;

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error || !data) return [];
  return data as Category[];
}

export async function getProducts(filters?: {
  categorySlug?: string;
  brand?: string;
  limit?: number;
}): Promise<Product[]> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    const filtered = PLACEHOLDER_PRODUCTS.filter((p) => {
      if (filters?.categorySlug && p.category?.slug !== filters.categorySlug) return false;
      if (filters?.brand && p.brand !== filters.brand) return false;
      return true;
    });
    return filters?.limit ? filtered.slice(0, filters.limit) : filtered;
  }

  const categoryJoin = filters?.categorySlug
    ? "category:categories!inner(*)"
    : "category:categories(*)";

  let query = supabase
    .from("products")
    .select(`*, ${categoryJoin}, images:product_images(*)`)
    .eq("is_active", true);

  if (filters?.brand) query = query.eq("brand", filters.brand);
  if (filters?.categorySlug) {
    query = query.eq("category.slug", filters.categorySlug);
  }
  if (filters?.limit) query = query.limit(filters.limit);

  const { data, error } = await query;
  if (error || !data) return [];
  return data as unknown as Product[];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return PLACEHOLDER_PRODUCTS.find((p) => p.slug === slug) ?? null;
  }

  const { data, error } = await supabase
    .from("products")
    .select("*, category:categories(*), images:product_images(*)")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (error || !data) return null;
  return data as unknown as Product;
}
