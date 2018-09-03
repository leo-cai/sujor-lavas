/**
 * @file modules/index module
 * @author leo
 */

import api from '../apis/index'
import {NETWORK_ERROR} from '../config'

const SET_INDEX_CODE_LIST = 'SET_INDEX_CODE_LIST'
const SET_INDEX_MUSIC_LIST = 'SET_INDEX_MUSIC_LIST'
const SET_INDEX_FILM_LIST = 'SET_INDEX_FILM_LIST'
const SET_INDEX_BOOK_LIST = 'SET_INDEX_BOOK_LIST'

const state = () => {
  return {
    /**
    * 首页codeList
    * 
    * @type {Array}
    */
    indexCodeList: [],
    /**
    * 首页musicList
    * 
    * @type {Array}
    */
    indexMusicList: [],
    /**
    * 首页filmList
    * 
    * @type {Array}
    */
    indexFilmList: [],
    /**
    * 首页bookList
    * 
    * @type {Array}
    */
    indexBookList: []
  }
}

const mutations = {
  [SET_INDEX_CODE_LIST] (state, indexCodeList) {
    state.indexCodeList = indexCodeList
  },
  [SET_INDEX_MUSIC_LIST] (state, indexMusicList) {
    state.indexMusicList = indexMusicList
  },
  [SET_INDEX_FILM_LIST] (state, indexFilmList) {
    state.indexFilmList = indexFilmList
  },
  [SET_INDEX_BOOK_LIST] (state, indexBookList) {
    state.indexBookList = indexBookList
  }
}

const actions = {
  // 获取indexList
  async getIndexList ({commit}, params) {
    const limit = params.limit
    let promise = api.getIndexList(limit)
    await promise.then((response) => {
      console.log(response.data)
      commit('SET_INDEX_CODE_LIST', response.data.data.codes)
      commit('SET_INDEX_MUSIC_LIST', response.data.data.musics)
      commit('SET_INDEX_FILM_LIST', response.data.data.films)
      commit('SET_INDEX_BOOK_LIST', response.data.data.books)
    }).catch((error) => {
      console.log(error)
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
