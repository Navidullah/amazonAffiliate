// Instagram video download proxy.
// Tries 2 independent services in cascade — first success wins.
// All requests are made server-side (no CORS restrictions).
//
// snapinsta.app and igdownloader.app were dropped: both domains are DNS-dead
// (SERVFAIL from every public resolver) as of 2026-08-22.

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

// ─── helpers ────────────────────────────────────────────────────────────────

/**
 * snapinsta/snapsave/igdownloader-style clone sites often wrap their HTML
 * response in a small "packer": `eval(function(h,u,n,t,e,r){...}(payload))`.
 * The inner function is a base-N decoder (N = the site's charset), and its
 * return value is the actual HTML/JS string. We replicate that decoder here
 * — this is not executing the site's code, just reversing its own documented
 * base-conversion algorithm on data it already sent us.
 */
function unpackEval(text) {
  const arrMatch = text.match(/var _0x[0-9a-f]+\s*=\s*(\[.*?\]);/s);
  const evalMatch = text.match(
    /eval\(function\(h,u,n,t,e,r\)\{.*?\}\((.*?)\)\)/s,
  );
  if (!arrMatch || !evalMatch) return null;

  try {
    const charTable = JSON.parse(arrMatch[1].replace(/'/g, '"'));
    const charset = charTable[2];
    if (!charset || charset.length < 60) return null;

    const baseConvert = (d, e, f) => {
      const h = charset.slice(0, e);
      const i = charset.slice(0, f);
      let j = d
        .split("")
        .reverse()
        .reduce((a, b, c) => {
          const idx = h.indexOf(b);
          return idx !== -1 ? a + idx * Math.pow(e, c) : a;
        }, 0);
      let k = "";
      while (j > 0) {
        k = i[j % f] + k;
        j = (j - (j % f)) / f;
      }
      return k || "0";
    };

    // Args are literal string/number/array tokens only (no function calls),
    // so JSON-style parsing of the tuple is safe.
    const [h, , n, t, e] = JSON.parse(`[${evalMatch[1]}]`);

    let r = "";
    for (let i = 0, len = h.length; i < len; ) {
      let s = "";
      while (h[i] !== n[e]) {
        s += h[i];
        i++;
      }
      i++;
      for (let j = 0; j < n.length; j++) s = s.split(n[j]).join(String(j));
      r += String.fromCharCode(baseConvert(s, e, 10) - t);
    }
    return decodeURIComponent(escape(r)).replace(/\\"/g, '"');
  } catch {
    return null;
  }
}

/** Pull the first video/download href out of scraped HTML */
function extractVideoUrl(html) {
  const decoded = unpackEval(html) || html;
  const patterns = [
    /href="(https?:\/\/[^"]*?\.mp4[^"]*)"/i,
    // rapidcdn/snapsave-style proxy download links: no ".mp4" or "video"
    // in the URL itself, but they carry a token and aren't the thumbnail.
    /href="(https?:\/\/[^"]*?\/v2\?token=[^"]+)"/i,
    /href="(https?:\/\/[^"]*?video[^"]*?)"/i,
    /"url"\s*:\s*"(https?:\\\/\\\/[^"]*?\.mp4[^"]*)"/i,
    /src="(https?:\/\/[^"]*?\.mp4[^"]*)"/i,
  ];
  for (const p of patterns) {
    const m = decoded.match(p);
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

// ─── Service 1: snapsave.app ─────────────────────────────────────────────────
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

// ─── Service 2: user's Render API (last resort — slow cold-start) ────────────
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
      { name: "snapsave", fn: trySnapsave },
      { name: "render", fn: tryRenderApi },
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
