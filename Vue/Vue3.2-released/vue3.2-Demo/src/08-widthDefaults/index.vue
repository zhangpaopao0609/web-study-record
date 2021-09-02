<script setup lang="ts">
import TypeDeclaration from "./WidthDefaults.vue";

const list = [
  { id: 1, content: '1', isDone: false },
  { id: 2, content: '2', isDone: true },
]

</script>

<template>
  <h1>传递了 props</h1>
  <TypeDeclaration title="TypeDeclaration" :list="list"/>

  <h1>未传递值，使用默认值</h1>
  <TypeDeclaration/>
</template>

<style scoped lang="scss">

</style>