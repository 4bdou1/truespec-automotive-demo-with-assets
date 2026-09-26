import type { AdminVehicle } from "@/lib/types/admin";
import type { PublicVehicle } from "@/lib/types/public";

/**
 * Explicit allow-list from the internal record to the public response.
 * This is the only function that should ever read an AdminVehicle's private
 * financial fields — everything else in `components/public` only ever sees
 * the type returned here.
 */
export function toPublicVehicle(vehicle: AdminVehicle): PublicVehicle {
  return {
    scope: "public",
    id: vehicle.id,
    slug: vehicle.slug,
    brand: vehicle.brand,
    model: vehicle.model,
    trim: vehicle.trim,
    year: vehicle.year,
    exteriorColor: vehicle.exteriorColor,
    interiorColor: vehicle.interiorColor,
    mileage: vehicle.mileage,
    features: vehicle.features,
    photos: vehicle.photos,
    status: vehicle.status,
    doorstepPrice: vehicle.doorstepPrice,
    publicNote: vehicle.publicNote,
    isDemo: vehicle.isDemo,
    detailsPending: vehicle.detailsPending,
  };
}
