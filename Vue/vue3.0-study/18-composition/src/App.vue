<template>
  <div>
    {{ counter }}
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  setup() {
    const counter = ref(0);
    const repositories = ref([]);

    watch(counter, () => {
      console.log(`counter change ${counter.value}`);
    });

    console.log(repositories.value);

    return {
      counter,
      repositories,
    };
  },
};
</script>

<style>
</style>
