<script setup lang="ts">
import { ref } from 'vue';
// import { Tips } from "./type-test";

interface Tips {
  msg: string,
  title: string,
}
// props 的写法
// 1. defineProps<{ msg: string }>();
// 2. defineProps<Tips>()
defineProps<{ msg: string, title: string }>();
</script>

<template>
  <h3>{{ msg }}</h3>
  <h4>{{ title }}</h4>
</template>
