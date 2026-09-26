"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { AdminVehicleRow } from "@/lib/admin/data-context";
import { useAdminData } from "@/lib/admin/data-context";
import { formatNairaSigned, formatNaira } from "@/lib/format/currency";
import { StatusBadge, DemoBadge } from "@/components/ui/badge";
import { PencilIcon, TrashIcon } from "@/components/ui/icons";
import { ConfirmDialog } from "./confirm-dialog";
import { VehiclePlaceholderArt } from "@/components/public/vehicle-placeholder-art";

function ProfitValue({ value }: { value: number | null }) {
  if (value === null) return <span className="text-muted">Incomplete</span>;
  return <span className={value < 0 ? "text-danger" : "text-success"}>{formatNairaSigned(value)}</span>;
}

export function InventoryTable({ listings }: { listings: AdminVehicleRow[] }) {
  const { deleteListing } = useAdminData();
  const [pendingDelete, setPendingDelete] = useState<AdminVehicleRow | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function confirmDelete() {
    if (!pendingDelete) return;
    setDeleting(true);
    await deleteListing(pendingDelete.id);
    setDeleting(false);
    setPendingDelete(null);
  }

  return (
    <>
      <div className="hidden overflow-hidden rounded-lg border border-border lg:block">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-surface text-left text-xs uppercase tracking-wide text-muted">
              <th className="px-4 py-3 font-medium">Vehicle</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Doorstep price</th>
              <th className="px-4 py-3 font-medium">Landed cost</th>
              <th className="px-4 py-3 font-medium">Profit</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((vehicle) => (
              <tr key={vehicle.id} className="border-b border-border bg-surface/60 last:border-none">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-sm border border-border">
                      {vehicle.photos[0] ? (
                        <Image src={vehicle.photos[0]} alt="" fill sizes="64px" className="object-cover" />
                      ) : (
                        <VehiclePlaceholderArt label={vehicle.brand.slice(0, 2).toUpperCase()} />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {[vehicle.year, vehicle.brand, vehicle.model].filter(Boolean).join(" ")}
                      </p>
                      <div className="mt-0.5 flex gap-1.5">
                        {vehicle.isDemo && <DemoBadge />}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={vehicle.status} />
                </td>
                <td className="px-4 py-3 text-foreground">{formatNaira(vehicle.doorstepPrice)}</td>
                <td className="px-4 py-3 text-foreground">
                  {vehicle.landedCost === null ? (
                    <span className="text-muted">Incomplete</span>
                  ) : (
                    formatNaira(vehicle.landedCost)
                  )}
                </td>
                <td className="px-4 py-3">
                  <ProfitValue value={vehicle.projectedProfit} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/inventory/${vehicle.id}`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border-strong text-foreground hover:border-gold hover:text-gold"
                      aria-label={`Edit ${vehicle.brand} ${vehicle.model}`}
                    >
                      <PencilIcon className="h-4 w-4" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => setPendingDelete(vehicle)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border-strong text-foreground hover:border-danger hover:text-danger"
                      aria-label={`Delete ${vehicle.brand} ${vehicle.model}`}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 lg:hidden">
        {listings.map((vehicle) => (
          <div key={vehicle.id} className="rounded-lg border border-border bg-surface p-4">
            <div className="flex items-start gap-3">
              <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-sm border border-border">
                {vehicle.photos[0] ? (
                  <Image src={vehicle.photos[0]} alt="" fill sizes="80px" className="object-cover" />
                ) : (
                  <VehiclePlaceholderArt label={vehicle.brand.slice(0, 2).toUpperCase()} />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-foreground">
                  {[vehicle.year, vehicle.brand, vehicle.model].filter(Boolean).join(" ")}
                </p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  <StatusBadge status={vehicle.status} />
                  {vehicle.isDemo && <DemoBadge />}
                </div>
              </div>
            </div>

            <dl className="mt-3 grid grid-cols-2 gap-y-2 border-t border-border pt-3 text-sm">
              <dt className="text-muted">Doorstep price</dt>
              <dd className="text-right text-foreground">{formatNaira(vehicle.doorstepPrice)}</dd>
              <dt className="text-muted">Landed cost</dt>
              <dd className="text-right text-foreground">
                {vehicle.landedCost === null ? "Incomplete" : formatNaira(vehicle.landedCost)}
              </dd>
              <dt className="text-muted">Profit</dt>
              <dd className="text-right">
                <ProfitValue value={vehicle.projectedProfit} />
              </dd>
            </dl>

            <div className="mt-3 flex gap-2 border-t border-border pt-3">
              <Link
                href={`/admin/inventory/${vehicle.id}`}
                className="inline-flex h-11 flex-1 items-center justify-center gap-1.5 rounded-md border border-border-strong text-sm text-foreground"
              >
                <PencilIcon className="h-4 w-4" />
                Edit
              </Link>
              <button
                type="button"
                onClick={() => setPendingDelete(vehicle)}
                className="inline-flex h-11 flex-1 items-center justify-center gap-1.5 rounded-md border border-border-strong text-sm text-danger"
              >
                <TrashIcon className="h-4 w-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <ConfirmDialog
        open={pendingDelete !== null}
        title="Delete this listing?"
        description={
          pendingDelete
            ? `This removes "${[pendingDelete.year, pendingDelete.brand, pendingDelete.model].filter(Boolean).join(" ")}" from the demo inventory. This cannot be undone.`
            : ""
        }
        confirmLabel="Delete listing"
        pending={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </>
  );
}
