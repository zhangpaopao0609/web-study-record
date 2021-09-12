[toc]

# WebComponents
3.2 引入 `defineCustomElement` 方法，可以使用 Vue 组件 API 创建原生自定义元素
也就是用 vue sfc 的写法来写 web components。

## 写法1 
```ts
import { defineCustomElement } from 'vue'

const MyVueElement = defineCustomElement({
  // 普通的 vue 组件
  props: {
    msg: String,
  },
  emits: {},
  template: `<div class="msg">{{ msg }}</div>`,

  styles: [`.msg { color: red; }`]
});


// 注册自定义元素.
// 注册后，页面上所有的 `<my-vue-element>` 标签都会更新
customElements.define('my-vue-element', MyVueElement);
```
这样写有些麻烦，不管是 `template` 还是 `script`, 因此还可以直接引入 sfc 文件，但这里注意。
要使用这种方式模式，只需将组件文件名以 `.ce.vue` 结尾即可(customElement)

msg.ce.vue
```vue
<script setup lang='ts'>
import { defineProps } from "vue";

defineProps<{ msg: string }>();
</script>

<template>
  <div class="msg">{{ msg }}</div>
</template>

<style>
.msg { 
  color: red; 
}
</style>
```

```ts
import Msg from "./msg.ce.vue";

const MyVueElementBaseSFC = defineCustomElement(Msg);
customElements.define('my-vue-element-base-sfc', MyVueElementBaseSFC);
```
