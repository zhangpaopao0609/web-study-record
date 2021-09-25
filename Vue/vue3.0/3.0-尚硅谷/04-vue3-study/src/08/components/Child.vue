<template>
  <h2>Child 子级组件</h2>
  <h3>{{ msg }}</h3>
  <button @click="handleUpdate">来吧</button>
</template>

<script lang="ts">
import { 
  defineComponent, 
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
} from 'vue';

export default defineComponent({
  setup() {
    const msg = ref('h');
    const handleUpdate = () => {
      msg.value += '1';
    };
    
    onBeforeMount(() => {
      console.log('3.x 中的 onBeforeMount');
    });
    onMounted(() => {
      console.log('3.x 中的 onMounted');
    });
    onBeforeUpdate(() => {
      console.log('3.x 中的 onBeforeUpdate');
    });
    onUpdated(() => {
      console.log('3.x 中的 onUpdated');
    });
    onBeforeUnmount(() => {
      console.log('3.x 中的 onBeforeUnmount');
    });
    onUnmounted(() => {
      console.log('3.x 中的 onUnmounted');
    });

    return {
      msg,
      handleUpdate,
    };
  },
  beforeCreate() {
    console.log('2.x 中的 beforeCreate');
  },
  created() {
    console.log('2.x 中的 created');
  },
  beforeMount() {
    console.log('2.x 中的 beforeMount');
  },
  mounted() {
    console.log('2.x 中的 mounted');
  },
  beforeUpdate() {
    console.log('2.x 中的 beforeUpdate');
  },
  updated() {
    console.log('2.x 中的 updated');
  },
  beforeUnmount() {
    console.log('2.x 中的 beforeUnmount');
  },
  unmounted() {
    console.log('2.x 中的 unmounted');
  },
})
</script>
