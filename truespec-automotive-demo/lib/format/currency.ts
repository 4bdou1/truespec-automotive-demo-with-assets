const nairaFormatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

export function formatNaira(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "Price to be confirmed";
  }
  return nairaFormatter.format(value);
}

/** Signed variant for profit figures, so losses read unambiguously. */
export function formatNairaSigned(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "—";
  }
  const formatted = nairaFormatter.format(Math.abs(value));
  return value < 0 ? `-${formatted}` : formatted;
}
