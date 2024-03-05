<template>
  <div>
    <label v-if="label">
      {{ label }}
    </label>
    <slot></slot>
    <p v-if="errorMessage">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script>
import Schema from "async-validator";

export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String
    }
  },
  data() {
    return {
      errorMessage: ''
    }
  },
  inject:['form'],
  methods: {
    validate() {
      // 执行组件校验
      // 1. 去获取校验规则
      const rules = this.form.rules[this.prop]
      // 2. 获取目前的数值
      const value = this.form.model[this.prop]
      // 3. 执行校验  推荐一个库 async-validator
      const desc = {
        [this.prop] : rules
      }
      const schema = new Schema(desc)
      // 参数1是值
      // 返回的是 promise
      return schema.validate({ [this.prop]:value }, err => {
        if (err) {
          this.errorMessage = err[0].message
        } else {
          this.errorMessage = ''
        }
      })
    }
  },
  mounted() {
    // 监听校验事件，并执行监听
    this.$on("validate", () => {
      this.validate()
    })
  }
}
</script>

<style scoped>

</style>