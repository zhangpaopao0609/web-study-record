<template>
  <ol>
    <item 
      :todoList="todoList" 
      @deleteItem="handleDeleteItem"
    />
  </ol>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Item from "./Item.vue";

export default defineComponent({
  name: 'List',
  components: { Item },
  props: {
    todoList: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    const handleDeleteItem = (id: number) => {
      emit("deleteItem", id);
    }
    return {
      handleDeleteItem,
    };
  }
})
</script>

<style lang="scss" scoped>

</style>
