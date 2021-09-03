[toc]

# 02-顶层的绑定自动暴露给模板
当使用 `<script setup>` 的时候，任何在 `<script setup>` 声明的**顶层的绑定 (包括变量，函数声明，以及 import 引入的内容)** 都能在模板中直接使用：

```vue
<script setup lang='ts'>
import { ref } from "vue";

const inputValue = ref('输入测试');
</script>

<template>
  <input type="text" :value="inputValue"/>
</template>
```

> `<script setup>` 这个语法最终仍然会编译成普通的 `<script>`，同时将模板编译成 VNode 后从 `setup` 函数中导出，可在 [`Vue SFC Playground`](https://sfc.vuejs.org/) 中测试即可看到，以下为上述代码编译后的 JS 代码，感兴趣的可以细细的观察，
>
> ```js
> import { defineComponent as _defineComponent } from 'vue'
> import { openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue"
> // 这些都是内部的方法，可不用在意
> const _hoisted_1 = ["value"]
> 
> import { ref } from "vue";
> 
> const __sfc__ = /*#__PURE__*/_defineComponent({
>   setup(__props) {
>     const inputValue = ref('输入测试');
> 
>     return (_ctx,_cache) => {		// 可以看到，编译后 `<script setup>` 语法糖变成了<script> 并导出了模板 VNode 结构的函数，并且将模板中用到的值进行了自动解包
>       return (_openBlock(), _createElementBlock("input", {
>         type: "text",
>         value: inputValue.value		// 自动解包 ref
>       }, null, 8 /* PROPS */, _hoisted_1))		// 这里是对动态属性的标记，对 diff 算法的优化
>     }
>   }
> })
> __sfc__.__file = "App.vue"
> export default __sfc__
> ```

import 导入的内容也会以同样的方式暴露。意味着可以在模板表达式中直接使用导入的 helper 函数，并不需要通过 `methods` 选项来暴露它：

```vue
<script setup lang='ts'>
import { capitalize } from "./capitalize";
</script>

<template>
  <p>{{ capitalize('Hello World!!') }}</p>
</template>
```

> 上述代码编译后的 JS 代码如下，感兴趣可以看看，细细的观察就能看到 `setup` 函数导出的模板中自动的就引用了 `capitalize` 函数，相当于变量的引用。
>
> ```js
> import { defineComponent as _defineComponent } from 'vue'
> import { unref as _unref, toDisplayString as _toDisplayString, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue"
> // 这些都是内部的方法，可不用在意
> import { capitalize } from "./capitalize";
> 
> const __sfc__ = /*#__PURE__*/_defineComponent({
>   setup(__props) {
>     return (_ctx,_cache) => {
>       return (_openBlock(), _createElementBlock("p", null, _toDisplayString(_unref(capitalize)('Hello World!!')), 1 /* TEXT */))
>     }		// 重点在这里，编译后的 setup 导出的模板中自动的就引用了 `capitalize` 函数
>   }
> })
> __sfc__.__file = "App.vue"
> export default __sfc__
> ```

