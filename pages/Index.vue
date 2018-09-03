<template>
  <div class="app-index">
    <div class="app-wrapper">
      <div class="app-left">
        <!-- Code Index List -->
        <app-group type="left" :list="indexCodeList">
          <router-link class="group-title" to="/codes">更多代码>></router-link>
        </app-group>
        <!-- Music Index List -->
        <app-group type="right" :list="indexMusicList">
          <router-link class="group-title" to="/musics">更多音乐>></router-link>
        </app-group>
        <!-- Film Index List -->
        <app-group type="left" :list="indexFilmList">
          <router-link class="group-title" to="/films">更多电影>></router-link>
        </app-group>
        <!-- Book Index List -->
        <app-group type="right" :list="indexBookList">
          <router-link class="group-title" to="/books">更多书籍>></router-link>
        </app-group>
      </div>
      <div class="app-right">
        <app-watch></app-watch>
        <app-share></app-share>
      </div>
    </div>
  </div>
</template>

<script>
import AppGroup from '@/components/public/AppGroup'
import AppWatch from '@/components/public/AppWatch'
import AppShare from '@/components/public/AppShare'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'index',
  metaInfo () {
    return {
      title: '首页',
      titleTemplate: '%s - Sujor',
      meta: [
        {name: 'keywords', content: 'Sujor'},
        {name: 'description', content: 'Sujor'}
      ]
    }
  },
  components: {
    AppGroup,
    AppWatch,
    AppShare
  },
  computed: {
    ...mapState('modules/index', {
      indexCodeList: state => state.indexCodeList,
      indexMusicList: state => state.indexMusicList,
      indexFilmList: state => state.indexFilmList,
      indexBookList: state => state.indexBookList
    })
  },
  methods: {
    ...mapActions('modules/index', [
      'getIndexList'
    ])
  },
  mounted () {
    this.getIndexList({limit: 5})
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
      .group-title
        font-size 13px
        float left
        margin 0 10px 20px 10px
        &:after
          display block
          content ''
          clear both
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
        .group-title
          font-size 12px
      .app-right
        width 200px
</style>
