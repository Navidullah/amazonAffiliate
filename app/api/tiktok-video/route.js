// Proxy for the deployed TikTok downloader on Render.
// GET  /api/tiktok-video?url=<encoded>&quality=<quality>  → streams mp4 blob
// POST /api/tiktok-video  { url, quality }               → streams mp4 blob
//
// KNOWN SERVER BUG (fix in Python main.py):
//   re.sub(r"[^\w\s-]", "", title)  keeps Unicode letters (Arabic, Chinese…)
//   which crash the latin-1 HTTP header encoder.
//   Fix: change to  re.sub(r"[^\w\s-]", "", title, flags=re.ASCII)

const TIKTOK_API = "https://tiktok-video-downloader-tool.onrender.com";

// Strip anything that could make the latin-1 header encoding crash on the
// Python side — this is a client-side best-effort mitigation; the real fix
// is the re.ASCII flag in main.py.
function sanitizeUrl(raw) {
  return raw.trim();
}

async function handleDownload(url, quality = "best") {
  if (!url || !url.trim()) {
    return Response.json({ error: "URL is required" }, { status: 400 });
  }

  const cleanUrl = sanitizeUrl(url);
  const apiUrl = `${TIKTOK_API}/download?url=${encodeURIComponent(cleanUrl)}&format=${encodeURIComponent(quality)}`;

  let response;
  try {
    response = await fetch(apiUrl, {
      headers: {
        Accept: "video/mp4,video/*,*/*",
        "User-Agent": "Mozilla/5.0 (compatible; Shopyor/1.0)",
      },
      // Render free tier cold-start can take up to 60s; allow 120s total
      signal: AbortSignal.timeout(120_000),
    });
  } catch (err) {
    const isTimeout = err.name === "TimeoutError" || err.name === "AbortError";
    return Response.json(
      {
        error: isTimeout
          ? "The TikTok server is starting up. Please wait a moment and try again."
          : err.message || "Failed to reach TikTok API",
      },
      { status: 503 },
    );
  }

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    const detail = errData.detail || errData.error || "";

    // Surface the latin-1 encoding bug as a friendly message
    const isLatin1Error =
      detail.toLowerCase().includes("latin-1") ||
      detail.toLowerCase().includes("codec") ||
      detail.toLowerCase().includes("ordinal not in range");

    return Response.json(
      {
        error: isLatin1Error
          ? "This video's title contains special characters that the server cannot process. Please try a different video, or ask the developer to apply the re.ASCII fix in main.py."
          : detail || `Server error ${response.status}`,
      },
      { status: response.status },
    );
  }

  const videoBuffer = await response.arrayBuffer();

  // Build a safe ASCII filename from Content-Disposition or fall back to timestamp
  let filename = `tiktok_video_${Date.now()}.mp4`;
  const cd = response.headers.get("content-disposition");
  if (cd) {
    const match = cd.match(/filename[*]?=(?:UTF-8''|")?([^";\n]+)"?/i);
    if (match?.[1]) {
      // Strip non-ASCII to avoid passing them back to the browser
      filename = match[1]
        .replace(/[^\x20-\x7E]/g, "")
        .replace(/['"]/g, "")
        .trim() || filename;
    }
  }

  return new Response(videoBuffer, {
    status: 200,
    headers: {
      "Content-Type": "video/mp4",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Content-Length": videoBuffer.byteLength.toString(),
      "Cache-Control": "no-store",
    },
  });
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  return handleDownload(
    searchParams.get("url"),
    searchParams.get("quality") || "best",
  );
}

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  return handleDownload(body.url, body.quality || "best");
}
