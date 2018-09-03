<template>
  <div class="app-index">
    <div class="app-wrapper">
      <div class="app-left">
        <!-- Film Detail -->
        <progressive-img class="detail-background" :src="film.background_url" :placeholder="film.pre_background_url" />
        <div class="detail-title" v-text="film.title"></div>
        <div class="detail-category">
          <h5 v-for="category in film.categories" :key="category.category_id" v-text="category.category_name"></h5>
        </div>
        <div class="detail-info">
          <div class="detail-created"><i><a :href="'/user/' + film.user_id" v-text="film.username"></a><span>  发布于：</span><span>{{film.created_time | formatDate}}</span></i></div>
          <div class="detail-clicks"><i><span>阅读数：</span><span>{{film.clicks}}</span></i></div>
        </div>
        <div class="detail-summary">摘要：{{film.summary}}</div>
        <div class="detail-content">
          <top-preview :content="'' + film.content" :options="options"></top-preview>
        </div>
        <div class="detail-douban">
          <a :href="film.film_url" target="_blank">豆瓣链接>></a>
        </div>
      </div>
      <div class="app-right">
        <app-watch></app-watch>
        <app-share></app-share>
      </div>
    </div>
  </div>
</template>

<script>
import { formatTime } from '@/utils/time'
import { mapState, mapActions } from 'vuex'
import AppWatch from '@/components/public/AppWatch'
import AppShare from '@/components/public/AppShare'
import TopPreview from 'top-editor/src/lib/TopPreview.vue'
export default {
  metaInfo () {
    return {
      title: this.film.title || '无标题',
      titleTemplate: '%s - Sujor',
      meta: [
        {name: 'keywords', content: 'Sujor'},
        {name: 'description', content: 'Sujor'}
      ]
    }
  },
  data () {
    return {
      options: {}
    }
  },
  components: {
    AppWatch,
    AppShare,
    TopPreview
  },
  filters: {
    formatDate (value) {
      const timestamp = new Date(value)
      return formatTime(timestamp)
    }
  },
  computed: {
    ...mapState('modules/film', {
      film: state => state.film
    }),
    filmId () {
      return parseInt(this.$route.params.id)
    }
  },
  methods: {
    ...mapActions('modules/film', [
      'getFilm'
    ])
  },
  created () {
    this.getFilm({'film_id': this.filmId})
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
      .detail-background
        img
          width 80%
      .detail-title
        margin 50px 20px 30px 20px
        font-size 20px
        font-weight 400
      .detail-category
        margin 0 20px
        height 40px
        h5
          display inline-block
          padding 8px 15px
          margin 0 8px
          font-weight 350
          font-size 12px
          color $content-color
          background-color $success-color
          border-radius 5px
      .detail-info
        margin 10px 25px
        font-size 12px
        &:after
          display block
          content ''
          clear both
        .detail-created
          float left
        .detail-clicks
          float right
      .detail-summary
        margin 20px
        font-style italic
        font-weight 300
        font-size 14px
        line-height 24px
        text-align left
      .detail-content
        margin 20px
        font-weight 400
        font-size 16px
        line-height 30px
        color $content-color
        text-align left
      .detail-douban
        font-weight 400
        font-size 12px
        line-height 24px
        margin 0 auto
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
