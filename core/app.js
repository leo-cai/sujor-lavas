/**
 * @file entry
 * @author leo(hellocailiang@163.com)
 */

import Vue from 'vue';
import Meta from 'vue-meta';


import AppComponent from './App.vue';
import axios from 'axios';
import VueSimplemde from 'vue-simplemde';
import VueProgressiveImage from 'vue-progressive-image'

import {createRouter} from '@/.lavas/router';
import {createStore} from '@/.lavas/store';
import { getCookie } from '../utils/cookie';

import 'simplemde/dist/simplemde.min.css';

Vue.use(Meta);
Vue.use(VueSimplemde);
Vue.use(VueProgressiveImage);

Vue.config.productionTip = false;

Vue.http = axios;

// set axios defaults
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.common['Authorization'] = `Bearer ${getCookie('session_token')}`;

export function createApp() {
    let router = createRouter();
    let store = createStore();
    let App = Vue.extend({
        router,
        store,
        ...AppComponent
    });
    return {App, router, store};
}

if (module.hot) {
    module.hot.accept();
}
