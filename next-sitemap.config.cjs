// next-sitemap.config.js (ESM)
const siteUrl = "https://www.shopyor.com";

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  generateRobotsTxt: true,

  // Exclude private/utility routes from ALL sitemaps
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
    "/pinterest", // just in case
    // add more utility paths if they shouldn't index:
    // "/generate-link", "/pinterest/bulk-file"
  ],

  // Make robots.txt mirror your intent
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
    // Optionally list additional sitemaps if you split later:
    // additionalSitemaps: [`${siteUrl}/sitemap-blogs.xml`],
  },

  // Keep your existing blog enrichment
  additionalPaths: async (config) => {
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
      changefreq: "monthly", // better than weekly if posts aren’t updated that often
      priority: 0.7,
    }));

    return [
      {
        loc: `${siteUrl}/blogs`,
        changefreq: "weekly",
        priority: 0.6,
        lastmod: new Date().toISOString(),
      },
      ...blogPaths,
    ];
  },
};
