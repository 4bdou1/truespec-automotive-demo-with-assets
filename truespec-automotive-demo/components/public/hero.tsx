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
    <section className="relative flex min-h-[90svh] items-center overflow-hidden bg-background">
      {/*
        SVG filter: sets alpha = clamp(3 - R - G - B, 0, 1) per pixel.
        Pure white (R=G=B=1) → alpha 0 (invisible).
        Dark car body (R=G=B≈0.3) → alpha > 1, clamped to 1 (fully opaque).
        Effectively keys out the white studio background with no external tool.
      */}
      <svg className="absolute" style={{ width: 0, height: 0, position: "absolute" }}>
        <defs>
          <filter id="ts-key-white" colorInterpolationFilters="sRGB" x="0" y="0" width="1" height="1">
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      -1 -1 -1 3 0"
            />
          </filter>
        </defs>
      </svg>

      {/* Car — right side. Outer div: edge-fade masks. Inner div: white-key filter. */}
      <div
        className="pointer-events-none absolute inset-y-0 right-[-2%] w-full lg:w-[68%]"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 22%, black 94%, transparent 100%), linear-gradient(to top, transparent 0%, black 6%, black 100%)",
          WebkitMaskComposite: "source-in",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 22%, black 94%, transparent 100%), linear-gradient(to top, transparent 0%, black 6%, black 100%)",
          maskComposite: "intersect",
        }}
      >
        <div className="absolute inset-0" style={{ filter: "url(#ts-key-white)" }}>
          <Image
            src="/hero-car.jpg"
            alt="Mercedes-AMG C43"
            fill
            priority
            sizes="(min-width: 1024px) 68vw, 100vw"
            className="object-contain object-[80%_65%]"
          />
        </div>
      </div>

      {/* Bottom blend into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-xl animate-reveal lg:max-w-2xl">
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
