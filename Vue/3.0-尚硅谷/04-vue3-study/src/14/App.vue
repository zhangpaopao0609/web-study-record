<template>
  <h2>toRef</h2>
  <h3>{{ state }}</h3>
  <h3>useAgeAdd: {{ age }}</h3>
  <h3>useAgeAddToRef: {{ ageToRef }}</h3>
</template>

<script lang="ts">
import { defineComponent, reactive, Ref, toRef } from 'vue'

const useAgeAdd = (val: number) => {
  setInterval(() => {
    val += 1;
  }, 1000);
  return val;
};

const useAgeAddToRef = (val: Ref) => {
  setInterval(() => {
    val.value += 1;
  }, 1000);
  return val;
};

export default defineComponent({
  setup() {
    const state = reactive({
      name: 'ardor',
      age: 12,
    });

    const age = useAgeAdd(state.age);
    const ageToRef = useAgeAddToRef(toRef(state, 'age'));

    return {
      state,
      age,
      ageToRef,
    };
  },
})
</script>
