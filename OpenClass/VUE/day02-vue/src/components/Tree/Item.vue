<template>
  <li>
    <div @click="toggle">
      <!-- 标题 -->
      {{ model.title }}
      <!-- 有子元素就显示 -->
      <span v-if="isFolder">[{{ open ? '-': '+' }}]</span>
    </div>
    <!-- 子树 -->
    <ul v-show="open" v-if="isFolder">
      <Item class="item" v-for="item in model.children" :model="item" :key="item.title" />
    </ul>
  </li>
</template>

<script>
export default {
  name: 'Item',
  props: {
    model: Object
  },
  data() {
    return {
      open: false
    }
  },
  computed: {
    isFolder() {  // 是否有子树
      return this.model.children && this.model.children.length;
    }
  },
  methods: {
    toggle() {
      this.open = !this.open
    }
  }
} 
</script>