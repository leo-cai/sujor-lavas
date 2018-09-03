<template>
  <div class="app-group">
    <div class="app-group-wrapper">
      <div class="app-group-one" :class="[
        {'left': type === 'left'}, {'right': type === 'right'}]">
        <div class="app-group-item-one" v-for="itemOne in list.slice(0, 3)" :key="itemOne.index">
          <a class="url" :href="'/'+ itemOne.type + '/' + itemOne.id" target="_blank">
            <!-- <progressive-img class="progressive" :src="itemOne.background_url" :placeholder="itemOne.pre_background_url" /> -->
            <progressive-background class="progressive" :src="itemOne.background_url" :placeholder="itemOne.pre_background_url" />
          </a>
          <div class="item-content">
            <div class="item-title">
              <a :href="'/'+ itemOne.type + '/' + itemOne.id" target="_blank" v-text="itemOne.title"></a>
            </div>
            <div class="item-category"><h5 v-for="category in itemOne.categories" :key="category.category_id" v-text="category.category_name"></h5></div>
            <div class="item-summary"><i>{{itemOne.summary}}</i></div>
            <div class="item-time">{{itemOne.username}} -{{itemOne.created_time | formatDay}}</div>
          </div>
        </div>
      </div>
      <div class="app-group-two" :class="[
        {'left ml': type === 'left'}, {'right mr': type === 'right'}]">
        <div class="app-group-item-two" v-for="itemTwo in list.slice(3, 5)" :key="itemTwo.index">
          <a class="url" :href="'/'+ itemTwo.type + '/' + itemTwo.id" target="_blank">
            <progressive-background class="progressive" :src="itemTwo.background_url" :placeholder="itemTwo.pre_background_url" />
          </a>
          <div class="item-content">
            <div class="item-title">
              <a :href="'/'+ itemTwo.type + '/' + itemTwo.id" target="_blank" v-text="itemTwo.title"></a>
            </div>
            <div class="item-category"><h5 v-for="category in itemTwo.categories" :key="category.category_id" v-text="category.category_name"></h5></div>
            <div class="item-summary"><i>{{itemTwo.summary}}</i></div>
            <div class="item-time">{{itemTwo.username}} -{{itemTwo.created_time | formatDay}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- title -->
    <slot></slot>
  </div>
</template>

<script>
import {formatDay} from '@/utils/time'
export default {
  props: [
    'type', // 左右类型
    'list' // 列表数据
  ],
  filters: {
    formatDay (value) {
      const timestamp = new Date(value)
      return formatDay(timestamp)
    }
  }
}
</script>

<style lang="stylus" scoped>
@require '~@/assets/stylus/variable'

.app-group
  overflow hidden
  .app-group-wrapper
    &:after
      display block
      content ''
      clear both
    .left
      float left
    .right
      float right
    .ml
      margin-left 20px
    .mr
      margin-right 20px
    .app-group-one
      display grid
      gap 20px
      width 475px
      .app-group-item-one
        width 100%
        height 260px
        .url
          width 50%
          height 100%
          overflow hidden
          float left
          .progressive
            width 100%
            height 100%
            transition all 0.8s
            &:hover
              transform scale(1.08)
        .item-content
          float left
          width 50%
          height 260px
          background-color #F2F2F2
          .item-title
            display block
            margin 10px
            font-size 16px
            font-weight 400
            overflow hidden
            height 46px
            line-height 23px
            display -webkit-box
            -webkit-box-orient vertical
            -webkit-line-clamp 2
          .item-category
            margin 0 10px
            height 40px
            overflow hidden
            white-space nowrap
            text-overflow ellipsis
            h5
              display inline-block
              padding 8px 15px
              margin 0 8px
              font-weight 350
              font-size 12px
              color $content-color
              background-color $success-color
              border-radius 5px
              
          .item-summary
            margin 0 10px
            font-size 13px
            font-weight 300
            overflow hidden
            height 114px
            line-height 19px
            display -webkit-box
            -webkit-box-orient vertical
            -webkit-line-clamp 6
            text-align left
          .item-time
            margin 0 10px
            font-size 12px
            font-weight 350
            overflow hidden
            height 40px
            line-height 40px

    .app-group-two
      display grid
      gap 20px
      &:after
        display block
        content ''
        clear both
      .app-group-item-two
        width 400px
        height 400px
        .url
          display block
          width 400px
          height 200px
          overflow hidden
          .progressive
            width 100%
            height 100%
            transition all 0.8s
            &:hover
              transform scale(1.08)
        
        .item-content
          width 100%
          height 200px
          background-color #F2F2F2
          .item-title
            display block
            margin 0 10px
            height 65px
            line-height 65px
            font-size 16px
            font-weight 400
            overflow hidden
            white-space nowrap
            text-overflow ellipsis
          .item-category
            margin 0 10px
            height 40px
            overflow hidden
            white-space nowrap
            text-overflow ellipsis
            h5
              display inline-block
              padding 8px 15px
              margin 0 8px
              font-weight 350
              font-size 12px
              color $content-color
              background-color $success-color
              border-radius 5px
          .item-summary
            margin 0 10px
            font-size 13px
            font-weight 300
            height 57px
            line-height 19px
            overflow hidden
            display -webkit-box
            -webkit-box-orient vertical
            -webkit-line-clamp 3
            text-align left
          .item-time
            margin 0 10px
            font-size 12px
            font-weight 350
            overflow hidden
            height 40px
            line-height 40px

@media only screen and (max-width $max-width)
  .app-group
    .app-group-wrapper
      .app-group-one
        width 320px
        .app-group-item-one
          height 180px
          .url
            width 160px
            height 180px
          .item-content
            width 160px
            height 180px
            .item-title
              margin 5px 10px
              font-size 14px
              font-weight 400
              height 36px
              line-height 18px
            .item-category
              height 30px
              h5
                padding 5px 12px
                font-size 11px
            .item-summary
              font-size 12px
              height 80px
              line-height 16px
              display -webkit-box
              -webkit-box-orient vertical
              -webkit-line-clamp 5
            .item-time
              font-size 11px
              height 24px
              line-height 24px

      .app-group-two
        .app-group-item-two
          width 280px
          height 280px
          .url
            width 280px
            height 140px
          
          .item-content
            width 100%
            height 140px
            .item-title
              height 38px
              line-height 38px
              font-size 14px
            .item-category
              height 30px
              h5
                padding 5px 12px
                font-size 11px
            .item-summary
              font-size 12px
              height 48px
              line-height 16px
            .item-time
              font-size 11px
              height 24px
              line-height 24px
</style>

