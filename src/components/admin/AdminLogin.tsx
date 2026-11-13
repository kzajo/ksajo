"use client";

import { useState, type FormEvent } from "react";
import { useAdminAuth } from "@/lib/admin-auth";

export function AdminLogin() {
  const { signIn, requestPasswordReset } = useAdminAuth();
  const [mode, setMode] = useState<"login" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const message = await signIn(email, password);
    setSubmitting(false);
    if (message) setError(message);
  }

  async function handleForgotSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    await requestPasswordReset(email);
    setSubmitting(false);
    // Mensaje genérico: no revela si el correo existe o no en el sistema.
    setNotice("Si ese correo tiene una cuenta, te llegará un enlace para crear una nueva contraseña.");
  }

  function backToLogin() {
    setMode("login");
    setError(null);
    setNotice(null);
  }

  if (mode === "forgot") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas px-6">
        <div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-8 shadow-sm">
          <h1 className="font-heading text-xl font-bold text-ink">Recuperar contraseña</h1>
          <p className="mt-1 text-sm text-steel">Te enviaremos un enlace a tu correo para crear una nueva.</p>

          {notice ? (
            <p className="mt-6 text-sm text-steel">{notice}</p>
          ) : (
            <form onSubmit={handleForgotSubmit} className="mt-6 flex flex-col gap-4">
              <label className="flex flex-col gap-1.5 text-sm">
                <span className="font-semibold text-ink">Correo</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-lg border border-border bg-canvas px-3 py-2.5 outline-none focus-visible:border-accent"
                />
              </label>

              {error ? <p className="text-sm text-red-600">{error}</p> : null}

              <button
                type="submit"
                disabled={submitting}
                className="mt-2 cursor-pointer rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark disabled:opacity-60"
              >
                {submitting ? "Enviando…" : "Enviar enlace"}
              </button>
            </form>
          )}

          <button
            type="button"
            onClick={backToLogin}
            className="mt-4 cursor-pointer text-sm font-semibold text-accent hover:text-accent-dark"
          >
            Volver a iniciar sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-2xl border border-border bg-surface p-8 shadow-sm">
        <h1 className="font-heading text-xl font-bold text-ink">Panel de administración</h1>
        <p className="mt-1 text-sm text-steel">Inicia sesión para continuar.</p>

        <div className="mt-6 flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-semibold text-ink">Correo</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-lg border border-border bg-canvas px-3 py-2.5 outline-none focus-visible:border-accent"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-semibold text-ink">Contraseña</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-lg border border-border bg-canvas px-3 py-2.5 outline-none focus-visible:border-accent"
            />
          </label>

          {error ? <p className="text-sm text-red-600">Correo o contraseña incorrectos.</p> : null}

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 cursor-pointer rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark disabled:opacity-60"
          >
            {submitting ? "Entrando…" : "Entrar"}
          </button>

          <button
            type="button"
            onClick={() => setMode("forgot")}
            className="cursor-pointer text-sm font-semibold text-accent hover:text-accent-dark"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>
      </form>
    </div>
  );
}
