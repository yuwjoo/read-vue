<template>
  <div class="book-shelf-wrapper">
    <div class="top-bar">
      <div class="title">书城</div>
    </div>
    <div class="search-box-wrapper">
      <search-box ref="searchBox" placeholder="请输入搜索的书名或作者" @query="onQueryChange"></search-box>
    </div>
    <BookList
      class="book-shelf-content"
      :list="bookList"
      :loading="loading"
      @scroll-to-top="handleScrollToTop"
      @scroll-to-bottom="handleScrollToBottom"
    />
    <!-- <scroll
      :bounce="bounce"
      class="book-shelf-content"
      :data="bookList"
      :pullUpLoad="{ threshold: 50 }"
      ref="scroll"
      @onPullingUp="onPullingUp"
    >
      <div>
        <div class="library">
          <div class="library-item" v-for="item in bookList" @click="selectBook(item)">
            <div class="library-item-wrapper">
              <div class="library-image">
                <img :src="item.bookInfo.image" alt="" />
              </div>
              <div class="library-name">
                <p class="name">{{ item.bookInfo.title }}</p>
              </div>
            </div>
          </div>
        </div>
        <Pagination
          class="pagination"
          v-model="page.current"
          :total="page.total"
          :size="page.size"
          @change-current="getList"
        />
      </div>
    </scroll> -->
    <!-- <div class="loading-wrapper" v-show="loading">
      <loading></loading>
    </div> -->
  </div>
</template>

<script>
import Scroll from "base/scroll/scroll";
import Confirm from "base/confirm/confirm";
import { mapGetters, mapActions, mapMutations } from "vuex";
import { getChapters } from "api/handpick";
import { getBookList } from "api/lengku8";
import SearchBox from "base/search-box/search-box";
import Pagination from "base/pagination";
import Loading from "base/loading/loading";
import BookList from "./components/bookList";

