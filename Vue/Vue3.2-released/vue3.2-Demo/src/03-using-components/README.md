[toc]

# 03-using-components

## 1. 普通组件的使用

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

## 2. 动态组件

动态组件的使用仍然 `is`，相对于 vue2.x 没有变化

```vue
<script setup lang='ts'>
import { ref } from "vue";
import Bar from "./Components/Bar.vue";
import Foo from "./Components/Foo.vue";

const condition = ref(false);
setTimeout(() => condition.value = true, 2000);
</script>

<template>
  <component :is="condition ? Bar : Foo"/>
</template>
```

## 3. 递归组件

因为自动命名推断的缘故，一个单文件组件可以通过它的文件名被其自己所引用。例如：名为 `Foo.vue` 的组件可以在其模板中用 `<Foo/>` 引用它自己。

请注意这种方式相比于 import 导入的组件和自主注册的组件优先级更低。所有如果有命名的 import 导入和组件的推断名冲突了，可以使用 import 别名导入：

```js
import { Foo as FooChild } from './components'
```

## 4. 命名空间组件

可以使用带点的组件标记，例如 `<Foo.Bar>` 来引用嵌套在对象属性中的组件。这在需要从单个文件中导入多个组件的时候非常有用：

`Components/index.ts` 用于导出组件

```ts
import Foo from './Foo.vue';
import Bar from './Bar.vue';

export { Foo, Bar };
```

`index.vue` 基于命名空间使用组件

```vue
<script setup lang='ts'>
import * as Form from "../Components";
</script>

<template>
  <Form.Foo />
  <Form.Bar />
</template>
```

