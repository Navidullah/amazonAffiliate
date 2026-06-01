import { NextResponse } from "next/server";

/**
 * Shared helpers for the voice-clone proxy routes.
 * Reads server-only env vars (NOT prefixed with NEXT_PUBLIC_, so they never
 * reach the browser bundle):
 *   VOICE_CLONE_URL      e.g. https://voice.shopyor.com  (your tunnel)
 *   VOICE_CLONE_API_KEY  the secret key the Python backend expects
 */

const BASE = (process.env.VOICE_CLONE_URL ?? "http://localhost:8000").replace(/\/$/, "");
const KEY = process.env.VOICE_CLONE_API_KEY ?? "";

export function backendUrl(path) {
  return `${BASE}${path}`;
}

export function serverKeyHeader() {
  return KEY ? { "X-API-Key": KEY } : {};
}

/**
 * Forward the visitor's real IP so the backend's per-IP rate limiting applies
 * per visitor (not per website server). Requires TRUST_PROXY=True on the backend.
 */
export function forwardedForHeader(req) {
  const xff = req.headers.get("x-forwarded-for");
  const ip = xff?.split(",")[0]?.trim();
  return ip ? { "X-Forwarded-For": ip } : {};
}

/** Forward a backend JSON response (status + body + Retry-After) unchanged. */
export async function passThrough(res) {
  const text = await res.text();
  const headers = new Headers({
    "content-type": res.headers.get("content-type") ?? "application/json",
  });
  const retry = res.headers.get("retry-after");
  if (retry) headers.set("retry-after", retry);
  return new NextResponse(text, { status: res.status, headers });
}
