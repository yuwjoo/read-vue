<template>
  <div class="footer-tab">
    <router-link tag="div" class="footer-tab__item" to="/bookshelf">
      <div class="footer-tab__content">
        <i class="footer-tab__icon icon-bookshelf"></i>
        <span class="footer-tab__title">书城</span>
      </div>
    </router-link>
    <router-link tag="div" class="footer-tab__item" to="/classify">
      <div class="footer-tab__content">
        <i class="footer-tab__icon icon-class"></i>
        <span class="footer-tab__title">分类</span>
      </div>
    </router-link>
    <router-link tag="div" class="footer-tab__item" to="/search">
      <div class="footer-tab__content">
        <i class="footer-tab__icon icon-search"></i>
        <span class="footer-tab__title">搜索</span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "footerTab"
};
</script>

<style lang="scss" scoped>
.footer-tab {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3.125rem;
  box-sizing: border-box;
  background: $background-color-d;
  border-top: 1px solid $border-color-m;

  .tab {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;

    .footer-tab__item {
      flex: 1;
      height: 100%;

      &.router-link-active {
        color: $theme-color;
      }

      .footer-tab__content {
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;

        .icon {
          font-size: $font-size-large-x;
          margin-bottom: 0.625rem;
        }

        .footer-tab__title {
          font-size: $font-size-small-s;
        }
      }
    }
  }
}
</style>
