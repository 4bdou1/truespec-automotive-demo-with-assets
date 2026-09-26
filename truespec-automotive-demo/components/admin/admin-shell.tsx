"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { clsx } from "clsx";
import { useAdminAuth } from "@/lib/admin/auth-context";
import { Logo } from "@/components/public/logo";
import { DemoModeBanner } from "./demo-mode-banner";
import { MenuIcon, CloseIcon, ArrowRightIcon } from "@/components/ui/icons";

const NAV_ITEMS = [
  { href: "/admin/overview", label: "Overview" },
  { href: "/admin/inventory", label: "Inventory" },
  { href: "/admin/settings", label: "Settings" },
];

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <>
      {NAV_ITEMS.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={clsx(
              "rounded-md px-3.5 py-3 text-sm font-medium uppercase tracking-wide transition-colors",
              active
                ? "bg-gold/12 text-gold-soft"
                : "text-muted-strong hover:bg-surface-raised hover:text-foreground",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAdminAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Close the mobile menu on navigation, adjusted during render rather
  // than in an effect (see components/public/site-header.tsx).
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

  function handleLogout() {
    logout();
    router.push("/admin");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DemoModeBanner />

      <div className="flex flex-1">
        <aside className="hidden w-60 shrink-0 flex-col gap-1 border-r border-border bg-surface/60 p-4 lg:flex">
          <Link href="/" className="mb-6 flex items-center px-2">
            <Logo />
          </Link>
          <NavLinks pathname={pathname} />
          <div className="mt-auto flex flex-col gap-1 pt-6">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 rounded-md px-3.5 py-3 text-sm text-muted-strong hover:bg-surface-raised hover:text-foreground"
            >
              View public site
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-md px-3.5 py-3 text-left text-sm text-muted-strong hover:bg-surface-raised hover:text-danger"
            >
              Sign out
            </button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-16 items-center justify-between border-b border-border px-4 sm:px-6 lg:hidden">
            <Link href="/" className="flex items-center">
              <Logo />
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border-strong text-foreground"
              aria-label="Open admin menu"
            >
              <MenuIcon />
            </button>
          </header>

          <main className="flex-1 px-4 py-8 sm:px-6 lg:px-10 lg:py-10">{children}</main>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setMenuOpen(false)}
        className="m-0 h-full max-h-none w-full max-w-none border-none bg-transparent p-0 left-0 top-0 backdrop:bg-transparent lg:hidden"
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
          <nav className="flex flex-1 flex-col gap-1 px-4 py-6">
            <NavLinks pathname={pathname} onNavigate={() => setMenuOpen(false)} />
          </nav>
          <div className="flex flex-col gap-1 border-t border-border px-4 py-5">
            <Link
              href="/"
              target="_blank"
              className="rounded-md px-3.5 py-3 text-sm text-muted-strong hover:bg-surface-raised hover:text-foreground"
            >
              View public site
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-md px-3.5 py-3 text-left text-sm text-muted-strong hover:bg-surface-raised hover:text-danger"
            >
              Sign out
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
