import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { LinkButton } from "@/components/ui/button";
import { buildGeneralWhatsAppMessage, buildWhatsAppLink } from "@/lib/whatsapp";

export function CtaBand({
  tagline,
  whatsappNumber,
}: {
  tagline: string;
  whatsappNumber: string;
}) {
  const whatsappHref = buildWhatsAppLink(whatsappNumber, buildGeneralWhatsAppMessage(tagline));

  return (
    <div className="rounded-lg border border-foreground/10 bg-gradient-to-br from-surface to-surface-raised px-6 py-10 text-center sm:px-12 sm:py-14">
      <h2 className="font-display text-2xl uppercase tracking-wide text-foreground sm:text-3xl">
        Have a vehicle in mind?
      </h2>
      <p className="mx-auto mt-3 max-w-md text-sm text-muted-strong">
        Tell us the make, budget, or timeline and we&rsquo;ll confirm sourcing and landed
        pricing directly on WhatsApp.
      </p>
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <WhatsAppButton href={whatsappHref} size="lg">
          Chat on WhatsApp
        </WhatsAppButton>
        <LinkButton href="/inventory" variant="outline" size="lg">
          View full inventory
        </LinkButton>
      </div>
    </div>
  );
}
