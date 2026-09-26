import { clsx } from "clsx";

export function MetricCard({
  label,
  value,
  hint,
  tone = "neutral",
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: "neutral" | "gold" | "danger";
}) {
  const toneClasses = {
    neutral: "text-foreground",
    gold: "text-gold-soft",
    danger: "text-danger",
  } as const;

  return (
    <div className="rounded-lg border border-border bg-surface p-5">
      <p className="text-xs font-medium uppercase tracking-wide text-muted">{label}</p>
      <p className={clsx("mt-2 font-display text-3xl", toneClasses[tone])}>{value}</p>
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}
