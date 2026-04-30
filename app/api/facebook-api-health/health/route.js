// app/api/health/route.js
import { NextResponse } from "next/server";

export async function GET() {
  const YOUR_API_URL =
    process.env.YOUR_API_URL ||
    "https://facebook-video-downloader-api.onrender.com";

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(`${YOUR_API_URL}/health`, {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      return NextResponse.json({ status: "healthy", api: "online" });
    } else {
      return NextResponse.json(
        { status: "unhealthy", api: "offline" },
        { status: 503 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      { status: "unhealthy", api: "offline", error: error.message },
      { status: 503 },
    );
  }
}
