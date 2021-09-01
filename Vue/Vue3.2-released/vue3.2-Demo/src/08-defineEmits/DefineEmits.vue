<script setup lang="ts">
// 这样是没有任何的类型检查的
const emit = defineEmits(['handleClick', 'handleChange']);

const handleClick = () => emit('handleClick', Date.now()+'');
const handleChange = () => emit('handleChange', Date.now());
</script>

<template>
  <button @click="handleClick">点击触发父组件监听的clilk事件</button>
  <input type="checkbox" @change="handleChange">
</template>

<style scoped lang="scss">

</style>