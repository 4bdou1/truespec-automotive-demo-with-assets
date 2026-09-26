"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";
import { readAdminSession, subscribeAdminSession, writeAdminSession } from "@/lib/admin/store";
import { recordLogin, recordLogout } from "@/lib/api/admin";

export const DEMO_ADMIN_USERNAME = "admin";
export const DEMO_ADMIN_PASSWORD = "truespec-demo";

interface AdminAuthContextValue {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

function getServerSnapshot() {
  return false;
}

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useSyncExternalStore(subscribeAdminSession, readAdminSession, getServerSnapshot);

  const login = useCallback(async (username: string, password: string) => {
    const ok = username.trim() === DEMO_ADMIN_USERNAME && password === DEMO_ADMIN_PASSWORD;
    if (ok) {
      writeAdminSession(true);
      await recordLogin();
    }
    return ok;
  }, []);

  const logout = useCallback(() => {
    writeAdminSession(false);
    void recordLogout();
  }, []);

  const value = useMemo(() => ({ isAuthenticated, login, logout }), [isAuthenticated, login, logout]);

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth(): AdminAuthContextValue {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
