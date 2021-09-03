<script setup lang="ts">
import { onMounted, ref } from "vue";
import DefineExposeOnlyScriptSetup from "./DefineExposeOnlyScriptSetup.vue";
import DefineExposeWithNormalScript from "./DefineExposeWithNormalScript.vue";

const defineExposeOnlyScriptSetupRef = ref(null);
const handleCheckDefineExposeOnlyScriptSetupRef = () => console.log(defineExposeOnlyScriptSetupRef.value);

const defineExposeWithNormalScriptRef = ref(null);
const handleCheckDefineExposeWithNormalScriptRef = () => console.log(defineExposeWithNormalScriptRef.value);
</script>

<template>
  <h3>官方文档链接：https://v3.vuejs.org/api/sfc-script-setup.html#defineexpose</h3>

  <div>
    <h4>DefineExposeOnlyScriptSetup:</h4>
    <DefineExposeOnlyScriptSetup ref="defineExposeOnlyScriptSetupRef" />
    <button @click="handleCheckDefineExposeOnlyScriptSetupRef">
      点击查看 defineExposeOnlyScriptSetupRef
    </button>
  </div>

  <div>
    <h4>DefineExposeWithNormalScript:</h4>
    <DefineExposeWithNormalScript ref="defineExposeWithNormalScriptRef" />
    <button @click="handleCheckDefineExposeWithNormalScriptRef">
      点击查看 defineExposeWithNormalScriptRef
    </button>
  </div>

 
</template>
