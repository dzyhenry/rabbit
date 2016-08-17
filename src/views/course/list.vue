<template>
  <div class="content">
  <table class="table">
    <thead>
      <tr>
        <th>课程名称</th>
        <th>任课老师</th>
        <th>开始时间</th>
        <th>结束时间</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="course in courses">
        <td>{{course.courseName}}</td>
        <td>{{course.teacher}}</td>
        <td>{{course.startTime}}</td>
        <td>{{course.endTime}}</td>
      </tr>
    </tbody>
  </table>
    <a class="btn" v-link="{ path: '/course/create' }">新建课程</a>
  </div>
</template>
<script>
  export default {
    vuex: {
      getters: {
        courses: state => state.courses.courseList,
      },
    },
  };
</script>
