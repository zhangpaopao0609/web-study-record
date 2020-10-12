<template>
  <div id="app">
    <div @click="arrow++">app</div>
    <Home>
      这是一个匿名插槽
      <template v-slot:arrow="{ paopao  }">
        不会吧
        {{ paopao.try }}
      </template>
    </Home>
    <About />
  </div>
</template>

<script>
import Home from './views/Home'
import About from './views/About'

export default {
  components: {
    Home,
    About
  },
  data() {
    return {
      arrow: 0
    }
  },
  provide() {
    return {
      foo: this
    }
  },
  methods: {
    
  }
}
</script>

<style lang="scss">

</style>
