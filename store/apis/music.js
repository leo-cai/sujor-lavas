import Vue from 'vue'
import * as config from '../config'

export default {
  getMusicList (page, limit) {
    let apiUrl = `${config.API_ROOT}v1/musics?page=${page}&limit=${limit}`
    return Vue.http.get(apiUrl)
  },
  getMusic (musicId) {
    let apiUrl = `${config.API_ROOT}v1/music?music_id=${musicId}`
    return Vue.http.get(apiUrl)
  }
}
