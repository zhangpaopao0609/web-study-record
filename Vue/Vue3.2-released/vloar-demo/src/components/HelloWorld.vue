<script setup lang="ts">
import { ref } from "@vue/reactivity";

interface List {
  id: number,
  content: string,
}

defineProps<{
  msg: string,
  list: List[],
}>()
</script>

<template>
  <h1 class="code">{{ msg }}</h1>
  <ul>
    <li
      v-for="item in list"
      :key="item.id"
    >
      {{ item.content }}
  </li>
  </ul>
</template>

<style scoped>
.code {
  padding: 2px 4px;
  color: #304455;
}
.test {
  padding: 2px 4px;
  color: #304455;
}
</style>
