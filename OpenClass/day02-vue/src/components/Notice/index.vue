<template>
  <div class="ss" v-if="isShow">
    {{ title }}
    {{ message }}
  </div>
</template>

<script>

export default {
  name: 'Notice',
  props: {
    title: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    },
    duration: {
      type: Number,
      default: 1000
    }
  },
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    show() {
      this.isShow = true;
      setTimeout(() => {
        this.isShow = false
      }, this.duration)
    },
    hide() {
      this.isShow = false
    }
  }
}
</script>

<style>

</style>
