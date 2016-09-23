/* eslint no-param-reassign: 0, no-shadow: 0 */
import { ADD_COURSE, REMOVE_COURSE, UPDATE_COURSE_LIST } from './mutationTypes';

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
  [UPDATE_COURSE_LIST](state, newCourseList) {
    state.courseList = newCourseList;
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
