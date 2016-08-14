/* eslint  global-require: 0 */
export function configRouter(router) {
  router.map({
    '/': {
      component: require('./views/course/index.vue'),
    },
    '/index': {
      component: require('./views/course/index.vue'),
    },
    '/course': {
      component: require('./views/course/list.vue'),
    },
    '/course/create': {
      component: require('./views/course/create.vue'),
    },
    '/about': {
      component: require('./views/about.vue'),
    },
    '/course/parent': {
      component: require('./views/course/parent.vue'),
    },

    '*': {
      component: require('./views/notFound.vue'),
    },
  });

  // redirect
  router.redirect({
    '/info': '/about',
  });

  /* eslint no-param-reassign: 0 no-alert: 0 */
  router.beforeEach((transition) => {
    if (transition.to.path === '/forbidden') {
      router.app.authenticating = true;
      setTimeout(() => {
        router.app.authenticating = false;
        alert('this route is forbidden by a global before hook');
        transition.abort();
      }, 3000);
    } else {
      transition.next();
    }
  });
}
