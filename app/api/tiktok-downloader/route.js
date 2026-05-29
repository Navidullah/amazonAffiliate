// app/api/download/route.js

const TIKTOK_URL_PATTERNS = [
  /(?:vm|vt)\.tiktok\.com\/[A-Za-z0-9]+/i,
  /(?:www\.|m\.)?tiktok\.com\//i,
  /^tiktok\.com\//i,
];

function isValidTiktokUrl(url) {
  const trimmed = url.trim();
  return TIKTOK_URL_PATTERNS.some((pattern) => pattern.test(trimmed));
}

function parseApiError(errorData, status) {
  const detail = errorData?.detail;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) {
    return detail.map((d) => d.msg || JSON.stringify(d)).join("; ");
  }
  return errorData?.error || `HTTP ${status}: Download failed`;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  const quality = searchParams.get("quality") || "best";

  if (!url) {
    return Response.json({ error: "TikTok URL is required" }, { status: 400 });
  }

  if (!isValidTiktokUrl(url)) {
    return Response.json(
      {
        error:
          "Invalid TikTok URL. Supported: tiktok.com, vm.tiktok.com, vt.tiktok.com, m.tiktok.com",
      },
      { status: 400 },
    );
  }

  const API_URL = process.env.TIKTOK_API_URL;
  if (!API_URL) {
    return Response.json(
      { error: "TIKTOK_API_URL is not configured" },
      { status: 500 },
    );
  }

  try {
    const response = await fetch(
      `${API_URL}/download?url=${encodeURIComponent(url)}&format=${encodeURIComponent(quality)}`,
      {
        method: "GET",
        headers: { Accept: "video/mp4,*/*" },
        // Large videos may need a longer timeout on Pro plans
        signal: AbortSignal.timeout(120000),
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const message = parseApiError(errorData, response.status);
      return Response.json({ error: message }, { status: response.status });
    }

    const videoBuffer = await response.arrayBuffer();

    let filename = "tiktok-video.mp4";
    const contentDisposition = response.headers.get("content-disposition");
    if (contentDisposition) {
      const match = contentDisposition.match(/filename="?([^";\n]+)"?/i);
      if (match?.[1]) filename = match[1].replace(/['"]/g, "");
    }

    return new Response(videoBuffer, {
      status: 200,
      headers: {
        "Content-Type": "video/mp4",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": videoBuffer.byteLength.toString(),
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Download error:", error);
    return Response.json(
      {
        error:
          error.message ||
          "Failed to download video. Please check the URL and try again.",
        details:
          process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 },
    );
  }
}
