"use client";

import Link from "next/link";
import { useAdminData } from "@/lib/admin/data-context";
import { ListingForm } from "@/components/admin/listing-form";
import { ChevronLeftIcon } from "@/components/ui/icons";

export default function NewListingPage() {
  const { settings } = useAdminData();

  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/admin/inventory"
        className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-strong hover:text-gold"
      >
        <ChevronLeftIcon className="h-4 w-4" />
        Back to inventory
      </Link>
      <h1 className="font-display text-2xl uppercase tracking-wide text-foreground">New listing</h1>

      <ListingForm defaultFullTankCost={settings.defaultFullTankCost} />
    </div>
  );
}
