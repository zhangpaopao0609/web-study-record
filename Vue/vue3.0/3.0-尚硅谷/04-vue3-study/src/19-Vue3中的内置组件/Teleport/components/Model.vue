<template>
  <button @click="modelOpen=true">打开模态框</button>
  <hr />
  <teleport to="body">
    <div v-if="modelOpen">
      <h2>this is model box</h2>
      <button @click="modelOpen=false">关闭模态框</button>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: "Model",
  setup() {
    const modelOpen = ref(false);
    return {
      modelOpen,
    };
  },
})
</script>
