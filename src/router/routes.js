/* eslint  global-require: 0 */
export default {
  '/course': {
    component: require('../views/routeView.vue'),
    subRoutes: {
      '/': {
        component: require('../views/course/Index.vue'),
      },
      '/list': {
        component: require('../views/course/List.vue'),
      },
      '/create': {
        component: require('../views/course/Create.vue'),
      },
      '/about': {
        component: require('../views/course/About.vue'),
      },
    },
  },
  '*': {
    component: require('../views/NotFound.vue'),
  },
};
