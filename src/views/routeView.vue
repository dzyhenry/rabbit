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
import NavTop from '../components/NavTop.vue';
export default {
  components: { NavTop },
  data () {
    return {
      NavTop: 'NavTop',
    };
  },
  route: {
    canActivate (transition) {
      console.log('inbox canActivate?')
      if (transition.from.path === '/about') {
        alert('cannot navigate from /about to /inbox')
        transition.abort()
      } else {
        console.log('yes')
        transition.next()
      }
    },
    canDeactivate (transition) {
      return true; // confirm('Are you sure you want to leave inbox?')
    },
    activate () {
      console.log('activating inbox...')
      return new Promise((resolve) => {
        console.log('inbox activated.')
        resolve()
      })
    },
    deactivate ({ next }) {
      console.log('inbox deactivated.')
      next()
    }
  },
}
</script>
