<template>
  <input type="text" v-model="data">
  <p>debounce: {{ data }}</p>
</template>

<script lang="ts">
import { defineComponent, customRef } from 'vue'

// 需求，利用 customRef 实现一个 debounce 方法，（防抖，当触发事件完全结束后delay才执行， 节流是每隔delay执行一次）
const useCustomRefImplementDebounce = (data: string, delay: number=500, cb: Function=() => {}) => {
  let timeout: number;
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return data;
      },
      set(newVal: string) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          cb();
          data = newVal;
          trigger();
        }, delay);
      },
    };
  });
};

export default defineComponent({
  setup() {
    const asyncHandler = () => setTimeout(() => {
      console.log('接口调用成功！！！！');
    }, 1000);
    const data = useCustomRefImplementDebounce('hello', 500, asyncHandler);
    return {
      data,
    };
  },
})
</script>
