export type VehicleStatus = "available" | "on-order" | "landed";

export const VEHICLE_STATUSES: VehicleStatus[] = [
  "available",
  "on-order",
  "landed",
];

/**
 * Response shape returned to public (unauthenticated) surfaces.
 * Every field here is safe to render to any visitor. Constructed only via
 * `toPublicVehicle` in `lib/api/adapters.ts` — never spread from AdminVehicle.
 */
export interface PublicVehicle {
  readonly scope: "public";
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
  /** Seeded for demo layout/filter coverage rather than a real listing. */
  isDemo: boolean;
  /** True when the seller has not yet confirmed core listing facts. */
  detailsPending: boolean;
}

export interface PublicSettings {
  whatsappNumber: string;
  whatsappMessageTemplate: string;
  tagline: string;
}
