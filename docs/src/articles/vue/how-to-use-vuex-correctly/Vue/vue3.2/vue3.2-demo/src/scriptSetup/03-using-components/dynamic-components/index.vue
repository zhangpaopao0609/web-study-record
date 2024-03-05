<script setup lang='ts'>
import { ref } from "vue";
import Bar from "./Components/Bar.vue";
import Foo from "./Components/Foo.vue";

const condition = ref(false);

setTimeout(() => condition.value = true, 2000);
</script>

<template>
  <component :is="Bar"/>
  <component :is="condition ? Bar : Foo"/>
</template>