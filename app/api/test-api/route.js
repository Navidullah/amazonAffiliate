// app/api/test-api/route.js (Add this to test your API configuration)
import { NextResponse } from "next/server";

export async function GET() {
  const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
  const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST;

  // Test with a sample Facebook video URL
  const testUrl = "https://www.facebook.com/share/r/3ZsxNYCeLtrw8dQ3/";

  try {
    const apiUrl = `https://${RAPIDAPI_HOST}/api/v1/videos/download?url=${encodeURIComponent(testUrl)}`;

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-rapidapi-host": RAPIDAPI_HOST,
        "x-rapidapi-key": RAPIDAPI_KEY,
      },
    };

    const response = await fetch(apiUrl, options);
    const data = await response.json();

    return NextResponse.json({
      success: response.ok,
      status: response.status,
      hasApiKey: !!RAPIDAPI_KEY,
      apiHost: RAPIDAPI_HOST,
      apiResponse: data,
      environment: process.env.NODE_ENV,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        hasApiKey: !!RAPIDAPI_KEY,
        apiHost: RAPIDAPI_HOST,
      },
      { status: 500 },
    );
  }
}
