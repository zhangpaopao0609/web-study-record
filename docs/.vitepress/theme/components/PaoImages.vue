<script lang="ts" setup>
import MarkdownIt  from "markdown-it";
const md = new MarkdownIt();

const props = withDefaults(defineProps<{
  src: string;
  width?: string;
  title?: string;
  reference?: string;
}>(), {
  width: "100%"
})
</script>

<template>
  <div class="image-wrapper">
    <img class="image" :src="src" alt="" srcset="">
    <div class="title" v-if="title" v-html="md.render(title)"></div>
    <div class="reference" v-if="reference" v-html="md.render('注释: ' + reference)"></div>
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