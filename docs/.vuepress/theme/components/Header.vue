<template>
  <div class="header">
    <div class="header-title">{{ $siteTitle }}</div>
    <div class="nav">
      <router-link to="/">文章</router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.header {
  height: 60px;
  line-height: 60px;
  padding: 0 40px;
  .header-title {
    font-size: 18px;
    font-weight: bold;
    margin-right: 40px;
    display: inline-block;
    vertical-align: middle;
    color: #fff;
  }
  .nav {
    display: inline-block;
    vertical-align: middle;
    a {
      font-size: 15px;
      color: #fff;
      &:hover {
        color: rgba(211, 211, 211, 1);
      }
    }
  }
}
</style>
