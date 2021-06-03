<template>
  <h2>{{ age }}</h2>
  <h2>{{ state.age }}</h2>
  <h2>{{ name }}</h2>
  <h2>{{ wife.name }}</h2>
  <ul>
    <li v-for="(v, i) in children" :key="i">{{ v }}</li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  setup() { 
    const state = reactive({
      age: 20,
      name: 'ardor',
      wife: {
        age: 18,
        name: 'lin',
      },
      children: ['a', 'l'],
    });

    const { age, name, wife, children } = toRefs(state);

    setInterval(() => {
      age.value += 1;
      // children.push('11');
      console.log(toRefs(state));
    }, 2000)
    

    return {
      state,
      age,
      name,
      wife,
      children,
    };
  },
})
</script>
