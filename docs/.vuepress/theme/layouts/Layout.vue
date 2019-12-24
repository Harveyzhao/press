<template>
  <div class="home">
    <header-layout></header-layout>
    <div v-if="!filterTag" class="tags">
      <div v-for="item in $allTags" :key="item.name" class="tag-item" @click="handleFilterTag(item)">{{ item.name }} ({{ item.count }})</div>
    </div>
    <div v-else class="tags">
      <a class="back" @click="handleClearFilterTag"><a-icon type="rollback"/></a>
      <div class="tag-item" style="cursor:default;">标签：{{ filterTag.name }}</div>
    </div>
    <div class="posts">
      <div v-for="year in Object.keys(posts)" class="post-year">
        {{ year }}
        <div v-for="month in Object.keys(posts[year])" class="post-month">
          {{ month }}
          <li v-for="post in posts[year][month]" class="post-item">
            <span>{{ post.monthDate }}</span>
            <router-link :to="post.regularPath"> {{ post.title }}</router-link>
          </li>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderLayout from '../components/Header';

const Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function createObjKeys(obj, dateSplit, index = 0) {
  if (dateSplit[index] && !obj[dateSplit[index]]) {
    if (index === dateSplit.length - 1) {
      obj[dateSplit[index]] = [];
      return;
    }
    obj[dateSplit[index]] = {};
  }
  if (index + 1 === dateSplit.length) {
    return;
  }
  return createObjKeys(obj[dateSplit[index]], dateSplit, ++index);
}

export default {
  components: { HeaderLayout },
  data() {
    return {
      currentPosts: [],
      filterTag: null,
    };
  },
  computed: {
    posts() {
      const posts = {};
      for (const item of this.currentPosts) {
        const dateSplit = item.createdAt.split('-');
        const objKeys = [dateSplit[0], Months[+dateSplit[1] - 1]];
        createObjKeys(posts, objKeys);
        posts[objKeys[0]][objKeys[1]].push(item);
      }
      return posts;
    },
  },
  created() {
    this.currentPosts = this.$posts;
  },
  methods: {
    handleFilterTag(item) {
      this.filterTag = item;
      this.currentPosts = item.pages;
    },
    handleClearFilterTag() {
      this.filterTag = null;
      this.currentPosts = this.$posts;
    },
  },
};
</script>

<style lang="scss" scoped>
.posts,
.tags {
  width: 700px;
  margin: 0 auto;
}
.tags {
  border-bottom: 1px solid #696969;
  padding-bottom: 10px;
  margin: 20px auto;
  .tag-item {
    display: inline-block;
    margin: 5px;
    padding: 5px;
    font-size: 14px;
    cursor: pointer;
  }
  .back {
    margin-right: 20px;
    /deep/.anticon {
      color: #d3d3d3;
    }
    a {
      color: #d3d3d3;
    }
  }
}
.posts {
  padding: 15px;
  .post-year {
    color: #c0c0c0;
    font-size: 22px;
    .post-month {
      margin: 15px 30px;
      font-size: 15px;
    }
    .post-item {
      padding: 7px 30px;
      margin-top: 7px;
      span {
        color: #fff;
        font-size: 13px;
      }
    }
    a {
      color: #d3d3d3;
      text-decoration: underline;
      margin-left: 15px;
    }
  }
}
</style>
