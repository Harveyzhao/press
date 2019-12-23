<template>
  <div class="post">
    <header-layout></header-layout>
    <div class="post-content">
      <div class="post-title">
        {{ $page.title }}
        <p class="date">发布日期：{{$page.createdAt}}
          <span v-if="$page.updated"></span>
        </p>
      </div>
      <Content class="content" />
    </div>
  </div>
</template>

<script>
import HeaderLayout from '../components/Header';
export default {
  components: { HeaderLayout },
  created() {
    console.log(this);
  },
};
</script>

<style lang="scss" scoped>
.post-content {
  width: 700px;
  margin: 0 auto;
  padding: 40px 0;
  .post-title {
    font-size: 2.2rem;
    font-weight: bold;
    margin-bottom: 30px;
  }
  .date {
    margin: 0;
    font-size: 12px;
    margin-top: 3px;
  }
}
</style>
