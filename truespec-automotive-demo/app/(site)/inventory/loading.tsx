import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";
import { VehicleGridSkeleton } from "@/components/public/vehicle-card-skeleton";

export default function InventoryLoading() {
  return (
    <Container className="flex flex-col gap-8 py-12 sm:py-16">
      <div className="max-w-2xl">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="mt-3 h-9 w-48" />
        <Skeleton className="mt-3 h-4 w-80" />
      </div>
      <Skeleton className="h-[88px] rounded-md" />
      <Skeleton className="h-4 w-32" />
      <VehicleGridSkeleton />
    </Container>
  );
}
