<script setup lang='ts'>
import { ref } from "vue";

import { capitalize } from "./capitalize";

const inputValue = ref('输入测试');
</script>

<template>
  <input type="text" :value="inputValue"/>
  <p>{{ capitalize('Hello World!!') }}</p>
</template>