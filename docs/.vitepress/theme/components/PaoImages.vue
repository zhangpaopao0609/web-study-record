<script lang="ts" setup>
import MarkdownIt from 'markdown-it';

const props = withDefaults(defineProps<{
  src: string;
  width?: string;
  title?: string;
  reference?: string;
}>(), {
  width: '100%',
});

const md = new MarkdownIt();
</script>

<template>
  <div class="image-wrapper">
    <img class="image" :src="src" alt="" srcset="">
    <div v-if="title" class="title" v-html="md.render(title)" />
    <div v-if="reference" class="reference" v-html="md.render(`注释: ${reference}`)" />
  </div>
</template>

<style scoped>
.image-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image-wrapper :deep(p) {
  margin: 0 !important;
}
.image {
  width: v-bind(width);
}

.title {
  font-weight: bold;
  font-size: 14px;
  margin-top: 10px;
}

.reference {
  text-align: right;
  font-size: 12px;
  align-self: flex-end;
}

.reference :deep(p) {
  line-height: 20px;
}
</style>
