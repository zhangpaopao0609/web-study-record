<template>
  <input type="text" v-model="data">
</template>

<script lang="ts">
import { defineComponent, customRef } from 'vue'

// 需求，利用 customRef 实现一个 debounce 方法，（防抖，当触发事件完全结束后delay才执行， 节流是每隔delay执行一次）
const useCustomRefImplementDebounce = (data: string, delay=500) => {
  let timeout: any;
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return data;
      },
      set(newVal: string) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          console.log('data change!!');
          data = newVal;
          trigger();
        }, delay);
      },
    };
  });
};

export default defineComponent({
  setup() {
    const data = useCustomRefImplementDebounce('hello');
    return {
      data,
    };
  },
})
</script>
