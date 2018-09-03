import Vue from 'vue'
import * as config from '../config'

export default {
  getCodeList (page, limit) {
    let apiUrl = `${config.API_ROOT}v1/codes?page=${page}&limit=${limit}`
    return Vue.http.get(apiUrl)
  },
  getCode (codeId) {
    let apiUrl = `${config.API_ROOT}v1/code?code_id=${codeId}`
    return Vue.http.get(apiUrl)
  }
}
