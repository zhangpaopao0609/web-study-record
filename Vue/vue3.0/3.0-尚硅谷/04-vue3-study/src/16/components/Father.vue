<template>
  <child />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Child from "./Child/Child.vue";

export default defineComponent({
  components: { Child },
  setup() {
    
  },
})
</script>
