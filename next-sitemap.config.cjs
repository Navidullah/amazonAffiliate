const siteUrl = "https://www.shopyor.com";

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
      changefreq: "monthly",
      priority: 0.7,
    }));
  },

  transform: async (config, path) => {
    let changefreq = "weekly";
    let priority = 0.7;
    let lastmod = undefined;

    // Pages we are actively trying to get indexed/crawled: bump priority and
    // give a real lastmod so Google sees them as fresh and important.
    const prioritizedDownloaders = [
      "/tools/instagram-video-downloader",
      "/tools/free-tiktok-video-downloader",
      "/tools/facebook-video-downloader",
      "/tools/youtube-video-downloader",
    ];

    if (path === "/") {
      priority = 1.0;
    } else if (path === "/portfolio") {
      priority = 0.8;
    } else if (path === "/tools") {
      priority = 0.8;
    } else if (path.startsWith("/tools/voice-clone")) {
      priority = 0.9;
    } else if (prioritizedDownloaders.includes(path)) {
      priority = 0.9;
      lastmod = new Date().toISOString();
    } else if (path.startsWith("/blog/")) {
      changefreq = "monthly";
      priority = 0.7;
    } else if (path.startsWith("/tools/image-compressor")) {
      priority = 0.9;
    } else if (path.startsWith("/tools/background-remover-image")) {
      priority = 0.9;
    } else if (path.startsWith("/tools/exif-remover")) {
      priority = 0.8;
    } else if (path.startsWith("/tools/bg-remover")) {
      priority = 0.8;
      lastmod = new Date().toISOString();
    } else if (path === "/contact" || path === "/privacy-policy") {
      changefreq = "yearly";
      priority = 0.3;
    }

    return {
      loc: `${siteUrl}${path}`,
      changefreq,
      priority,
      lastmod,
    };
  },
};
