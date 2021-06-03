<template>
  <h5>this is child</h5>
  <ul v-for="(v, i) in todoList" :key="i">
    <li>{{ v }}</li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'

export default defineComponent({
  setup() {
    const todoList = inject<string[]>('todoList');
    return {
      todoList,
    };
  },
})
</script>
