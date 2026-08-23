const siteUrl = "https://www.shopyor.com";

// UK Year 6 topic slugs for the Maths Challenge feature — kept here (not
// imported) since this config is CommonJS and the source registry is an ES
// module; update this list if lib/maths/topics.js's slugs change.
const MATHS_YEAR_6_TOPIC_SLUGS = [
  "place-value",
  "four-operations",
  "factors-multiples-primes",
  "fractions",
  "decimals",
  "percentages",
  "ratio-proportion",
  "algebra",
  "measurement",
  "perimeter-area-volume",
  "properties-of-shapes",
  "position-direction",
  "statistics",
  "word-problems",
  "mathematical-reasoning",
];

// Real last-edited dates (from `git log -1 --format=%cI -- <file>` on each
// page's source file), not a build timestamp â€” a lastmod that just means
// "the sitemap was rebuilt" carries no genuine freshness signal and Google
// discounts that pattern when detected at scale. Update an entry's date
// here when you meaningfully edit that page's content.
// `priority`/`changefreq` are intentionally omitted sitewide: Google has
// confirmed both fields are ignored for ranking/crawling.
const LAST_MODIFIED = {
  "/": "2026-08-14T00:00:00+05:00",
  "/tools": "2026-06-12T11:45:53+05:00",
  "/portfolio": "2026-05-09T12:41:39+05:00",
  "/about": "2026-08-14T00:00:00+05:00",
  "/contact": "2026-06-18T11:58:31+05:00",
  "/privacy": "2026-08-14T00:00:00+05:00",
  "/terms": "2026-08-14T00:00:00+05:00",
  "/cookie-policy": "2026-06-18T12:54:46+05:00",
  "/copyright": "2026-08-14T00:00:00+05:00",
  "/refund-policy": "2026-08-14T00:00:00+05:00",
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
  "/tools/instagram-video-downloader": "2026-06-18T12:54:46+05:00",
  "/tools/video-downloader": "2026-08-10T00:00:00+05:00",
  "/products": "2026-08-14T00:00:00+05:00",
  "/tools/meta-tag-generator": "2026-06-18T12:54:46+05:00",
  "/tools/convert-your-pdf-file-to-word": "2026-06-18T12:54:46+05:00",
  "/tools/compress-your-pdf-file": "2026-06-18T12:54:46+05:00",
  "/tools/robots-txt-generator": "2026-06-18T12:54:46+05:00",
  "/tools/voice-clone": "2026-06-18T12:54:46+05:00",
  "/tools/youtube-tags-extractor": "2026-06-18T12:54:46+05:00",
  "/tools/youtube-thumbnail": "2026-06-18T12:54:46+05:00",
  "/maths": "2026-08-23T00:00:00+05:00",
  "/maths/year-6": "2026-08-23T00:00:00+05:00",
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
    "/tools/pdf-compress", // 301 -> /tools/compress-your-pdf-file (consolidated)
    "/tools/pdf-to-word", // 301 -> /tools/convert-your-pdf-file-to-word (renamed)
    "/tools/youtube-tags", // 301 -> /tools/youtube-tags-extractor (renamed)
    "/tools/bg-remover", // 301 -> /tools/background-remover-image (duplicate consolidated)
    "/tools/whiteboard-animation", // 301 -> /tools (tool retired)
    "/tools/resizer", // 301 -> /tools (tool retired 2026-08-10)
    "/tools/image-resizer", // 301 -> /tools (tool retired 2026-08-10)
    "/tools/resume-builder", // 301 -> /tools (digital product retired 2026-08-14)
    "/tools/resume-builder/*", // 301 -> /tools
    "/tools/video-to-gif", // 301 -> /tools (tool retired 2026-08-10)
    "/tools/youtube-video-downloader", // 301 -> /tools (tool retired 2026-08-10)
    "/order/*", // private post-checkout page, noindex
    "/maths/daily", // rotating daily content, not meant to rank
    "/maths/daily/*",
    // Next.js internal image-generation routes â€” not real pages
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
          "/maths/daily",
        ],
      },
    ],
  },

  additionalPaths: async () => {
    let blogs = [];
    let products = [];

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

    try {
      const res = await fetch(`${siteUrl}/api/products`);
      if (res.ok) {
        const data = await res.json();
        products = Array.isArray(data?.products) ? data.products : [];
      }
    } catch (err) {
      console.warn("[next-sitemap] Products fetch failed:", err.message);
    }

    return [
      ...blogs.map((blog) => ({
        // Posts are served at /blog/<slug> (singular).
        loc: `${siteUrl}/blog/${blog.slug}`,
        lastmod: new Date(
          blog.updatedAt || blog.publishedAt || blog.date || Date.now(),
        ).toISOString(),
      })),
      ...products.map((product) => ({
        loc: `${siteUrl}/products/${product.slug}`,
        lastmod: new Date(
          product.updatedAt || product.createdAt || Date.now(),
        ).toISOString(),
      })),
      ...MATHS_YEAR_6_TOPIC_SLUGS.map((slug) => ({
        loc: `${siteUrl}/maths/year-6/${slug}`,
        lastmod: "2026-08-23T00:00:00+05:00",
      })),
    ];
  },

  transform: async (config, path) => {
    return {
      loc: `${siteUrl}${path}`,
      lastmod: LAST_MODIFIED[path],
    };
  },
};
