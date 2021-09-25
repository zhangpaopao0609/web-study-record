<script setup lang="ts">
import { useSlots } from "vue";

const slot = useSlots();
console.log('TestUseSlots', slot.header && slot.header());
</script>

<template>
  <h1> Here is slots test!!</h1>
  <slot name="header"></slot>
</template>
