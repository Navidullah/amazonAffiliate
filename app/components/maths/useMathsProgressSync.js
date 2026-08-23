"use client";

import { useEffect, useRef, useCallback } from "react";
import { useSession } from "next-auth/react";
import { reconcileOnLogin, pushProgressToServer } from "@/lib/maths/progressSync";

/**
 * Runs the one-time login reconciliation whenever the session becomes
 * authenticated, and exposes syncNow() for pages to call after a quiz
 * completes. No-ops entirely for guests — nothing here ever runs unless
 * NextAuth reports an authenticated session.
 */
export function useMathsProgressSync(onReconciled) {
  const { status } = useSession();
  const hasReconciled = useRef(false);

  useEffect(() => {
    if (status !== "authenticated" || hasReconciled.current) return;
    hasReconciled.current = true;
    reconcileOnLogin().then((progress) => {
      if (onReconciled) onReconciled(progress);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const syncNow = useCallback(
    (progress) => {
      if (status === "authenticated") pushProgressToServer(progress);
    },
    [status],
  );

  return { isAuthenticated: status === "authenticated", syncNow };
}
