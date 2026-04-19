// app/api/tiktok/test-download/route.js
import { NextResponse } from "next/server";

export async function GET() {
  // Use a real TikTok video URL for testing
  const testUrl =
    "https://www.tiktok.com/@malikisb.._/video/7622881849655840008?is_from_webapp=1&sender_device=pc";

  const results = [];

  // Test API 1 with /media endpoint
  try {
    const apiUrl = `https://tiktok-video-downloader-api.p.rapidapi.com/media?videoUrl=${encodeURIComponent(testUrl)}`;

    const response = await fetch(apiUrl, {
      headers: {
        "x-rapidapi-key": process.env.TIKTOK_API_KEY_1,
        "x-rapidapi-host": process.env.TIKTOK_API_HOST_1,
      },
    });

    if (response.ok) {
      const data = await response.json();
      results.push({
        api: "API 1",
        status: response.status,
        success: true,
        hasDownloadUrl: !!data.downloadUrl,
        downloadUrl: data.downloadUrl
          ? data.downloadUrl.substring(0, 100) + "..."
          : null,
        dataKeys: Object.keys(data),
      });
    } else {
      results.push({
        api: "API 1",
        status: response.status,
        success: false,
        error: await response.text(),
      });
    }
  } catch (error) {
    results.push({
      api: "API 1",
      error: error.message,
    });
  }

  // Test API 2
  try {
    const apiUrl = `https://${process.env.TIKTOK_API_HOST_2}/video-info?url=${encodeURIComponent(testUrl)}`;

    const response = await fetch(apiUrl, {
      headers: {
        "x-rapidapi-key": process.env.TIKTOK_API_KEY_2,
        "x-rapidapi-host": process.env.TIKTOK_API_HOST_2,
      },
    });

    if (response.ok) {
      const data = await response.json();
      results.push({
        api: "API 2",
        status: response.status,
        success: true,
        hasVideoUrl: !!(data.video_url || data.video),
        dataKeys: Object.keys(data),
      });
    } else {
      results.push({
        api: "API 2",
        status: response.status,
        success: false,
      });
    }
  } catch (error) {
    results.push({
      api: "API 2",
      error: error.message,
    });
  }

  // Test API 3
  try {
    const apiUrl = `https://${process.env.TIKTOK_API_HOST_3}/get?url=${encodeURIComponent(testUrl)}`;

    const response = await fetch(apiUrl, {
      headers: {
        "x-rapidapi-key": process.env.TIKTOK_API_KEY_3,
        "x-rapidapi-host": process.env.TIKTOK_API_HOST_3,
      },
    });

    if (response.ok) {
      const data = await response.json();
      results.push({
        api: "API 3",
        status: response.status,
        success: true,
        hasVideoUrl: !!(data.video_url || data.video),
        dataKeys: Object.keys(data),
      });
    } else {
      results.push({
        api: "API 3",
        status: response.status,
        success: false,
      });
    }
  } catch (error) {
    results.push({
      api: "API 3",
      error: error.message,
    });
  }

  return NextResponse.json({
    testUrl,
    results,
    recommendation:
      "Look for which API returns hasDownloadUrl or hasVideoUrl = true",
    timestamp: new Date().toISOString(),
  });
}
