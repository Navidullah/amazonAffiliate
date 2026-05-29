// Instagram video download proxy.
// Tries 3 independent services in cascade — first success wins.
// All requests are made server-side (no CORS restrictions).

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

// ─── helpers ────────────────────────────────────────────────────────────────

/** Pull the first mp4/video href out of scraped HTML */
function extractVideoUrl(html) {
  const patterns = [
    /href="(https?:\/\/[^"]*?\.mp4[^"]*)"/i,
    /href="(https?:\/\/[^"]*?video[^"]*?)"/i,
    /"url"\s*:\s*"(https?:\\\/\\\/[^"]*?\.mp4[^"]*)"/i,
    /src="(https?:\/\/[^"]*?\.mp4[^"]*)"/i,
  ];
  for (const p of patterns) {
    const m = html.match(p);
    if (m?.[1]) return m[1].replace(/\\u002F/g, "/").replace(/&amp;/g, "&").replace(/\\/g, "");
  }
  return null;
}

function buildResult(videoUrl, extra = {}) {
  return {
    success: true,
    data: {
      videoUrl,
      thumbnail: extra.thumbnail || "",
      title: extra.title || "Instagram Video",
      fullTitle: extra.fullTitle || "",
      username: extra.username || "",
      duration: extra.duration || 0,
      type: extra.type || "reel",
    },
  };
}

// ─── Service 1: snapinsta.app ────────────────────────────────────────────────
async function trySnapinsta(url) {
  const res = await fetch("https://snapinsta.app/api/ajaxSearch", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Requested-With": "XMLHttpRequest",
      "User-Agent": UA,
      Referer: "https://snapinsta.app/",
      Origin: "https://snapinsta.app",
    },
    body: new URLSearchParams({ q: url, t: "media", lang: "en" }).toString(),
    signal: AbortSignal.timeout(18_000),
  });

  if (!res.ok) throw new Error(`snapinsta HTTP ${res.status}`);

  const json = await res.json().catch(() => null);
  const html = json?.data || (typeof json === "string" ? json : "");
  if (!html) throw new Error("snapinsta returned empty data");

  const videoUrl = extractVideoUrl(html);
  if (!videoUrl) throw new Error("snapinsta: no video URL in response");

  return buildResult(videoUrl);
}

// ─── Service 2: snapsave.app ─────────────────────────────────────────────────
async function trySnapsave(url) {
  const res = await fetch("https://snapsave.app/action.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": UA,
      Referer: "https://snapsave.app/",
      Origin: "https://snapsave.app",
    },
    body: new URLSearchParams({ url, lang: "en" }).toString(),
    signal: AbortSignal.timeout(18_000),
  });

  if (!res.ok) throw new Error(`snapsave HTTP ${res.status}`);

  const html = await res.text();
  if (!html) throw new Error("snapsave returned empty response");

  const videoUrl = extractVideoUrl(html);
  if (!videoUrl) throw new Error("snapsave: no video URL in response");

  return buildResult(videoUrl);
}

// ─── Service 3: igdownloader.app ─────────────────────────────────────────────
async function tryIgdownloader(url) {
  const res = await fetch("https://igdownloader.app/api/ajaxSearch", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Requested-With": "XMLHttpRequest",
      "User-Agent": UA,
      Referer: "https://igdownloader.app/",
      Origin: "https://igdownloader.app",
    },
    body: new URLSearchParams({ q: url, t: "media", lang: "en" }).toString(),
    signal: AbortSignal.timeout(18_000),
  });

  if (!res.ok) throw new Error(`igdownloader HTTP ${res.status}`);

  const json = await res.json().catch(() => null);
  const html = json?.data || (typeof json === "string" ? json : "");
  if (!html) throw new Error("igdownloader returned empty data");

  const videoUrl = extractVideoUrl(html);
  if (!videoUrl) throw new Error("igdownloader: no video URL in response");

  return buildResult(videoUrl);
}

// ─── Service 4: user's Render API (last resort — slow cold-start) ────────────
async function tryRenderApi(url) {
  const INSTAGRAM_API = "https://instagram-downloader-ga0k.onrender.com";

  const res = await fetch(`${INSTAGRAM_API}/api/download`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ url, quality: "best" }),
    signal: AbortSignal.timeout(45_000),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok || !data.success || !data.data?.videoUrl) {
    throw new Error(data.detail || data.error || "Render API failed");
  }

  return { success: true, data: data.data };
}

// ─── Main handler ─────────────────────────────────────────────────────────────
export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const url = body.url?.trim();

    if (!url) {
      return Response.json({ error: "URL is required" }, { status: 400 });
    }

    const services = [
      { name: "snapinsta", fn: trySnapinsta },
      { name: "snapsave",  fn: trySnapsave  },
      { name: "igdownloader", fn: tryIgdownloader },
      { name: "render",    fn: tryRenderApi  },
    ];

    const errors = [];

    for (const { name, fn } of services) {
      try {
        const result = await fn(url);
        if (result?.success && result.data?.videoUrl) {
          return Response.json(result);
        }
      } catch (err) {
        errors.push(`${name}: ${err.message}`);
      }
    }

    // All services failed
    return Response.json(
      {
        error:
          "Could not fetch this Instagram video. Make sure the post is public. " +
          `(${errors.join(" | ")})`,
      },
      { status: 500 },
    );
  } catch (err) {
    return Response.json(
      { error: err.message || "Internal server error" },
      { status: 500 },
    );
  }
}
