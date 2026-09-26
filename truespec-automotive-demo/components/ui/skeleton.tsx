import { clsx } from "clsx";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        "animate-pulse rounded-md bg-gradient-to-r from-surface-raised via-surface-overlay to-surface-raised bg-[length:200%_100%]",
        className,
      )}
    />
  );
}
