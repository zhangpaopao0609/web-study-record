<template>
  <h2>Suspense 的使用</h2>
  <Suspense>
    <template #default>
      <AsyncComponent />  
    </template>
    <template #fallback>
      <h2>loading</h2>
    </template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue'
// 引入组件：静态引入和动态引入

// vue2 中的动态引入组件的写法：（在vue3中这种写法不行）
// const AsyncComponent = () => import("./components/AsyncComponent.vue");
// vue3 中的动态引入组件的写法
const AsyncComponent = defineAsyncComponent(() => import("./components/AsyncComponent.vue"));

export default defineComponent({
  components: { AsyncComponent },
  setup() {
    
  },
})
</script>
