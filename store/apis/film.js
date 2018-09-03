import Vue from 'vue'
import * as config from '../config'

export default {
  getFilmList (page, limit) {
    let apiUrl = `${config.API_ROOT}v1/films?page=${page}&limit=${limit}`
    return Vue.http.get(apiUrl)
  },
  getFilm (filmId) {
    let apiUrl = `${config.API_ROOT}v1/film?film_id=${filmId}`
    return Vue.http.get(apiUrl)
  }
}
