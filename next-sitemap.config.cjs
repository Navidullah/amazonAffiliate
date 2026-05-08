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
          "/write",
          "/thankYou",
          "/pinterest",
        ],
      },
    ],
  },

  additionalPaths: async () => {
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
      console.warn("[next-sitemap] Blog fetch failed:", err.message);
    }

    return blogs.map((blog) => ({
      loc: `${siteUrl}/blogs/${blog.slug}`,
      lastmod: new Date(
        blog.updatedAt || blog.date || Date.now(),
      ).toISOString(),
      changefreq: "monthly",
      priority: 0.7,
    }));
  },

  transform: async (config, path) => {
    let changefreq = "weekly";
    let priority = 0.7;

    if (path === "/") {
      priority = 1.0;
    } else if (path === "/portfolio") {
      priority = 0.8;
    } else if (path === "/tools") {
      priority = 0.8;
    } else if (path.startsWith("/blogs/")) {
      changefreq = "monthly";
      priority = 0.7;
    } else if (path.startsWith("/tools/image-compressor")) {
      priority = 0.9;
    } else if (path.startsWith("/tools/background-remover-image")) {
      priority = 0.9;
    } else if (path.startsWith("/tools/exif-remover")) {
      priority = 0.8;
    } else if (path === "/contact" || path === "/privacy-policy") {
      changefreq = "yearly";
      priority = 0.3;
    }

    return {
      loc: `${siteUrl}${path}`,
      changefreq,
      priority,
      lastmod: undefined,
    };
  },
};
