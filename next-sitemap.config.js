// next-sitemap.config.js (ES module syntax)

const siteUrl = "https://www.shopyor.com";

export default {
  siteUrl,
  generateRobotsTxt: true,
  exclude: [],
  additionalPaths: async (config) => {
    const res = await fetch(`${siteUrl}/api/blogs`);
    const blogs = await res.json();

    // Build blog URLs for sitemap
    const blogPaths = blogs.map((blog) => ({
      loc: `${siteUrl}/blogs/${blog.slug}`,
      lastmod: new Date(
        blog.updatedAt || blog.date || new Date()
      ).toISOString(),
      changefreq: "weekly",
      priority: 0.7,
    }));

    // Also include /blogs listing page manually
    return [
      {
        loc: `${siteUrl}/blogs`,
        changefreq: "daily",
        priority: 0.7,
        lastmod: new Date().toISOString(),
      },
      ...blogPaths,
    ];
  },
};
