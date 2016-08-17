import routes from './routes';
import Vue from 'vue';
import VueRouter from 'vue-router';

// install router
Vue.use(VueRouter);

const router = new VueRouter({
  history: true,
  saveScrollPosition: true,
});
router.map(routes);
// redirect
router.redirect({
  '/info': '/about',
});

export default router;
