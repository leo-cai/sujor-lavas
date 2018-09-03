import Vue from 'vue'
import * as config from '../config'

export default {
  getBookList (page, limit) {
    let apiUrl = `${config.API_ROOT}v1/books?page=${page}&limit=${limit}`
    return Vue.http.get(apiUrl)
  },
  getBook (bookId) {
    let apiUrl = `${config.API_ROOT}v1/book?book_id=${bookId}`
    return Vue.http.get(apiUrl)
  }
}
