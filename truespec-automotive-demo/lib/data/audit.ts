import type { AuditEvent } from "@/lib/types/admin";

/** Seed activity so the overview panel has something to show before any demo edits. */
export const seedAuditLog: AuditEvent[] = [
  {
    id: "a-1",
    timestamp: "2026-09-15T08:15:00.000Z",
    actor: "Umar",
    action: "update",
    summary: "Updated pricing on demo listing — Mercedes-Benz GLE 450",
  },
  {
    id: "a-2",
    timestamp: "2026-09-12T08:15:00.000Z",
    actor: "Umar",
    action: "update",
    summary: "Marked demo listing on order — Lexus LX 600",
  },
  {
    id: "a-3",
    timestamp: "2026-09-10T14:30:00.000Z",
    actor: "Umar",
    action: "update",
    summary: "Added supplied photos for both real vehicles",
  },
  {
    id: "a-4",
    timestamp: "2026-08-20T09:05:00.000Z",
    actor: "Umar",
    action: "create",
    summary: "Created listing — Mercedes-Benz GLE-Class (black)",
  },
  {
    id: "a-5",
    timestamp: "2026-08-20T09:00:00.000Z",
    actor: "Umar",
    action: "create",
    summary: "Created listing — Mercedes-Benz GLE-Class (green)",
  },
];
