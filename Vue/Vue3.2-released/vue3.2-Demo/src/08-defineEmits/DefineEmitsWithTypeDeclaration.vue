<script setup lang="ts">
interface Click {
  id: string,
  val: number,
}
// 完美的类型检查
// List.Basic 是基于 ts 自动扫描 types 文件夹以及 delcare namespace 自动导入的
const emit = defineEmits<{
  (e: 'handleClickWithTypeDeclaration', data: Click): void,
  (e: 'handleChangeWithTypeDeclaration', data: List.Basic): void,
}>();

const handleClickWithTypeDeclaration = () => emit('handleClickWithTypeDeclaration', { id: '1', val: Date.now() });
const handleChangeWithTypeDeclaration = () => emit('handleChangeWithTypeDeclaration', {
  id: 1,
  content: 'change',
  isDone: false,
});
</script>

<template>
  <button @click="handleClickWithTypeDeclaration">点击触发父组件监听的clilk事件</button>
  <input type="checkbox" @change="handleChangeWithTypeDeclaration">
</template>

<style scoped lang="scss">

</style>