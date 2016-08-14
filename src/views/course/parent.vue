<template>
  <component :is="list"></component>
  <component :is="create"></component>
</template>
<script>
  import list from './list.vue';
  import create from './create.vue';
  export default {
    components: { list, create },
    data() {
      return {
        list: 'list',
        create: 'create',
        classes: [
          {
            className: '课程2',
            teather: 'xx2',
            startTime: '2016-08-12',
            endTime: '2016-08-20',
          },
          {
            className: '课程3',
            teather: 'xx3',
            startTime: '2016-08-12',
            endTime: '2016-08-20',
          }
        ],
      };
    },
  };
</script>
