<script setup lang="ts">
import { reactive } from "vue";

import TestUseSlots from "./TestUseSlots.vue";
import TestUseAttrs from "./TestUseAttrs.vue";

const listItem = reactive({
  id: 1,
  name: 'paopao',
});

const handleClick = () => {};
</script>

<template>
  <TestUseSlots>
    <template #header>
      <p>This is header slots</p>
    </template>
  </TestUseSlots>

  <TestUseAttrs
    class="test-use-slots"
    :item="listItem"
    @click="handleClick"
  />
</template>
