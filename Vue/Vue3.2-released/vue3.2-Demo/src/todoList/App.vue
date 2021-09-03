<script lang="ts">
  export default { name: 'App' }
</script>
<script setup lang="ts">
import { ref } from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import UserInput from "./components/UserInput/index.vue";
import ListItem from "./components/ListItem/index.vue";

interface Item {
  id: number,
  text: string,
  isDone: boolean,
};

const list = ref<Item[]>([]);
const handleInput = (val: string) => {
  list.value.push({
    id: Date.now(),
    text: val,
    isDone: false,
  });
};

const handleDelete = (id: number) => {
  // list.value.splice(list.value.findIndex(item => item.id === id), 1);
  list.value = list.value.filter(item => item.id !== id);
};
</script>
<template>
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" title="Vue3.2 TodoList"/>
  <UserInput @handle-input="handleInput"/>
  <ListItem :list="list" @handle-delete="handleDelete"/>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}

#app {
  width: 500px;
  margin: 0 auto;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
