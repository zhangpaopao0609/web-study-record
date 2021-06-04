<template>
  <!-- <teleport-test /> -->
  <SuspenseTest />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TeleportTest from "./Teleport/Index.vue";
import SuspenseTest from "./Suspense/Index.vue";

export default defineComponent({
  components: { TeleportTest, SuspenseTest },
  setup() {
    
  },
})
</script>
