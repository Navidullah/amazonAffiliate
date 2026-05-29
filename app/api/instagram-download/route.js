// Server-side proxy for Instagram video downloader.
// Calling the Render API from the browser causes CORS failures and cold-start
// timeouts. Running the request on the server avoids both.
export async function POST(req) {
  try {
    const { url } = await req.json();

    if (!url || !url.trim()) {
      return Response.json({ error: "URL is required" }, { status: 400 });
    }

    const INSTAGRAM_API_URL =
      process.env.INSTAGRAM_API_URL ||
      process.env.NEXT_PUBLIC_INSTAGRAM_API_URL ||
      "https://instagram-video-downloader.onrender.com";

    const response = await fetch(`${INSTAGRAM_API_URL}/api/download`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: url.trim(), quality: "best" }),
      signal: AbortSignal.timeout(35000),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok || !data.success) {
      return Response.json(
        {
          error:
            data.detail ||
            data.error ||
            "Failed to fetch Instagram video. The link may be private or invalid.",
        },
        { status: response.status || 500 },
      );
    }

    return Response.json(data);
  } catch (err) {
    const isTimeout = err.name === "TimeoutError" || err.name === "AbortError";
    return Response.json(
      {
        error: isTimeout
          ? "Request timed out. The Instagram API may be starting up — please try again in a few seconds."
          : err.message || "Internal server error",
      },
      { status: 500 },
    );
  }
}