export default {
  data() {
    return {
      bounce: false,
      bookList: [],
      readingBook: {},
      currentItem: {},
      query: "", // 模糊搜索值
      page: {
        current: 1, // 当前页
        size: 0, // 每页条数
        total: 101 // 总条数
      },
      loading: false, // 加载中
      searchTimer: null // 模糊搜索防抖定时器
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 获取列表数据
    getList() {
      this.loading = true;
      getBookList({ current: this.page.current, size: this.page.size, searchValue: this.query })
        .then((res) => {
          this.$set(this.page, "current", res.current);
          this.$set(this.page, "total", res.total);
          this.$set(this.page, "size", res.size);
          this.bookList.push(
            ...res.data.map((item, index) => {
              return {
                id: item.id,
                bookInfo: {
                  ...item.bookInfo,
                  page: {
                    ...this.page,
                    index
                  }
                }
              };
            })
          );
          console.log("获取书架数据", this.bookList);
        })
        .finally(() => {
          this.loading = false;
          // this.$refs.scroll.finishPullUp();
        });
    },
    // 下拉加载
    handleScrollToTop() {
      console.log("下拉加载");
    },
    // 上拉加载
    handleScrollToBottom() {
      if (!this.loading && this.page.current + 1 <= this.page.total / this.page.size) {
        console.log("上拉加载");
        this.page.current++;
        this.getList();
      }
    },
    // 上拉加载
    onPullingUp() {
      if (this.page.current + 1 <= this.page.total / this.page.size) {
        this.page.current++;
        this.getList();
      }
    },
    // 处理模糊查询
    onQueryChange(query) {
      this.query = query;
      clearTimeout(this.searchTimer); // 清除上一个定时器
      this.searchTimer = setTimeout(() => {
        this.getList();
      }, 500);
    },
    gotoAddBook() {
      this.$router.push({
        path: "/handpick/"
      });
    },
    onTouchstart(item) {
      this.currentItem = item;
      this.timer = setTimeout(() => {
        this.$refs.confirm.show();
      }, 800);
    },
    onTouchmove() {
      clearTimeout(this.timer);
    },
    onTouchend() {
      clearTimeout(this.timer);
    },
    selectConfirm() {
      this.deleteBook(this.currentItem);
    },
    recentRead() {
      this.refreshRead(this.readingBook);
    },
    selectBook(item) {
      this.$router.push({
        path: `/book/${item.id}`
      });
    },
    refreshRead(item) {
      this.setCurrentBook(item.bookInfo);
      getChapters(item.id).then((res) => {
        if (res.statusText === "OK") {
          this.selectRead({
            id: item.id,
            list: res.data.chapters,
            index: item.index
          });
        }
        this.$router.push({
          path: `/booktext/${item.id}`
        });
      });
    },
    ...mapActions(["selectRead", "deleteBook"]),
    ...mapMutations({
      setCurrentBook: "SET_CURRENT_BOOK"
    })
  },
  computed: {
    ...mapGetters(["collectList", "lastReading", "currentId"])
  },
  watch: {
    collectList() {
      this.bookList = this.collectList;
    },
    lastReading() {
      this.readingBook = this.lastReading;
    }
  },
  components: {
    Scroll,
    Confirm,
    SearchBox,
    Pagination,
    Loading,
    BookList
  }
};
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
@import '~common/stylus/mixin.styl'
.book-shelf-wrapper
  position fixed
  top 0
  left 0
  right 0
  top 0
  bottom 3.125rem
  overflow hidden
  padding-top 2.75rem

  .search-box-wrapper
    padding 1.25rem 1rem
  .top-bar
    position fixed
    top 0
    left 0
    right 0
    height 2.75rem
    background $theme-color
    font-size $font-size-large
    color $font-color-ll
    text-align center
    line-height 2.75rem
  .book-shelf-content
    width 100%
    height calc(100% - 5rem)
    overflow-y: auto;
    // overflow hidden
    .recent-box
      width 100%
      height 16.125rem
      position relative
      background $theme-color
      .recent-title
        position absolute
        top 50%
        width 70%
        left 15%
        text-align center
        font-size $font-size-large-x
        transform translate(0, -50%)
        color #fff
      .recent-book-wrapper
        width 70%
        margin 0 auto
        padding-top 5.25rem
        display flex
        .image
          width 6.375rem
          height 8.75rem
          img
            width 100%
            height 100%
            border-radius 0.5rem
        .book-info
          flex 1
          text-align left
          width 152px
          margin-left 0.5rem
          color $font-color-ll
          line-height 1.75rem
          font-size $font-size-medium
          .book-name
            font-size $font-size-medium-x
            no-wrap(1)
          .recent-read,.book-name
            no-wrap(1)
          .continue-read
            width 5.0625rem
            height 1.75rem
            margin-top 0.25rem
            border 1px solid #fff
            border-radius 0.25rem
            text-align center
    .library
      background #fff
      display flex
      flex-flow row wrap
      justify-content space-between
      padding 0 1rem
      .library-item
        width 5.6875rem
        margin-bottom 0.625rem
        .library-item-wrapper
          width 100%
          height 100%
          margin 0 auto
          .library-image
            width 100%
            height 7.8125rem
            background #ccc
            border 1px solid $border-color
            border-radius 0.25rem
            img
              width 100%
              height 100%
              border 1px solid $border-color
              border-radius 0.25rem
          .library-name
            vertical-align bottom
            width 100%
            box-sizing border-box
            padding-top 0.625rem
            font-size $font-size-small
            color $font-color-d
            text-align left
            no-wrap(2)
            .name
              line-height 1rem
          &.add-wrapper
            height 7.8125rem
            line-height 7.8125rem
            font-size 2rem
            color $font-color-l
            background $background-color-d
            border 1px solid $border-color
            border-radius 0.25rem
            text-align center

      .pagination
        margin-bottom: 0.625rem;

.loading-wrapper
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  z-index 998
  background rgba(0,0,0, 0.8)
</style>
