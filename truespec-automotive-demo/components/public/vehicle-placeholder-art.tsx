import { clsx } from "clsx";

/**
 * Abstract placeholder for seeded demo vehicles that were not supplied with
 * real photography. Deliberately not a stock photo or manufacturer logo —
 * just a line-art silhouette on the brand surface, so it reads clearly as
 * placeholder art rather than a real listing photo.
 */
export function VehiclePlaceholderArt({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-surface-raised to-surface",
        className,
      )}
    >
      <svg
        viewBox="0 0 200 120"
        className="absolute inset-0 h-full w-full text-border-strong"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M18 82 Q18 66 40 63 L58 46 Q66 39 78 39 L128 39 Q140 39 148 46 L164 63 Q184 66 184 82 L184 88 Q184 92 180 92 L166 92 Q164 100 155 100 Q146 100 144 92 L58 92 Q56 100 47 100 Q38 100 36 92 L22 92 Q18 92 18 88 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="47" cy="92" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="155" cy="92" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <line x1="78" y1="39" x2="70" y2="63" stroke="currentColor" strokeWidth="1.25" />
        <line x1="128" y1="39" x2="136" y2="63" stroke="currentColor" strokeWidth="1.25" />
      </svg>
      <div className="relative flex flex-col items-center gap-2 px-6 text-center">
        <span className="font-display text-2xl uppercase tracking-[0.15em] text-muted">
          {label}
        </span>
        <span className="text-xs uppercase tracking-wide text-muted/70">
          No photos supplied &middot; demo listing
        </span>
      </div>
    </div>
  );
}
