<template>
  <h2>this is parent</h2>
  <h3>test for teleport</h3>
  <model />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Model from "./components/Model.vue";

export default defineComponent({
  name: "TeleportTest",
  components: { Model },
  setup() {
    
  },
})
</script>
