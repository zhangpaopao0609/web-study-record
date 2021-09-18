<template>
  <child />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Child from "./Child/index.vue";

export default defineComponent({
  name: 'parent',
  components: {
    Child,
  },
  beforeCreate() {
    console.log('parent-beforeCreate');
  },
  created() {
    console.log('parent-created');
  },
  beforeMount() {
    console.log('parent-beforeMount');
  },
  mounted() {
    console.log('parent-mounted');
  },
  setup() {
    console.log('parent-setup');
    console.log(`parent-${this}`);
  },
})
</script>
