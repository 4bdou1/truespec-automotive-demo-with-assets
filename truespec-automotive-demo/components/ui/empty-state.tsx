import { clsx } from "clsx";

export function EmptyState({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border-strong bg-surface/60 px-6 py-16 text-center",
        className,
      )}
    >
      <h3 className="font-display text-xl uppercase tracking-wide text-foreground">{title}</h3>
      {description && <p className="max-w-sm text-sm text-muted">{description}</p>}
      {action}
    </div>
  );
}

export function ErrorState({
  title = "Something went wrong",
  description = "Please try again in a moment.",
  action,
}: {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-danger/30 bg-danger-soft px-6 py-16 text-center">
      <h3 className="font-display text-xl uppercase tracking-wide text-foreground">{title}</h3>
      <p className="max-w-sm text-sm text-muted-strong">{description}</p>
      {action}
    </div>
  );
}
