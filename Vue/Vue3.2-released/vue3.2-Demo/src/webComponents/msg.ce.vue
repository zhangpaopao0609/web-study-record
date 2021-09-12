<script setup lang='ts'>
import { defineProps } from "vue";

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