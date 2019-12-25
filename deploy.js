const ghpages = require('gh-pages');

ghpages.publish('docs/.vuepress/dist', err => {
  console.log(err); //eslint-disable-line
});
