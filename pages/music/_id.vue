<template>
  <div class="app-index">
    <div class="app-wrapper">
      <div class="app-left">
        <!-- Music Detail -->
        <progressive-img class="detail-background" :src="music.background_url" :placeholder="music.pre_background_url" />
        <div class="detail-title" v-text="music.title"></div>
        <div class="detail-category">
          <h5 v-for="category in music.categories" :key="category.category_id" v-text="category.category_name"></h5>
        </div>
        <div class="detail-info">
          <div class="detail-created"><i><a :href="'/user/' + music.user_id" v-text="music.username"></a><span>  发布于：</span><span>{{music.created_time | formatDate}}</span></i></div>
          <div class="detail-clicks"><i><span>阅读数：</span><span>{{music.clicks}}</span></i></div>
        </div>

        <aplayer :autoplay="true"
          :showLrc="true"
          repeat="repeat-one"
          :music="{
            title: music.title,
            artist: music.artist,
            src: music.music_url,
            pic: music.cover,
            lrc: music.lyric
          }"
        />

        <div class="detail-lyric">
          <top-preview :content="'' + music.lyric_content" :options="options"></top-preview>
        </div>

        <div class="detail-summary">摘要：{{music.summary}}</div>
        <div class="detail-content">
          <top-preview :content="'' + music.content" :options="options"></top-preview>
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
import Aplayer from 'vue-aplayer'
export default {
  metaInfo () {
    return {
      title: this.music.title || '无标题',
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
    TopPreview,
    Aplayer
  },
  filters: {
    formatDate (value) {
      const timestamp = new Date(value)
      return formatTime(timestamp)
    }
  },
  computed: {
    ...mapState('modules/music', {
      music: state => state.music
    }),
    musicId () {
      return parseInt(this.$route.params.id)
    }
  },
  methods: {
    ...mapActions('modules/music', [
      'getMusic'
    ])
  },
  created () {
    this.getMusic({'music_id': this.musicId})
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
