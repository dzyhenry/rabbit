import Vue from 'vue';
import Vuex from 'vuex';
import course from './Course';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    course,
  },
  strict: debug,
});
