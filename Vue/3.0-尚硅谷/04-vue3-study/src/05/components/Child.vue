<template>
  <div>
    <slot name="slotTest" ></slot>
    <slot name="default" ></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    msg: String,
    t: {
      type: String,
      default: '1',
    },
  },
  setup(props, context) {
    console.log('child', props, context);
  },
})
</script>
