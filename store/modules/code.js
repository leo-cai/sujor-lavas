/**
 * @file modules/code module
 * @author leo
 */

import api from '../apis/code'
import {NETWORK_ERROR, NO_MORE_DATA} from '../config'

const SET_CODE = 'SET_CODE'
const SET_CODE_LIST = 'SET_CODE_LIST'

const state = () => {
  return {

    /**
     * 列表
     *
     * @type {Array}
     */
    codeList: [],
    
    /**
     * 详情
     *
     * @type {Object}
     */
    code: {
      categories: [],
      background_url: '',
      pre_background_url: ''
    }
  }
}

const getters = {
  code: state => state.code
}

const mutations = {
  [SET_CODE_LIST](state, codeList) {
    state.codeList = codeList
  },
  [SET_CODE](state, code) {
    state.code = code
  }
}

const actions = {
  // 获取 codeList
  async getCodeList ({commit, state}, params) {
    const page = params.page
    const limit = params.limit
    let promise = api.getCodeList(page, limit)
    await promise.then((response) => {
      const list = response.data.data.list
      // 判断是否还有数据
      if (list.length > 0) {
        const divide = limit / 2
        const length =  Math.ceil(list.length / divide)
        for (let i = 0; i < length; i++) {
          let temp = list.slice(i * divide, (i + 1) * divide)
          state.codeList.push(temp)
        }
      } else {
        commit('public/common/SET_NOTIFICATION', {
          type: 'warning',
          message: NO_MORE_DATA
        }, {root: true})
      }
    }).catch((error) => {
      console.log(error)
      commit('public/common/SET_NOTIFICATION', {
        type: 'error',
        message: NETWORK_ERROR
      }, {root: true})
    })
  },
  // 获取 code 详情
  async getCode ({commit}, params) {
    const codeId = params.code_id
    let promise = api.getCode(codeId)
    await promise.then((response) => {
      console.log(response.data)
      commit('SET_CODE', response.data.data)
    }).catch((error) => {
      console.log(error)
      commit('public/common/SET_NOTIFICATION', {
        type: 'error',
        message: NETWORK_ERROR
      }, {root: true})
    })
  },
  // 设置 codeList
  setCodeList ({commit}, codeList) {
    commit(SET_CODE_LIST, codeList)
  },
  // 设置 code
  setCode ({commit}, code) {
    commit(SET_CODE, code)
  }
}

export default {
  namespaced: true,
  getters,
  state,
  mutations,
  actions
}
