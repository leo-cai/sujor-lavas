<template>
  <app-mask class="app-loading" v-show="isPageLoading">
    <div class="loading"></div>
  </app-mask>
</template>

<script>
import {mapState} from 'vuex'
import AppMask from '@/components/public/AppMask'
export default {
  components: {
    AppMask
  },
  computed: {
    ...mapState('public/common', [
      'isPageLoading'
    ])
  }
}
</script>

<style lang="stylus" scoped>
@require '~@/assets/stylus/variable'
.app-loading
  padding-top $app-header-height
  .loading
    margin 300px auto
    width 140px
    height 144px
    background url(../../static/img/sprites.png) 0 0 no-repeat
    animation run 0.6s steps(12) infinite
  @keyframes run
    0%
      background-position 0 0
    100%
      background-position -(140px * 12) 0
</style>
