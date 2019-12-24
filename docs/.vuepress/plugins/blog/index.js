const path = require('path');
// const format = require('date-fns/format')

module.exports = ({ postsDir = 'posts', postsLayout = 'Post' }, ctx) => {
  const ensureBothSlash = str => str.replace(/^\/?(.*)\/?$/, '/$1/');
  return {
    extendPageData($page) {
      if ($page.path.startsWith(ensureBothSlash(postsDir))) {
        $page.frontmatter.layout = $page.frontmatter.layout || postsLayout;
        $page.type = 'post';
        $page.top = $page.frontmatter.top || false;
        $page.tags = ($page.frontmatter.tags && $page.frontmatter.tags.split('|')) || [];
        $page.sort = $page.frontmatter.sort || 0;
        $page.category = $page.frontmatter.category;
        $page.author = $page.frontmatter.author;
        $page.createdAt = $page.path.substr(7, 10).replace(/\//g, '-');
        const date = new Date($page.createdAt);
        $page.monthDate = `${date.getMonth() + 1}.${date.getDate()}`;
        // $page.updatedAt = $page.lastUpdated ? format($page.lastUpdated, 'YYYY-MM-DD') : null
      }
    },
    enhanceAppFiles: [path.resolve(__dirname, 'enhanceApp.js')],
  };
};
