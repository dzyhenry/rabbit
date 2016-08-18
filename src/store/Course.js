/* eslint no-param-reassign: 0, no-shadow: 0 */
import { ADD_COURSE, REMOVE_COURSE } from './mutationTypes';

const state = {
  courseList: [
    {
      courseName: 'English',
      teacher: 'Henry',
      startTime: '2016-08-10',
      endTime: '2016-08-15',
    },
  ],
};

const mutations = {
  [ADD_COURSE](state, newCourse) {
    state.courseList = state.courseList.push(newCourse).slice();
  },
  [REMOVE_COURSE](state, removeCourse) {
    const index = state.courseList.indexOf(removeCourse).slice();
    if (index !== -1) {
      state.courseList.splice(index, 1);
    }
  },
};

export default {
  state,
  mutations,
};
