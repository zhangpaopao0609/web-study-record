<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'

const list = [
  { id: 1, content: '1' }
]
</script>

<template>
  <HelloWorld
    msg="Hello Vue 3 + TypeScript + Vite"
    :list="list"
  />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
