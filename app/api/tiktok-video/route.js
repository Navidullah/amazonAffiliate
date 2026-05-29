// Single clean proxy for the deployed TikTok downloader on Render.
// GET  /api/tiktok-video?url=<encoded>&quality=<quality>  → streams mp4 blob
// POST /api/tiktok-video  { url, quality }               → streams mp4 blob

const TIKTOK_API = "https://tiktok-video-downloader-tool.onrender.com";

async function handleDownload(url, quality = "best") {
  if (!url || !url.trim()) {
    return Response.json({ error: "URL is required" }, { status: 400 });
  }

  const apiUrl = `${TIKTOK_API}/download?url=${encodeURIComponent(url.trim())}&quality=${encodeURIComponent(quality)}`;

  let response;
  try {
    response = await fetch(apiUrl, {
      headers: {
        Accept: "video/mp4,video/*,*/*",
        "User-Agent": "Mozilla/5.0 (compatible; Shopyor/1.0)",
      },
      // Render free tier can take up to 60s to cold-start, allow 120s total
      signal: AbortSignal.timeout(120_000),
    });
  } catch (err) {
    const isTimeout = err.name === "TimeoutError" || err.name === "AbortError";
    return Response.json(
      {
        error: isTimeout
          ? "The TikTok API is starting up (cold start). Please try again in a few seconds."
          : err.message || "Failed to reach TikTok API",
      },
      { status: 503 },
    );
  }

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    return Response.json(
      { error: errData.error || errData.detail || `API error: ${response.status}` },
      { status: response.status },
    );
  }

  const videoBuffer = await response.arrayBuffer();

  // Try to get filename from Content-Disposition if the upstream sends it
  let filename = `tiktok_video_${Date.now()}.mp4`;
  const cd = response.headers.get("content-disposition");
  if (cd) {
    const match = cd.match(/filename[*]?=(?:UTF-8''|")?([^";\n]+)"?/i);
    if (match?.[1]) filename = match[1].replace(/['"]/g, "");
  }

  return new Response(videoBuffer, {
    status: 200,
    headers: {
      "Content-Type": response.headers.get("content-type") || "video/mp4",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Content-Length": videoBuffer.byteLength.toString(),
      "Cache-Control": "no-store",
    },
  });
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  const quality = searchParams.get("quality") || "best";
  return handleDownload(url, quality);
}

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  return handleDownload(body.url, body.quality || "best");
}
