"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import { getAuthClient } from "@/lib/supabase/auth-client";

const SLOTS: { slot: string; label: string }[] = [
  { slot: "nosotros_instalaciones", label: "Instalaciones" },
  { slot: "nosotros_bodega", label: "Bodega" },
  { slot: "nosotros_equipo", label: "Equipo de trabajo" },
];

export function AdminPhotoManager() {
  const [photos, setPhotos] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [uploadingSlot, setUploadingSlot] = useState<string | null>(null);

  async function reload() {
    const supabase = getAuthClient();
    if (!supabase) return;
    const { data } = await supabase.from("site_photos").select("slot, url");
    const map: Record<string, string> = {};
    for (const row of data ?? []) map[row.slot] = row.url;
    setPhotos(map);
    setLoading(false);
  }

  useEffect(() => {
    // Carga inicial desde Supabase: no se puede conocer en el servidor, debe ejecutarse tras montar.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    reload();
  }, []);

  async function handleUpload(slot: string, e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const supabase = getAuthClient();
    if (!supabase) return;

    setUploadingSlot(slot);
    // Date.now() aquí solo corre dentro del handler de subida (evento de usuario), no en render.
    // eslint-disable-next-line react-hooks/purity
    const path = `nosotros/${slot}-${Date.now()}.${file.name.split(".").pop()}`;
    const { error: uploadError } = await supabase.storage
      .from("site-media")
      .upload(path, file, { contentType: file.type || "image/jpeg" });
    if (!uploadError) {
      const { data: pub } = supabase.storage.from("site-media").getPublicUrl(path);
      await supabase
        .from("site_photos")
        .update({ url: pub.publicUrl, updated_at: new Date().toISOString() })
        .eq("slot", slot);
    }
    setUploadingSlot(null);
    e.target.value = "";
    await reload();
  }

  return (
    <section className="rounded-2xl border border-border bg-surface p-6">
      <h2 className="font-heading text-lg font-bold text-ink">Fotos de &quot;Nosotros&quot;</h2>
      <p className="mt-1 text-sm text-steel">Reemplaza las fotos que se ven en la página Nosotros.</p>

      <div className="mt-6 grid gap-5 sm:grid-cols-3">
        {SLOTS.map(({ slot, label }) => (
          <div key={slot} className="flex flex-col gap-2">
            <div className="aspect-square overflow-hidden rounded-xl border border-border bg-canvas">
              {loading ? null : photos[slot] ? (
                // eslint-disable-next-line @next/next/no-img-element -- URL dinámica de Supabase Storage
                <img src={photos[slot]} alt={label} className="h-full w-full object-cover" />
              ) : null}
            </div>
            <p className="text-sm font-semibold text-ink">{label}</p>
            <label className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-steel transition-colors hover:border-accent hover:text-accent-dark">
              {uploadingSlot === slot ? "Subiendo…" : "Cambiar foto"}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleUpload(slot, e)}
                disabled={uploadingSlot === slot}
                className="hidden"
              />
            </label>
          </div>
        ))}
      </div>
    </section>
  );
}
