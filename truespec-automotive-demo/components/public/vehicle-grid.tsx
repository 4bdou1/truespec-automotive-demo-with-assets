import type { PublicVehicle } from "@/lib/types/public";
import { VehicleCard } from "./vehicle-card";
import { EmptyState } from "@/components/ui/empty-state";

export function VehicleGrid({
  vehicles,
  emptyAction,
}: {
  vehicles: PublicVehicle[];
  emptyAction?: React.ReactNode;
}) {
  if (vehicles.length === 0) {
    return (
      <EmptyState
        title="No vehicles match your search"
        description="Try clearing a filter or searching a different make, model, or color."
        action={emptyAction}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {vehicles.map((vehicle, i) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} priority={i < 3} />
      ))}
    </div>
  );
}
