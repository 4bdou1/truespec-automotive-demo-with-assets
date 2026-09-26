"use client";

import { use } from "react";
import Link from "next/link";
import { useAdminData } from "@/lib/admin/data-context";
import { ListingForm } from "@/components/admin/listing-form";
import { EmptyState } from "@/components/ui/empty-state";
import { LinkButton } from "@/components/ui/button";
import { ChevronLeftIcon } from "@/components/ui/icons";

export default function EditListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { listings, settings } = useAdminData();
  const vehicle = listings.find((v) => v.id === id);

  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/admin/inventory"
        className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-strong hover:text-gold"
      >
        <ChevronLeftIcon className="h-4 w-4" />
        Back to inventory
      </Link>

      {!vehicle ? (
        <EmptyState
          title="Listing not found"
          description="It may have been deleted in this demo session."
          action={<LinkButton href="/admin/inventory">Back to inventory</LinkButton>}
        />
      ) : (
        <>
          <h1 className="font-display text-2xl uppercase tracking-wide text-foreground">
            Edit {[vehicle.year, vehicle.brand, vehicle.model].filter(Boolean).join(" ")}
          </h1>
          <ListingForm vehicle={vehicle} defaultFullTankCost={settings.defaultFullTankCost} />
        </>
      )}
    </div>
  );
}
