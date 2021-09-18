<script setup lang='ts'>
const list = [
  { id: 1, content: '1' },
  { id: 2, content: '2' },
]

const t = { name: 'jack' }
</script>

<template>
  <h1>Web Component</h1>
  <my-vue-element
    msg="This is a message"
    :selected="true"
    :index="1"
  />
  <my-vue-element-base-sfc
    msg="This message transfer by my-vue-element-base-sfc"
    .list="list"
    .user="t"
  />
</template>