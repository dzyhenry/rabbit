import { ADD_COURSE, REMOVE_COURSE, UPDATE_COURSE_LIST } from '../store/mutationTypes';
import request from '../../frameworks/createRequest';

export function AddCourse({ state, dispatch }, course) {
  dispatch(ADD_COURSE, course);
}

export function removeCourse({ state, dispatch }, course) {
  dispatch(REMOVE_COURSE, course);
}

export function fetchCourses({ dispatch }) {
  request(
    '/api/course/-/courselist',
    { json: true, 'x-requested-with': 'XMLHttpRequest' },
    (err, body) => {
      dispatch(UPDATE_COURSE_LIST, body.items);
    }
  );
}
