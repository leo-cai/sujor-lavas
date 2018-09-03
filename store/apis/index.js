import Vue from 'vue'
import * as config from '../config'

export default {
  getIndexList (limit) {
    let apiUrl = `${config.API_ROOT}v1/index_list?limit=${limit}`
    return Vue.http.get(apiUrl)
  }
}
