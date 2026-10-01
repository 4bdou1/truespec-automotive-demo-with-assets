import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GlobalNotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">404</p>
      <h1 className="font-display text-3xl uppercase tracking-wide text-foreground">
        Page not found
      </h1>
      <p className="max-w-sm text-sm text-muted">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
      </p>
      <div className="mt-2 flex gap-3">
        <Button asChild>
          <Link href="/">Back home</Link>
        </Button>
        <Link
          href="/inventory"
          className="inline-flex h-11 items-center px-5 text-sm font-medium uppercase tracking-wide text-muted-strong hover:text-gold"
        >
          View inventory
        </Link>
      </div>
    </div>
  );
}
