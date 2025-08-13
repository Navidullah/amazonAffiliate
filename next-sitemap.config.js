// next-sitemap.config.js (ESM)
const siteUrl = "https://www.shopyor.com";

export default {
  siteUrl,
  generateRobotsTxt: true,
  exclude: [],
  additionalPaths: async (config) => {
    let blogs = [];

    try {
      const res = await fetch(`${siteUrl}/api/blogs`);
      if (res.ok) {
        const data = await res.json();
        // Ensure blogs is an array
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

    // Build blog URLs
    const blogPaths = blogs.map((blog) => ({
      loc: `${siteUrl}/blogs/${blog.slug}`,
      lastmod: new Date(
        blog.updatedAt || blog.date || Date.now()
      ).toISOString(),
      changefreq: "weekly",
      priority: 0.7,
    }));

    // Include the main /blogs page
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
