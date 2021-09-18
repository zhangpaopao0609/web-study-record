[toc]

# `useSlots` 和 `useAttrs`

在 `<script setup>` 使用 `slots` 和 `attrs` 的情况应该是很罕见的，因为可以在模板中直接可通过 `$slots` 和 `$attrs` 来访问它们。

在那些罕见的需要使用它们的场景中，可以分别用 `useSlots` 和 `useAttrs` 两个函数来获取到对应的信息：

```vue
<script setup lang="ts">
import { useSlots, useAttrs } from "vue";

const slot = useSlots();
console.log('TestUseSlots', slot.header && slot.header());		// 获取到使用插槽的具体信息
  
const attrs = useAttrs();
console.log('TestUseAttrs', attrs);		// 获取到使用组件时传递的 attributes
</script>

<template>
  <h1> Here is slots test!!</h1>
  <slot name="header"></slot>
</template>
```

`useSlots` 和 `useAttrs` 是真实的运行时函数，它会返回与 `setupContext.slots` 和 `setupContext.attrs` 等价的值，同样也能在普通的 composition API 中使用。

