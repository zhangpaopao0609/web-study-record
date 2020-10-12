<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: {
      type: Object
    }
  },
  provide() {
    return {
      form: this  // 传递 form 实例给后代
    }
  },
  methods: {
    validate(cb) {
      // map 的结果是若干 promise 数组
      const tasks = this.$children
      .filter(item => item.prop)
      .map( item => item.validate() )
      
      Promise.all(tasks)
      .then(()=>cb(true))
      .catch(()=>cb(false))
    }
  }
}
</script>

<style scoped>

</style>