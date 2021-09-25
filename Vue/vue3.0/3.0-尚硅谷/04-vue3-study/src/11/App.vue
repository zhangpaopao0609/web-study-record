<template>
  <h2>ref 的另一个作用： 可以获取页面中的元素</h2>
  <input type="text" ref="ourInput">
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

// 需求，当页面加载完毕后，页面中的文本框自动获取焦点
export default defineComponent({
  setup() {
    // 默认是空的，页面加载完毕，说明组件已经存在了，获取文本框元素
    const ourInput = ref<HTMLElement | null>(null);

    onMounted(() => {
      ourInput.value?.focus();
    });

    return {
      ourInput,
    };
  },
})
</script>
