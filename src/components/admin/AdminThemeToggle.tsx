"use client";

import { useEffect, useState } from "react";
import { getAuthClient } from "@/lib/supabase/auth-client";

export function AdminThemeToggle() {
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const supabase = getAuthClient();
    if (!supabase) return;
    supabase
      .from("site_settings")
      .select("value")
      .eq("key", "xmas_enabled")
      .maybeSingle()
      .then(({ data }) => {
        setEnabled(Boolean(data?.value));
        setLoading(false);
      });
  }, []);

  async function toggle() {
    const supabase = getAuthClient();
    if (!supabase) return;
    setSaving(true);
    const next = !enabled;
    const { error } = await supabase
      .from("site_settings")
      .update({ value: next, updated_at: new Date().toISOString() })
      .eq("key", "xmas_enabled");
    if (!error) setEnabled(next);
    setSaving(false);
  }

  return (
    <section className="rounded-2xl border border-border bg-surface p-6">
      <h2 className="font-heading text-lg font-bold text-ink">Tema navideño</h2>
      <p className="mt-1 text-sm text-steel">
        Activa o desactiva la nieve, guirnaldas y el trineo en todo el sitio.
      </p>

      <div className="mt-5 flex items-center gap-3">
        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          disabled={loading || saving}
          onClick={toggle}
          className={`relative h-7 w-13 shrink-0 cursor-pointer rounded-full transition-colors disabled:opacity-50 ${
            enabled ? "bg-accent" : "bg-border"
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 size-6 rounded-full bg-white shadow transition-transform ${
              enabled ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
        <span className="text-sm font-semibold text-ink">{enabled ? "Activado" : "Desactivado"}</span>
      </div>
    </section>
  );
}
