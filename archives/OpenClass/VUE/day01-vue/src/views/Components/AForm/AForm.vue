<script>
export default {
  provide() {
    return {
      form: this, // 传递 form 实例给后代
    };
  },
  props: {
    model: {
      type: Object,
      required: true,
    },
    rules: {
      type: Object,
    },
  },
  methods: {
    validate(cb) {
      // map 的结果是若干 promise 数组
      const tasks = this.$children
        .filter(item => item.prop)
        .map(item => item.validate());

      Promise.all(tasks)
        .then(() => cb(true))
        .catch(() => cb(false));
    },
  },
};
</script>

<template>
  <div>
    <slot />
  </div>
</template>

<style scoped>

</style>
