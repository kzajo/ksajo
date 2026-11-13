"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { getAuthClient } from "@/lib/supabase/auth-client";

type PromoVideo = {
  id: string;
  label: string | null;
  url: string;
  is_active: boolean;
  created_at: string;
};

export function AdminVideoManager() {
  const [videos, setVideos] = useState<PromoVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function reload() {
    const supabase = getAuthClient();
    if (!supabase) return;
    const { data } = await supabase.from("promo_videos").select("*").order("created_at", { ascending: false });
    setVideos(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    // Carga inicial desde Supabase: no se puede conocer en el servidor, debe ejecutarse tras montar.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    reload();
  }, []);

  async function handleUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const supabase = getAuthClient();
    if (!supabase) return;

    setUploading(true);
    setError(null);

    const path = `promo/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "-")}`;
    const { error: uploadError } = await supabase.storage.from("site-media").upload(path, file, {
      contentType: file.type || "video/mp4",
    });
    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }

    const { data: pub } = supabase.storage.from("site-media").getPublicUrl(path);
    const { error: insertError } = await supabase.from("promo_videos").insert({
      label: file.name,
      url: pub.publicUrl,
      is_active: false,
    });
    if (insertError) setError(insertError.message);

    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
    await reload();
  }

  async function setActive(id: string) {
    const supabase = getAuthClient();
    if (!supabase) return;
    // Solo un video puede estar activo a la vez.
    await supabase.from("promo_videos").update({ is_active: false }).neq("id", id);
    await supabase.from("promo_videos").update({ is_active: true }).eq("id", id);
    await reload();
  }

  async function deactivate(id: string) {
    const supabase = getAuthClient();
    if (!supabase) return;
    await supabase.from("promo_videos").update({ is_active: false }).eq("id", id);
    await reload();
  }

  async function remove(id: string, url: string) {
    const supabase = getAuthClient();
    if (!supabase) return;
    if (!confirm("¿Borrar este video? No se puede deshacer.")) return;
    const path = url.split("/site-media/")[1];
    if (path) await supabase.storage.from("site-media").remove([path]);
    await supabase.from("promo_videos").delete().eq("id", id);
    await reload();
  }

  return (
    <section className="rounded-2xl border border-border bg-surface p-6">
      <h2 className="font-heading text-lg font-bold text-ink">Video de anuncio</h2>
      <p className="mt-1 text-sm text-steel">
        El video marcado como &quot;Activo&quot; es el que aparece al entrar al sitio. Solo puede haber uno activo.
      </p>

      <div className="mt-5">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark">
          {uploading ? "Subiendo…" : "Subir video nuevo"}
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
        {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {loading ? (
          <p className="text-sm text-steel">Cargando…</p>
        ) : videos.length === 0 ? (
          <p className="text-sm text-steel">Todavía no hay videos subidos.</p>
        ) : (
          videos.map((v) => (
            <div
              key={v.id}
              className="flex flex-col gap-3 rounded-xl border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-3">
                <video src={v.url} className="h-16 w-10 rounded-md bg-ink object-cover" muted />
                <div>
                  <p className="text-sm font-semibold text-ink">{v.label ?? "Video"}</p>
                  {v.is_active ? (
                    <span className="inline-block rounded-full bg-accent/10 px-2 py-0.5 text-xs font-bold text-accent-dark">
                      Activo
                    </span>
                  ) : null}
                </div>
              </div>
              <div className="flex gap-2">
                {v.is_active ? (
                  <button
                    type="button"
                    onClick={() => deactivate(v.id)}
                    className="cursor-pointer rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-steel hover:border-accent hover:text-accent-dark"
                  >
                    Desactivar
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setActive(v.id)}
                    className="cursor-pointer rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-white hover:bg-accent-dark"
                  >
                    Activar
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => remove(v.id, v.url)}
                  className="cursor-pointer rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
                >
                  Borrar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
