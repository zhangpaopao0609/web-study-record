<script setup lang="ts">
import TypeDeclaration from "./TypeDeclaration.vue";
import RuntimeDeclaration from "./RuntimeDeclaration.vue";

const list = [
  { id: 1, content: '1', isDone: false },
  { id: 2, content: '2', isDone: true },
]

</script>

<template>
  <TypeDeclaration title="TypeDeclaration" :list="list"/>
  <RuntimeDeclaration title="RuntimeDeclaration" :list="list"/>
</template>

<style scoped lang="scss">

</style>