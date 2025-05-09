<template>
  <div class="book-item">
    <h1 class="book-item__title">{{ source.title }}</h1>
    <p class="book-item__text" v-for="text in source.contents">{{ text }}</p>
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
  padding-bottom 0.625rem

  &:last-of-type
    padding-bottom 4.5rem

  .book-item__title
    width 100%
    font-size 24px
    line-height 48px
    color $font-color-dd
    padding-top 32px
    font-weight 600

  .book-item__text
    margin-top 8px
    width 100%
    text-indent 32px
</style>
