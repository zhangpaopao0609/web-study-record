<template>
  <h2>ref and shallowRef</h2>
  <h3>ref: {{ m1 }}</h3>
  <h3>shallowRef: {{ m2 }}</h3>
  <h3>shallowReactive: {{ m3 }}</h3>
  <hr>
  <button @click="handleUpdate">更新数据</button>
</template>

<script lang="ts">
import { defineComponent, ref, shallowRef, shallowReactive } from 'vue'

export default defineComponent({
  setup() {
    const m1 = ref({
      name: 'ardor',
      age: 22,
      wife: {
        name: 'lin',
        age: 20,
      },
    });

    const m2 = shallowRef({
      name: 'ardor',
      age: 22,
      wife: {
        name: 'lin',
        age: 20,
      },
    });

    const m3 = shallowReactive({
      name: 'ardor',
      age: 22,
      wife: {
        name: 'lin',
        age: 20,
      },
    });

    const handleUpdate = () => {
      m1.value.wife.name += '--';
      m2.value.wife.name += '--';
      m3.wife.name += '--';
    };

    return {
      m1,
      m2,
      m3,
      handleUpdate,
    }
  },
})
</script>
