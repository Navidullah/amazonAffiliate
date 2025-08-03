// next-sitemap.config.js (ES module syntax)
export default {
  siteUrl: "https://www.shopyor.com",
  generateRobotsTxt: true,
  exclude: [],
  additionalPaths: async (config) => {
    return [
      {
        loc: "https://www.shopyor.com/blogs",
        changefreq: "daily",
        priority: 0.7,
        lastmod: new Date().toISOString(),
      },
    ];
  },
};
