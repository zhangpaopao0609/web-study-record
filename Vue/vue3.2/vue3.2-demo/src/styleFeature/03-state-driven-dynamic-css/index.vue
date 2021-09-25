<script setup lang="ts">
import { ref } from "vue";
const color = ref('red');

setTimeout(() => color.value = 'blue' , 2000);
</script>

<template>
  <p>hello</p>
</template>

<style scoped>
p {
  color: v-bind(color);
}
</style>