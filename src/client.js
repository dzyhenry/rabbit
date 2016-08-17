import Vue from 'vue';
import store from './vuex/store';
import router from './router/router';
import App from './views/App.vue';
import { sync } from 'vuex-router-sync';
/**
 * 引入 bootstrap-3 中 bootstrap.css 基础样式库
 */
require('bootstrap/dist/css/bootstrap.css');
require('./styles/layout.css');

// sync store with router
sync(store, router);

// boostrap the app
const vue = Vue.extend(App);
router.start(vue, '#app');

// just for debugging
window.router = router;
