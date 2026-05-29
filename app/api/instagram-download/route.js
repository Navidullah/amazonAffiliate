// Server-side proxy for the deployed Instagram downloader on Render.
// POST /api/instagram-download  { url }
// → { success, data: { videoUrl, thumbnail, title, fullTitle, username, duration, type } }

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
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ url, quality: "best" }),
        // Render free tier cold-start: ~30s; allow 45s total
        signal: AbortSignal.timeout(45_000),
      });
    } catch (err) {
      const isTimeout = err.name === "TimeoutError" || err.name === "AbortError";
      return Response.json(
        {
          error: isTimeout
            ? "The Instagram server is starting up. Please try again in a few seconds."
            : err.message || "Failed to reach Instagram API",
        },
        { status: 503 },
      );
    }

    const data = await response.json().catch(() => ({}));

    if (!response.ok || !data.success) {
      const detail = data.detail || data.error || "";
      return Response.json(
        {
          error:
            detail ||
            "Could not fetch this Instagram video. Make sure the post is public and the link is correct.",
        },
        { status: response.status || 500 },
      );
    }

    // Ensure the nested data object has videoUrl
    if (!data.data?.videoUrl) {
      return Response.json(
        { error: "No video URL returned by the Instagram API." },
        { status: 500 },
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
