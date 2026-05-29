// Server-side proxy that downloads a video from a CDN URL and streams it back.
// Used for Instagram (and any platform) where the CDN URL blocks direct browser fetches.
// The browser would hit a CORS error fetching the CDN URL directly; going via the
// Next.js server has no such restriction.

export async function POST(req) {
  try {
    const { url, filename } = await req.json().catch(() => ({}));

    if (!url || !url.trim()) {
      return Response.json({ error: "URL is required" }, { status: 400 });
    }

    let response;
    try {
      response = await fetch(url.trim(), {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
          Referer: "https://www.instagram.com/",
          Accept: "video/mp4,video/*,*/*",
        },
        signal: AbortSignal.timeout(60_000),
      });
    } catch (err) {
      const isTimeout = err.name === "TimeoutError" || err.name === "AbortError";
      return Response.json(
        {
          error: isTimeout
            ? "Download timed out. Please try again."
            : err.message || "Failed to fetch video",
        },
        { status: 503 },
      );
    }

    if (!response.ok) {
      return Response.json(
        { error: `CDN returned ${response.status}` },
        { status: response.status },
      );
    }

    const videoBuffer = await response.arrayBuffer();
    const safeFilename = (filename || "video.mp4").replace(/[^\w.\-]/g, "_");

    return new Response(videoBuffer, {
      status: 200,
      headers: {
        "Content-Type": response.headers.get("content-type") || "video/mp4",
        "Content-Disposition": `attachment; filename="${safeFilename}"`,
        "Content-Length": videoBuffer.byteLength.toString(),
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    return Response.json(
      { error: err.message || "Internal server error" },
      { status: 500 },
    );
  }
}
