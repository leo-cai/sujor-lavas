/**
 * @file modules/music module
 * @author leo
 */

import api from '../apis/music'
import {NETWORK_ERROR, NO_MORE_DATA} from '../config'

const SET_MUSIC = 'SET_MUSIC'
const SET_MUSIC_LIST = 'SET_MUSIC_LIST'

const state = () => {
  return {
     /**
     * 列表
     *
     * @type {Array}
     */
    musicList: [],

    /**
     * 详情
     *
     * @type {Object}
     */
    music: {
      categories: []
    }
  }
}

const mutations = {
  [SET_MUSIC_LIST](state, musicList) {
    state.musicList = musicList
  },
  [SET_MUSIC](state, music) {
    state.music = music
  }
}

const actions = {
  // 获取 musicList
  async getMusicList ({commit, state}, params) {
    const page = params.page
    const limit = params.limit
    let promise = api.getMusicList(page, limit)
    await promise.then((response) => {
      const list = response.data.data.list
      // 判断是否还有数据
      if (list.length > 0) {
        const divide = limit / 2
        const length =  Math.ceil(list.length / divide)
        for (let i = 0; i < length; i++) {
          let temp = list.slice(i * divide, (i + 1) * divide)
          state.musicList.push(temp)
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
  // 获取 music 详情
  async getMusic ({commit}, params) {
    const musicId = params.music_id
    let promise = api.getMusic(musicId)
    await promise.then((response) => {
      console.log(response.data)
      commit('SET_MUSIC', response.data.data)
    }).catch((error) => {
      console.log(error)
      commit('public/common/SET_NOTIFICATION', {
        type: 'error',
        message: NETWORK_ERROR
      }, {root: true})
    })
  },
  // 设置 musicList
  setMusicList ({commit}, musicList) {
    commit(SET_MUSIC_LIST, musicList)
  },
  // 设置 music
  setMusic ({commit}, music) {
    commit(SET_MUSIC, music)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
