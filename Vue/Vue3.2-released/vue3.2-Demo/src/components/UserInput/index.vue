<script lang="ts">
  export default { name: 'UserInput' };
</script>

<script setup lang='ts'>
import { ref } from "@vue/reactivity";
const emit = defineEmits<{
  (e: 'handleInput', value: string): void,
}>();
const inputValue = ref('');

const handleInput = () => {
  if(!inputValue.value.trim()) return;
  emit('handleInput', inputValue.value);
  inputValue.value = '';
};
</script>

<template>
  <div>
    <el-input
      v-model="inputValue"
      placeholder="请输入内容"
      @keypress.native.enter="handleInput"
    />
  </div>
</template>

<style scoped lang="scss">
  
</style>
