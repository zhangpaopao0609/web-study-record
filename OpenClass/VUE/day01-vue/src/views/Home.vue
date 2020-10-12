<template>
  <div class="about">
    <h1 @click="$parent.$emit('foo', 10)">This is an Home page</h1>
    {{ foo.arrow }}
    <slot name="arrow" :paopao="paopao"></slot>
    
    <slot></slot>
    <!-- 匿名插槽 -->
  </div>
</template>

<script>
export default {
  inject: ['foo'],
  data() {
    return {
      paopao : { try: 99 }
    }
  }
}
</script> 