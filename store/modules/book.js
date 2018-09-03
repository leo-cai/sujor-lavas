/**
 * @file modules/book module
 * @author leo
 */

import api from '../apis/book'
import {NETWORK_ERROR, NO_MORE_DATA} from '../config'

const SET_BOOK = 'SET_BOOK'
const SET_BOOK_LIST = 'SET_BOOK_LIST'

const state = () => {
  return {
     /**
     * 列表
     *
     * @type {Array}
     */
    bookList: [],

    /**
     * 详情
     *
     * @type {Object}
     */
    book: {
      categories: []
    }
  }
}

const mutations = {
  [SET_BOOK_LIST](state, bookList) {
    state.bookList = bookList
  },
  [SET_BOOK](state, book) {
    state.book = book
  }
}

const actions = {
  // 获取 bookList
  async getBookList ({commit, state}, params) {
    const page = params.page
    const limit = params.limit
    let promise = api.getBookList(page, limit)
    await promise.then((response) => {
      const list = response.data.data.list
      // 判断是否还有数据
      if (list.length > 0) {
        const divide = limit / 2
        const length =  Math.ceil(list.length / divide)
        for (let i = 0; i < length; i++) {
          let temp = list.slice(i * divide, (i + 1) * divide)
          state.bookList.push(temp)
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
  // 获取 book 详情
  async getBook ({commit}, params) {
    const bookId = params.book_id
    let promise = api.getBook(bookId)
    await promise.then((response) => {
      console.log(response.data)
      commit('SET_BOOK', response.data.data)
    }).catch((error) => {
      console.log(error)
      commit('public/common/SET_NOTIFICATION', {
        type: 'error',
        message: NETWORK_ERROR
      }, {root: true})
    })
  },
  // 设置 bookList
  setBookList ({commit}, bookList) {
    commit(SET_BOOK_LIST, bookList)
  },
  // 设置 book
  setBook ({commit}, book) {
    commit(SET_BOOK, book)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
