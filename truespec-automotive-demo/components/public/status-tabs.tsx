"use client";

import { clsx } from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { VehicleStatus } from "@/lib/types/public";

const TABS: { value: VehicleStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "available", label: "Available" },
  { value: "on-order", label: "On Order" },
  { value: "landed", label: "Landed" },
];

export function StatusTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.get("status") ?? "all";

  function setStatus(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete("status");
    } else {
      params.set("status", value);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div
      className="flex gap-1.5 overflow-x-auto rounded-md border border-border bg-surface p-1"
      role="tablist"
      aria-label="Filter by status"
    >
      {TABS.map((tab) => {
        const isActive = active === tab.value;
        return (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => setStatus(tab.value)}
            className={clsx(
              "min-h-11 shrink-0 rounded-sm px-4 text-sm font-medium uppercase tracking-wide transition-colors",
              isActive
                ? "bg-gold text-gold-ink"
                : "text-muted-strong hover:bg-surface-raised hover:text-foreground",
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
