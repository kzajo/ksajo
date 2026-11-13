"use client";

import { useState, type FormEvent } from "react";
import { useAdminAuth } from "@/lib/admin-auth";

export function AdminResetPassword() {
  const { updatePassword, signOut } = useAdminAuth();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    setSubmitting(true);
    setError(null);
    const message = await updatePassword(password);
    setSubmitting(false);
    if (message) {
      setError(message);
      return;
    }
    setDone(true);
    await signOut();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-6">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-8 shadow-sm">
        <h1 className="font-heading text-xl font-bold text-ink">Nueva contraseña</h1>

        {done ? (
          <p className="mt-4 text-sm text-steel">
            Contraseña actualizada. Ya puedes iniciar sesión con tu nueva contraseña.
          </p>
        ) : (
          <>
            <p className="mt-1 text-sm text-steel">Escribe tu nueva contraseña para el panel.</p>
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              <label className="flex flex-col gap-1.5 text-sm">
                <span className="font-semibold text-ink">Nueva contraseña</span>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-lg border border-border bg-canvas px-3 py-2.5 outline-none focus-visible:border-accent"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-sm">
                <span className="font-semibold text-ink">Confirmar contraseña</span>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="rounded-lg border border-border bg-canvas px-3 py-2.5 outline-none focus-visible:border-accent"
                />
              </label>

              {error ? <p className="text-sm text-red-600">{error}</p> : null}

              <button
                type="submit"
                disabled={submitting}
                className="mt-2 cursor-pointer rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark disabled:opacity-60"
              >
                {submitting ? "Guardando…" : "Guardar contraseña"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
