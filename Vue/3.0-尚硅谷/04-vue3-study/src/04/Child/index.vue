<template>
  child
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Child',
  beforeCreate() {
    console.log('child-beforeCreate');
  },
  created() {
    console.log('child-created');
  },
  beforeMount() {
    console.log('child-beforeMount');
  },
  mounted() {
    console.log('child-mounted');
  },
  setup() {
    console.log('child-setup');
    console.log(`child-${this}`);
  },
})
</script>
