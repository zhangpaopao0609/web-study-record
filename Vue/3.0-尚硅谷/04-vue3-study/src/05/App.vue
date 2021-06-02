<template>
  <child 
    :msg="msg" 
    msg2="真香"
    class="test"
    @click="cliclkTest"
  >
    <template #slotTest>
      <h2>slot test</h2>
    </template>
  </child>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Child from "./components/Child.vue";

export default defineComponent({
  components: { Child },
  setup(props, context) {
    console.log('parent', props, context);

    const msg = 'parent';
    const cliclkTest = () => {
      console.log('test-attrs');
    };

    return {
      msg,
      cliclkTest,
    };
  },
})
</script>
