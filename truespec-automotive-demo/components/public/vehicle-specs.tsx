import type { PublicVehicle } from "@/lib/types/public";
import { formatMileage } from "@/lib/format/mileage";

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-border py-3 first:pt-0 last:border-none">
      <dt className="text-xs uppercase tracking-wide text-muted">{label}</dt>
      <dd className="text-sm text-foreground">{value}</dd>
    </div>
  );
}

export function VehicleSpecs({ vehicle }: { vehicle: PublicVehicle }) {
  return (
    <dl className="flex flex-col">
      <Spec label="Year" value={vehicle.year ? String(vehicle.year) : "To be confirmed"} />
      <Spec label="Exterior color" value={vehicle.exteriorColor ?? "To be confirmed"} />
      <Spec label="Interior color" value={vehicle.interiorColor ?? "To be confirmed"} />
      <Spec label="Mileage" value={formatMileage(vehicle.mileage)} />
    </dl>
  );
}

export function VehicleFeatures({ features }: { features: string[] }) {
  if (features.length === 0) {
    return <p className="text-sm text-muted">Feature list to be confirmed.</p>;
  }
  return (
    <ul className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
      {features.map((feature) => (
        <li key={feature} className="flex items-start gap-2 text-sm text-muted-strong">
          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" aria-hidden="true" />
          {feature}
        </li>
      ))}
    </ul>
  );
}
