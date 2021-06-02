<template>
  <h2>APP 父级组件</h2>
  <button @click="isShow=!isShow">显示子组件</button>
  <hr />
  <child v-if="isShow" />
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, ref } from 'vue';
import Child from "./components/Child.vue";

export default defineComponent({
  components: { Child },
  setup() {
    const isShow = ref(false);
    return {
      isShow,
    }
  },
})
</script>
