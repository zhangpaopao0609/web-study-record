<template>
  <div>{{ count }}</div>
  <button @click="handleAdd">+</button>
</template>

<script>
import { defineComponent, ref } from 'vue';
import useCountAdd from "./composables/useCountAdd";

export default defineComponent({
  setup() {
    const { count, handleAdd } = useCountAdd();
    
    return {
      count,
      handleAdd,
    };
  },
})
</script>
