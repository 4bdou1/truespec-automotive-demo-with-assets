const numberFormatter = new Intl.NumberFormat("en-US");

export function formatMileage(miles: number | null | undefined): string {
  if (miles === null || miles === undefined || Number.isNaN(miles)) {
    return "Mileage to be confirmed";
  }
  return `${numberFormatter.format(miles)} mi`;
}
