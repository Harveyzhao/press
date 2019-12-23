// import compareDesc from 'date-fns/compare_desc'

const tags = [];

const pushToTags = tagName => {
  const findResult = tags.find(x => x.name === tagName);
  if (findResult) {
    findResult.count += 1;
  } else {
    tags.push({
      name: tagName,
      count: 1,
    });
  }
};

export default ({ Vue }) => {
  Vue.mixin({
    computed: {
      $posts() {
        const pages = this.$site.pages;
        const pageFilter = p => p.type === 'post';
        const pageSort = (p1, p2) => {
          if (p1.top === p2.top) {
            if (new Date(p1.createdAt).getTime() === new Date(p2.createdAt).getTime()) {
              return p1.sort - p2.sort;
            }
            return new Date(p1.createdAt).getTime() - new Date(p2.createdAt).getTime();
          }
          if (p1.top && p2.top) {
            return p1.top - p2.top;
          }
          return p2.top ? 1 : -1;
        };
        const posts = pages.filter(pageFilter).sort(pageSort);
        return posts;
      },
      $allTags() {
        tags.length = 0
        for (const page of this.$posts) {
          if (page.tags) {
            for (const tagName of page.tags) {
              pushToTags(tagName);
            }
          } else {
            pushToTags('其他');
          }
        }
        return Array.from(new Set(tags));
      },
    },
  });
};
