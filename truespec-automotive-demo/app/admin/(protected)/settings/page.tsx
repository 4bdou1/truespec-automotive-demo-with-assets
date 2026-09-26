"use client";

import { useAdminData } from "@/lib/admin/data-context";
import { SettingsForm } from "@/components/admin/settings-form";

export default function AdminSettingsPage() {
  const { settings } = useAdminData();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl uppercase tracking-wide text-foreground">Settings</h1>
        <p className="mt-1 text-sm text-muted">
          Controls the public WhatsApp CTA and the default cost used for new listings.
        </p>
      </div>

      <SettingsForm settings={settings} />
    </div>
  );
}
