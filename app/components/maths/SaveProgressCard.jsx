"use client";

import { signIn } from "next-auth/react";
import { CloudUpload } from "lucide-react";

/** Soft, one-click nudge to sign in — never a wall. Only shown to guests
 * who already have local progress worth saving. */
export default function SaveProgressCard() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-violet-200/70 bg-violet-50/60 px-5 py-4 dark:border-violet-500/20 dark:bg-violet-500/[0.06]">
      <p className="flex items-center gap-2 text-sm font-medium text-violet-800 dark:text-violet-200">
        <CloudUpload className="h-4 w-4 shrink-0" aria-hidden="true" />
        Sign in to save your progress across devices.
      </p>
      <button
        type="button"
        onClick={() => signIn()}
        className="shrink-0 rounded-full bg-violet-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-violet-700"
      >
        Sign In
      </button>
    </div>
  );
}
