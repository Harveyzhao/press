module.exports = {
  title: '前端',
  description: '顺丰华东小微',
  evergreen: true,
  head: [['link', { rel: 'icon', href: `/favicon.ico` }]],
  markdown: {
    anchor: { permalink: true },
    toc: { includeLevel: [1, 2] },
  },
  themeConfig: {
    lastUpdated: true,
  },
  plugins: [require('./plugins/blog')],
};
