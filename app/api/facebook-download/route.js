export async function POST(req) {
  try {
    const { url } = await req.json();

    if (!url) {
      return Response.json({ error: "URL is required" }, { status: 400 });
    }

    const apiUrl =
      "https://free-facebook-downloader.p.rapidapi.com/external-api/facebook-video-downloader?url=" +
      encodeURIComponent(url);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);

    let response;

    try {
      response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "x-rapidapi-host": "free-facebook-downloader.p.rapidapi.com",
          "x-rapidapi-key": process.env.RAPIDAPI_KEY,
        },
        signal: controller.signal,
      });
    } catch (err) {
      return Response.json({ error: "API connection failed" }, { status: 503 });
    }

    clearTimeout(timeout);

    const data = await response.json();

    if (!response.ok) {
      return Response.json(
        { error: data?.message || "Failed to fetch video" },
        { status: response.status },
      );
    }

    return Response.json({ success: true, data });
  } catch (error) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
