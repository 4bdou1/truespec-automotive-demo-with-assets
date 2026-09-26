import { clsx } from "clsx";
import type { VehicleStatus } from "@/lib/types/public";

export function Badge({
  children,
  className,
  tone = "neutral",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "neutral" | "gold" | "danger" | "success";
}) {
  const toneClasses: Record<typeof tone, string> = {
    neutral: "bg-surface-overlay text-muted-strong border-border-strong",
    gold: "bg-foreground/8 text-foreground border-foreground/20",
    danger: "bg-danger-soft text-danger border-danger/30",
    success: "bg-success/10 text-success border-success/30",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-1 text-xs font-medium uppercase tracking-wide",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

const statusLabels: Record<VehicleStatus, string> = {
  available: "Available",
  "on-order": "On Order",
  landed: "Landed",
};

const statusDotClasses: Record<VehicleStatus, string> = {
  available: "bg-success",
  "on-order": "bg-muted-strong",
  landed: "bg-muted-strong",
};

export function StatusBadge({ status, className }: { status: VehicleStatus; className?: string }) {
  return (
    <Badge tone="neutral" className={className}>
      <span className={clsx("h-1.5 w-1.5 rounded-full", statusDotClasses[status])} aria-hidden="true" />
      {statusLabels[status]}
    </Badge>
  );
}

export function DemoBadge({ className }: { className?: string }) {
  return (
    <Badge tone="gold" className={className}>
      Demo listing
    </Badge>
  );
}

export function PendingBadge({ className }: { className?: string }) {
  return (
    <Badge tone="neutral" className={className}>
      Details pending confirmation
    </Badge>
  );
}
