import Link from "next/link";
import { Logo } from "./logo";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { buildGeneralWhatsAppMessage, buildWhatsAppLink } from "@/lib/whatsapp";

export function SiteFooter({
  whatsappNumber,
  tagline,
}: {
  whatsappNumber: string;
  tagline: string;
}) {
  const whatsappHref = buildWhatsAppLink(whatsappNumber, buildGeneralWhatsAppMessage(tagline));

  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="max-w-xs text-sm text-muted">{tagline}</p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Showroom</h3>
          <Link href="/inventory?status=available" className="text-sm text-muted-strong hover:text-foreground">
            Available
          </Link>
          <Link href="/inventory?status=on-order" className="text-sm text-muted-strong hover:text-foreground">
            On Order
          </Link>
          <Link href="/inventory?status=landed" className="text-sm text-muted-strong hover:text-foreground">
            Landed This Year
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Talk to us</h3>
          <p className="text-sm text-muted">
            The fastest way to confirm price, availability, or arrival timing.
          </p>
          <WhatsAppButton href={whatsappHref} size="sm" className="w-fit">
            Chat on WhatsApp
          </WhatsAppButton>
        </div>
      </div>

      <div className="border-t border-border px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} TrueSpec Automotive. Demo build — not a live storefront.</p>
          <Link href="/admin" className="text-muted hover:text-foreground">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
