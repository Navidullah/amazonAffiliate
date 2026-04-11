export async function POST(req) {
  try {
    const { url } = await req.json();

    if (!url) {
      return Response.json({ error: "URL is required" }, { status: 400 });
    }

    const apiUrl =
      "https://free-facebook-downloader.p.rapidapi.com/external-api/facebook-video-downloader?url=" +
      encodeURIComponent(url);

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "x-rapidapi-host": "free-facebook-downloader.p.rapidapi.com",
        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
      },
    });

    const data = await response.json();

    console.log("RAPIDAPI RESPONSE:", data);

    if (!response.ok) {
      return Response.json(
        { error: data?.message || "Failed to fetch video" },
        { status: response.status },
      );
    }

    return Response.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("SERVER ERROR:", error);

    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
