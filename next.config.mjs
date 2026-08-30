/** @type {import('next').NextConfig} */
const nextConfig = {
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

      // Voice Cloner needs mic access to record a sample in-browser —
      // override the site-wide Permissions-Policy default just for this tool.
      {
        source: "/tools/voice-clone/:path*",
        headers: [
          {
            key: "Permissions-Policy",
            value: "microphone=(self), camera=(), geolocation=()",
          },
        ],
      },

      // Teach whiteboard's tutor-student voice chat needs mic access too.
      {
        source: "/teach/:path*",
        headers: [
          {
            key: "Permissions-Policy",
            value: "microphone=(self), camera=(), geolocation=()",
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
