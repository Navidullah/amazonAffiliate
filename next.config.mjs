/** @type {import('next').NextConfig} */
const nextConfig = {
  // pdfjs-dist (pulled in by @react-pdf-viewer/core for the book reader)
  // conditionally requires the Node `canvas` package for a server-side
  // rendering path we never use in the browser bundle — alias it away so
  // webpack doesn't try to resolve the native module.
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/**", // Allow any image path from Firebase Storage
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "**" },
    ],
  },
  async redirects() {
    return [
      // Consolidate the duplicate PDF compress page into the canonical one
      // (301 passes ranking signals to /tools/compress-your-pdf-file).
      {
        source: "/tools/pdf-compress",
        destination: "/tools/compress-your-pdf-file",
        permanent: true,
      },
      // Renamed route: keep old indexed URL alive and pass ranking signals
      // to the new, more descriptive slug.
      {
        source: "/tools/youtube-tags",
        destination: "/tools/youtube-tags-extractor",
        permanent: true,
      },
      // Several internal links and possibly external/indexed URLs use the
      // short slug, but the page lives at the long one.
      {
        source: "/tools/pdf-to-word",
        destination: "/tools/convert-your-pdf-file-to-word",
        permanent: true,
      },
      // Consolidate the duplicate background remover into the canonical one
      // (/tools/bg-remover and /tools/background-remover-image were the same
      // tool splitting ranking signals for "remove background from image").
      {
        source: "/tools/bg-remover",
        destination: "/tools/background-remover-image",
        permanent: true,
      },
      // Whiteboard Animation Maker was retired. The URL was indexed, so send
      // it to the tools hub (301) to avoid a 404 and preserve link equity.
      {
        source: "/tools/whiteboard-animation",
        destination: "/tools",
        permanent: true,
      },
      // Retired 2026-08-10: image resizer, video-to-gif converter, and
      // YouTube video downloader were removed. URLs were indexed, so send
      // them to the tools hub (301) to avoid a 404 and preserve any link
      // equity.
      {
        source: "/tools/resizer",
        destination: "/tools",
        permanent: true,
      },
      {
        source: "/tools/image-resizer",
        destination: "/tools",
        permanent: true,
      },
      {
        source: "/tools/video-to-gif",
        destination: "/tools",
        permanent: true,
      },
      {
        source: "/tools/youtube-video-downloader",
        destination: "/tools",
        permanent: true,
      },
      // resume-builder was briefly rebuilt as a paid digital product
      // (2026-08-12), then retired for good (2026-08-14) in favor of the
      // worksheet store. URL was indexed, so keep sending it to the tools
      // hub to avoid a 404 and preserve link equity.
      {
        source: "/tools/resume-builder",
        destination: "/tools",
        permanent: true,
      },
      {
        source: "/tools/resume-builder/:path*",
        destination: "/tools",
        permanent: true,
      },
      // Google still has old /blogs/* URLs indexed from the previous site;
      // they currently 404. Route them to the current blog.
      {
        source: "/blogs",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blogs/:slug*",
        destination: "/blog/:slug*",
        permanent: true,
      },
      // Teaching whiteboard was retired 2026-08-31. Send any lingering
      // links to the homepage to avoid a 404.
      {
        source: "/teach",
        destination: "/",
        permanent: true,
      },
      {
        source: "/teach/:path*",
        destination: "/",
        permanent: true,
      },
      // Facebook/Instagram/TikTok video downloaders + the generic
      // video-downloader hub were retired 2026-09-07 (AdSense policy risk:
      // Google treats these as circumvention tools regardless of
      // disclaimers). URLs were indexed, so send them to the tools hub
      // (301) to avoid a 404 and preserve any link equity.
      {
        source: "/tools/facebook-video-downloader",
        destination: "/tools",
        permanent: true,
      },
      {
        source: "/tools/instagram-video-downloader",
        destination: "/tools",
        permanent: true,
      },
      {
        source: "/tools/free-tiktok-video-downloader",
        destination: "/tools",
        permanent: true,
      },
      {
        source: "/tools/video-downloader",
        destination: "/tools",
        permanent: true,
      },
      // /privacy-policy was never a real route (the live page is /privacy)
      // but was flagged as a risk if ever linked externally or submitted
      // to a reviewer by mistake — redirect defensively.
      {
        source: "/privacy-policy",
        destination: "/privacy",
        permanent: true,
      },
      // Blog posts entirely about the retired downloaders (unpublished
      // 2026-09-07). Redirected rather than left to 404 naturally: the
      // blog's notFound() currently returns HTTP 200 instead of 404 (a
      // separate, pre-existing bug), so an unpublished post would 200 with
      // thin "Article not found" content instead of actually dropping out.
      {
        source: "/blog/how-to-download-facebook-videos",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blog/how-to-download-videos-from-facebook-instagram-tiktok",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blog/best-facebook-video-downloader-online-free-in-hd-shopyor",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blog/easy-guide-download-tiktok-facebook-videos-using-shopyor",
        destination: "/blog",
        permanent: true,
      },
      // CricLive post unpublished 2026-09-11 (off-topic third-party app
      // promotion, no internal links to any Shopyor tool/product — flagged
      // during an AdSense content audit). Same 200-instead-of-404 bug as
      // above applies, so redirect rather than leave it to render thin.
      {
        source: "/blog/criclive-free-cricket-scoring-app-android",
        destination: "/blog",
        permanent: true,
      },
      // AI Voice Cloner retired 2026-09-10 (impersonation/synthetic-media
      // AdSense policy risk). URL was indexed, so send it to the tools hub
      // (301) to avoid a 404 and preserve any link equity.
      {
        source: "/tools/voice-clone",
        destination: "/tools",
        permanent: true,
      },
      // Blog posts entirely about the retired voice cloner (unpublished
      // 2026-09-10). Redirected rather than left to 404 naturally, same
      // reason as the downloader posts above.
      {
        source: "/blog/voice-cloning-tool-online-free",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blog/how-to-clone-your-own-voice-free",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blog/ai-voice-generator-text-to-speech",
        destination: "/blog",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      // Baseline security headers, site-wide. CSP is shipped Report-Only
      // first (Next.js inline JSON-LD/bootstrap scripts and Tailwind/inline
      // styles need 'unsafe-inline', and ffmpeg.wasm needs 'unsafe-eval', so
      // enforcing it outright would break the app without nonce wiring).
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy-Report-Only",
            value: [
              "default-src 'self';",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval';",
              "style-src 'self' 'unsafe-inline';",
              "img-src 'self' data: blob: https:;",
              "font-src 'self' data: https://fonts.gstatic.com;",
              "media-src 'self' blob: https:;",
              "connect-src 'self' https:;",
              "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com;",
              "base-uri 'self';",
              "form-action 'self';",
              "frame-ancestors 'self';",
            ].join(" "),
          },
        ],
      },

      // ✅ YouTube allowed on editor & blog pages (COEP OFF there)
      {
        source: "/(write|blogs/:path*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self';",
              "frame-src https://www.youtube.com https://www.youtube-nocookie.com 'self';",
              "child-src https://www.youtube.com https://www.youtube-nocookie.com 'self';",
              "img-src 'self' data: blob: https://i.ytimg.com https://img.youtube.com;",
              "media-src 'self' https://www.youtube.com https://www.youtube-nocookie.com;",
              "connect-src 'self';",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval';",
              "style-src 'self' 'unsafe-inline';",
              "base-uri 'self';",
              "form-action 'self';",
              "frame-ancestors 'self';",
            ].join(" "),
          },
          { key: "Cross-Origin-Embedder-Policy", value: "unsafe-none" }, // allow embeds
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        ],
      },

      // ✅ Your background remover stays isolated here
      {
        source: "/tools/background-remover-image/:path*",
        headers: [
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
        ],
      },

      // (optional) any other tools under /tools/* also isolated
      {
        source: "/tools/:path*",
        headers: [
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
        ],
      },

      // Under COEP: require-corp, every subresource needs a CORP header or it
      // is blocked (ERR_BLOCKED_BY_RESPONSE). ffmpeg.wasm's internal worker is
      // served from /_next/static/chunks, and its core/wasm from /ffmpeg — mark
      // both cross-origin so the isolated tool pages can load them.
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "Cross-Origin-Resource-Policy", value: "cross-origin" },
          // A dedicated worker spawned from a require-corp (cross-origin
          // isolated) document must itself be served with COEP, or Chrome
          // blocks it (ERR_BLOCKED_BY_RESPONSE). ffmpeg.wasm's worker lives here.
          { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
        ],
      },
      {
        source: "/ffmpeg/:path*",
        headers: [{ key: "Cross-Origin-Resource-Policy", value: "cross-origin" }],
      },

      // default: no COEP (prevents breaking other embeds)
      {
        source: "/:path*",
        headers: [{ key: "Cross-Origin-Opener-Policy", value: "same-origin" }],
      },
    ];
  },
};

export default nextConfig;
