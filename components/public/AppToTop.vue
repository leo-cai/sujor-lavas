<template>
  <div class="app-to-top" v-if="!isScrolledTop">
    <a class="to-top-wrapper" @click="toTop()">
      <div class="triangle"></div>
    </a>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  computed: {
    ...mapState('public/common',{
      isScrolledTop: state => state.isScrolledTop
    })
  },
  methods: {
    ...mapActions('public/common', [
      'setScrolledTop'
    ]),
    // 监听滚动状态
    handleScroll (el) {
      if (document.body.scrollTop === 0 && document.documentElement.scrollTop === 0 && window.pageYOffset === 0) {
        this.setScrolledTop(true)
      } else {
        this.setScrolledTop(false)
      }
    },
    // 滚动到顶部
    toTop () {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
      window.pageYOffset = 0
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="stylus" scoped>
@require '~@/assets/stylus/variable'

.app-to-top
  position fixed
  right 40px
  bottom 80px
  .to-top-wrapper
    display block
    width 50px
    height 50px
    border-radius 8px
    background-color white
    .triangle
      margin 0 auto
      padding-top 20px
      width 0
      height 0
      border-left 15px solid transparent
      border-right 15px solid transparent
      border-bottom 10px solid $info-color

</style>
