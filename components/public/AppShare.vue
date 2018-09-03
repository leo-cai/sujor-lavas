<template>
  <div class="app-share">
    <h5>外链分享</h5>
    <div class="share-item">
      <a href="http://touchpianist.com/" target="_blank">弹个钢琴>></a>
    </div>
    <div class="share-item">
      <a href="http://rainyscope.com/" target="_blank">来点白噪音>></a>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
@require '~@/assets/stylus/variable'

.app-share
  margin-bottom 20px
  background white
  h5
    font-size 16px
    line-height 40px
  .share-item
    a
      font-size 13px
      line-height 22px
  

@media only screen and (max-width $max-width)
  .app-share
    h5
      font-size 14px
      line-height 30px
    .share-item
      a
        font-size 12px
        line-height 20px
</style>
