// app/api/youtube-proxy/route.js
import { NextResponse } from "next/server";

// Your deployed API URL
const API_URL = "https://youtube-downloader-api-1ppa.onrender.com";

export async function POST(request) {
  try {
    const body = await request.json();

    // Get the endpoint from the URL path instead of query param
    const url = new URL(request.url);
    const pathParts = url.pathname.split("/");
    const endpoint =
      pathParts[pathParts.length - 1] === "youtube-proxy"
        ? "analyze"
        : "download";

    // Also check query param as fallback
    const queryEndpoint = url.searchParams.get("endpoint");
    const finalEndpoint = queryEndpoint || endpoint;

    console.log(`Proxying to: ${API_URL}/${finalEndpoint}`);
    console.log("Request body:", body);

    const response = await fetch(`${API_URL}/${finalEndpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: error.message, detail: "Proxy request failed" },
      { status: 500 },
    );
  }
}

// Handle OPTIONS requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
