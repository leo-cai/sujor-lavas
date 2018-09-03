<template>
  <div class="app-mask">
    <slot></slot>
  </div>
</template>

<style lang="stylus" scoped>
.app-mask
  position fixed
  width 100%
  height 100%
  top 0
  bottom 0
  left 0
  right 0
  z-index 998
  background rgba(0 ,0 ,0 ,0.45)
</style>
