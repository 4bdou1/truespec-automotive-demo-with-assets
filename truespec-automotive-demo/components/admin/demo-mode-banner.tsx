import { LockIcon } from "@/components/ui/icons";

export function DemoModeBanner() {
  return (
    <div className="flex items-start gap-2.5 border-b border-gold/25 bg-gold/10 px-4 py-2.5 text-xs text-gold-soft sm:px-6">
      <LockIcon className="mt-0.5 h-3.5 w-3.5 shrink-0" />
      <p>
        Product demonstration only. This login and every write here run in your browser —
        there is no server, database, or real authentication behind it.
      </p>
    </div>
  );
}
