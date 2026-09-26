import type { AdminSettings } from "@/lib/types/admin";

/**
 * Demo default settings. Client-side admin edits are persisted to
 * localStorage for this browser only (see `lib/admin/store.ts`) — they do
 * not write back here, so the public site always reflects this baseline.
 */
export const defaultSettings: AdminSettings = {
  whatsappNumber: "2348000000000",
  whatsappMessageTemplate:
    "Hi TrueSpec, I'm interested in {vehicle}. Is it still {status}?",
  tagline: "Imported vehicles, verified from source.",
  defaultFullTankCost: 110_000,
};
