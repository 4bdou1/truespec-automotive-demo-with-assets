import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";
import type { VehicleStatus } from "@/lib/types/public";

const TILES: { status: VehicleStatus; label: string; description: string }[] = [
  { status: "available", label: "Available", description: "Ready for doorstep delivery now" },
  { status: "on-order", label: "On Order", description: "Confirmed and in transit" },
  { status: "landed", label: "Landed This Year", description: "Cleared and recently arrived" },
];

export function StatusNavTiles({ counts }: { counts: Record<VehicleStatus, number> }) {
  return (
    <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
      {TILES.map((tile) => (
        <Link
          key={tile.status}
          href={`/inventory?status=${tile.status}`}
          className="group flex items-center justify-between gap-4 bg-surface px-6 py-6 transition-colors hover:bg-surface-raised"
        >
          <div>
            <p className="font-display text-3xl text-foreground">{counts[tile.status]}</p>
            <p className="mt-1 text-sm font-medium uppercase tracking-wide text-foreground">
              {tile.label}
            </p>
            <p className="text-xs text-muted">{tile.description}</p>
          </div>
          <ArrowRightIcon className="h-5 w-5 shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
        </Link>
      ))}
    </div>
  );
}
