<script setup lang='ts'>
import { onMounted } from "@vue/runtime-core";

const props = defineProps<{ 
  msg: string,
  list: { id: number, content: string }[]
  user: object,
}>();
</script>

<template>
  <div class="msg">{{ msg }}</div>
  <div>
    {{ user.name }}
  </div>
  <ul>
    <li v-for="item in list" :key="item.id">
      {{ item.content }}
    </li>
  </ul>
</template>

<style>
.msg { 
  color: red; 
}
</style>