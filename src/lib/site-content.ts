import { getSupabaseClient } from "@/lib/supabase/client";

/** Lee un valor de site_settings (ej. "xmas_enabled"). Devuelve `fallback` si
 * no hay conexión a Supabase o la fila todavía no existe. */
export async function getSiteSetting<T>(key: string, fallback: T): Promise<T> {
  const supabase = getSupabaseClient();
  if (!supabase) return fallback;

  const { data, error } = await supabase.from("site_settings").select("value").eq("key", key).maybeSingle();
  if (error || !data) return fallback;
  return data.value as T;
}

/** URL del video de anuncio activo, o null si no hay ninguno marcado como activo. */
export async function getActivePromoVideo(): Promise<{ url: string; label: string | null } | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("promo_videos")
    .select("url, label")
    .eq("is_active", true)
    .limit(1)
    .maybeSingle();
  if (error || !data) return null;
  return data;
}

const DEFAULT_PHOTOS: Record<string, string> = {
  nosotros_instalaciones: "/instalaciones.png",
  nosotros_bodega: "/bodega.png",
  nosotros_equipo: "/equipo.png",
};

/** Mapa slot -> url para las fotos editables de la página Nosotros. */
export async function getSitePhotos(): Promise<Record<string, string>> {
  const supabase = getSupabaseClient();
  if (!supabase) return DEFAULT_PHOTOS;

  const { data, error } = await supabase.from("site_photos").select("slot, url");
  if (error || !data) return DEFAULT_PHOTOS;

  const result = { ...DEFAULT_PHOTOS };
  for (const row of data) result[row.slot] = row.url;
  return result;
}
