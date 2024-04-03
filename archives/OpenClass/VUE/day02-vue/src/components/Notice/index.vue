<script>
export default {
  name: 'Notice',
  props: {
    title: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      default: '',
    },
    duration: {
      type: Number,
      default: 1000,
    },
  },
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    show() {
      this.isShow = true;
      setTimeout(() => {
        this.isShow = false;
      }, this.duration);
    },
    hide() {
      this.isShow = false;
    },
  },
};
</script>

<template>
  <div v-if="isShow" class="ss">
    {{ title }}
    {{ message }}
  </div>
</template>

<style>

</style>
