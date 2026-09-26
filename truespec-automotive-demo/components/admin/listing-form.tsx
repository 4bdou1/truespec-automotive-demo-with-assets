"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminData } from "@/lib/admin/data-context";
import type { AdminVehicle, AdminVehicleDraft } from "@/lib/types/admin";
import type { VehicleStatus } from "@/lib/types/public";
import { computeLandedCost, computeProjectedProfit } from "@/lib/format/finance";
import { formatNaira, formatNairaSigned } from "@/lib/format/currency";
import { PhotoUploader } from "./photo-uploader";
import { Button } from "@/components/ui/button";
import { LockIcon } from "@/components/ui/icons";

interface FormState {
  brand: string;
  model: string;
  trim: string;
  year: string;
  exteriorColor: string;
  interiorColor: string;
  mileage: string;
  status: VehicleStatus;
  doorstepPrice: string;
  publicNote: string;
  detailsPending: boolean;
  featuresText: string;
  photos: string[];
  purchasePrice: string;
  usInlandTruckingCost: string;
  shippingCost: string;
  clearingCost: string;
  nigeriaInlandTruckingCost: string;
  fullTankCost: string;
  internalNotes: string;
  sourcingContact: string;
}

function toFormState(vehicle: AdminVehicle | undefined, defaultFullTankCost: number): FormState {
  return {
    brand: vehicle?.brand ?? "",
    model: vehicle?.model ?? "",
    trim: vehicle?.trim ?? "",
    year: vehicle?.year?.toString() ?? "",
    exteriorColor: vehicle?.exteriorColor ?? "",
    interiorColor: vehicle?.interiorColor ?? "",
    mileage: vehicle?.mileage?.toString() ?? "",
    status: vehicle?.status ?? "available",
    doorstepPrice: vehicle?.doorstepPrice?.toString() ?? "",
    publicNote: vehicle?.publicNote ?? "",
    detailsPending: vehicle?.detailsPending ?? false,
    featuresText: vehicle?.features.join("\n") ?? "",
    photos: vehicle?.photos ?? [],
    purchasePrice: vehicle?.purchasePrice?.toString() ?? "",
    usInlandTruckingCost: vehicle?.usInlandTruckingCost?.toString() ?? "",
    shippingCost: vehicle?.shippingCost?.toString() ?? "",
    clearingCost: vehicle?.clearingCost?.toString() ?? "",
    nigeriaInlandTruckingCost: vehicle?.nigeriaInlandTruckingCost?.toString() ?? "",
    fullTankCost: (vehicle?.fullTankCost ?? defaultFullTankCost).toString(),
    internalNotes: vehicle?.internalNotes ?? "",
    sourcingContact: vehicle?.sourcingContact ?? "",
  };
}

function parseOptionalNumber(value: string): number | null {
  const trimmed = value.trim();
  if (trimmed === "") return null;
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : null;
}

function toDraft(form: FormState, isDemo: boolean): AdminVehicleDraft {
  return {
    brand: form.brand.trim(),
    model: form.model.trim(),
    trim: form.trim.trim() || null,
    year: parseOptionalNumber(form.year),
    exteriorColor: form.exteriorColor.trim() || null,
    interiorColor: form.interiorColor.trim() || null,
    mileage: parseOptionalNumber(form.mileage),
    features: form.featuresText
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean),
    photos: form.photos,
    status: form.status,
    doorstepPrice: parseOptionalNumber(form.doorstepPrice),
    publicNote: form.publicNote.trim() || null,
    isDemo,
    detailsPending: form.detailsPending,
    purchasePrice: parseOptionalNumber(form.purchasePrice),
    usInlandTruckingCost: parseOptionalNumber(form.usInlandTruckingCost),
    shippingCost: parseOptionalNumber(form.shippingCost),
    clearingCost: parseOptionalNumber(form.clearingCost),
    nigeriaInlandTruckingCost: parseOptionalNumber(form.nigeriaInlandTruckingCost),
    fullTankCost: parseOptionalNumber(form.fullTankCost) ?? 0,
    internalNotes: form.internalNotes.trim() || null,
    sourcingContact: form.sourcingContact.trim() || null,
  };
}

