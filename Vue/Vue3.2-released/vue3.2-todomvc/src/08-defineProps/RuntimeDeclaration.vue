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
  <p></p>
  <ul>
    <li></li>
  </ul>
</template>

<style scoped lang="scss">

</style>