<template>
<div>
  <input class="hello" @input="change"/>
    {{ arrow }}
</div>
  
  
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    arrow : String
  },
  methods: {
    change(e) {
      this.$emit("update:arrow", e.target.value)
    }
  }
}
</script>

