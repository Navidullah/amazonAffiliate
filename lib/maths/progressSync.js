// Client-side sync layer between localStorage progress and the optional
// per-user Mongo copy (app/api/maths/progress). Guests never touch this —
// it's only ever called from behind an authenticated session check.

import { getProgress, overwriteProgress } from "./progress";

export async function pushProgressToServer(progress) {
  try {
    await fetch("/api/maths/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ progress }),
    });
  } catch {
    // Best-effort — a failed sync just means the next completed quiz (or
    // the next login reconcile) will try again. Never blocks the UI.
  }
}

export async function pullProgressFromServer() {
  try {
    const res = await fetch("/api/maths/progress");
    if (!res.ok) return null;
    const data = await res.json();
    return data.progress || null;
  } catch {
    return null;
  }
}

/**
 * One-time reconciliation, called when a session becomes authenticated.
 * Whichever copy (local vs. server) has answered more questions is treated
 * as richer and wins outright — no field-by-field merge, since points/
 * streaks aren't independently re-derivable from a partial history.
 */
export async function reconcileOnLogin() {
  const local = getProgress();
  const server = await pullProgressFromServer();

  if (!server) {
    // First sign-in ever (or DB record lost) — upload whatever's local.
    await pushProgressToServer(local);
    return local;
  }

  const serverIsRicher = (server.questionsAnsweredTotal || 0) > (local.questionsAnsweredTotal || 0);

  if (serverIsRicher) {
    overwriteProgress(server);
    return server;
  }

  if ((local.questionsAnsweredTotal || 0) > (server.questionsAnsweredTotal || 0)) {
    await pushProgressToServer(local);
  }

  return local;
}
