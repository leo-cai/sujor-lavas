<template>
  <div class="app-index">
    <div class="app-wrapper">
      <div class="app-left">
        <!-- Code List -->
        <app-group v-for="(list, $index) in codeList" :key="$index" :type="$index % 2 === 0 ? 'left' : 'right'" :list="list"></app-group>
        <load-more @loadMore="handleLoadMore"></load-more>
      </div>
      <div class="app-right">
        <app-watch></app-watch>
        <app-share></app-share>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AppGroup from '@/components/public/AppGroup'
import LoadMore from '@/components/public/LoadMore'
import AppWatch from '@/components/public/AppWatch'
import AppShare from '@/components/public/AppShare'
export default {
  metaInfo () {
    return {
      title: '代码',
      titleTemplate: '%s - Sujor',
      meta: [
        {name: 'keywords', content: 'Sujor'},
        {name: 'description', content: 'Sujor'}
      ]
    }
  },
  components: {
    AppGroup,
    LoadMore,
    AppWatch,
    AppShare
  },
  data () {
    return {
      currentPage: 1,
      limit: 10
    }
  },
  computed: {
    ...mapState('modules/code', {
      codeList: state => state.codeList
    })
  },
  methods: {
    ...mapActions('modules/code', [
      'getCodeList',
      'setCodeList'
    ]),
    // 加载更多
    handleLoadMore () {
      this.currentPage += 1
      this.getCodeList({page: this.currentPage, limit: this.limit})
    }
  },
  created () {
    this.getCodeList({page: this.currentPage, limit: this.limit})
  },
  // 离开页面销毁长列表
  beforeDestroy () {
    this.setCodeList([])
  }
}
</script>

<style lang="stylus" scoped>
@require '~@/assets/stylus/variable'

.app-index
  padding-top $app-header-height
  width 100%
  .app-wrapper
    width 100%
    max-width $max-width
    margin 0 auto
    &:after
      display block
      content ''
      clear both
    .app-left
      float left
      width 895px
      margin 20px 10px
      background-color white
    .app-right
      float left
      width 265px
      margin 20px 10px

@media only screen and (max-width $max-width)
  .app-index
    .app-wrapper
      width $min-width
      .app-left
        width 620px
      .app-right
        width 200px
</style>
