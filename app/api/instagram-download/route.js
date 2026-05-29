// Server-side proxy for the deployed Instagram downloader on Render.
// Running the request server-side avoids CORS issues and cold-start timeouts
// that would occur if the browser called the Render API directly.
//
// POST /api/instagram-download  { url }
// → { success, data: { videoUrl, thumbnail, title, username, duration, type } }

const INSTAGRAM_API = "https://instagram-downloader-ga0k.onrender.com";

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const url = body.url?.trim();

    if (!url) {
      return Response.json({ error: "URL is required" }, { status: 400 });
    }

    let response;
    try {
      response = await fetch(`${INSTAGRAM_API}/api/download`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, quality: "best" }),
        // Render free tier cold-start can take ~30s
        signal: AbortSignal.timeout(40_000),
      });
    } catch (err) {
      const isTimeout = err.name === "TimeoutError" || err.name === "AbortError";
      return Response.json(
        {
          error: isTimeout
            ? "The Instagram API is starting up. Please try again in a few seconds."
            : err.message || "Failed to reach Instagram API",
        },
        { status: 503 },
      );
    }

    const data = await response.json().catch(() => ({}));

    if (!response.ok || !data.success) {
      return Response.json(
        {
          error:
            data.detail ||
            data.error ||
            "Failed to fetch Instagram video. Make sure the link is public.",
        },
        { status: response.status || 500 },
      );
    }

    return Response.json(data);
  } catch (err) {
    return Response.json(
      { error: err.message || "Internal server error" },
      { status: 500 },
    );
  }
}
