<script setup lang='ts'>
import { ref } from "@vue/reactivity";
import Item from "../Item/index.vue";

interface Item {
  id: number,
  text: string,
  isDone: boolean,
};

const props = defineProps<{ list: Item[] }>();
const emit = defineEmits<{
  (e: 'handleDelete', id: number): void,
}>();

const handleDelete = (id: number) => {
  emit('handleDelete', id);
};
</script>

<template>
  <div v-for="item in list">
    <Item
      :key="item.id"
      :text="item.text"
      :is-done="item.isDone"
      @handle-delete="handleDelete(item.id)"
    />
  </div>
</template>

<style scoped lang="scss">
  
</style>
