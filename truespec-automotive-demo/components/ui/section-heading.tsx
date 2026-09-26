import { clsx } from "clsx";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={clsx("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-strong">{eyebrow}</p>
      )}
      <h2 className="mt-2 font-display text-3xl uppercase tracking-wide text-foreground sm:text-4xl">
        {title}
      </h2>
      {description && <p className="mt-3 text-muted-strong">{description}</p>}
    </div>
  );
}
