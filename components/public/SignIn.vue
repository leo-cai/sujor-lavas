<template>
  <app-mask v-show="signInVisible">
    <div class="app-sign">
      <!-- cross -->
      <a @click="hideSignIn()" class="cross">
        <img src="../../static/img/cross.svg" onerror="this.onerror=null; this.src='../../static/img/cross.png'" ondragstart="return false;" alt="close" />
      </a>
      <!-- sign form -->
      <div class="sign-form">
        <h3>登录</h3>
        <app-input v-model="user.username" type="text" placeholder="请输入邮箱" />
        <app-input v-model="user.password" type="password" placeholder="请输入密码" />
        <app-button @click.native="handleSignIn()" value="确定" />
        <div class="form-link">
          <a @click="toFindPassword()">忘记密码？</a>
          <a @click="toSignUp()">前往注册>></a>
        </div>
      </div>
    </div>
  </app-mask>
</template>

<script>
import AppMask from '@/components/public/AppMask'
import AppInput from '@/components/public/AppInput'
import AppButton from '@/components/public/AppButton'
import {mapState, mapActions} from 'vuex'
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  components: {
    AppMask,
    AppInput,
    AppButton
  },
  computed: {
    ...mapState('public/appHeader', {
      signInVisible: state => state.signInVisible
    })
  },
  methods: {
    ...mapActions('public/appHeader', [
      'setSignInVisible',
      'setSignUpVisible'
    ]),
    ...mapActions('public/common', [
      'setNotification'
    ]),
    ...mapActions('modules/auth', [
      'signIn'
    ]),
    // 隐藏登录页
    hideSignIn () {
      this.setSignInVisible(false)
    },
    // 展示注册页
    showSignUp () {
      this.setSignUpVisible(true)
    },
    // 前往注册页
    toSignUp () {
      this.hideSignIn()
      this.showSignUp()
    },
    // 前往找回密码
    toFindPassword () {
      this.setNotification({
        type: 'warning',
        message: '暂未开放'
      })
    },
    // 按esc 关闭窗口
    handleSignInEsc (e) {
      if (e.keyCode === 27) {
        this.hideSignIn()
      }
    },
    // 登录事件
    handleSignIn () {
      if (!this.user.username || !this.user.password) {
        this.setNotification({
          type: 'warning',
          message: '邮箱和密码不能为空'
        })
        return
      }
      this.signIn({user: this.user})
    }
  },
  mounted () {
    window.addEventListener('keyup', this.handleSignInEsc)
  }
}
</script>

<style lang="stylus" scoped>
@require '~@/assets/stylus/variable'

.app-sign
  position absolute
  left 50%
  top 50%
  transform translate(-50%, -50%)
  width $app-sign-width
  .cross
    display block
    text-align right
    margin 20px 0
    img
      width 50px
      height 50px
      &:hover
        transform rotate(180deg)
        transition all 1s cubic-bezier(.29, .88, .65, .13)
  .sign-form
    padding 50px
    background $background-white
    h3
      letter-spacing 15px
      text-indent 15px
      font-size 30px
      margin 30px 0 50px
    .form-link
      margin 10px 0
      &:after
        display block
        content ''
        clear both
      a
        font-size 12px
        &:nth-child(1)
          float left
        &:nth-child(2)
          float right
</style>
