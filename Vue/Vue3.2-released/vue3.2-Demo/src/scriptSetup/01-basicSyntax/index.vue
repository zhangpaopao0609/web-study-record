<script setup lang='ts'>
import { ref } from "vue";

const a = ref(1);
console.log('Hello Script Setup!!!');
</script>

<template>
  <h1>{{ a }}</h1>
</template>