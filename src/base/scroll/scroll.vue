<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>
<script type="text/ecmascript-6">
import Bscroll from 'better-scroll'

const DIRECTION_H = 'horizontal'
const DIRECTION_V = 'vertical'
export default {
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: false
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: null
    },
    pullup: {
      type: Boolean,
      default: false
    },
    pullDownRefresh: {
      type: Object,
      default: null
    },
    beforeScroll: {
      type: Boolean,
      default: false
    },
    refreshDelay: {
      type: Number,
      default: 20
    },
    direction: {
      type: String,
      default: DIRECTION_V
    },
    bounce: {
      type: Boolean,
      default: true
    },
    pulldown: {
      type: Boolean,
      default: false
    },
    pullUpLoad: {
      type: [Boolean, Object],
      default: false
    }
  },
  mounted () {
    setTimeout(() => {
      this._initScroll()
      this.scroll.refresh()
    }, 20)
    this.scrollY = 0
  },
  methods: {
    onscroll (pos) {
      this.scrollY = pos.y
    },
    _initScroll () {
      if (!this.$refs.wrapper) {
        return
      }

      this.scroll = new Bscroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        bounce: this.bounce,
        eventPassthrough: this.direction === DIRECTION_V ? DIRECTION_H : DIRECTION_V,
        pullDownRefresh: this.pullDownRefresh,
        pullUpLoad: this.pullUpLoad
      })

      if (this.pulldown) {
        this.scroll.on('pullingDown', () => {
          this.$emit('onPullingDown')
        })
      }

      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('onPullingUp')
        })
      }

      if (this.pullup) {
        this.scroll.on('scrollEnd', () => {
          if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
            this.$emit('scrollToEnd')
          }
        })
      }

      if (this.listenScroll) {
        this.scroll.on('scroll', (pos) => {
          this.$emit('scroll', pos)
        })
      }

      if (this.beforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScroll')
        })
      }
    },
    disable () {
      this.scroll && this.scroll.disable()
    },
    enable () {
      this.scroll && this.scroll.enable()
    },
    refresh () {
      this.scroll && this.scroll.refresh()
    },
    finishPullDown () {
      this.scroll && this.scroll.finishPullDown()
    },
    closePullDown () {
      this.scroll && this.scroll.closePullDown()
    },
    openPullDown () {
      this.scroll && this.scroll.openPullDown.apply(this.scroll, arguments)
    },
    scrollTo () {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement () {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    }
  },
  watch: {
    data () {
      setTimeout(() => {
        this.refresh()
      }, this.refreshDelay)
    }
  }
}
</script>
