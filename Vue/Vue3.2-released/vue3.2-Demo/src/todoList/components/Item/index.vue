<script setup lang='ts'>
import { computed, ref } from "@vue/reactivity";

interface Item {
  text: string,
  isDone: boolean,
};

const props = defineProps<Item>();
const emit = defineEmits<{
  (e: 'handleDelete'): void,
}>();

const isChecked = ref(false);
isChecked.value = props.isDone;

const isGrey = computed(() => isChecked.value ? 'grey' : 'black');
const isLineThrough = computed(() => isChecked.value ? 'line-through' : 'none');

const handleDelete = () => {
  emit('handleDelete');
};
</script>

<template>
  <div class="item">
    <el-checkbox v-model="isChecked" />
    <p class="text">{{ text }}</p>
    <el-button
      class="btn"
      size="mini"
      :type="isChecked ? 'info' : 'danger'"
      @click="handleDelete"
    >删除</el-button>
  </div>
</template>

<style scoped lang="scss">
// @import './index.scss';
.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
  height: 40px;
  color: v-bind(isGrey);
  text-decoration: v-bind(isLineThrough);  

  .text {
    flex: 1;
    margin-left: 20px;
    text-align: left;
  }
}
</style>
