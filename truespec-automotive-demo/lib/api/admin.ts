import { computeLandedCost, computeProjectedProfit } from "@/lib/format/finance";
import { loadInitialAdminState, persistAdminState } from "@/lib/admin/store";
import type {
  AdminSettings,
  AdminSummary,
  AdminVehicle,
  AdminVehicleDraft,
  AuditEvent,
} from "@/lib/types/admin";

/**
 * Mock admin repository. Shaped after the integration contract in
 * docs/execution-plan.md so a production build can swap each mutator body
 * for a real VPS call without touching `components/admin`.
 *
 * State lives in this module (client-only) and is mirrored to localStorage
 * so a demo session survives a page reload; it never touches the public
 * site's data (see lib/api/public.ts), which is documented as a demo-only
 * limitation in the README.
 *
 * Reads are exposed as a synchronous external store (`subscribeAdminStore` +
 * `get*Snapshot`) rather than async functions: this is genuinely mutable
 * data living outside React, so `useSyncExternalStore` is the correct way
 * for `lib/admin/data-context.tsx` to read and subscribe to it without a
 * mount effect. Mutations stay async to mirror the network call a
 * production build would make.
 */

const initial = loadInitialAdminState();
let listings: AdminVehicle[] = initial.listings;
let settings: AdminSettings = initial.settings;
let audit: AuditEvent[] = initial.audit;

const listeners = new Set<() => void>();

function notify() {
  for (const listener of listeners) listener();
}

export function subscribeAdminStore(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getListingsSnapshot(): AdminVehicle[] {
  return listings;
}

export function getSettingsSnapshot(): AdminSettings {
  return settings;
}

export function getAuditLogSnapshot(): AuditEvent[] {
  return audit;
}

export function computeSummary(source: AdminVehicle[]): AdminSummary {
  let totalLandedCost = 0;
  let projectedProfit = 0;
  let incompleteFinancialsCount = 0;
  let availableCount = 0;
  let onOrderCount = 0;
  let landedCount = 0;

  for (const vehicle of source) {
    const { landedCost, projectedProfit: profit } = withFinancials(vehicle);
    if (landedCost === null) {
      incompleteFinancialsCount += 1;
    } else {
      totalLandedCost += landedCost;
      projectedProfit += profit ?? 0;
    }
    if (vehicle.status === "available") availableCount += 1;
    if (vehicle.status === "on-order") onOrderCount += 1;
    if (vehicle.status === "landed") landedCount += 1;
  }

  return {
    inventoryCount: source.length,
    availableCount,
    onOrderCount,
    landedCount,
    totalLandedCost,
    incompleteFinancialsCount,
    projectedProfit,
  };
}

function persist() {
  persistAdminState({ listings, settings, audit });
  notify();
}

function simulateLatency(ms = 250): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-+|-+$)/g, "");
}

function uniqueSlug(base: string, ignoreId?: string): string {
  const safeBase = base || "listing";
  let slug = safeBase;
  let n = 2;
  while (listings.some((v) => v.slug === slug && v.id !== ignoreId)) {
    slug = `${safeBase}-${n}`;
    n += 1;
  }
  return slug;
}

function recordAudit(actor: string, action: AuditEvent["action"], summary: string) {
  audit = [
    { id: `a-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, timestamp: new Date().toISOString(), actor, action, summary },
    ...audit,
  ].slice(0, 50);
}

export function withFinancials(vehicle: AdminVehicle) {
  const landedCost = computeLandedCost(vehicle);
  const projectedProfit = computeProjectedProfit(vehicle.doorstepPrice, landedCost);
  return { landedCost, projectedProfit };
}

export async function createListing(
  draft: AdminVehicleDraft,
  actor = "Umar",
): Promise<AdminVehicle> {
  await simulateLatency();
  const now = new Date().toISOString();
  const created: AdminVehicle = {
    ...draft,
    scope: "admin",
    id: `v-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    slug: uniqueSlug(slugify(`${draft.brand}-${draft.model}-${draft.trim ?? ""}`)),
    createdAt: now,
    updatedAt: now,
  };
  listings = [created, ...listings];
  recordAudit(actor, "create", `Created listing — ${created.brand} ${created.model}`);
  persist();
  return created;
}

export async function updateListing(
  id: string,
  patch: AdminVehicleDraft,
  actor = "Umar",
): Promise<AdminVehicle> {
  await simulateLatency();
  const existing = listings.find((v) => v.id === id);
  if (!existing) throw new Error(`Listing ${id} not found`);
  const updated: AdminVehicle = {
    ...existing,
    ...patch,
    slug:
      patch.brand !== existing.brand || patch.model !== existing.model
        ? uniqueSlug(slugify(`${patch.brand}-${patch.model}-${patch.trim ?? ""}`), id)
        : existing.slug,
    updatedAt: new Date().toISOString(),
  };
  listings = listings.map((v) => (v.id === id ? updated : v));
  recordAudit(actor, "update", `Updated listing — ${updated.brand} ${updated.model}`);
  persist();
  return updated;
}

export async function deleteListing(id: string, actor = "Umar"): Promise<void> {
  await simulateLatency(200);
  const existing = listings.find((v) => v.id === id);
  listings = listings.filter((v) => v.id !== id);
  if (existing) {
    recordAudit(actor, "delete", `Deleted listing — ${existing.brand} ${existing.model}`);
  }
  persist();
}

/**
 * Demo-only local upload: reads files as data URLs so previews survive a
 * localStorage round-trip (object URLs would not). A production build
 * would POST to the VPS and store the returned CDN URLs instead.
 */
export async function uploadListingPhotos(files: File[]): Promise<string[]> {
  await simulateLatency(300);
  const readAsDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  return Promise.all(files.map(readAsDataUrl));
}

export async function updateSettings(
  patch: Partial<AdminSettings>,
  actor = "Umar",
): Promise<AdminSettings> {
  await simulateLatency(200);
  settings = { ...settings, ...patch };
  recordAudit(actor, "settings-update", "Updated settings");
  persist();
  return settings;
}

export async function recordLogin(actor = "Umar"): Promise<void> {
  await simulateLatency(50);
  recordAudit(actor, "login", "Signed in to the admin demo");
  persist();
}

export async function recordLogout(actor = "Umar"): Promise<void> {
  await simulateLatency(50);
  recordAudit(actor, "logout", "Signed out of the admin demo");
  persist();
}
