<template>
  <h2>自定义hook 函数操作</h2>
  <p>X: {{ x }}</p>
  <p>Y: {{ y }}</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useGetMousePosition from "./composables/useGetMousePosition.js";

// 需求1： 用户在页面中点击页面，把点击的位置的横纵坐标收集起来并展示出来
export default defineComponent({
  name: 'App',
  // setup() {
  //   const x = ref(0);
  //   const y = ref(0);

  //   const handler = e => {
  //     x.value = e.clientX;
  //     y.value = e.clientY;
  //   };

  //   onMounted(() => {
  //     window.addEventListener('mousemove', handler);
  //   });

  //   onBeforeUnmount(() => {
  //     window.removeEventListener('mousemove', handler);
  //   });

  //   return {
  //     x,
  //     y,
  //   };
  // },

  setup() {
    const { x, y } = useGetMousePosition();
    return {
      x,
      y,
    };
  }
})
</script>
