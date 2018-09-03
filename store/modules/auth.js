import api from '../apis/auth'
import {NETWORK_ERROR} from '../config'
import {updateCookie, deleteCookie} from '../../utils/cookie'

const state = () => {}

const mutations = {}

const actions = {
  // 注册
  async signUp ({commit}, params) {
    let promise = api.signUp(params.user)
    await promise.then((response) => {
      console.log(response.data)
      // 根据code码 判断返回结果
      if (response.data.code === -1) {
        commit('public/common/SET_NOTIFICATION', {
          type: 'warning',
          message: response.data.msg
        }, {root: true})
      } else {
        // 成功则前往登录
        commit('public/common/SET_NOTIFICATION', {
          type: 'success',
          message: response.data.msg
        }, {root: true})
        commit('public/appHeader/SET_SIGN_UP_VISIBLE', false, {root: true})
        commit('public/appHeader/SET_SIGN_IN_VISIBLE', true, {root: true})
      }
    }).catch((error) => {
      console.log(error)
      commit('public/common/SET_NOTIFICATION', {
        type: 'error',
        message: NETWORK_ERROR
      }, {root: true})
    })
  },

  // 登录
  async signIn ({commit}, params) {
    let promise = api.signIn(params.user)
    await promise.then((response) => {
      console.log(response.data)
      // 根据code码 判断返回结果
      if (response.data.code === -1) {
        commit('public/common/SET_NOTIFICATION', {
          type: 'warning',
          message: response.data.msg
        }, {root: true})
      } else {
        // 成功则前往后台首页
        commit('public/common/SET_NOTIFICATION', {
          type: 'success',
          message: response.data.msg
        }, {root: true})
        // 关闭窗口
        commit('public/appHeader/SET_SIGN_IN_VISIBLE', false, {root: true})
        // user_id, username, user_avatar 和 signed_time 存入cookie
        let userInfo = {
          'userId': response.data.data.user_id,
          'username': response.data.data.username,
          'avatar': response.data.data.avatar,
          'signed_time': response.data.data.signed_time
        }
        updateCookie('userInfo', userInfo, response.data.data.expires)
        // session_token 存入cookie
        updateCookie('session_token', response.data.data.token, response.data.data.expires)
      }
    }).catch((error) => {
      console.error(error)
      commit('public/common/SET_NOTIFICATION', {
        type: 'error',
        message: NETWORK_ERROR
      }, {root: true})
    })
  },

  // 退出登录
  async signOut (params) {
    let promise = api.signOut(params.username)
    await promise.then((response) => {
      console.log(response.data)
      // 根据code码 判断返回结果
      if (response.data.code === -1) {
        that.$message({
          message: response.data.msg,
          type: 'warning'
        })
      } else {
        that.$message({
          message: response.data.msg,
          type: 'success'
        })
        // 成功则清除cookie
        deleteCookie('userInfo')
        deleteCookie('session_token')
      }
    }).catch((error) => {
      console.error(error)
      commit('public/common/SET_NOTIFICATION', {
        type: 'error',
        message: NETWORK_ERROR
      }, {root: true})
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
