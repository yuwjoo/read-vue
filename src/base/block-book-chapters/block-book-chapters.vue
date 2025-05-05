<template>
  <div class="block-chapters">
    <div class="blcok-chapters-group">
      <scroll class="blcok-chapters-content" :data="chapters" ref="chapterList">
        <div class="blcok-chapters-list">
          <p
            class="item"
            v-for="(item, index) in list"
            @click.stop.prevent="selectChapter(item, index)"
            :class="{ isVip: item.isVip }"
          >
            <span class="item-text">{{ item.title }}</span
            ><i v-show="item.isVip" class="icon-lock"></i>
          </p>
        </div>
      </scroll>
    </div>
  </div>
</template>
<script>
import Scroll from "base/scroll/scroll";
import Loading from "base/loading/loading";

export default {
  props: {
    chapters: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ""
    },
    author: {
      type: String,
      default: ""
    },
    // 是否倒序
    isReverse: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showFlag: false,
      chaptersList: []
    };
  },
  computed: {
    list() {
      return this.isReverse ? this.chapters.slice().reverse() : this.chapters.slice();
    }
  },
  methods: {
    show() {
      this.showFlag = true;
    },
    hide() {
      this.showFlag = false;
    },
    selectChapter(item, index) {
      if (item.isVip) {
        return;
      }
      let currentIndex = this.isReverse ? this.chaptersList.length - 1 - index : index;
      this.$emit("select", item, currentIndex);
    },
    refresh() {
      this.$refs.chapterList && this.$refs.chapterList.refresh();
    },
    reverseChapters() {
      this.chaptersList.reverse();
      this.isReverse = !this.isReverse;
    }
  },
  components: {
    Scroll,
    Loading
  }
};
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
.block-chapters
  background $background-color
  color $font-color
  .blcok-chapters-title
    height 2.75rem
    position relative
    display flex
    flex-direction row
    background $background-color-d
    .icon-back
      display inline-block
      width 2rem
      line-height 2.75rem
      text-align center
      font-size $font-size-large-x
      color $theme-color
    .reverse
      padding-right 1rem
      line-height 2.75rem
      font-size $font-size-medium
    .book-title-info
      height 2.75rem
      flex 1
      text-align center
      display flex
      flex-direction column
      .book-name
        line-height 1.5rem
        font-size $font-size-medium-x
        color $font-color-dd
      .book-author
        flex 1
        font-size $font-size-medium
        line-height 1.25rem
  .blcok-chapters-group
    background $background-color-m
    .blcok-chapters-content
      width 100%
      height 100%
      overflow hidden
      .blcok-chapters-list
        .item
          line-height 3.125rem
          box-sizing border-box
          border-top 1px solid #fff
          border-bottom 1px solid $border-color
          font-size $font-size-medium
          padding 0 1rem
          box-sizing border-box
          display flex
          color $font-color-dd
          &.isVip
            color $font-color-l
          .item-text
            flex 1
          .icon-lock
            line-height 3.125rem
.fade-enter-active, .fade-leave-active
  transition all 0.3s
.fade-enter, .fade-leave-to
  transform translate3d(100%, 0, 0)
  opacity 0
</style>
