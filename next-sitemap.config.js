module.exports = {
  siteUrl: process.env.NEXT_SITE_URL,
  changefreq: 'hourly',
  priority: 0.7,
  sitemapSize: 7000,
  generateRobotsTxt: true,
  exclude: [],
  alternateRefs: [],

  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? []
    };
  },

  additionalPaths: async (config) => [await config.transform(config, '/')],

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/'
      }
    ],
    additionalSitemaps: [`${process.env.NEXT_SITE_URL}/server-sitemap.xml`]
  }
};
