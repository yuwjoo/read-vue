<template>
  <virtual-list
    class="virtual-list"
    :data-key="'chapterId'"
    :data-sources="list"
    :data-component="itemComponent"
    :estimate-size="100"
    :top-threshold="300"
    :bottom-threshold="300"
    v-on:totop="$emit('scroll-to-top')"
    v-on:tobottom="$emit('scroll-to-bottom')"
  >
    <div slot="footer" class="loading-spinner">Loading ...</div>
  </virtual-list>
</template>

<script>
import VirtualList from "vue-virtual-scroll-list";
import BookItem from "./bookItem.vue";

export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      itemComponent: BookItem
    };
  },
  components: {
    "virtual-list": VirtualList
  }
};
</script>

<style lang="stylus" scoped>
.loading-spinner
    text-align: center;
    padding 0.2rem 0;
</style>
