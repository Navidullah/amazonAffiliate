// next-sitemap.config.cjs
const siteUrl = "https://www.shopyor.com";

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  generateRobotsTxt: true,

  // 1) Exclude private/utility routes from ALL sitemaps
  exclude: [
    "/login",
    "/signup",
    "/cart",
    "/checkout",
    "/dashboard",
    "/admin/*",
    "/add-product",
    "/write",
    "/thankYou",
    "/api/*",
    "/robots.txt",
    "/pinterest", // keep blocked
    "/pinterest/*", // NEW: also block subpaths like /pinterest/bulk-file
    // '/generate-link', // ← uncomment if you don't want this indexed
  ],

  // 1) robots.txt mirrors the policy (already good)
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
          "/write",
          "/thankYou",
          "/pinterest",
        ],
      },
    ],
    // additionalSitemaps: [`${siteUrl}/sitemap-blogs.xml`], // optional split
  },

  // 2) Add the homepage explicitly; keep your blogs logic
  additionalPaths: async () => {
    const extras = [
      {
        loc: `${siteUrl}/`,
        changefreq: "weekly",
        priority: 1.0,
        lastmod: new Date().toISOString(),
      },
      // (Optional) make tools explicit with better hints:
      {
        loc: `${siteUrl}/tools/image-compressor`,
        changefreq: "weekly",
        priority: 0.9,
        lastmod: new Date().toISOString(),
      },
      {
        loc: `${siteUrl}/tools/background-remover-image`,
        changefreq: "weekly",
        priority: 0.9,
        lastmod: new Date().toISOString(),
      },
      {
        loc: `${siteUrl}/tools/exif-remover`,
        changefreq: "weekly",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      },
      {
        loc: `${siteUrl}/tools/bmi`,
        changefreq: "monthly",
        priority: 0.6,
        lastmod: new Date().toISOString(),
      },
    ];

    // Reuse your existing blog fetch logic
    let blogs = [];
    try {
      const res = await fetch(`${siteUrl}/api/blogs`);
      if (res.ok) {
        const data = await res.json();
        blogs = Array.isArray(data)
          ? data
          : Array.isArray(data.items)
            ? data.items
            : [];
      }
    } catch (err) {
      console.warn(
        "[next-sitemap] Could not fetch blogs during build:",
        err.message
      );
    }

    const blogPaths = blogs.map((blog) => ({
      loc: `${siteUrl}/blogs/${blog.slug}`,
      lastmod: new Date(
        blog.updatedAt || blog.date || Date.now()
      ).toISOString(),
      changefreq: "monthly",
      priority: 0.7,
    }));

    return [
      ...extras,
      {
        loc: `${siteUrl}/blogs`,
        changefreq: "weekly",
        priority: 0.6,
        lastmod: new Date().toISOString(),
      },
      ...blogPaths,
    ];
  },

  // 3) Optional: normalize recrawl hints for all other discovered paths
  transform: async (config, path) => {
    let changefreq = "weekly";
    let priority = 0.7;

    if (path === "/") {
      changefreq = "weekly";
      priority = 1.0;
    } else if (path === "/blogs") {
      changefreq = "weekly";
      priority = 0.6;
    } else if (path.startsWith("/blogs/")) {
      changefreq = "monthly";
      priority = 0.7;
    } else if (
      path.startsWith("/tools/image-compressor") ||
      path.startsWith("/tools/background-remover-image") ||
      path.startsWith("/tools/exif-remover")
    ) {
      changefreq = "weekly";
      priority = 0.9;
    } else if (path.startsWith("/tools")) {
      changefreq = "monthly";
      priority = 0.6;
    } else if (path === "/contact" || path === "/privacy-policy") {
      changefreq = "yearly";
      priority = 0.3;
    }

    return {
      loc: `${siteUrl}${path}`,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};
