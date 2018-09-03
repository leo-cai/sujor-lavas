<template>
  <app-mask v-show="signUpVisible">
    <div class="app-sign">
      <!-- cross -->
      <a @click="hideSignUp()" class="cross">
        <img src="../../static/img/cross.svg" onerror="this.onerror=null; this.src='../../static/img/cross.png'" ondragstart="return false;" alt="close" />
      </a>
      <!-- sign form -->
      <div class="sign-form">
        <h3>注册</h3>
        <app-input v-model="user.username" type="text" placeholder="请输入邮箱" />
        <app-input v-model="user.password" type="password" placeholder="请输入密码" />
        <app-input v-model="user.repassword" type="password" placeholder="请确认密码" />
        <app-button @click.native="handleSignUp()" value="确定" />
        <div class="form-link">
          <a @click="toSignIn()">前往登录>></a>
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
        password: '',
        repassword: ''
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
      signUpVisible: state => state.signUpVisible
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
      'signUp'
    ]),
    // 展示登录
    showSignIn () {
      this.setSignInVisible(true)
    },
    // 隐藏注册
    hideSignUp () {
      this.setSignUpVisible(false)
    },
    // 前往登录页
    toSignIn () {
      this.hideSignUp()
      this.showSignIn()
    },
     // 按esc 关闭窗口
    handleSignUpEsc (e) {
      if (e.keyCode === 27) {
        this.hideSignUp()
      }
    },
    // 注册事件
    handleSignUp () {
      if (!this.user.username || !this.user.password || !this.user.repassword) {
        this.setNotification({
          type: 'warning',
          message: '邮箱和密码不能为空'
        })
        return
      } else if (this.user.password !== this.user.repassword) {
        this.setNotification({
          type: 'warning',
          message: '两次密码不相同'
        })
        return
      }
      this.signUp({user: this.user})
    }
  },
  mounted () {
    window.addEventListener('keyup', this.handleSignUpEsc)
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
</style>
