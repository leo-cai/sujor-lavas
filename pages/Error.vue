<template>
    <div class="page-error">
      <div class="space">
        <!-- 404 -->
        <div class="center" v-if="isNotFound">
          <!-- 4 -->
          <div class="four">
            4
          </div>
          <!-- 0 -->
          <div class="zero">
            <div class="ufo">
              <div class="head"></div>
              <div class="body">
                <div class="point1"></div>
                <div class="point2"></div>
                <div class="point3"></div>
                <div class="point4"></div>
              </div>
              <div class="light"></div>
            </div>
            <div class="planet">
              <div class="shadow"></div>
              <div class="crater">
                <div class="crater1"></div>
                <div class="crater2"></div>
                <div class="crater3"></div>
                <div class="crater4"></div>
              </div>
            </div>
          </div>
          <!-- 4 -->
          <div class="four">
            4
          </div>
          <p v-text="message"></p>
          <router-link class="back" to="/">返回首页>></router-link>
        </div>
        <!-- 500 -->
        <div class="center" v-else>
          <div class="four">
            500
          </div>
          <p v-text="message"></p>
          <router-link class="back" to="/">返回首页>></router-link>
        </div>
        <div class="stars">
          <div class="star"></div>
          <div class="star pink"></div>
          <div class="star blue"></div>
          <div class="star yellow"></div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'error',
  metaInfo: {
    title: '错误页',
    titleTemplate: '%s - Sujor',
    meta: [
      {name: 'keywords', content: 'Sujor'},
      {name: 'description', content: 'Sujor'}
    ]
  },
  computed: {
    // 判断404 or 500
    isNotFound () {
      return this.$route.params.error ? false : true
    },
    message () {
      return this.isNotFound ? '当前路径不存在' : '服务器内部错误'
    }
  },
  created () {
    let query = this.$route.query
    if (Object.keys(query).length !== 0) {
      this.$router.replace({
        name: 'error',
        params: query
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@require '~@/assets/stylus/variable'
.page-error
  padding-top $app-header-height
  width 100%
  height 100%
  overflow hidden
.space
  width 100%
  height 100%
  background #121212
  .center
    position absolute
    left 50%
    top 50%
    transform translate(-50%, -50%)

    .four
      display inline-block
      font-size 200px
      color $info-color
    .zero
      display inline-block
      .ufo
        position relative
        width 60px
        height 80px
        top 0
        margin 0 auto
        .head
          width 30px
          height 15px
          margin 0 auto
          border-radius 30px 30px 0 0
          background #333
        .body
          position relative
          width 60px
          height 15px
          margin-top -4px
          border-radius 50%
          background #333
          z-index 2
          .point1, .point2, .point3, .point4
            position absolute
            width 2px
            height 2px
            border-radius 50%
            background $theme-color
            box-shadow 0 0 2px 2px rgba(255, 255, 255, .3)
            opacity 0.2
            animation shine-ani 2s infinite ease-out
          .point1
            left 10%
            top 40%
          .point2
            left 35%
            top 20%
          .point3
            left 65%
            top 20%
          .point4
            left 90%
            top 40%
        .light
          width 20px
          margin -1px auto 0
          height 0
          border-width 0 2px 56px 2px
          border-style none solid solid
          border-color transparent transparent $theme-light-color
          z-index 1
          opacity 0.6
          animation light-ani 2s infinite ease-out
      .planet
        position relative
        width 150px
        height 150px
        border-radius 50%
        background $info-color
        overflow hidden
        z-index 2
        .shadow
          position absolute
          border-radius 50%
          height 100%
          width 100%
          top -30%
          right -10%
          border 35px solid rgba(0, 0, 0, .15)
        .crater
          .crater1, .crater2, .crater3, .crater4
            position absolute
            border-radius 50%
            background rgba(0, 0, 0, .3)
            box-shadow inset 3px 3px 0 rgba(0, 0, 0, .2)
          .crater1
            width 20px
            height 20px
            left 25%
            top 20%
          .crater2
            width 10px
            height 10px
            left 50%
            top 60%
          .crater3 
            width 15px
            height 15px
            left 30%
            top 60%
          .crater4 
            width 15px
            height 15px
            left 60%
            top 30%

  .star
    display block
    width 5px
    height 5px
    border-radius 50%
    background #FFF
    top 5%
    left 60%
    position relative
    transform-origin 100% 0
    animation star-ani 6s infinite ease-out
    box-shadow 0 0 5px 5px rgba(255, 255, 255, .3)
    opacity 0
    z-index 2
    &:after
      content ''
      display block
      border 0px solid #fff
      border-width 0px 90px 2px 90px
      border-color transparent transparent transparent rgba(255, 255, 255, .3)
      transform rotate(-45deg) translate3d(1px, 3px, 0)
      box-shadow 0 0 1px 0 rgba(255, 255, 255, .1)
      transform-origin 0% 100%

  .pink
    top 20%
    left 40%
    background #ff5a99
    animation-delay 5s
    &:after
      border-color transparent transparent transparent #ff5a99
      animation-delay 5s

  .blue
    top 5%
    left 70%
    background cyan
    animation-delay 7s
    &:after
      border-color transparent animation-delay 12s
      animation-delay 7s

  .yellow
    top 15%
    left 85%
    background #ffcd5c
    animation-delay 5.8s
    &:after
      border-color transparent transparent transparent #ffcd5c
      animation-delay 5.8s
  
  p
    font-size 30px
    color $theme-color
  
  .back
    font-size 16px
    color $theme-color
    &:hover
      color $theme-light-color
      text-decoration underline

@keyframes star-ani
  0%
    opacity 0
    transform scale(0) rotate(0) translate3d(0, 0, 0)
  50%
    opacity 1
    transform scale(1) rotate(0) translate3d(-250px, 250px, 0)
  100%
    opacity 0
    transform scale(1) rotate(0) translate3d(-500px, 500px, 0)

@keyframes shine-ani
  0%
    opacity 0.2
  50%
    opacity 1
  100%
    opacity 0.2

@keyframes light-ani
  0%
    opacity 0.6
  50%
    opacity 1
  100%
    opacity 0.6
</style>
