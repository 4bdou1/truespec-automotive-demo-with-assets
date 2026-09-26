"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { clsx } from "clsx";
import { Logo } from "./logo";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { MenuIcon, CloseIcon } from "@/components/ui/icons";
import { buildGeneralWhatsAppMessage, buildWhatsAppLink } from "@/lib/whatsapp";

const NAV_LINKS = [
  { href: "/inventory?status=available", label: "Available" },
  { href: "/inventory?status=on-order", label: "On Order" },
  { href: "/inventory?status=landed", label: "Landed This Year" },
  { href: "/inventory", label: "All Inventory" },
];

export function SiteHeader({
  whatsappNumber,
  tagline,
}: {
  whatsappNumber: string;
  tagline: string;
}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Close the mobile menu on navigation. Adjusted during render (React's
  // documented pattern for resetting state when a value changes) rather
  // than in an effect, so it doesn't trigger an extra cascading render.
  const [menuPathname, setMenuPathname] = useState(pathname);
  if (pathname !== menuPathname) {
    setMenuPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (menuOpen && !dialog.open) dialog.showModal();
    if (!menuOpen && dialog.open) dialog.close();
  }, [menuOpen]);

  const whatsappHref = buildWhatsAppLink(whatsappNumber, buildGeneralWhatsAppMessage(tagline));

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center" aria-label="TrueSpec Automotive home">
          <Logo priority />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium uppercase tracking-wide text-muted-strong transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <WhatsAppButton href={whatsappHref} size="sm" className="hidden sm:inline-flex">
            Chat on WhatsApp
          </WhatsAppButton>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border-strong text-foreground lg:hidden"
            aria-label="Open menu"
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setMenuOpen(false)}
        className={clsx(
          "m-0 h-full max-h-none w-full max-w-none border-none bg-transparent p-0",
          "left-0 top-0 backdrop:bg-transparent",
        )}
        aria-label="Site menu"
      >
        <div className="flex h-full w-full flex-col bg-background">
          <div className="flex h-16 items-center justify-between border-b border-border px-4">
            <Logo />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border-strong text-foreground"
              aria-label="Close menu"
            >
              <CloseIcon />
            </button>
          </div>
          <nav className="flex flex-1 flex-col gap-1 px-4 py-6" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-md px-3 py-3.5 text-base font-medium uppercase tracking-wide text-foreground hover:bg-surface-raised hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="border-t border-border px-4 py-5">
            <WhatsAppButton href={whatsappHref} size="lg" className="w-full">
              Chat on WhatsApp
            </WhatsAppButton>
          </div>
        </div>
      </dialog>
    </header>
  );
}
