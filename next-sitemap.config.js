const keywords = require('./data/keywords.json');

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://scriptkill.ai',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
  additionalPaths: async (config) => {
    const paths = [];
    
    // 生成 solutions/[slug] 路径
    for (const keyword of keywords) {
      paths.push({
        loc: `/solutions/${keyword.slug}`,
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
      });
    }
    
    return paths;
  },
};
