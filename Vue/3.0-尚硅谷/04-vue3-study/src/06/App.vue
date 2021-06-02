<template>
  <div>
    <p>{{ a }}</p>
    <p>{{ b.info }} <button @click="updateB">更新 b</button></p>
    <p>{{ c.info }} <button @click="updateC">更新 c</button></p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';

export default defineComponent({
  setup() {
    const a = ref(0);
    const b = reactive({
      info: 'b-info',
    });
    const c = ref({
      info: 'c-info',
    });
    const d = reactive(1);
    const e = ref([]);
    const f = reactive([]);

    const bb = reactive(false)

    const updateB = () => {
      b.info = 'b-' + Date.now();
    };

    const updateC = () => {
      c.value.info = 'c-' + Date.now();
    };

    return {
      a,
      b,
      c,
      updateB,
      updateC,
    };
  },
});
</script>
