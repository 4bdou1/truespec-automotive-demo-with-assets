import Image from "next/image";
import Link from "next/link";
import { LinkButton } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { buildGeneralWhatsAppMessage, buildWhatsAppLink } from "@/lib/whatsapp";
import { ArrowRightIcon } from "@/components/ui/icons";

export function Hero({
  tagline,
  whatsappNumber,
}: {
  tagline: string;
  whatsappNumber: string;
}) {
  const whatsappHref = buildWhatsAppLink(whatsappNumber, buildGeneralWhatsAppMessage(tagline));

  return (
    <section className="relative flex min-h-[90svh] items-center overflow-hidden">
      {/* Background image — positioned right like CARDEAL */}
      <Image
        src="/vehicles/vehicle-01/01.jpg"
        alt="Mercedes-AMG GLE in TrueSpec's showroom"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Heavy left vignette so text reads cleanly */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/10" />
      {/* Bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
      {/* Top fade for header breathing room */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-2xl animate-reveal">
          {/* Eyebrow */}
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-foreground/60" />
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/70">
              Nigerian vehicle imports
            </p>
          </div>

          {/* Main headline */}
          <h1 className="font-display text-5xl uppercase leading-[1.02] tracking-tight text-foreground text-balance sm:text-6xl lg:text-7xl">
            {tagline}
          </h1>

          {/* Sub-copy */}
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-strong">
            Every listing is sourced, shipped, and cleared before it reaches you —
            browse what&rsquo;s available now, on order, or newly landed.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <LinkButton href="/inventory" size="lg">
              Browse Inventory
            </LinkButton>
            <WhatsAppButton href={whatsappHref} size="lg">
              Chat on WhatsApp
            </WhatsAppButton>
          </div>

          {/* Subtle explore link */}
          <Link
            href="/inventory"
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-muted-strong transition-colors hover:text-foreground group"
          >
            <span className="h-px w-6 bg-current transition-all group-hover:w-8" />
            Explore more
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
