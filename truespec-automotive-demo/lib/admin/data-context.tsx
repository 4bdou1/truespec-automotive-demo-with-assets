"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";
import * as adminApi from "@/lib/api/admin";
import { withFinancials } from "@/lib/api/admin";
import { defaultSettings } from "@/lib/data/settings";
import type {
  AdminSettings,
  AdminSummary,
  AdminVehicle,
  AdminVehicleDraft,
  AuditEvent,
} from "@/lib/types/admin";

export interface AdminVehicleRow extends AdminVehicle {
  landedCost: number | null;
  projectedProfit: number | null;
}

interface AdminDataContextValue {
  listings: AdminVehicleRow[];
  settings: AdminSettings;
  summary: AdminSummary;
  auditLog: AuditEvent[];
  createListing: (draft: AdminVehicleDraft) => Promise<AdminVehicle>;
  updateListing: (id: string, patch: AdminVehicleDraft) => Promise<AdminVehicle>;
  deleteListing: (id: string) => Promise<void>;
  updateSettings: (patch: Partial<AdminSettings>) => Promise<AdminSettings>;
}

const AdminDataContext = createContext<AdminDataContextValue | null>(null);

/** Deterministic pre-hydration snapshot — mirrors the seed data used on the server. */
const EMPTY_LISTINGS: AdminVehicle[] = [];

export function AdminDataProvider({ children }: { children: React.ReactNode }) {
  const rawListings = useSyncExternalStore(
    adminApi.subscribeAdminStore,
    adminApi.getListingsSnapshot,
    () => EMPTY_LISTINGS,
  );
  const settings = useSyncExternalStore(
    adminApi.subscribeAdminStore,
    adminApi.getSettingsSnapshot,
    () => defaultSettings,
  );
  const auditLog = useSyncExternalStore(
    adminApi.subscribeAdminStore,
    adminApi.getAuditLogSnapshot,
    () => [] as AuditEvent[],
  );

  const listings = useMemo<AdminVehicleRow[]>(
    () => rawListings.map((v) => ({ ...v, ...withFinancials(v) })),
    [rawListings],
  );
  const summary = useMemo(() => adminApi.computeSummary(rawListings), [rawListings]);

  const createListing = useCallback((draft: AdminVehicleDraft) => adminApi.createListing(draft), []);
  const updateListing = useCallback(
    (id: string, patch: AdminVehicleDraft) => adminApi.updateListing(id, patch),
    [],
  );
  const deleteListing = useCallback((id: string) => adminApi.deleteListing(id), []);
  const updateSettings = useCallback(
    (patch: Partial<AdminSettings>) => adminApi.updateSettings(patch),
    [],
  );

  const value = useMemo(
    () => ({
      listings,
      settings,
      summary,
      auditLog,
      createListing,
      updateListing,
      deleteListing,
      updateSettings,
    }),
    [listings, settings, summary, auditLog, createListing, updateListing, deleteListing, updateSettings],
  );

  return <AdminDataContext.Provider value={value}>{children}</AdminDataContext.Provider>;
}

export function useAdminData(): AdminDataContextValue {
  const ctx = useContext(AdminDataContext);
  if (!ctx) throw new Error("useAdminData must be used within AdminDataProvider");
  return ctx;
}
