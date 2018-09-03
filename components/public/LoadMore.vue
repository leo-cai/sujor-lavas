<template>
  <a class="load-more" @click="handleLoadMore()">
    点击查看更多
  </a>
</template>

<script>
export default {
  methods: {
    handleLoadMore () {
      this.$emit('loadMore')
    }
  }
}
</script>

<style lang="stylus" scoped>
@require '~@/assets/stylus/variable'

.load-more
  display block
  cursor pointer
  margin 10px 20px 20px 20px
  font-size 13px
  line-height 25px
  background-color $background-white
  border-radius 5px
</style>
