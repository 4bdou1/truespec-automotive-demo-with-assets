import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import type { PublicVehicle } from "@/lib/types/public";
import { formatNaira } from "@/lib/format/currency";
import { buildVehicleWhatsAppMessage, buildWhatsAppLink } from "@/lib/whatsapp";
import { PendingBadge, DemoBadge, StatusBadge } from "@/components/ui/badge";

export function VehicleCta({
  vehicle,
  whatsappNumber,
}: {
  vehicle: PublicVehicle;
  whatsappNumber: string;
}) {
  const whatsappHref = buildWhatsAppLink(whatsappNumber, buildVehicleWhatsAppMessage(vehicle));

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge status={vehicle.status} />
        {vehicle.isDemo && <DemoBadge />}
        {vehicle.detailsPending && <PendingBadge />}
      </div>

      <p className="font-display text-3xl text-gold-soft">{formatNaira(vehicle.doorstepPrice)}</p>

      {vehicle.publicNote && <p className="text-sm text-muted-strong">{vehicle.publicNote}</p>}

      <WhatsAppButton href={whatsappHref} size="lg" className="w-full">
        Chat about this vehicle
      </WhatsAppButton>
    </div>
  );
}
