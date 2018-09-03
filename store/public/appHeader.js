/**
 * @file public/appHeader module
 * @author leo
 */

const SET_SIGN_IN_VISIBLE = 'SET_SIGN_IN_VISIBLE'
const SET_SIGN_UP_VISIBLE = 'SET_SIGN_UP_VISIBLE'

const state = () => {
  return {
    /**
    * 是否展示登录模态框
    * 
    * @type {boolean}
    */
   
    signInVisible: false,
    /**
    * 是否展示注册模态框
    * 
    * @type {boolean}
    */
    signUpVisible: false
  }
}

const mutations = {
  [SET_SIGN_IN_VISIBLE] (state, signInVisible) {
    state.signInVisible = signInVisible
  },
  [SET_SIGN_UP_VISIBLE] (state, signUpVisible) {
    state.signUpVisible = signUpVisible
  }
}

const actions = {
  setSignInVisible ({commit}, signInVisible) {
    commit(SET_SIGN_IN_VISIBLE, signInVisible)
  },
  setSignUpVisible ({commit}, signUpVisible) {
    commit(SET_SIGN_UP_VISIBLE, signUpVisible)
  }
}

export default {
  state,
  mutations,
  actions
}
