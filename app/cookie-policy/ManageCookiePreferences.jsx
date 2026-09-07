"use client";

import { useState } from "react";
import { RefreshCcw } from "lucide-react";
import { clearStoredConsent } from "@/lib/cookieConsent";

export default function ManageCookiePreferences() {
  const [cleared, setCleared] = useState(false);

  const handleClick = () => {
    clearStoredConsent();
    setCleared(true);
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted dark:border-white/15"
      >
        <RefreshCcw className="h-4 w-4" />
        Manage Cookie Preferences
      </button>
      {cleared && (
        <p className="mt-2 text-sm text-muted-foreground">
          Your cookie choice has been reset — the consent banner will show
          again the next time you load a page.
        </p>
      )}
    </div>
  );
}
