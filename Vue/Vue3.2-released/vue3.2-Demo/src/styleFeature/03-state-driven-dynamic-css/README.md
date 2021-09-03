[toc]

# 状态驱动的动态 CSS
单文件组件的 `<style>` 标签可以通过 `v-bind` 这一 CSS 函数将 CSS 的值关联到动态的组件状态上：

```vue
<script setup lang="ts">
import { ref } from "vue";
const color = ref('red');

setTimeout(() => color.value = 'blue' , 2000);
</script>

<template>
  <p>hello</p>
</template>

<style scoped>
p {
  color: v-bind(color);
}
</style>
```

实际的值会被编译成 hash 的 CSS 自定义 property，CSS 本身仍然是静态的。**自定义 property 会通过内联样式的方式应用到组件的根元素上，并且在源值变更的时候响应式更新**。

上述代码编译后的结果如下：

编译后的 css

```css
p[data-v-f13b4d11] {
  color: var(--f13b4d11-color);		/* 通过 css 的 var 函数去获取到自定义属性的值 */
}
```

编译后的 js

```js
const __sfc__ = /*#__PURE__*/_defineComponent({
  setup(__props) {
    _useCssVars(_ctx => ({
      "f13b4d11-color": (color.value)		// 可以看到，编译后的值 和 一个 hash 值映射，并且具备响应式， css 的 var 便可以获取到这个 hash 映射的值
    }))

    const color = ref('red');
    setTimeout(() => color.value = 'blue' , 2000);

    return (_ctx,_cache) => {
      return (_openBlock(), _createElementBlock("p", null, "hello"))
    }
  }
})
```



