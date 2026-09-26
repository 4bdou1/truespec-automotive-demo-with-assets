import Image from "next/image";
import Link from "next/link";
import type { PublicVehicle } from "@/lib/types/public";
import { formatNaira } from "@/lib/format/currency";
import { formatMileage } from "@/lib/format/mileage";
import { StatusBadge, DemoBadge, PendingBadge } from "@/components/ui/badge";
import { VehiclePlaceholderArt } from "./vehicle-placeholder-art";

export function VehicleCard({ vehicle, priority = false }: { vehicle: PublicVehicle; priority?: boolean }) {
  const title = [vehicle.year, vehicle.brand, vehicle.model].filter(Boolean).join(" ");
  const coverPhoto = vehicle.photos[0];

  return (
    <Link
      href={`/inventory/${vehicle.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_18px_40px_-24px_rgba(201,163,90,0.45)] focus-visible:-translate-y-1"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-raised">
        {coverPhoto ? (
          <Image
            src={coverPhoto}
            alt={`${title} — exterior`}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 92vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <VehiclePlaceholderArt label={vehicle.brand} />
        )}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <StatusBadge status={vehicle.status} />
          {vehicle.isDemo && <DemoBadge />}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div>
          <h3 className="font-display text-lg uppercase leading-tight tracking-wide text-foreground">
            {title}
          </h3>
          {vehicle.trim && <p className="text-sm text-muted">{vehicle.trim}</p>}
        </div>

        <dl className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs text-muted">
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Exterior color</dt>
            <dd>{vehicle.exteriorColor ?? "Color TBC"}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Mileage</dt>
            <dd>{formatMileage(vehicle.mileage)}</dd>
          </div>
        </dl>

        <div className="mt-auto flex items-end justify-between gap-2 pt-1">
          <p className="font-display text-xl text-gold-soft">{formatNaira(vehicle.doorstepPrice)}</p>
          {vehicle.detailsPending && <PendingBadge className="hidden sm:inline-flex" />}
        </div>
      </div>
    </Link>
  );
}
