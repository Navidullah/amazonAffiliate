// app/api/tiktok/test-apis/route.js
import { NextResponse } from "next/server";

export async function GET() {
  const testUrl =
    "https://www.tiktok.com/@malikisb.._/video/7622881849655840008";
  const results = [];

  // Test API 1 with different endpoints
  const api1Tests = [
    { endpoint: "/media", param: "videoUrl" },
    { endpoint: "/download", param: "videoUrl" },
    { endpoint: "/get", param: "url" },
  ];

  for (const test of api1Tests) {
    try {
      const params = new URLSearchParams();
      params.append(test.param, testUrl);
      const apiUrl = `https://${process.env.TIKTOK_API_HOST_1}${test.endpoint}?${params.toString()}`;

      const response = await fetch(apiUrl, {
        headers: {
          "x-rapidapi-key": process.env.TIKTOK_API_KEY_1,
          "x-rapidapi-host": process.env.TIKTOK_API_HOST_1,
        },
      });

      let data = null;
      if (response.ok) {
        data = await response.json();
      }

      results.push({
        api: "API 1",
        endpoint: test.endpoint,
        status: response.status,
        ok: response.ok,
        hasVideoUrl: data
          ? !!(data.downloadUrl || data.video_url || data.video)
          : false,
        responseKeys: data ? Object.keys(data).slice(0, 10) : null,
      });
    } catch (error) {
      results.push({
        api: "API 1",
        endpoint: test.endpoint,
        error: error.message,
      });
    }
  }

  // Test API 2
  const api2Tests = [
    { endpoint: "/video-info", param: "url" },
    { endpoint: "/getVideo", param: "url" },
    { endpoint: "/download", param: "url" },
  ];

  for (const test of api2Tests) {
    try {
      const params = new URLSearchParams();
      params.append(test.param, testUrl);
      const apiUrl = `https://${process.env.TIKTOK_API_HOST_2}${test.endpoint}?${params.toString()}`;

      const response = await fetch(apiUrl, {
        headers: {
          "x-rapidapi-key": process.env.TIKTOK_API_KEY_2,
          "x-rapidapi-host": process.env.TIKTOK_API_HOST_2,
        },
      });

      let data = null;
      if (response.ok) {
        data = await response.json();
      }

      results.push({
        api: "API 2",
        endpoint: test.endpoint,
        status: response.status,
        ok: response.ok,
        hasVideoUrl: data ? !!(data.video_url || data.video) : false,
      });
    } catch (error) {
      results.push({
        api: "API 2",
        endpoint: test.endpoint,
        error: error.message,
      });
    }
  }

  // Test API 3
  const api3Tests = [
    { endpoint: "/get", param: "url" },
    { endpoint: "/getVideoInfo", param: "url" },
    { endpoint: "/info", param: "url" },
  ];

  for (const test of api3Tests) {
    try {
      const params = new URLSearchParams();
      params.append(test.param, testUrl);
      const apiUrl = `https://${process.env.TIKTOK_API_HOST_3}${test.endpoint}?${params.toString()}`;

      const response = await fetch(apiUrl, {
        headers: {
          "x-rapidapi-key": process.env.TIKTOK_API_KEY_3,
          "x-rapidapi-host": process.env.TIKTOK_API_HOST_3,
        },
      });

      let data = null;
      if (response.ok) {
        data = await response.json();
      }

      results.push({
        api: "API 3",
        endpoint: test.endpoint,
        status: response.status,
        ok: response.ok,
        hasVideoUrl: data ? !!(data.video_url || data.video) : false,
      });
    } catch (error) {
      results.push({
        api: "API 3",
        endpoint: test.endpoint,
        error: error.message,
      });
    }
  }

  return NextResponse.json({
    testUrl,
    results,
    timestamp: new Date().toISOString(),
    recommendation: "Look for status 200 and hasVideoUrl true",
  });
}
