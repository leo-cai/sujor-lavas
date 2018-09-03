<template>
  <div class="app-index">
    <div class="app-wrapper">
      <div class="app-left">
        <!-- Book Detail -->
        <progressive-img class="detail-background" :src="book.background_url" :placeholder="book.pre_background_url" />
        <div class="detail-title" v-text="book.title"></div>
        <div class="detail-category">
          <h5 v-for="category in book.categories" :key="category.category_id" v-text="category.category_name"></h5>
        </div>
        <div class="detail-info">
          <div class="detail-created"><i><a :href="'/user/' + book.user_id" v-text="book.username"></a><span>  发布于：</span><span>{{book.created_time | formatDate}}</span></i></div>
          <div class="detail-clicks"><i><span>阅读数：</span><span>{{book.clicks}}</span></i></div>
        </div>
        <div class="detail-summary">摘要：{{book.summary}}</div>
        <div class="detail-content">
          <top-preview :content="'' + book.content" :options="options"></top-preview>
        </div>
        <progressive-img class="detail-cover" :src="book.cover" :placeholder="book.pre_cover" />
        <div class="detail-douban">
          <a :href="book.book_url" target="_blank">豆瓣链接>></a>
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
      title: this.book.title || '无标题',
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
    ...mapState('modules/book', {
      book: state => state.book
    }),
    bookId () {
      return parseInt(this.$route.params.id)
    }
  },
  methods: {
    ...mapActions('modules/book', [
      'getBook'
    ])
  },
  created () {
    this.getBook({'book_id': this.bookId})
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
        width 60%
        margin 0 auto
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
      .detail-cover
        width 30%
        margin 0 auto
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
