"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchIcon, SlidersIcon, CloseIcon } from "@/components/ui/icons";
import { buttonClasses } from "@/components/ui/button";

const PRICE_BANDS = [
  { value: "", label: "Any price" },
  { value: "0-30000000", label: "Under ₦30M" },
  { value: "30000000-60000000", label: "₦30M – ₦60M" },
  { value: "60000000-100000000", label: "₦60M – ₦100M" },
  { value: "100000000-", label: "₦100M+" },
];

function selectClasses() {
  return "h-11 w-full appearance-none rounded-md border border-border-strong bg-surface px-3 pr-9 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-gold";
}

export function InventoryFilters({ makes }: { makes: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const make = searchParams.get("make") ?? "";
  const price = searchParams.get("price") ?? "";
  const activeFilterCount = [make, price].filter(Boolean).length;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (drawerOpen && !dialog.open) dialog.showModal();
    if (!drawerOpen && dialog.open) dialog.close();
  }, [drawerOpen]);

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function handleQueryChange(value: string) {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => updateParam("q", value), 300);
  }

  function clearFilters() {
    updateParam("make", "");
    updateParam("price", "");
  }

  const filterFields = (
    <>
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-medium uppercase tracking-wide text-muted">Make</span>
        <div className="relative">
          <select
            className={selectClasses()}
            value={make}
            onChange={(e) => updateParam("make", e.target.value)}
          >
            <option value="">All makes</option>
            {makes.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-medium uppercase tracking-wide text-muted">Price</span>
        <select
          className={selectClasses()}
          value={price}
          onChange={(e) => updateParam("price", e.target.value)}
        >
          {PRICE_BANDS.map((band) => (
            <option key={band.value} value={band.value}>
              {band.label}
            </option>
          ))}
        </select>
      </label>
    </>
  );

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <label className="flex flex-1 flex-col gap-1.5">
        <span className="text-xs font-medium uppercase tracking-wide text-muted">Search</span>
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Search brand, model, or color"
            className="h-11 w-full rounded-md border border-border-strong bg-surface pl-9 pr-3 text-sm text-foreground placeholder:text-muted focus-visible:outline-2 focus-visible:outline-gold"
          />
        </div>
      </label>

      <div className="hidden gap-3 sm:flex">{filterFields}</div>

      <button
        type="button"
        onClick={() => setDrawerOpen(true)}
        className={buttonClasses("outline", "md", "sm:hidden")}
      >
        <SlidersIcon className="h-4 w-4" />
        Filters
        {activeFilterCount > 0 && (
          <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gold text-xs text-gold-ink">
            {activeFilterCount}
          </span>
        )}
      </button>

      <dialog
        ref={dialogRef}
        onClose={() => setDrawerOpen(false)}
        className="m-0 h-auto max-h-none w-full max-w-none border-none bg-transparent p-0 left-0 bottom-0 top-auto backdrop:bg-transparent sm:hidden"
      >
        <div className="flex flex-col gap-5 rounded-t-xl border-t border-border bg-surface p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg uppercase tracking-wide text-foreground">Filters</h2>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border-strong"
              aria-label="Close filters"
            >
              <CloseIcon />
            </button>
          </div>
          <div className="flex flex-col gap-4">{filterFields}</div>
          <div className="flex gap-3">
            <button type="button" onClick={clearFilters} className={buttonClasses("ghost", "md", "flex-1")}>
              Clear
            </button>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className={buttonClasses("gold", "md", "flex-1")}
            >
              Show results
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
