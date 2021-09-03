<script setup lang="ts">
import { useCssModule } from "vue";
const css = useCssModule();
console.log(css);
</script>

<template>
  <p :class="$style.red"> This should be red</p>
</template>

<style module>
.red {
  color: red;
}
.blue {
  color: blue;
}
</style>