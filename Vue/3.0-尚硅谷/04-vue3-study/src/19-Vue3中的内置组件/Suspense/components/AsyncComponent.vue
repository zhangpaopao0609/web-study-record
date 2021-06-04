<template>
  <h2>AsyncComponent 子级组件</h2>
  <h3>{{ msg }}</h3>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: "AsyncComponent",
  setup() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          msg: 'ardor'
        })
      }, 2000);
    })
  },
})
</script>
