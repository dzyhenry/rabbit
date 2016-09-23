<style>
.view {
  transition: all .5s ease;
}
.test-enter, .test-leave {
  opacity: 0;
  transform: translate3d(10px, 0, 0);
}
.v-link-active {
  color: red;
}
[v-cloak] {
  display: none;
}
</style>
<template>
  <div class="container">
    <header class="top-nav">
      <component :is="NavTop"></component>
    </header>
    <div>
      <router-view class="view" transition="test" transition-mode="out-in" keep-alive></router-view>
    </div>
    <footer>
    </footer>
  </div>
</template>

<script>
import NavTop from './NavTop.vue';
import store from '../store/store'
export default {
  store,
  components: { NavTop },
  data () {
    return {
      NavTop: 'NavTop',
    };
  },
}
</script>
