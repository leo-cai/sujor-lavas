<template>
  <header class="app-header" v-fix>
    <!-- wrapper -->
    <div class="app-header-wrapper">
      <div class="app-header-left">
        <router-link to="/" class="app-header-logo">
          <img src="../../static/img/logo/logo.png" alt="logo">
        </router-link>
        <!-- menu -->
        <ul>
          <li v-for="(menu, index) in menuList" :key="index">
            <router-link :to="menu.url" v-text="menu.name"></router-link>
          </li>
        </ul>
      </div>
      <div class="app-header-right">
        <div class="app-header-sign" v-if="signInState">
          <router-link :to='"/user/" + userInfo.userId'>
            <img :src="userInfo.avatar" v-if="userInfo.avatar" />
            <div class="wave"></div>
          </router-link>
        </div>
        <div class="app-header-sign" v-else>
          <a @click="showSignUp()">注册</a>
          <span> | </span>
          <a @click="showSignIn()">登录</a>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import {mapActions} from 'vuex'
import _ from '@/utils/underscore'
import {getCookie} from '@/utils/cookie'
export default {
  data () {
    return {
      menuList: [
        {name: '首页', url: '/'},
        {name: '代码', url: '/codes'},
        {name: '音乐', url: '/musics'},
        {name: '电影', url: '/films'},
        {name: '书籍', url: '/books'}
      ],
      userInfo: {}
    }
  },
  computed: {
    signInState () {
      return getCookie('session_token') ? true : false
    },
    // userInfo () {
    //   return getCookie('userInfo')
    // }
  },
  methods: {
    ...mapActions('public/appHeader', [
      'setSignInVisible',
      'setSignUpVisible'
    ]),
    // ...mapActions('public/common', [
    //   'setPageLoading'
    // ]),
    // sign in 遮罩
    showSignIn () {
      // this.setPageLoading(true)
      // setTimeout(() => {
      //   this.setPageLoading(false)
      // }, 2000)
      this.setSignInVisible(true)
    },
    // sign up 遮罩
    showSignUp () {
      this.setSignUpVisible(true)
    }
  },
  directives: {
    fix: {
      inserted (el) {
        let beforeScrollTop = document.documentElement.scrollTop || window.pageYOffset || window.scrollY || document.body.scrollTop
        window.addEventListener('scroll', _.throttle(() => {
          let afterScrollTop = document.documentElement.scrollTop || window.pageYOffset || window.scrollY || document.body.scrollTop
          let delta = afterScrollTop - beforeScrollTop
          if (delta === 0) return false
          delta > 0 ? el.classList.add('fixed') : el.classList.remove('fixed')
          afterScrollTop > 0 ? el.classList.add('darken') : el.classList.remove('darken')
          setTimeout(() => {
            beforeScrollTop = afterScrollTop
          }, 0)
        }, 200))
      },
      unbind () {
        window.onscroll = null
      }
    }
  },
}
</script>

<style lang="stylus" scoped>
@require '~@/assets/stylus/variable'

.app-header
  position fixed
  top 0
  z-index 997
  width 100%
  height $app-header-height
  background-color white
  transition (All .3s ease-in-out)
  transform (translateY(0))
  &.darken
    box-shadow 0 1px 5px $shadow-color
  &.fixed
    transform (translateY(-100%))
  .app-header-wrapper
    max-width $max-width
    height $app-header-height
    margin 0 auto
    font-size 14px
    &:after
      display block
      content ''
      clear both
    .app-header-left
      float left
      margin-left 10px
      .app-header-logo
        line-height $app-header-height
        img
          vertical-align middle
          width 100px
      ul
        display inline-block
        li
          line-height $app-header-height
          height $app-header-height
          display inline-block
          padding 0 20px
          &:hover
            background-color $shadow-color
    .app-header-right
      line-height $app-header-height
      float right
      margin-right 10px
      .app-header-sign
        .wave
          position relative
          width 45px
          height 45px
          margin-top 7px
          background-color rgb(118, 218, 255)
          border-radius 50%
          &:before, &:after
            content ""
            position absolute
            width 45px
            height 45px
            top 0
            left 50%
            background-color rgba(255, 255, 255, .4)
            border-radius 40%
            transform translate(-50%, -70%) rotate(0)
            animation rotate 6s linear infinite
            z-index 10
          &:after
            border-radius 47%
            background-color rgba(255, 255, 255, .9)
            transform translate(-50%, -70%) rotate(0)
            animation rotate 10s linear -5s infinite
            z-index 20
          @keyframes rotate
            50%
              transform translate(-50%, -73%) rotate(180deg)
            100%
              transform translate(-50%, -70%) rotate(360deg)
</style>
