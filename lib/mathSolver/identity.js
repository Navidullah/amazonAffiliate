// Shared identity resolution for the math solver's rate limiter / day pass —
// used by the solve route, the checkout route, and the status route so all
// three agree on the same key for the same visitor.

export function getClientIp(req) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

// Signed-in users are keyed by account (so a day pass follows them across
// networks/devices); anonymous users fall back to IP, matching the
// pre-existing free-tier behaviour.
export function getUsageKey(req, session) {
  if (session?.user?.id) return `user:${session.user.id}`;
  return `ip:${getClientIp(req)}`;
}
