export async function POST(req) {
  try {
    const { url } = await req.json();

    if (!url) {
      return Response.json({ error: "URL is required" }, { status: 400 });
    }

    // ================= API 1 =================
    try {
      const api1 = await fetch(
        "https://facebook-video-downloader9.p.rapidapi.com/api/v1/videos/download?url=" +
          encodeURIComponent(url),
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "facebook-video-downloader9.p.rapidapi.com",
            "x-rapidapi-key": process.env.RAPIDAPI_KEY,
          },
        },
      );

      const data1 = await api1.json();

      if (api1.ok && data1?.links) {
        return Response.json({
          success: true,
          source: "API_1",
          data: data1,
        });
      }
    } catch (e) {
      console.log("API 1 failed");
    }

    // ================= API 2 (Fallback) =================
    try {
      const api2 = await fetch(
        "https://free-facebook-downloader.p.rapidapi.com/external-api/facebook-video-downloader?url=" +
          encodeURIComponent(url),
        {
          method: "POST",
          headers: {
            "x-rapidapi-host": "free-facebook-downloader.p.rapidapi.com",
            "x-rapidapi-key": process.env.RAPIDAPI_KEY,
          },
        },
      );

      const data2 = await api2.json();

      if (api2.ok && data2) {
        return Response.json({
          success: true,
          source: "API_2",
          data: data2,
        });
      }
    } catch (e) {
      console.log("API 2 failed");
    }

    return Response.json(
      { error: "All APIs failed. Try another video." },
      { status: 500 },
    );
  } catch (error) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
