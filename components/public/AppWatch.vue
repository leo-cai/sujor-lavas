<!-- borrowed from https://www.jianshu.com/p/34fbd8078ad7 -->
<template>
  <div class="app-watch">
    <h5>时钟</h5>
    <canvas width="180" height="180" id="clock">
      您的浏览器不支持canvas
    </canvas>
  </div>
</template>

<script>
export default {
  methods: {
  },
  mounted () {
    // let canvas = document.getElementById('clock')
    // if (canvas.getContext) {
    // }
  }
}
</script>


<style lang="stylus" scoped>
@require '~@/assets/stylus/variable'
  
.app-watch
  margin-bottom 20px
  background white
  h5
    font-size 16px
    line-height 40px

@media only screen and (max-width $max-width)
  .app-watch
    h5
      font-size 14px
      line-height 30px
</style>
