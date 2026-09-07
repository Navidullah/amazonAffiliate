"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";
import {
  CONSENT_EVENT,
  getStoredConsent,
  setStoredConsent,
} from "@/lib/cookieConsent";

/**
 * Bottom consent banner. Shows until the visitor picks Accept or Reject,
 * then stays hidden (choice persisted in localStorage). "Manage Cookie
 * Preferences" on /cookie-policy clears the stored choice, which re-shows
 * this banner on next load — satisfies the "re-askable" requirement
 * alongside "reject must be as easy to click as accept" (equal-weight
 * buttons, no dark patterns).
 *
 * Nothing on this site currently sets advertising cookies (no AdSense yet,
 * analytics is cookieless Vercel Analytics) — this banner exists so the
 * consent mechanism is already in place and compliant before ads are
 * added, not because anything needs blocking today.
 */
export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getStoredConsent() === null);

    const onChange = (e) => setVisible(e.detail === null);
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  if (!visible) return null;

  const choose = (value) => {
    setStoredConsent(value);
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200/70 bg-white/95 p-4 backdrop-blur-xl dark:border-white/10 dark:bg-gray-950/95 sm:p-5"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <p className="text-sm text-muted-foreground">
            We use essential cookies to run this site, and — once ads are
            enabled — third-party partners like Google may use cookies to
            serve and measure ads. You can accept or reject non-essential
            cookies; see our{" "}
            <Link href="/cookie-policy" className="text-primary hover:underline">
              Cookie Policy
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>{" "}
            for details.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3 self-end sm:self-auto">
          <button
            type="button"
            onClick={() => choose("rejected")}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted dark:border-white/15"
          >
            Reject All
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
