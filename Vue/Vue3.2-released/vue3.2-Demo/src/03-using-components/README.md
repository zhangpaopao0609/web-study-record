[toc]

# 03-using-components

`<script setup>` 中引入组件后可直接在模板使用，不再需要注册了。 

```vue
<script setup lang='ts'>
import SaySomething from "./Components/SaySomething.vue";
</script>

<template>
  <SaySomething />
</template>
```

跟变量和`import` 引入的函数一样， `<script setup>` 将 `MyComponent` 看做一个变量来引用。如果你使用过 JSX，那这里的心智模型是一样的。其 kebab-case 格式的 `<say-something>` 同样能在模板中使用。不过，强烈建议使用 PascalCase 格式作为组件标签名，以便于更好的一致性，同时也有助于区分原生的自定义元素。

> 上述代码编译后的 JS 代码如下，感兴趣可以看看，同样可以看到 `SaySomething` 被当做了变量引入
>
> ```js
> import { defineComponent as _defineComponent } from 'vue'
> import { openBlock as _openBlock, createBlock as _createBlock } from "vue"
> 
> import SaySomething from "./Components/SaySomething.vue";
> 
> const __sfc__ = /*#__PURE__*/_defineComponent({
>   setup(__props) {
>     return (_ctx,_cache) => {
>       return (_openBlock(), _createBlock(SaySomething))
>     }		// SaySomething 当成变量引用且导出
>   }
> })
> __sfc__.__file = "App.vue"
> export default __sfc__
> ```

