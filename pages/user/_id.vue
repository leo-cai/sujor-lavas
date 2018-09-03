<template>
  <div class="app-index">
    <div class="app-wrapper">
      <div class="app-left">
        <!-- User Settings -->
      </div>
      <div class="app-right">
        <div class="app-watch">
          11111 naozhong
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  metaInfo () {
    return {
      title: `${this.user.user_name} 的个人主页`,
      titleTemplate: '%s - Sujor',
      meta: [
        {name: 'keywords', content: 'Sujor'},
        {name: 'description', content: 'Sujor'}
      ]
    }
  },
  data () {
    return {
      user: {
        user_name: 'Leo'
      }
    }
  }
};
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
      background-color white
</style>
