[toc]

# 状态驱动的动态 CSS
## 1. 基本使用

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

上述代码编译后的结果如下，可以看到，编译后的代码会维护一份 hash 值和源值的映射，hash 值用于 css var 函数获取自定义属性，hash 映射源值并保留响应式：

> 不知道你是否有使用或者听说过 css 的 var 函数，博主是没有的，下一小节简单的描述一下

1. 编译后的 css

```css
p[data-v-f13b4d11] {
  color: var(--f13b4d11-color);		/* 通过 css 的 var 函数去获取到自定义属性的值 */
}
```

2. 编译后的 js

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

## 2. 小小解析——css var 函数探究

个人非常的喜欢这一新特性，给我一种  css in js 的兴奋感，因此探究了其中的奥秘。

如上所述，在 `style` 中使用 `v-bind` 来使用状态以达到动态 css 的目的，最终编译的结果是 vue 维护了 一份 hash 值和源值的映射，hash 值用于 css var 函数获取自定义属性，这个通过代码一眼就能够理解，不太理解的就是这个 css var 函数，先给出总结： **var 函数能够将参数替换成预先定义的值**。

下面来简单描述一下，相信看完后你就能完全的理解状态驱动的动态 css 的原理

1. 什么是var 函数

   **`var()`**函数可以代替元素中任何属性中的值的任何部分。**`var()`**函数不能作为属性名、选择器或者其他除了属性值之外的值（这样做通常会产生无效的语法或者一个没有关联到变量的值）。

2. 语法

   方法的第一个参数是要替换的自定义属性的名称。函数的可选第二个参数用作回退值。如果第一个参数引用的自定义属性无效，则该函数将使用第二个值。

   ```css
   var( <custom-property-name> , <declaration-value>? )
   ```

   > 注意：自定义属性的回退值允许使用逗号。例如， `var(--foo, red, blue)` 将`red, blue`同时指定为回退值；即是说任何在第一个逗号之后到函数结尾前的值都会被考虑为回退值

3. 值

   - `<custom-property-name>` 自定义属性名

     **在实际应用中它被定义为以两个破折号开始的任何有效标识符**。 自定义属性仅供作者和用户使用; CSS 将永远不会给他们超出这里表达的意义。

   - `<declaration-value>` 声明值（后备值）

     回退值被用来在自定义属性值无效的情况下保证函数有值。回退值可以包含任何字符，但是部分有特殊含义的字符除外，例如换行符、不匹配的右括号（如`)、``]或``}`）、感叹号以及顶层分号（不被任何非`var**()**`的括号包裹的分号，例如`var(--bg-color, --bs**;**color)`是不合法的，而`var(--bg-color, --value**(**bs;color**)**)`是合法的）。

4. 示例

   - 在 `:root` 上定义，然后使用它

     ```css
     :root {
       --main-bg-color: pink;
     }
     
     body {
       background-color: var(--main-bg-color);
     }
     ```

   - 当第一个值未定义，回退值生效

     ```css
     /* 后备值 */
     
     /* 在父元素样式中定义一个值 */
     .component {
       --text-color: #080; /* header-color 并没有被设定 */
     }
     
     /* 在 component 的样式中使用它： */
     .component .text {
       color: var(--text-color, black); /* 此处 color 正常取值 --text-color */
     }
     .component .header {
       color: var(--header-color, blue); /* 此处 color 被回退到 blue */
     }
     ```

5. 兼容性

   在 [caniuse](https://caniuse.com/?search=var) 上查看结果如下，整体来说兼容性还是不错的。虽然已经明确不再支持 IE，但相信我们的尤大大肯定还是有做兼容处理的，这里先留一个任务给自己，去源码中查看这一部分的兼容处理，然后再分享出来。

<img src="/Users/ardor/Desktop/MyGitHub/web-study-record/Vue/Vue3.2-released/vue3.2-Demo/src/styleFeature/03-state-driven-dynamic-css/img/caniuse-var.png" alt="image-20210903165734483" style="zoom:30%;" />

以上部分内容来自 MDN，关于 `var` 的更多内容可[点击查看](https://developer.mozilla.org/zh-CN/docs/Web/CSS/var())。



