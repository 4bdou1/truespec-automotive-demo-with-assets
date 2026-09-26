import { Suspense } from "react";
import type { Metadata } from "next";
import { getPublicListings, getPublicMakes } from "@/lib/api/public";
import { VehicleGrid } from "@/components/public/vehicle-grid";
import { InventoryFilters } from "@/components/public/inventory-filters";
import { StatusTabs } from "@/components/public/status-tabs";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { VehicleStatus } from "@/lib/types/public";

export const metadata: Metadata = {
  title: "Inventory",
};

function parsePriceBand(value: string | undefined): { minPrice?: number; maxPrice?: number } {
  if (!value) return {};
  const [min, max] = value.split("-");
  return {
    minPrice: min ? Number(min) : undefined,
    maxPrice: max ? Number(max) : undefined,
  };
}

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function InventoryPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedParams = await searchParams;
  const status = firstValue(resolvedParams.status) as VehicleStatus | "all" | undefined;
  const query = firstValue(resolvedParams.q);
  const make = firstValue(resolvedParams.make);
  const { minPrice, maxPrice } = parsePriceBand(firstValue(resolvedParams.price));

  const [vehicles, makes] = await Promise.all([
    getPublicListings({ status, query, make, minPrice, maxPrice }),
    getPublicMakes(),
  ]);

  return (
    <Container className="flex flex-col gap-8 py-12 sm:py-16">
      <SectionHeading
        eyebrow="Showroom"
        title="Inventory"
        description="Available, on-order, and recently landed vehicles. Filter to find the right one."
      />

      <Suspense fallback={<div className="h-[88px] rounded-md border border-border bg-surface" />}>
        <div className="flex flex-col gap-4">
          <StatusTabs />
          <InventoryFilters makes={makes} />
        </div>
      </Suspense>

      <p className="text-sm text-muted" aria-live="polite">
        {vehicles.length} {vehicles.length === 1 ? "vehicle" : "vehicles"} found
      </p>

      <VehicleGrid vehicles={vehicles} />
    </Container>
  );
}
