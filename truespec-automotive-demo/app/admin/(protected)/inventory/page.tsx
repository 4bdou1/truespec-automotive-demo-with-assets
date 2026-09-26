"use client";

import { useMemo, useState } from "react";
import { useAdminData } from "@/lib/admin/data-context";
import { InventoryTable } from "@/components/admin/inventory-table";
import { LinkButton } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { SearchIcon } from "@/components/ui/icons";
import type { VehicleStatus } from "@/lib/types/public";

const STATUS_FILTERS: { value: VehicleStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "available", label: "Available" },
  { value: "on-order", label: "On Order" },
  { value: "landed", label: "Landed" },
];

export default function AdminInventoryPage() {
  const { listings } = useAdminData();
  const [status, setStatus] = useState<VehicleStatus | "all">("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return listings.filter((v) => {
      const matchesStatus = status === "all" || v.status === status;
      const matchesQuery =
        query.trim().length === 0 ||
        `${v.brand} ${v.model} ${v.trim ?? ""}`.toLowerCase().includes(query.toLowerCase());
      return matchesStatus && matchesQuery;
    });
  }, [listings, status, query]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl uppercase tracking-wide text-foreground">Inventory</h1>
          <p className="mt-1 text-sm text-muted">{listings.length} listings in the demo dataset</p>
        </div>
        <LinkButton href="/admin/inventory/new">New listing</LinkButton>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-xs">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search listings"
            className="h-11 w-full rounded-md border border-border-strong bg-surface pl-9 pr-3 text-sm text-foreground placeholder:text-muted focus-visible:outline-2 focus-visible:outline-gold"
          />
        </div>
        <div className="flex gap-1.5 overflow-x-auto rounded-md border border-border bg-surface p-1">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setStatus(f.value)}
              className={`min-h-11 shrink-0 rounded-sm px-4 text-sm font-medium uppercase tracking-wide transition-colors ${
                status === f.value
                  ? "bg-gold text-gold-ink"
                  : "text-muted-strong hover:bg-surface-raised hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No listings match" description="Try a different search or status filter." />
      ) : (
        <InventoryTable listings={filtered} />
      )}
    </div>
  );
}
