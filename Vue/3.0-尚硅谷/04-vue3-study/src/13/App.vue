<template>
  <h2>toRaw 和 markRaw</h2>
  <h3>{{ state1 }}</h3>
  <h3>toRaw: {{ stateToRwa }}</h3>
  <hr>

  <h3>markRaw: {{ state2 }}</h3>

  <hr>
  <button @click="updateToRaw">更新 toRaw</button>
  <button @click="updateMarkRaw">更新 markRaw</button>
</template>

<script lang="ts">
import { defineComponent, reactive, toRaw, markRaw } from 'vue'

export default defineComponent({
  setup() {
    const state1 = reactive({
      name: 'ardor',
      age: 12,
    });

    const stateToRwa = toRaw(state1);
    const updateToRaw = () => {
      // state1.name += '--1';
      stateToRwa.name += '--1';
    }
    
    // const state2 = reactive({
    //   name: 'ardor',
    //   age: 12,
    // });
    const state2 = reactive(markRaw({
      name: 'ardor',
      age: 12,
    }));
    const updateMarkRaw = () => {
      state2.name += '--1';
    }

    return {
      state1,
      stateToRwa,
      state2,
      updateToRaw,
      updateMarkRaw,
    }
  },
})
</script>
