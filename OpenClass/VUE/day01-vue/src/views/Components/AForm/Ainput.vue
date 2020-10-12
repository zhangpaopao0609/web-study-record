<template>
  <div>
    <!-- 自定义组件要实现 v-model 必须实现 :value, @input  -->
    <input :value="value" @input="onInput" v-bind="$attrs">
  </div>
</template>

<script>
export default {
  inheritAttrs: false,  // 避免顶层容器继承
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    onInput(e) {
      // 通知父组件数值变化
      this.$emit('input', e.target.value)
      // 通知FormItem 校验
      this.$parent.$emit('validate')
    }
  }
}
</script>

<style scoped>

</style>