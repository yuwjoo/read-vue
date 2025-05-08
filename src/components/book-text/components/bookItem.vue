<template>
  <div class="text-item">
    <h1 class="text-title">{{ item.title }}</h1>
    <p class="text" v-for="text in item.textContent">{{ text }}</p>
  </div>
</template>

<script>
export default {
  name: "book-item",
  props: {
    index: {
      type: Number
    },
    source: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    // 点击书籍跳转到详情页
    handleClickItem(item) {
      this.$router.push({
        path: `/book/${item.id}`
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'

.book-item
    padding 1rem 0.625rem;
    border-bottom 1px solid $border-color;
    position relative;

    &.book-item--page-first {
        padding-top 2.3rem;
    }

    .book-item-page-divider {
        position absolute;
        top 0.5rem;
        left 50%;
        transform translateX(-50%);
        font-size $font-size-medium-x;
        color $font-color-ll;
        background $theme-color;
        padding 0.2rem 0.5rem;
        border-radius 0.3rem;
    }

    .book-item__title
        font-size $font-size-large-x;
        color $font-color-dd;
        font-weight bold;

        &::before {
            content "";
            float left;
            width 0.3rem;
            height 1.2rem;
            background $theme-color;
            margin 0 0.2rem 0 0;
        }

    .book-item__info
        margin-top 0.7rem;
        font-size $font-size-medium;
        display flex;
        justify-content space-between;

    .book-item__describe
        margin-top 0.7rem;
        color $font-color-d;
</style>
