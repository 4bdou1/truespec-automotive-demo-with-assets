import { seedVehicles } from "@/lib/data/vehicles";
import { defaultSettings } from "@/lib/data/settings";
import type { PublicSettings, PublicVehicle, VehicleStatus } from "@/lib/types/public";
import { toPublicVehicle } from "./adapters";

/**
 * Mock repository layer for the public showroom. Every function here is
 * async and shaped like a future VPS API call, so swapping the body for a
 * `fetch()` later shouldn't require touching any component.
 */

export interface PublicListingFilters {
  status?: VehicleStatus | "all";
  query?: string;
  make?: string;
  minPrice?: number;
  maxPrice?: number;
}

function simulateLatency(ms = 220): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function matchesQuery(vehicle: PublicVehicle, query: string): boolean {
  const haystack = [vehicle.brand, vehicle.model, vehicle.trim, vehicle.exteriorColor]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return haystack.includes(query.trim().toLowerCase());
}

export async function getPublicListings(
  filters: PublicListingFilters = {},
): Promise<PublicVehicle[]> {
  await simulateLatency();

  let items = seedVehicles.map(toPublicVehicle);

  if (filters.status && filters.status !== "all") {
    items = items.filter((v) => v.status === filters.status);
  }
  if (filters.make) {
    items = items.filter((v) => v.brand === filters.make);
  }
  if (filters.minPrice) {
    items = items.filter((v) => v.doorstepPrice !== null && v.doorstepPrice >= filters.minPrice!);
  }
  if (filters.maxPrice) {
    items = items.filter((v) => v.doorstepPrice !== null && v.doorstepPrice <= filters.maxPrice!);
  }
  if (filters.query && filters.query.trim().length > 0) {
    items = items.filter((v) => matchesQuery(v, filters.query!));
  }

  return items;
}

export async function getPublicListing(slug: string): Promise<PublicVehicle | null> {
  await simulateLatency();
  const vehicle = seedVehicles.find((v) => v.slug === slug);
  return vehicle ? toPublicVehicle(vehicle) : null;
}

export async function getPublicMakes(): Promise<string[]> {
  await simulateLatency(60);
  return Array.from(new Set(seedVehicles.map((v) => v.brand))).sort();
}

export async function getPublicSettings(): Promise<PublicSettings> {
  await simulateLatency(40);
  const { whatsappNumber, whatsappMessageTemplate, tagline } = defaultSettings;
  return { whatsappNumber, whatsappMessageTemplate, tagline };
}
