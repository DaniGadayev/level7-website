/**
 * Client-side cookie-consent state for the LEVEL7 website.
 *
 * Consent is stored in a single first-party, strictly-necessary cookie
 * (`l7_consent`). Non-essential scripts (analytics, marketing) MUST read this
 * before loading — nothing tracks the visitor until they opt in.
 *
 * The stored version is compared against COOKIE_POLICY_VERSION; when the policy
 * changes we bump that constant and returning visitors are re-prompted.
 */
import { COOKIE_POLICY_VERSION } from "@/lib/legal/config";

export const CONSENT_COOKIE = "l7_consent";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

/** Custom event fired on the window whenever consent is saved/changed. */
export const CONSENT_CHANGE_EVENT = "l7-consent-change";
/** Custom event the footer "Cookie settings" link dispatches to reopen the UI. */
export const OPEN_PREFERENCES_EVENT = "l7-open-cookie-preferences";

export type ConsentCategories = {
  /** Always true — required for the site to function. */
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

export type StoredConsent = ConsentCategories & {
  /** Cookie-policy version this choice was made against. */
  v: string;
  /** ISO timestamp of the choice. */
  ts: string;
};

export const DENY_ALL: ConsentCategories = {
  necessary: true,
  analytics: false,
  marketing: false,
};

export const GRANT_ALL: ConsentCategories = {
  necessary: true,
  analytics: true,
  marketing: true,
};

/** Read the saved consent, or null if none / stale (policy version changed). */
export function readConsent(): StoredConsent | null {
  if (typeof document === "undefined") return null;
  const raw = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${CONSENT_COOKIE}=`));
  if (!raw) return null;
  try {
    const parsed = JSON.parse(
      decodeURIComponent(raw.slice(CONSENT_COOKIE.length + 1))
    ) as StoredConsent;
    if (parsed.v !== COOKIE_POLICY_VERSION) return null; // re-prompt on new policy
    return { ...parsed, necessary: true };
  } catch {
    return null;
  }
}

/** Persist a consent choice and notify listeners (e.g. ConsentScripts). */
export function writeConsent(cats: ConsentCategories): StoredConsent {
  const stored: StoredConsent = {
    ...cats,
    necessary: true,
    v: COOKIE_POLICY_VERSION,
    ts: new Date().toISOString(),
  };
  if (typeof document !== "undefined") {
    const value = encodeURIComponent(JSON.stringify(stored));
    document.cookie = `${CONSENT_COOKIE}=${value}; path=/; max-age=${ONE_YEAR_SECONDS}; SameSite=Lax`;
    window.dispatchEvent(
      new CustomEvent<StoredConsent>(CONSENT_CHANGE_EVENT, { detail: stored })
    );
  }
  return stored;
}

/** True when the visitor has not yet made a (current) choice. */
export function consentDecisionNeeded(): boolean {
  return readConsent() === null;
}
