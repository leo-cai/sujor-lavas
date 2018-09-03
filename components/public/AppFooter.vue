<template>
  <footer class="app-footer">
    <div class="app-footer-wrapper">
      <div class="app-footer-copyright">
        <span>Copyright © 2017-</span>
        <span v-text="currentYear"></span>
        <router-link to='/'> Sujor.com </router-link>
      </div>
      <div class="app-footer-beian">
        <a href="http://www.miitbeian.gov.cn/">
          苏ICP备17072558号
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  computed: {
    currentYear () {
      return new Date().getFullYear().toString()
    }
  }
}
</script>

<style lang="stylus" scoped>
@require '~@/assets/stylus/variable'
  
.app-footer
  display table
  width 100%
  height $app-footer-height
  background-color white
  font-size 14px
  .app-footer-wrapper
    display table-cell
    vertical-align middle
    max-width 1280px
    margin 0 auto
    transition transform 0.3s ease-out
</style>


