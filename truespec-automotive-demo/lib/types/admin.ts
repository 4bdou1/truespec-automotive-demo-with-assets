import type { VehicleStatus } from "./public";

/**
 * Full internal record. Never pass this into a public component — the
 * `scope: "admin"` brand makes it a type error to use it where a
 * `PublicVehicle` is expected. Use `toPublicVehicle` to derive the safe view.
 */
export interface AdminVehicle {
  readonly scope: "admin";
  id: string;
  slug: string;
  brand: string;
  model: string;
  trim: string | null;
  year: number | null;
  exteriorColor: string | null;
  interiorColor: string | null;
  mileage: number | null;
  features: string[];
  photos: string[];
  status: VehicleStatus;
  doorstepPrice: number | null;
  publicNote: string | null;
  isDemo: boolean;
  detailsPending: boolean;

  // Private financials
  purchasePrice: number | null;
  usInlandTruckingCost: number | null;
  shippingCost: number | null;
  clearingCost: number | null;
  nigeriaInlandTruckingCost: number | null;
  fullTankCost: number;
  internalNotes: string | null;
  sourcingContact: string | null;

  createdAt: string;
  updatedAt: string;
}

/** Draft shape used by the create/edit form, before id/timestamps exist. */
export type AdminVehicleDraft = Omit<
  AdminVehicle,
  "scope" | "id" | "slug" | "createdAt" | "updatedAt"
>;

export interface AdminSettings {
  whatsappNumber: string;
  whatsappMessageTemplate: string;
  tagline: string;
  defaultFullTankCost: number;
}

export type AuditAction =
  | "create"
  | "update"
  | "delete"
  | "settings-update"
  | "login"
  | "logout";

export interface AuditEvent {
  id: string;
  timestamp: string;
  actor: string;
  action: AuditAction;
  summary: string;
}

export interface AdminSummary {
  inventoryCount: number;
  availableCount: number;
  onOrderCount: number;
  landedCount: number;
  totalLandedCost: number;
  incompleteFinancialsCount: number;
  projectedProfit: number;
}
