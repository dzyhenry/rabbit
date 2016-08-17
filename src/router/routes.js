/* eslint  global-require: 0 */
export default {
  '/': {
    component: require('../views/course/index.vue'),
  },
  '/index': {
    component: require('../views/course/index.vue'),
  },
  '/course/list': {
    component: require('../views/course/list.vue'),
  },
  '/course/create': {
    component: require('../views/course/create.vue'),
  },
  '/about': {
    component: require('../views/about.vue'),
  },

  '*': {
    component: require('../views/notFound.vue'),
  },
};
