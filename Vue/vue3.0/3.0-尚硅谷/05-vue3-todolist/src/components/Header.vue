<template>
  <div class="header-container">
    <input
      type="text"
      v-model="itemContent"
      @keydown.enter="handleAdd"
    >
    <button @click="handleAdd">增加</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Header',
  setup(props, { emit }) {
    const itemContent = ref('');
    
    const handleAdd = () => {
      if(!itemContent.value.trim()) {
        return;
      }
      emit('addItem', {
        id: Date.now(),
        content: itemContent.value,
        completed: false,
      });
      itemContent.value = '';
    };

    return {
      itemContent,
      handleAdd,
    };
  },
})
</script>

<style lang="scss" scoped>
.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;

  input {
    height: 30px;
    flex: 1;
    padding: 0 6px;
    margin-right: 2px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 6px;
    outline: none;
  }

  button {
    height: 32px;
    width: 20%;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 6px;
    background-color: #eee;
    cursor: pointer;

    &:active {
      background-color: #ddd;
    }
  }
}
</style>
