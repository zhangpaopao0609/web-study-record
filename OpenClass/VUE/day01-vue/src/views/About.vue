<template>
  <div class="about">
    <h1 >
      This is an about page
      {{ test }}
    </h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      test: 1
    }
  },
  created() {
    this.$parent.$on('foo', (data) => {
      this.test = this.test + data
    })
  }
}
</script>
