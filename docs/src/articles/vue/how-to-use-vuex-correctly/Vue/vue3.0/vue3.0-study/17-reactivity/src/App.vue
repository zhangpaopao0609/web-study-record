<template>
  <div>
    {{ count }}
  </div>
</template>

<script>
// import { reactive, ref } from 'vue';
import { reactive, ref } from 'vue';

// const state = reactive({
//   count: 0,
// });
// console.log(state.count);

// const count = ref(0);
// console.log(count.value);
// count.value += 1;
// console.log(count.value);

export default {
  setup() {
    const count = ref(2);
    const otherCount = ref(10);
    const state = reactive({ count });
    console.log(state.count);
    state.count = otherCount;
    console.log(state.count);
    console.log(count.value);

    return { count };
  }
};
</script>

<style>
</style>
