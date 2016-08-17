import Vue from 'vue';
import Vuex from 'vuex';
import courses from './mutations/CourseMutations';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    courses,
  },
  strict: debug,
});
