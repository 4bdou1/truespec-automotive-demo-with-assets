import type { AuditEvent } from "@/lib/types/admin";
import { formatDateTime } from "@/lib/format/date";
import { EmptyState } from "@/components/ui/empty-state";

const actionLabels: Record<AuditEvent["action"], string> = {
  create: "Created",
  update: "Updated",
  delete: "Deleted",
  "settings-update": "Settings",
  login: "Signed in",
  logout: "Signed out",
};

export function AuditPanel({ events }: { events: AuditEvent[] }) {
  if (events.length === 0) {
    return <EmptyState title="No activity yet" description="Actions taken in this demo will appear here." />;
  }

  return (
    <ul className="flex flex-col divide-y divide-border rounded-lg border border-border bg-surface">
      {events.slice(0, 8).map((event) => (
        <li key={event.id} className="flex items-start justify-between gap-4 px-4 py-3.5 sm:px-5">
          <div>
            <p className="text-sm text-foreground">{event.summary}</p>
            <p className="mt-0.5 text-xs text-muted">
              {actionLabels[event.action]} &middot; {event.actor}
            </p>
          </div>
          <time dateTime={event.timestamp} className="shrink-0 text-xs text-muted">
            {formatDateTime(event.timestamp)}
          </time>
        </li>
      ))}
    </ul>
  );
}
