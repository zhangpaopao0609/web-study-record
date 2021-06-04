<template>
  <div class="footer-container">
    <p>1</p>
    <div>
      <button>All</button>
      <button>Active</button>
      <button>Completed</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Footer',
})
</script>

<style lang="scss" scoped>
.footer-container {
  display: flex;
  align-items: center;
}
</style>