function inputClasses() {
  return "h-11 w-full rounded-md border border-border-strong bg-surface px-3 text-sm text-foreground placeholder:text-muted focus-visible:outline-2 focus-visible:outline-gold";
}

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium uppercase tracking-wide text-muted">{label}</span>
      {children}
      {hint && <span className="text-xs text-muted">{hint}</span>}
    </label>
  );
}

export function ListingForm({
  vehicle,
  defaultFullTankCost,
}: {
  vehicle?: AdminVehicle;
  defaultFullTankCost: number;
}) {
  const router = useRouter();
  const { createListing, updateListing } = useAdminData();
  const isEdit = Boolean(vehicle);
  const [form, setForm] = useState<FormState>(() => toFormState(vehicle, defaultFullTankCost));
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const { landedCost, projectedProfit } = useMemo(() => {
    const cost = computeLandedCost({
      purchasePrice: parseOptionalNumber(form.purchasePrice),
      usInlandTruckingCost: parseOptionalNumber(form.usInlandTruckingCost),
      shippingCost: parseOptionalNumber(form.shippingCost),
      clearingCost: parseOptionalNumber(form.clearingCost),
      nigeriaInlandTruckingCost: parseOptionalNumber(form.nigeriaInlandTruckingCost),
      fullTankCost: parseOptionalNumber(form.fullTankCost) ?? 0,
    });
    const profit = computeProjectedProfit(parseOptionalNumber(form.doorstepPrice), cost);
    return { landedCost: cost, projectedProfit: profit };
  }, [form]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.brand.trim() || !form.model.trim()) {
      setFormError("Brand and model are required.");
      return;
    }
    setFormError(null);
    setSubmitting(true);
    try {
      const draft = toDraft(form, vehicle?.isDemo ?? true);
      if (isEdit && vehicle) {
        await updateListing(vehicle.id, draft);
      } else {
        await createListing(draft);
      }
      router.push("/admin/inventory");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <section className="flex flex-col gap-5 rounded-lg border border-border bg-surface p-5 sm:p-6">
        <h2 className="font-display text-lg uppercase tracking-wide text-foreground">Public listing</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Brand">
            <input
              className={inputClasses()}
              value={form.brand}
              onChange={(e) => update("brand", e.target.value)}
              required
            />
          </Field>
          <Field label="Model">
            <input
              className={inputClasses()}
              value={form.model}
              onChange={(e) => update("model", e.target.value)}
              required
            />
          </Field>
          <Field label="Trim">
            <input className={inputClasses()} value={form.trim} onChange={(e) => update("trim", e.target.value)} />
          </Field>
          <Field label="Year">
            <input
              type="number"
              className={inputClasses()}
              value={form.year}
              onChange={(e) => update("year", e.target.value)}
            />
          </Field>
          <Field label="Exterior color">
            <input
              className={inputClasses()}
              value={form.exteriorColor}
              onChange={(e) => update("exteriorColor", e.target.value)}
            />
          </Field>
          <Field label="Interior color">
            <input
              className={inputClasses()}
              value={form.interiorColor}
              onChange={(e) => update("interiorColor", e.target.value)}
            />
          </Field>
          <Field label="Mileage (mi)">
            <input
              type="number"
              className={inputClasses()}
              value={form.mileage}
              onChange={(e) => update("mileage", e.target.value)}
            />
          </Field>
          <Field label="Status">
            <select
              className={inputClasses()}
              value={form.status}
              onChange={(e) => update("status", e.target.value as VehicleStatus)}
            >
              <option value="available">Available</option>
              <option value="on-order">On Order</option>
              <option value="landed">Landed</option>
            </select>
          </Field>
          <Field label="Doorstep price (₦)">
            <input
              type="number"
              className={inputClasses()}
              value={form.doorstepPrice}
              onChange={(e) => update("doorstepPrice", e.target.value)}
              placeholder="Leave blank if unconfirmed"
            />
          </Field>
        </div>

        <Field label="Public note" hint="Shown on the vehicle page, e.g. arrival timing or confirmation status.">
          <textarea
            className="min-h-20 w-full rounded-md border border-border-strong bg-surface px-3 py-2 text-sm text-foreground placeholder:text-muted focus-visible:outline-2 focus-visible:outline-gold"
            value={form.publicNote}
            onChange={(e) => update("publicNote", e.target.value)}
          />
        </Field>

        <Field label="Features" hint="One feature per line.">
          <textarea
            className="min-h-24 w-full rounded-md border border-border-strong bg-surface px-3 py-2 text-sm text-foreground placeholder:text-muted focus-visible:outline-2 focus-visible:outline-gold"
            value={form.featuresText}
            onChange={(e) => update("featuresText", e.target.value)}
          />
        </Field>

        <label className="flex items-center gap-2.5 text-sm text-muted-strong">
          <input
            type="checkbox"
            checked={form.detailsPending}
            onChange={(e) => update("detailsPending", e.target.checked)}
            className="h-4 w-4 rounded border-border-strong accent-[var(--color-gold)]"
          />
          Mark details as pending confirmation
        </label>

        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">Photos</p>
          <PhotoUploader photos={form.photos} onChange={(photos) => update("photos", photos)} />
        </div>
      </section>

      <section className="flex flex-col gap-5 rounded-lg border border-danger/25 bg-danger-soft/40 p-5 sm:p-6">
        <div className="flex items-center gap-2">
          <LockIcon className="h-4 w-4 text-danger" />
          <h2 className="font-display text-lg uppercase tracking-wide text-foreground">
            Private financials
          </h2>
        </div>
        <p className="-mt-2 text-xs text-muted">Never sent to the public site. Visible to admin only.</p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Purchase price (₦)">
            <input
              type="number"
              className={inputClasses()}
              value={form.purchasePrice}
              onChange={(e) => update("purchasePrice", e.target.value)}
            />
          </Field>
          <Field label="US inland trucking (₦)">
            <input
              type="number"
              className={inputClasses()}
              value={form.usInlandTruckingCost}
              onChange={(e) => update("usInlandTruckingCost", e.target.value)}
            />
          </Field>
          <Field label="Shipping (₦)">
            <input
              type="number"
              className={inputClasses()}
              value={form.shippingCost}
              onChange={(e) => update("shippingCost", e.target.value)}
            />
          </Field>
          <Field label="Clearing (₦)">
            <input
              type="number"
              className={inputClasses()}
              value={form.clearingCost}
              onChange={(e) => update("clearingCost", e.target.value)}
            />
          </Field>
          <Field label="Nigeria inland trucking (₦)">
            <input
              type="number"
              className={inputClasses()}
              value={form.nigeriaInlandTruckingCost}
              onChange={(e) => update("nigeriaInlandTruckingCost", e.target.value)}
            />
          </Field>
          <Field label="Full-tank cost (₦)">
            <input
              type="number"
              className={inputClasses()}
              value={form.fullTankCost}
              onChange={(e) => update("fullTankCost", e.target.value)}
            />
          </Field>
        </div>

        <Field label="Sourcing contact">
          <input
            className={inputClasses()}
            value={form.sourcingContact}
            onChange={(e) => update("sourcingContact", e.target.value)}
          />
        </Field>

        <Field label="Internal notes">
          <textarea
            className="min-h-20 w-full rounded-md border border-border-strong bg-surface px-3 py-2 text-sm text-foreground placeholder:text-muted focus-visible:outline-2 focus-visible:outline-gold"
            value={form.internalNotes}
            onChange={(e) => update("internalNotes", e.target.value)}
          />
        </Field>

        <div className="grid grid-cols-1 gap-4 border-t border-danger/20 pt-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted">Landed cost</p>
            <p className="mt-1 font-display text-2xl text-foreground">
              {landedCost === null ? "Incomplete" : formatNaira(landedCost)}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted">Projected profit</p>
            <p
              className={`mt-1 font-display text-2xl ${
                projectedProfit === null ? "text-muted" : projectedProfit < 0 ? "text-danger" : "text-success"
              }`}
            >
              {projectedProfit === null ? "Incomplete" : formatNairaSigned(projectedProfit)}
            </p>
          </div>
        </div>
      </section>

      {formError && (
        <p role="alert" className="text-sm text-danger">
          {formError}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button type="submit" size="lg" disabled={submitting}>
          {submitting ? "Saving…" : isEdit ? "Save changes" : "Create listing"}
        </Button>
        <Button type="button" variant="ghost" size="lg" onClick={() => router.push("/admin/inventory")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
