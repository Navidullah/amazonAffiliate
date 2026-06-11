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
      // (301 passes ranking signals to /tools/pdf-compressor).
      {
        source: "/tools/pdf-compress",
        destination: "/tools/pdf-compressor",
        permanent: true,
      },
      // Renamed route: keep old indexed URL alive and pass ranking signals
      // to the new, more descriptive slug.
      {
        source: "/tools/youtube-tags",
        destination: "/tools/youtube-tags-extractor",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
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
