<template>
  <div id="app" :class="{scrollable : isPageLoading}">
    <app-header></app-header>
    <transition
      :name="pageTransitionEffect"
      @before-enter="handleBeforeEnter"
      @after-enter="handleAfterEnter"
      @before-leave="handleBeforeLeave">
      <keep-alive
        :include="[...keepAlivePages]">
        <router-view
          :key="routerViewKey"
          class="app-view"
          :data-page-id="$route.fullPath"
        ></router-view>
      </keep-alive>
    </transition>
    <app-footer></app-footer>
    <!-- sign in -->
    <sign-in></sign-in>
    <!-- sign up -->
    <sign-up></sign-up>
    <!-- loading -->
    <app-loading></app-loading>
    <!-- notification -->
    <app-notification></app-notification>
    <!-- to top -->
    <app-to-top></app-to-top>
    <!-- update toast -->
    <update-toast></update-toast>
  </div>
</template>

<script>
import Vue from 'vue'
import {mapState, mapActions} from 'vuex'
import AppHeader from '@/components/public/AppHeader'
import AppFooter from '@/components/public/AppFooter'
import SignIn from '@/components/public/SignIn'
import SignUp from '@/components/public/SignUp'
import AppLoading from '@/components/public/AppLoading'
import AppNotification from '@/components/public/AppNotification'
import AppToTop from '@/components/public/AppToTop'
import UpdateToast from '@/components/public/UpdateToast'
import {keepAlivePages} from '@/.lavas/router'

const ENABLE_SCROLL_CLASS = 'app-view-scroll-enabled'

export default {
  name: 'app',
  components: {
    UpdateToast,
    AppHeader,
    AppFooter,
    SignIn,
    SignUp,
    AppLoading,
    AppNotification,
    AppToTop
  },
  computed: {
    ...mapState('pageTransition', {
      pageTransitionType: state => state.type,
      pageTransitionEffect: state => state.effect
    }),

    ...mapState('public/common', {
      scrollPostionMap: state => state.scrollPostionMap,
      isPageLoading: state => state.isPageLoading
    }),

    pageTransitionClass () {
      return `transition-${this.pageTransitionType}`
    },

    // https://github.com/lavas-project/lavas/issues/119
    routerViewKey () {
      let {name, params} = this.$route
      let paramKeys = Object.keys(params)
      if (paramKeys.length) {
        return name + paramKeys.reduce((prev, cur) => prev + params[cur], '')
      }
      return null
    }
  },
  data () {
    return {
      // https://github.com/lavas-project/lavas/issues/112
      keepAlivePages
    }
  },
  methods: {
    ...mapActions('public/common', [
      'setPageSwitching',
      'savePageScrollPosition'
    ]),

    /**
     * make current page container scrollable,
     * and restore its scroll position.
     */
    restoreContainerScrollPosition (containerEl, scrollTop) {
      containerEl.classList.add(ENABLE_SCROLL_CLASS)
      containerEl.scrollTop = scrollTop
    },

    /**
     * make body scrollable,
     * and restore its scroll position.
     */
    restoreBodyScrollPosition (containerEl, scrollTop) {
      containerEl.classList.remove(ENABLE_SCROLL_CLASS)
      document.body.scrollTop = document.documentElement.scrollTop = scrollTop
    },

    handleBeforeEnter (el) {
      let pageId = el.dataset.pageId
      let {y: scrollTop = 0} = this.scrollPostionMap[pageId] || {}
      this.setPageSwitching(true)
      Vue.nextTick(() => {
        this.restoreContainerScrollPosition(el, scrollTop)
      })
    },

    handleAfterEnter (el) {
      let pageId = el.dataset.pageId
      let {y: scrollTop = 0} = this.scrollPostionMap[pageId] || {}
      this.setPageSwitching(false)
      this.restoreBodyScrollPosition(el, scrollTop)
    },
    handleBeforeLeave (el) {
      let pageId = el.dataset.pageId
      let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
      this.restoreContainerScrollPosition(el, scrollTop)
      // save current scroll position in a map
      this.savePageScrollPosition({
        pageId,
        scrollPosition: {y: scrollTop}
      })
    }
  }
}
</script>

<style lang="stylus">
@import '~@/assets/stylus/variable'
@import '~@/assets/stylus/main'

$page-transition-duration = 0.35s

.scrollable
  overflow scroll
  overflow-y hidden

#app
    font-family "Microsoft YaHei", "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    text-align center
    height 100%
    width 100%

    .application--wrap
        height 100%
        min-height 100%

    .app-view
        -webkit-overflow-scrolling touch
        background-color $background-white
        &::-webkit-scrollbar
            width 0
            background transparent

        &.transition-slide
            transition transform $page-transition-duration cubic-bezier(0, 0, 0.2, 1)

            &.slide-left-enter
                transform translate(100%, 0)

            &.slide-left-enter-active
                box-shadow 0 0 16px 2px rgba(0, 0, 0, 0.3)

            &.slide-right-enter
                transform translate(-30%, 0)
                transition-timing-function linear

            &.slide-right-leave-active
                transform translate(100%, 0)
                box-shadow 0 0 16px 2px rgba(0, 0, 0, 0.3)
                z-index 99

            &.slide-left-leave-active
                transform translate(-30%, 0)
                transition-timing-function linear

            &.app-view-scroll-enabled,
            &.slide-left-enter-active,
            &.slide-left-leave-active,
            &.slide-right-enter-active,
            &.slide-right-leave-active
                overflow-y auto

        &.transition-fade
            opacity 1
            transition opacity 1s ease

            &.fade-enter
                opacity 0

            &.fade-leave-active
                opacity 0
</style>
