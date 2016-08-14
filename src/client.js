import Vue from 'vue';
import VueRouter from 'vue-router';
import { configRouter } from './router';
/**
 * 引入 bootstrap-3 中 bootstrap.css 基础样式库
 */
require('bootstrap/dist/css/bootstrap.css');
require('./styles/layout.css');

// install router
Vue.use(VueRouter);

// create router
const router = new VueRouter({
  history: true,
  saveScrollPosition: true,
});

// configure router
configRouter(router);

// boostrap the app
const App = Vue.extend(require('./views/routeView.vue'));
router.start(App, '#app');

// just for debugging
window.router = router;
