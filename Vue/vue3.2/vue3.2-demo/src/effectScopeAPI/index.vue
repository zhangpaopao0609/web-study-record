<script setup lang='ts'>
import { effectScope, ref, computed, watch, watchEffect } from "vue";

const counter = ref(1);
const scope = effectScope()

scope.run(() => {
  const doubled = computed(() => counter.value * 2);
  watch(doubled, () => console.log("doubled", doubled.value));
  watchEffect(() => console.log('Count: ', doubled.value));
});

const closeEffectScope = () => scope.stop();
</script>

<template>
  <button @click="counter++">点击加1: {{ counter }}</button>
  <button @click="closeEffectScope">点击关闭 effectScope</button>
</template>