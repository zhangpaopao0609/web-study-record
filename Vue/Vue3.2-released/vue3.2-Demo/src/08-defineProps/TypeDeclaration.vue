<script setup lang="ts">
// 暂不支持引入，因为 setup 语法糖会将 List 编译成一个变量，因此只能在文件内写
// import { List } from "./type";
interface List {
  id: number,
  content: string,
  isDone: boolean,
};

const props = defineProps<{
  title: string,
  list: List[],
}>();

// 这样是支持的
// const props = defineProps<{
//   title: string,
//   list: List.Basic[],
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