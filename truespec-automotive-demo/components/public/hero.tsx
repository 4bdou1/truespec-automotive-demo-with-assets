import Image from "next/image";
import { LinkButton } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { buildGeneralWhatsAppMessage, buildWhatsAppLink } from "@/lib/whatsapp";

export function Hero({
  tagline,
  whatsappNumber,
}: {
  tagline: string;
  whatsappNumber: string;
}) {
  const whatsappHref = buildWhatsAppLink(whatsappNumber, buildGeneralWhatsAppMessage(tagline));

  return (
    <section className="relative flex min-h-[86svh] items-end overflow-hidden border-b border-border">
      <Image
        src="/vehicles/vehicle-01/01.jpg"
        alt="Mercedes-AMG GLE in TrueSpec's showroom"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-14 pt-32 sm:px-6 sm:pb-20 lg:px-8">
        <div className="max-w-xl animate-reveal">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            Nigerian vehicle imports
          </p>
          <h1 className="mt-4 font-display text-4xl uppercase leading-[1.05] tracking-wide text-foreground text-balance sm:text-5xl lg:text-6xl">
            {tagline}
          </h1>
          <p className="mt-5 max-w-md text-base text-muted-strong">
            Every listing is sourced, shipped, and cleared before it reaches you —
            browse what&rsquo;s available now, on order, or newly landed.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <LinkButton href="/inventory" size="lg">
              Browse Inventory
            </LinkButton>
            <WhatsAppButton href={whatsappHref} size="lg">
              Chat on WhatsApp
            </WhatsAppButton>
          </div>
        </div>
      </div>
    </section>
  );
}
