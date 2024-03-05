<script setup lang="ts">
interface List {
  id: number,
  content: string,
  isDone: boolean,
};

const props = defineProps({
  title: String,
  list: Array,
});

// const props = defineProps<{
//   title: string,
//   list: List,
// }>();
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