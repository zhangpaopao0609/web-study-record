<script setup lang="ts">
import { useAttrs } from "vue";

const attrs = useAttrs()
console.log('TestUseAttrs', attrs);
</script>

<template>
  <h1> Here is slots test!!</h1>
</template>
