/**
 * @file modules/film module
 * @author leo
 */

import api from '../apis/film'
import {NETWORK_ERROR, NO_MORE_DATA} from '../config'

const SET_FILM = 'SET_FILM'
const SET_FILM_LIST = 'SET_FILM_LIST'

const state = () => {
  return {
     /**
     * 列表
     *
     * @type {Array}
     */
    filmList: [],

    /**
     * 详情
     *
     * @type {Object}
     */
    film: {
      categories: []
    }
  }
}

const mutations = {
  [SET_FILM_LIST](state, filmList) {
    state.filmList = filmList
  },
  [SET_FILM](state, film) {
    state.film = film
  }
}

const actions = {
  // 获取 filmList
  async getFilmList ({commit, state}, params) {
    const page = params.page
    const limit = params.limit
    let promise = api.getFilmList(page, limit)
    await promise.then((response) => {
      const list = response.data.data.list
      // 判断是否还有数据
      if (list.length > 0) {
        const divide = limit / 2
        const length =  Math.ceil(list.length / divide)
        for (let i = 0; i < length; i++) {
          let temp = list.slice(i * divide, (i + 1) * divide)
          state.filmList.push(temp)
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
  // 获取 film 详情
  async getFilm ({commit}, params) {
    const filmId = params.film_id
    let promise = api.getFilm(filmId)
    await promise.then((response) => {
      console.log(response.data)
      commit('SET_FILM', response.data.data)
    }).catch((error) => {
      console.log(error)
      commit('public/common/SET_NOTIFICATION', {
        type: 'error',
        message: NETWORK_ERROR
      }, {root: true})
    })
  },
  // 设置 filmList
  setFilmList ({commit}, filmList) {
    commit(SET_FILM_LIST, filmList)
  },
  // 设置 film
  setFilm ({commit}, film) {
    commit(SET_FILM, film)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
