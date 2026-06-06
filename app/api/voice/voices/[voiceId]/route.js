import { NextResponse } from "next/server";
import { backendUrl, serverKeyHeader, forwardedForHeader, passThrough } from "../../_lib";

export const runtime = "nodejs";

/**
 * Per-voice proxy routes (key stays server-side):
 *   GET    /api/voice/voices/:id  -> streams the stored sample back (library preview)
 *   DELETE /api/voice/voices/:id  -> deletes the sample on the backend
 */

export async function GET(req, { params }) {
  const { voiceId } = await params;
  const res = await fetch(backendUrl(`/api/voices/${encodeURIComponent(voiceId)}/sample`), {
    method: "GET",
    headers: { ...serverKeyHeader(), ...forwardedForHeader(req) },
  });

  if (!res.ok) return passThrough(res);

  return new NextResponse(res.body, {
    status: 200,
    headers: { "content-type": res.headers.get("content-type") ?? "audio/wav" },
  });
}

export async function DELETE(req, { params }) {
  const { voiceId } = await params;
  const res = await fetch(backendUrl(`/api/voices/${encodeURIComponent(voiceId)}`), {
    method: "DELETE",
    headers: { ...serverKeyHeader(), ...forwardedForHeader(req) },
  });
  return passThrough(res);
}
