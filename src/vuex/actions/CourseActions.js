import { ADD_COURSE, REMOVE_COURSE } from '../mutationTypes';

export function AddCourse({ state, dispatch }, course) {
  dispatch(ADD_COURSE, course);
}

export function removeCourse({ state, dispatch }, course) {
  dispatch(REMOVE_COURSE, course);
}
