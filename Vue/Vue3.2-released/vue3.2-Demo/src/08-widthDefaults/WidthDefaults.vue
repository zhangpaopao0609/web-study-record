<script setup lang="ts">
const props = withDefaults(defineProps<{
  title: string,
  list: List.Basic[],
}>(), {
  title: 'Hello withDefaults',
  list: () => [{ id: 3, content: '3', isDone: false }],
});
</script>

<template>
  <p>{{ title }}</p>
  <ul>
    <li v-for="item in list">
      <span>{{ item.content }}</span>
      <input type="checkbox" :checked="item.isDone"/>
    </li>
  </ul>
</template>

<style scoped lang="scss">

</style>