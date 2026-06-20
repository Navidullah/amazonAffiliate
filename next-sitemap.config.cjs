const siteUrl = "https://www.shopyor.com";

// Real last-edited dates (from `git log -1 --format=%cI -- <file>` on each
// page's source file), not a build timestamp — a lastmod that just means
// "the sitemap was rebuilt" carries no genuine freshness signal and Google
// discounts that pattern when detected at scale. Update an entry's date
// here when you meaningfully edit that page's content.
// `priority`/`changefreq` are intentionally omitted sitewide: Google has
// confirmed both fields are ignored for ranking/crawling.
const LAST_MODIFIED = {
  "/": "2026-06-18T11:58:31+05:00",
  "/tools": "2026-06-12T11:45:53+05:00",
  "/portfolio": "2026-05-09T12:41:39+05:00",
  "/about": "2026-06-18T12:54:46+05:00",
  "/contact": "2026-06-18T11:58:31+05:00",
  "/privacy": "2026-06-18T12:54:46+05:00",
  "/terms": "2026-06-18T12:54:46+05:00",
  "/cookie-policy": "2026-06-18T12:54:46+05:00",
  "/copyright": "2026-06-18T12:54:46+05:00",
  "/disclaimer": "2026-06-02T14:52:31+05:00",
  "/dmca": "2026-06-18T12:54:46+05:00",
  "/write-for-us": "2026-06-18T12:54:46+05:00",
  "/tools/affiliate-link-generator": "2026-06-18T12:54:46+05:00",
  "/tools/background-remover-image": "2026-06-18T12:54:46+05:00",
  "/tools/bmi": "2026-06-18T12:54:46+05:00",
  "/tools/exif-remover": "2026-06-18T12:54:46+05:00",
  "/tools/facebook-video-downloader": "2026-06-18T12:54:46+05:00",
  "/tools/free-tiktok-video-downloader": "2026-06-18T12:54:46+05:00",
  "/tools/image-compressor": "2026-06-18T12:54:46+05:00",
  "/tools/image-resizer": "2026-06-18T12:54:46+05:00",
  "/tools/instagram-video-downloader": "2026-06-18T12:54:46+05:00",
  "/tools/meta-tag-generator": "2026-06-18T12:54:46+05:00",
  "/tools/online-pdf-to-word-converter": "2026-06-18T12:54:46+05:00",
  "/tools/pdf-compressor": "2026-06-18T12:54:46+05:00",
  "/tools/resume-builder": "2026-06-18T12:54:46+05:00",
  "/tools/robots-txt-generator": "2026-06-18T12:54:46+05:00",
  "/tools/video-to-gif": "2026-06-18T12:54:46+05:00",
  "/tools/voice-clone": "2026-06-18T12:54:46+05:00",
  "/tools/youtube-tags-extractor": "2026-06-18T12:54:46+05:00",
  "/tools/youtube-thumbnail": "2026-06-18T12:54:46+05:00",
  "/tools/youtube-video-downloader": "2026-06-18T12:54:46+05:00",
};

module.exports = {
  siteUrl,
  generateRobotsTxt: true,

  exclude: [
    "/login",
    "/signup",
    "/landing",
    "/product",
    "/cart",
    "/checkout",
    "/dashboard",
    "/admin/*",
    "/add-product",
    "/write",
    "/thankYou",
    "/api/*",
    "/robots.txt",
    "/pinterest",
    "/pinterest/*",
    "/tools/pdf-compress", // 301 -> /tools/pdf-compressor (consolidated)
    "/tools/youtube-tags", // 301 -> /tools/youtube-tags-extractor (renamed)
    "/tools/resizer", // 301 -> /tools/image-resizer (duplicate consolidated)
    "/tools/bg-remover", // 301 -> /tools/background-remover-image (duplicate consolidated)
    "/tools/whiteboard-animation", // 301 -> /tools (tool retired)
    // Next.js internal image-generation routes — not real pages
    "/twitter-image",
    "/opengraph-image",
  ],

  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/login",
          "/signup",
          "/cart",
          "/checkout",
          "/dashboard",
          "/admin/",
          "/api/",
          "/add-product",
          // "$" anchors the rule so it doesn't prefix-block /write-for-us.
          "/write$",
          "/thankYou",
          "/pinterest",
        ],
      },
    ],
  },

  additionalPaths: async () => {
    let blogs = [];

    try {
      // The blog list endpoint is /api/blog (singular) and returns { blogs: [...] }.
      const res = await fetch(`${siteUrl}/api/blog?limit=1000`);
      if (res.ok) {
        const data = await res.json();
        blogs = Array.isArray(data?.blogs)
          ? data.blogs
          : Array.isArray(data)
            ? data
            : [];
      }
    } catch (err) {
      console.warn("[next-sitemap] Blog fetch failed:", err.message);
    }

    return blogs.map((blog) => ({
      // Posts are served at /blog/<slug> (singular).
      loc: `${siteUrl}/blog/${blog.slug}`,
      lastmod: new Date(
        blog.updatedAt || blog.publishedAt || blog.date || Date.now(),
      ).toISOString(),
    }));
  },

  transform: async (config, path) => {
    return {
      loc: `${siteUrl}${path}`,
      lastmod: LAST_MODIFIED[path],
    };
  },
};
