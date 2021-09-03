[toc]

# Vue 3.2 Released —— Vue3.2正式发布的五大特性

## 1. 前言

在 2021.8.10 日，官方发布了 Vue3.2，尤大大称之为 "Quintessential Quintuplets"，直译过来是“经典的五胞胎”，但是通过 twitter 上 Vue.js 的推文和 [Vue3.2 Released](https://blog.vuejs.org/posts/vue-3.2.html) 这篇博客一看便知，是指 3.2 版本拥有 5 个具有重大意义的新特性和功能。

<img src="/Users/ardor/Desktop/MyGitHub/web-study-record/Vue/Vue3.2-released/img/vue-qq.png" alt="image-20210829153532618" style="zoom:50%;" />

<div align='center'>Vue.js 的推文</div>

Vue.js 的推文就可以看出四大特性，不是五大吗？这里可以先剧透一下，是五大，只是最后一个特性是一个相对高阶的特性，并不是面向一般的开发者的，而是面向库的开发者，所以在这里推文中没有提到。

<img src="/Users/ardor/Desktop/MyGitHub/web-study-record/Vue/Vue3.2-released/img/evanyou.png" alt="image-20210829153201302" style="zoom:50%;" />

<div align='center'>尤大大在微博的博文</div>

> 个人非常喜欢尤大大这个人，说话总是很打趣，之前发布 vite 的时候还对话 webpack 的作者——”对不住了老哥“，因为尤大大说用 vite 的人都不会再去使用 webpack 了。这里发布 3.2，`<script setup> + TS + Volar = 真香`，我也是忠实的 vue 使用者，同时也是 3.2 的尝新者，仅仅是在 playground 的时候就已经让我哇塞了，真香。

## 2. 五大特性

### 2.1 新的单文件组件特性

单文件组件（SFCs， 也就是我们常说的 `.vue` 文件）的两个新特性已经从实验性质正式的转变成稳定支持的特性了。

- `<script setup>` 作为编译时的语法糖，在单文件组件中使用 `Composition API` 时，这个语法糖将极大的提高我们的开发幸福度和开发效率。
- `<style> v-bind` 在单文件组件的 `<style>` 标签中将可以使用由组件状态驱动的动态 CSS 值，类似 `css in js` 。

使用这两个新功能的示例组件：

```vue
<script setup>
import { ref } from 'vue'

const color = ref('red')
</script>

<template>
  <button @click="color = color === 'red' ? 'green' : 'red'">
    Color is: {{ color }}
  </button>
</template>

<style scoped>
button {
  color: v-bind(color);
}
</style>
```

这个特性应该是我们开发者最能直观体验和感受到的，这里先简单提两点：

1. `<script setup>` 不再需要 `return` 任何变量或者方法，定义后可直接在模板中使用，如 `color`
2. `<script setup>` 引入的子组件不再需要注册，可以直接在模板中使用

单单是这两点，在开发过程中就会节省大量的代码和时间，接下来我会在另一篇博文中详细的讲解这一部分并给出示例，等完成后再来本文给出链接。

也可先点击文档查看:

-  [`<script setup>`](https://v3.vuejs.org/api/sfc-script-setup.html#basic-syntax)
-  [`<style> v-bind`](https://v3.vuejs.org/api/sfc-style.html#state-driven-dynamic-css)

### 2.2 Web Components

Vue 3.2 引入了一个新的 `defineCustomElement` 方法，可以使用 Vue 组件 API 轻松创建原生自定义元素：

```js
import { defineCustomElement } from 'vue'

const MyVueElement = defineCustomElement({
  // 正常的 vue 组件写法
})

// 注册自定义元素.
// 注册后，页面上所有的 `<my-vue-element>` 标签都会更新
customElements.define('my-vue-element', MyVueElement)
```

这个 API 允许开发者创建由 Vue 驱动的 UI 组件库，这个 UI 库可以与任何框架一起使用，或者根本没有框架，因为最终会编译成原生的 Web Components。 [点击查看详细内容](https://v3.vuejs.org/guide/web-components.html)。

### 2.3 性能提升

由于 @basvanmeurs 的出色工作，3.2 对 Vue 的响应式系统进行了一些重大的性能改进。 具体来说：

3.2 版本还对 Vue 的响应式系统进行了一些重大的性能改进，这需要归功于 @basvanmeurs 的出色工作，同时这也完美的提现了社区开源的力量。具体如下：

> 简直是高光时刻，能被尤大大在发布博客中提到，我也期待着，手动偷笑。

- 更高效的 ref 实现（提高约 260% 的读取速度/约 50% 的写入速度）
- 提高约 40% 的依赖跟踪速度
- 内存使用量减少约 17%

模板编译器也得到了一些改进：

- 创建普通元素 VNode 的速度提高了约 200%
- 其它的提升 [[1]](https://github.com/vuejs/vue-next/commit/b7ea7c148552874e8bce399eec9fbe565efa2f4d) [[2]](https://github.com/vuejs/vue-next/commit/02339b67d8c6fab6ee701a7c4f2773139ed007f5)

最后，还引入了一个新的 [`v-memo` 指令](https://v3.vuejs.org/api/directives.html#v-memo)，它提供了记忆一部分模板树的能力。 `v-memo` 指令使得这部分模板可以跳过虚拟 `DOM` 的 `diff` 比较，同时还完全跳过新 `VNode` 的创建。 虽然很少需要，但它提供了一种在某些情况下想要得到最大性能的方案，例如大型 `v-for` 列表。

直接单行添加 `v-memo` 即可生效，这也使得 Vue 成为 [js-framework-benchmark](https://github.com/krausest/js-framework-benchmark) 中最快的主流框架：

<img src="/Users/ardor/Desktop/MyGitHub/web-study-record/Vue/Vue3.2-released/img/js-bench.png" alt="benchmark" style="zoom:50%;" />

### 2.4 服务端渲染

3.2 版本中的 `@vue/server-renderer` 提供了一个 ES 模块构建包，它与 Node.js 内置模块分离。 这使得在非 Node.js 运行时环境中构建和使用 `@vue/server-renderer` 称为可能，（例如在 [CloudFlare Workers](https://developers.cloudflare.com/workers/) 或 Service Workers）。

我们还改进了流式渲染 API (streaming render APIs)，提供了用于渲染到 [Web Streams API](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API) 的新方法。 查看 [@vue/server-renderer](https://github.com/vuejs/vue-next/tree/master/packages/server-renderer#streaming-api) 的文档以获取更多详细信息。

### 2.5 Effect 作用域 API

3.2版本还 、引入了一个新的 [Effect Scope API](https://v3.vuejs.org/api/effect-scope.html)，用于直接控制响应式 API 的（`computed and watchers`）执行时机。 它可以使得更轻松地在组件上下文之外使用 Vue 的响应式 API，同时还包括了组件内部的一些高级用例。

Effect 作用域是一个高阶的 API，主要服务于库作者，因此建议阅读该功能的 [RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0041-reactivity-effect-scope.md) 以了解此功能的动机和用例。

有关 3.2 中所有更改的详细列表，请参阅[完整的更改日志](https://github.com/vuejs/vue-next/blob/master/CHANGELOG.md)。



## 3. 总结

不知道从何时开始就喜欢 Vue 了，从 React 转到 Vue 虽然是工作的被迫，但 Vue 框架的理念我却是很喜欢的， 3.2 更是提出了大量的新特性，真心实意的在为我们开发者创造一个简单实用快捷的框架，真的很是感谢尤大大，持续关注，持续学习。

接下来我将好好总结 `<script setup>` 的新特性用法以及实践它们然后输出博文，等着吧！！

文章大部分内容来自于尤大大的博文，尤大大强呀！！[可点击查看](https://blog.vuejs.org/posts/vue-3.2.html)

















































