<template>
  <transition name="slide-fade"  v-if="notificationVisible">
    <div class="notification-wrapper" :key="notification.message">
      <div class="notification-message" :class="[
        {'info': notification.type === 'info'},
        {'success': notification.type === 'success'},
        {'warning': notification.type === 'warning'},
        {'error': notification.type === 'error'}
        ]">
        {{notification.message}}
      </div>
    </div>
  </transition>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  data () {
    return {
      'timer': 2500 // 多少秒后自动关闭
    }
  },
  computed: {
    ...mapState('public/common', {
      notificationVisible: state => state.notificationVisible,
      notification: state => state.notification
    })
  },
  watch: {
    'notification': 'hideTimeOut'
  },
  methods: {
    ...mapActions('public/common', [
      'setNotificationVisible'
    ]),
    // 关闭通知框
    hideNotification () {
      this.setNotificationVisible(false)
    },
    // 关闭通知的定时器
    hideTimeOut () {
      setTimeout(() => {
        this.hideNotification()
      }, this.timer)
    }
  }
}
</script>

<style lang="stylus" scoped>
@require '~@/assets/stylus/variable'

.slide-fade-enter-active
  transition all .3s ease

.slide-fade-leave-active
  transition all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)

.slide-fade-enter, .slide-fade-leave-to
  transform translateY(-10px)
  opacity 0

.notification-wrapper
  width 100%
  z-index 999
  position fixed
  top $app-header-height
  .notification-message
    width $app-notification-width
    margin 0 auto
    font-size 14px
    line-height 30px
    border-radius 5px
  .info
    color $content-color
    background-color $info-color
  .success
    color $background-white
    background-color $success-color
  .warning
    color $background-white
    background-color $theme-color
  .error
    color $background-white
    background-color $fail-color
</style>
