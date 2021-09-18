<template>
  <div class="container">
    <h1>Todos</h1>
    <header-component @addItem="handleAddItem" />
    <list :todo-list="todoList" @deleteItem="handleDeleteItem" />
    <footer-component  />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import HeaderComponent from "./components/Header.vue";
import List from "./components/List.vue";
import FooterComponent from "./components/Footer.vue";

interface TodoList {
  id: number;
  content: string;    // 内容
  completed: boolean;   // 是否已完成
}

// 有两种方式维护数据，
// 第一种，在 APP 父组件里维护
// vuex 中维护
export default defineComponent({
  name: 'App',
  components: { 
    HeaderComponent,
    List,
    FooterComponent
  },
  setup() {
    const todoList = reactive<TodoList[]>([
      { id: 1, content: '1', completed: true }
    ]);

    const handleAddItem = (data: TodoList) => {
      todoList.push(data);
    };

    const handleDeleteItem = (id: number) => {
      // todoList = todoList.filter(item => item.id !== id);
      todoList.splice(todoList.findIndex(item => item.id === id), 1);
    };

    return {
      todoList,
      handleAddItem,
      handleDeleteItem,
    }
  },
})
</script>

<style lang="scss" scoped>
.container {
  width: 20%;
  margin: 100px auto 0;

  h1 {
    text-align: center;
    letter-spacing: 20px;
  }
}
</style>
