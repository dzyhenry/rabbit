<template>
  <ul class="nav nav-pills">
    <li v-on:click="switchTab(0)" v-bind:class="{ 'active': isSelected0 }"><a v-link="{ path: '/course' }">首页</a></li>
    <li v-on:click="switchTab(1)" v-bind:class="{ 'active': isSelected1 }"><a v-link="{ path: '/course/list' }">课程</a></li>
    <li v-on:click="switchTab(2)" v-bind:class="{ 'active': isSelected2 }"><a v-link="{ path: '/course/about' }">关于</a></li>
  </ul>
</template>
<script>
  export default {
    data() {
      return {
        isSelected0: true,
        isSelected1: false,
        isSelected2: false,
      };
    },
    methods: { 
      switchTab(selectedTab) {
        switch(selectedTab) {
          case 0:
            this.isSelected0 = true;
            this.isSelected1 = false;
            this.isSelected2 = false;
            break;
          case 1:
            this.isSelected0 = false;
            this.isSelected1 = true;
            this.isSelected2 = false;
            break;
          case 2:
            this.isSelected0 = false;
            this.isSelected1 = false;
            this.isSelected2 = true;
          default:
            break;
        }
      },
    },
  };
</script>
