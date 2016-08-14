<template>
  <div class="content">
    <div>
      <div class="input-group">
        <label>课程名称</label>
        <input type="text" />
      </div>
      <div class="input-group">
        <label>任课老师</label>
        <input type="text" />
      </div>
      <div class="input-group">
        <label>开始时间</label>
        <input type="datetime" />
      </div>
      <div class="input-group">
        <label>结束时间</label>
        <input type="datetime" />
      </div>
      <div class="input-group">
        <button v-on:click="save">保存</button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
    },
    methods: {
      save() {
        const newClass = {
          className: '课程1',
          teather: 'xx2',
          startTime: '2016-08-12',
          endTime: '2016-08-20',
        };
        this.$parent.classes.push(newClass);
      },
    },
  };
</script>
