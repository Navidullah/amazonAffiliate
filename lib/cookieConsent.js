// lib/cookieConsent.js
// Minimal consent-state helper shared between the banner and any future
// script that needs to gate itself on consent (e.g. the AdSense loader,
// once it's added). No cookies of its own — just localStorage, so reading
// it never sets a cookie before the user has chosen anything.
const STORAGE_KEY = "shopyor-cookie-consent";
export const CONSENT_EVENT = "shopyor-cookie-consent-change";

// "accepted" | "rejected" | null (no choice made yet)
export function getStoredConsent() {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setStoredConsent(value) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
  } catch {
    // localStorage unavailable (private mode, blocked) — banner will just
    // re-show next visit, which is an acceptable fallback.
  }
}

export function clearStoredConsent() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: null }));
  } catch {
    // ignore
  }
}
