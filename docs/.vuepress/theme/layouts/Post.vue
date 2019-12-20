<template>
  <div class="post">
    <div class="post-title">{{ $page.title }}</div>
    <Content class="content" />
  </div>
</template>

<script>
export default {
  created() {
    console.log(this);
  }
};
</script>

<style lang="scss" scoped>
.post {
  width: 700px;
  margin: 0 auto;
  padding: 40px 0;
  .post-title {
    font-size: 2.2rem;
    font-weight: bold;
    margin-bottom: 30px;
  }
}
</style>
