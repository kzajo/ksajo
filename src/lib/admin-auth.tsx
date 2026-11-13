"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { getAuthClient } from "@/lib/supabase/auth-client";

type AdminAuthValue = {
  session: Session | null;
  loading: boolean;
  recovery: boolean;
  signIn: (email: string, password: string) => Promise<string | null>;
  signOut: () => Promise<void>;
  requestPasswordReset: (email: string) => Promise<string | null>;
  updatePassword: (password: string) => Promise<string | null>;
};

const AdminAuthContext = createContext<AdminAuthValue | null>(null);

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [recovery, setRecovery] = useState(false);

  useEffect(() => {
    const supabase = getAuthClient();
    if (!supabase) {
      // Sin credenciales de Supabase no hay sesión que esperar: se resuelve de inmediato.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((event, newSession) => {
      if (event === "PASSWORD_RECOVERY") setRecovery(true);
      if (event === "SIGNED_OUT") setRecovery(false);
      setSession(newSession);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  async function signIn(email: string, password: string) {
    const supabase = getAuthClient();
    if (!supabase) return "Supabase no está configurado.";
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return error ? error.message : null;
  }

  async function signOut() {
    const supabase = getAuthClient();
    if (!supabase) return;
    await supabase.auth.signOut();
    setRecovery(false);
  }

  async function requestPasswordReset(email: string) {
    const supabase = getAuthClient();
    if (!supabase) return "Supabase no está configurado.";
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin`,
    });
    return error ? error.message : null;
  }

  async function updatePassword(password: string) {
    const supabase = getAuthClient();
    if (!supabase) return "Supabase no está configurado.";
    const { error } = await supabase.auth.updateUser({ password });
    return error ? error.message : null;
  }

  return (
    <AdminAuthContext.Provider
      value={{ session, loading, recovery, signIn, signOut, requestPasswordReset, updatePassword }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}
