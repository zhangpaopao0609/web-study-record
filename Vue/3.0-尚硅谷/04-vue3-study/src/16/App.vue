<template>
  <h2>grandPa</h2>
  <ul v-for="(v, i) in todoList" :key="i">
    <li>{{ v }}</li>
  </ul>
  <button @click="addItem">增加</button>
  <hr />
  <father />
</template>

<script lang="ts">
import { defineComponent, reactive, provide } from 'vue'
import Father from "./components/Father.vue";

export default defineComponent({
  components: { Father },
  setup() {
    const todoList = reactive(['a', 'b']);
    
    const addItem = () => {
      todoList.push('c');
    };

    provide<string[]>('todoList', todoList);

    return {
      todoList,
      addItem,
    };
  },
})
</script>
