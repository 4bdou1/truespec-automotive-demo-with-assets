"use client";

import { useState } from "react";
import { useAdminData } from "@/lib/admin/data-context";
import type { AdminSettings } from "@/lib/types/admin";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "@/components/ui/icons";

function inputClasses() {
  return "h-11 w-full rounded-md border border-border-strong bg-surface px-3 text-sm text-foreground placeholder:text-muted focus-visible:outline-2 focus-visible:outline-gold";
}

export function SettingsForm({ settings }: { settings: AdminSettings }) {
  const { updateSettings } = useAdminData();
  const [form, setForm] = useState(settings);
  const [submitting, setSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setSaved(false);
    await updateSettings(form);
    setSubmitting(false);
    setSaved(true);
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-xl flex-col gap-5">
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-medium uppercase tracking-wide text-muted">WhatsApp number</span>
        <input
          className={inputClasses()}
          value={form.whatsappNumber}
          onChange={(e) => {
            setForm({ ...form, whatsappNumber: e.target.value });
            setSaved(false);
          }}
          placeholder="234XXXXXXXXXX"
        />
        <span className="text-xs text-muted">
          Country code, no plus sign or spaces — used to build every wa.me link.
        </span>
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-medium uppercase tracking-wide text-muted">Tagline</span>
        <input
          className={inputClasses()}
          value={form.tagline}
          onChange={(e) => {
            setForm({ ...form, tagline: e.target.value });
            setSaved(false);
          }}
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-medium uppercase tracking-wide text-muted">
          Default full-tank cost (₦)
        </span>
        <input
          type="number"
          className={inputClasses()}
          value={form.defaultFullTankCost}
          onChange={(e) => {
            setForm({ ...form, defaultFullTankCost: Number(e.target.value) || 0 });
            setSaved(false);
          }}
        />
        <span className="text-xs text-muted">Applied to new listings; each listing can still override it.</span>
      </label>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving…" : "Save settings"}
        </Button>
        {saved && (
          <span className="flex items-center gap-1.5 text-sm text-success">
            <CheckIcon className="h-4 w-4" />
            Saved
          </span>
        )}
      </div>
    </form>
  );
}
