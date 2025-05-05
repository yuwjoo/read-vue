<template>
  <div class="pagination">
    <van-button
      class="pagination__btn"
      plain
      hairline
      type="primary"
      :disabled="value <= 1"
      @click="handleChangeCurrent(value - 1)"
      >上一页</van-button
    >
    <span class="pagination__page">{{ value }}/{{ totalPage }}</span>
    <van-button
      class="pagination__btn"
      plain
      hairline
      type="primary"
      :disabled="value >= totalPage"
      @click="handleChangeCurrent(value + 1)"
      >下一页</van-button
    >
  </div>
</template>

<script>
export default {
  props: {
    // 当前页
    value: {
      type: Number,
      required: true
    },
    // 每页条数
    size: {
      type: Number,
      required: true
    },
    // 总条数
    total: {
      type: Number,
      required: true
    }
  },
  computed: {
    // 总页数
    totalPage() {
      return Math.ceil(this.total / this.size);
    }
  },
  methods: {
    /**
     * @description: 当前页改变
     * @param {number} current 当前页
     */
    handleChangeCurrent(current) {
      this.$emit("input", current);
      this.$emit("change-current", current);
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
@import '~common/stylus/mixin.styl'
.pagination
    display flex
    justify-content space-between
    align-items center
    height 2.5rem

    .pagination__btn
        height 100%
        width 7.5rem
        border none

        &:not(.van-button--disabled):active
            background-color $theme-color
            color white

        &::after
            display none

    .pagination__page
        font-size 0.875rem
        color #646566
        flex-grow 1
        line-height 2.5rem
        text-align center
</style>
