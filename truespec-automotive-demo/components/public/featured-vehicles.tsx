import Image from "next/image";
import Link from "next/link";
import type { PublicVehicle } from "@/lib/types/public";
import { formatNaira } from "@/lib/format/currency";
import { StatusBadge } from "@/components/ui/badge";
import { VehicleCard } from "./vehicle-card";
import { VehiclePlaceholderArt } from "./vehicle-placeholder-art";

export function FeaturedVehicles({ vehicles }: { vehicles: PublicVehicle[] }) {
  const [lead, ...rest] = vehicles;
  if (!lead) return null;

  const leadTitle = [lead.year, lead.brand, lead.model].filter(Boolean).join(" ");
  const leadPhoto = lead.photos[0];

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <Link
        href={`/inventory/${lead.slug}`}
        className="group relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-lg border border-border lg:row-span-2"
      >
        {leadPhoto ? (
          <Image
            src={leadPhoto}
            alt={`${leadTitle} — exterior`}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
        ) : (
          <VehiclePlaceholderArt label={lead.brand} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
        <div className="relative flex flex-col gap-2 p-6 sm:p-8">
          <StatusBadge status={lead.status} className="w-fit" />
          <h3 className="font-display text-2xl uppercase tracking-wide text-foreground sm:text-3xl">
            {leadTitle}
          </h3>
          <p className="text-lg text-foreground">{formatNaira(lead.doorstepPrice)}</p>
        </div>
      </Link>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-1">
        {rest.slice(0, 2).map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
}
