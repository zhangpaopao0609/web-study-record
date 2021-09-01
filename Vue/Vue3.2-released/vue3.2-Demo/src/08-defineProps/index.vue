<script setup lang="ts">
import TypeDeclaration from "./TypeDeclaration.vue";

const list = [
  { id: 1, content: '1', isDone: false },
  { id: 2, content: '2', isDone: true },
]

const title = 'TypeDeclaration';
</script>

<template>
  <TypeDeclaration :title="title" :list="list"/>
</template>

<style scoped lang="scss">

</style>