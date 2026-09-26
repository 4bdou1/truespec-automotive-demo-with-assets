import { seedAuditLog } from "@/lib/data/audit";
import { defaultSettings } from "@/lib/data/settings";
import { seedVehicles } from "@/lib/data/vehicles";
import type { AdminSettings, AdminVehicle, AuditEvent } from "@/lib/types/admin";

const STORAGE_KEY = "truespec-admin-state-v1";

export interface PersistedAdminState {
  listings: AdminVehicle[];
  settings: AdminSettings;
  audit: AuditEvent[];
}

function readPersisted(): PersistedAdminState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PersistedAdminState;
  } catch {
    return null;
  }
}

export function loadInitialAdminState(): PersistedAdminState {
  return (
    readPersisted() ?? {
      listings: seedVehicles,
      settings: defaultSettings,
      audit: seedAuditLog,
    }
  );
}

export function persistAdminState(state: PersistedAdminState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Private browsing / quota errors: demo state just won't survive reload.
  }
}

export function clearPersistedAdminState(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

const SESSION_KEY = "truespec-admin-session";
const SESSION_EVENT = "truespec-admin-session-changed";

export function readAdminSession(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(SESSION_KEY) === "true";
  } catch {
    return false;
  }
}

export function writeAdminSession(active: boolean): void {
  if (typeof window === "undefined") return;
  try {
    if (active) {
      window.localStorage.setItem(SESSION_KEY, "true");
    } else {
      window.localStorage.removeItem(SESSION_KEY);
    }
  } catch {
    // ignore
  }
  window.dispatchEvent(new Event(SESSION_EVENT));
}

/**
 * `useSyncExternalStore` subscription for the admin session. `getServerSnapshot`
 * always reports "signed out" so hydration matches the server; calling
 * `callback` once here (inside React's own subscribe effect, not a
 * `useEffect` we author) lets the UI catch up to the real browser-only
 * session right after mount without tripping the no-setState-in-effect rule.
 */
export function subscribeAdminSession(callback: () => void): () => void {
  window.addEventListener("storage", callback);
  window.addEventListener(SESSION_EVENT, callback);
  callback();
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(SESSION_EVENT, callback);
  };
}
