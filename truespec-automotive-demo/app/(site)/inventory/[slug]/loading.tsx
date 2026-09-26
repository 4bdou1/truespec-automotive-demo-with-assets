import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function VehicleDetailLoading() {
  return (
    <Container className="flex flex-col gap-10 py-10 sm:py-14">
      <Skeleton className="h-4 w-32" />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-10">
        <div className="flex flex-col gap-6">
          <Skeleton className="aspect-[4/3] w-full sm:aspect-[16/10]" />
          <Skeleton className="h-9 w-2/3" />
          <Skeleton className="h-32 w-full" />
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    </Container>
  );
}
