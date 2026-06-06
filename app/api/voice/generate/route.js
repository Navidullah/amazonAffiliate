import { NextResponse } from "next/server";
import { backendUrl, serverKeyHeader, forwardedForHeader } from "../_lib";

export const runtime = "nodejs";

/**
 * Proxies a speech-generation request and streams the resulting WAV back
 * to the browser. The API key stays server-side.
 */
// Optional generation controls forwarded to the backend (which clamps them).
const PARAMS = ["exaggeration", "cfg_weight", "temperature", "speed", "pitch", "format"];

export async function POST(req) {
  const incoming = await req.formData();

  const out = new FormData();
  out.append("voice_id", String(incoming.get("voice_id") ?? ""));
  out.append("text", String(incoming.get("text") ?? ""));
  for (const p of PARAMS) {
    const v = incoming.get(p);
    if (v !== null && v !== undefined && v !== "") out.append(p, String(v));
  }

  const res = await fetch(backendUrl("/api/generate"), {
    method: "POST",
    headers: {
      ...serverKeyHeader(),
      ...forwardedForHeader(req),
    },
    body: out,
  });

  // On error (401/404/429/...), pass the JSON message + Retry-After through.
  if (!res.ok) {
    const text = await res.text();
    const headers = new Headers({
      "content-type": res.headers.get("content-type") ?? "application/json",
    });
    const retry = res.headers.get("retry-after");
    if (retry) headers.set("retry-after", retry);
    return new NextResponse(text, { status: res.status, headers });
  }

  // Stream the audio body straight through, preserving the backend's
  // content-type so MP3 (audio/mpeg) and WAV (audio/wav) both work.
  return new NextResponse(res.body, {
    status: 200,
    headers: { "content-type": res.headers.get("content-type") ?? "audio/wav" },
  });
}
