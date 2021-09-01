<script lang="ts">
  export default { name: 'App' }
</script>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import TestDefineExpose from "./TestDefineExpose.vue";

const TestDefineExposeRef = ref(null);

const handleCheckRef = () => {
  console.log(TestDefineExposeRef.value);
};

</script>

<template>
  <h3>官方文档链接：https://v3.vuejs.org/api/sfc-script-setup.html#defineexpose</h3>
  <TestDefineExpose ref="TestDefineExposeRef"/>
  <button @click="handleCheckRef">点击查看 TestDefineExposeRef</button>

  <p>实验结果是，不管又没有显示暴露，都可以拿到？？</p>
  <p>实现结果发现：</p>
  <p>原来如此，是因为我加了一个 script 标签</p>
  <p>- 如果显示暴露，全都都能获取到</p>
  <p>- 显示暴露了，反而只能获取到显示暴露的</p>
</template>
