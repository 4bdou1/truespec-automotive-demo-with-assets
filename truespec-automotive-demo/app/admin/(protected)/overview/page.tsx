"use client";

import Link from "next/link";
import { useAdminData } from "@/lib/admin/data-context";
import { MetricCard } from "@/components/admin/metric-card";
import { AuditPanel } from "@/components/admin/audit-panel";
import { formatNaira } from "@/lib/format/currency";

export default function AdminOverviewPage() {
  const { summary, auditLog } = useAdminData();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-2xl uppercase tracking-wide text-foreground">Overview</h1>
        <p className="mt-1 text-sm text-muted">Portfolio snapshot across all seeded listings.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Inventory"
          value={String(summary.inventoryCount)}
          hint={`${summary.availableCount} available · ${summary.onOrderCount} on order · ${summary.landedCount} landed`}
        />
        <MetricCard label="Total landed cost" value={formatNaira(summary.totalLandedCost)} tone="gold" />
        <MetricCard
          label="Projected profit"
          value={formatNaira(summary.projectedProfit)}
          tone={summary.projectedProfit < 0 ? "danger" : "gold"}
        />
        <MetricCard
          label="Incomplete financials"
          value={String(summary.incompleteFinancialsCount)}
          hint={summary.incompleteFinancialsCount > 0 ? "Missing one or more cost fields" : "All listings priced"}
          tone={summary.incompleteFinancialsCount > 0 ? "danger" : "neutral"}
        />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg uppercase tracking-wide text-foreground">Recent activity</h2>
          <Link href="/admin/inventory" className="text-sm text-gold hover:text-gold-soft">
            Manage inventory
          </Link>
        </div>
        <AuditPanel events={auditLog} />
      </div>
    </div>
  );
}
