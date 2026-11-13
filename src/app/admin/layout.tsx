"use client";

import type { ReactNode } from "react";
import { AdminAuthProvider, useAdminAuth } from "@/lib/admin-auth";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminResetPassword } from "@/components/admin/AdminResetPassword";

function AdminShell({ children }: { children: ReactNode }) {
  const { session, loading, recovery, signOut } = useAdminAuth();

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center text-steel">Cargando…</div>;
  }

  if (recovery) {
    return <AdminResetPassword />;
  }

  if (!session) {
    return <AdminLogin />;
  }

  return (
    <div className="min-h-screen bg-canvas">
      <header className="flex items-center justify-between border-b border-border bg-surface px-6 py-4">
        <div>
          <p className="font-heading text-lg font-bold text-ink">Panel de administración</p>
          <p className="text-xs text-steel">{session.user.email}</p>
        </div>
        <button
          type="button"
          onClick={() => signOut()}
          className="cursor-pointer rounded-lg border border-border px-3 py-2 text-sm font-semibold text-steel transition-colors hover:border-accent hover:text-accent-dark"
        >
          Cerrar sesión
        </button>
      </header>
      <main className="mx-auto max-w-4xl px-6 py-10">{children}</main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminShell>{children}</AdminShell>
    </AdminAuthProvider>
  );
}
