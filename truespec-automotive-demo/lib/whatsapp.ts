import type { PublicVehicle } from "@/lib/types/public";
import { formatNaira } from "@/lib/format/currency";

function digitsOnly(value: string): string {
  return value.replace(/[^0-9]/g, "");
}

export function buildWhatsAppLink(phoneNumber: string, message: string): string {
  const digits = digitsOnly(phoneNumber);
  const params = new URLSearchParams({ text: message });
  return `https://wa.me/${digits}?${params.toString()}`;
}

export function buildVehicleWhatsAppMessage(vehicle: PublicVehicle): string {
  const title = [vehicle.year, vehicle.brand, vehicle.model, vehicle.trim]
    .filter(Boolean)
    .join(" ");
  const price =
    vehicle.doorstepPrice !== null ? formatNaira(vehicle.doorstepPrice) : "the price";
  return `Hi TrueSpec, I'm interested in the ${title} (${price}). Is it still ${vehicle.status.replace(
    "-",
    " ",
  )}?`;
}

export function buildGeneralWhatsAppMessage(tagline: string): string {
  return `Hi TrueSpec, I saw your showroom — "${tagline}" — and I'd like to talk about a vehicle.`;
}
