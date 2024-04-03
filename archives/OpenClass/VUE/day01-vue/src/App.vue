<script>
import Home from './views/Home';
import About from './views/About';

export default {
  components: {
    Home,
    About,
  },
  provide() {
    return {
      foo: this,
    };
  },
  data() {
    return {
      arrow: 0,
    };
  },
  methods: {

  },
};
</script>

<template>
  <div id="app">
    <div @click="arrow++">
      app
    </div>
    <Home>
      这是一个匿名插槽
      <template #arrow="{ paopao }">
        不会吧
        {{ paopao.try }}
      </template>
    </Home>
    <About />
  </div>
</template>

<style lang="scss">

</style>
