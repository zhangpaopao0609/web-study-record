<script setup lang='ts'>
defineProps<{ msg: string }>();
</script>

<template>
  <div class="msg">{{ msg }}</div>
</template>

<style>
.msg { 
  color: red; 
}
</style>