<template>
  <li
    v-for="item in todoList"
    :key="item.id"
  >
    <div class="list-item">
      <div class="item">
        <input 
          type="radio" 
          :name="item.id" 
          :id="item.id"
          :checked="item.completed"
        >
        <span>{{ item.content }}</span>
      </div>
      <button @click="handleDeleteItem(item.id)">删除</button>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Item',
  props: {
    todoList: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    const handleDeleteItem = (id: number) => {
      emit("deleteItem", id);
    };
    return {
      handleDeleteItem,
    };
  },
})
</script>

<style lang="scss" scoped>
.list-item {
  height: 34px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .item {
    input {
      margin-right: 10px;
    }
  }

  button {
    cursor: pointer;
  }
}
</style>
