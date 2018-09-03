<template>
  <div class="app-button">
    <input type="button" :value="value" />
  </div>
</template>

<script>
export default {
  props: [
    'value',
    'onclick'
  ]
}
</script>


<style lang="stylus" scoped>
@require '~@/assets/stylus/variable'

.app-button
  margin 10px 0
  input
    margin 5px 0
    padding 10px 0
    border none
    border-radius 5px
    outline 0
    width 100%
    text-align center
    font-size 16px
    font-weight bold
    cursor pointer
    background-color $theme-color
    color $background-white
    letter-spacing 8px
    text-indent 8px
    &:hover
      background-color $theme-light-color
</style>

