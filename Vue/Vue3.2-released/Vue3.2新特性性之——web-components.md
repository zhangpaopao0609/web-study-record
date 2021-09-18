[toc]

# Vue3.2 新特性之 —— web components

## 0. 前言

自定义元素（也就是使用原生的 web components 方案）的主要好处是它们可以与任何框架一起使用，甚至可以在没有框架的情况下使用。 这使得它们非常适合在最终使用者可能使用不同的前端技术栈的情况下分发组件，同样也非常的适合当你希望你的应用程序与使用的组件完全隔离（css, js 完全隔离）的情况。 

vue3.2 的新特性之一就是，提供了一个方案，让开发者可以完全使用 vue sfc 的写法来创建 web components。提供的 api 是 `defineCustomElement`, 这个方法使用完全相同的 Vue 组件 API 来创建自定义元素，接受与 defineComponent 相同的参数，但返回一个扩展 HTMLElement 的自定义元素构造函数

<font color='red'>注意点：使用 Vue 构建自定义元素时，自定义元素的解析是需要依赖于 Vue 的运行时解析的。</font>那么为了能够在生效，我们需要配置一下 vite

```js
resolve: {
  alias: [
    { find: 'vue', replacement: 'vue/dist/vue.esm-bundler.js' },
  ],
},
```



## 1. 基本用法

```js
import { defineCustomElement } from 'vue'

const MyVueElement = defineCustomElement({
  // 普通的 vue 单文件组件选项
  props: {},
  emits: {},
  template: `...`,

  // css 将会被注入到 shadow root 下
  styles: [`/* inlined css */`]
})

// 注册后，所有的  `<my-vue-element>` 标签都会更新
customElements.define('my-vue-element', MyVueElement)

document.body.appendChild(
  new MyVueElement({
    // initial props (optional)
  })
)
```



## 2. 使用 sfc 创建 web component

要使用这种模式：需要把组件的文件名命名为 `.ce.vue`:

```js
import { defineCustomElement } from 'vue'
import Example from './Example.ce.vue'

console.log(Example.styles) // ["/* inlined css */"]

// convert into custom element constructor
const ExampleElement = defineCustomElement(Example)

// register
customElements.define('my-example', ExampleElement)
```

<font color="red">这里要特别注意 props 的传递:</font>

```html
<my-element :user.prop="{ name: 'jack' }"></my-element>

<!-- shorthand equivalent -->
<my-element .user="{ name: 'jack' }"></my-element>
```

## 3. 用 vue 创建自定义元素库的提示

### 3.1 注意成本和优势

使用 Vue 构建自定义元素时，自定义元素的解析是需要依赖于 Vue 的运行时解析的。运行时的包比生产包大约要大16kb，也就是说，需要去多承担这个 16 kb的体积。这意味着，如果你仅仅要发布（或者使用）单个自定义元素，使用 Vue 并不理想。但是，如果您要发布具有复杂逻辑并且数量较多的自定义元素库，那么这点成本几乎就不算什么了，因为相比较使用原生的 web components 的写法， Vue 要编写的代码将会少很多，所以，自定义元素数量越多，vue 创建自定义元素的方式就越有优势。

### 3.2 统一引入和单个导出

建议导出单个元素构造函数，以便您的用户可以灵活地按需导入它们并使用所需的标记名称注册它们。您还可以导出一个方便的函数来自动注册所有元素。这是 Vue 自定义元素库的示例入口点：

```js
import { defineCustomElement } from 'vue'
import Foo from './MyFoo.ce.vue'
import Bar from './MyBar.ce.vue'

const MyFoo = defineCustomElement(Foo)
const MyBar = defineCustomElement(Bar)

// 单个导出，用户可以按需加载
export { MyFoo, MyBar }

// 导出 注册函数，用户可简单一次性注册
export function register() {
  customElements.define('my-foo', MyFoo)
  customElements.define('my-bar', MyBar)
}
```



## 3. vue component 和 web component 比较

一些开发人员认为应该避免使用框架专有的组件模型，并且专门使用自定义元素可以使应用程序“面向未来”。

在这里，我们将尝试解释为什么我们认为这是对问题的过于简单化的看法。

自定义元素和 Vue 组件之间确实存在一定程度的功能重叠：它们都允许我们定义具有数据传递、事件发射和生命周期管理的可重用组件。然而，Web 组件 API 是相对低级和简单的。为了构建一个实际的应用程序，我们需要很多平台没有涵盖的附加功能：

- 一个声明式和高效的模板系统；
- 一个有助于跨组件逻辑提取和重用的反应式状态管理系统；
- 一种在服务器上呈现组件并在客户端 (SSR) 上将它们水合的高效方法，这对于 SEO 和 Web Vitals 指标（如 LCP）很重要（打开新窗口）。原生自定义元素 SSR 通常涉及在 Node.js 中模拟 DOM，然后序列化变异的 DOM，而 Vue SSR 尽可能编译为字符串连接，这样效率更高。

Vue 的组件模型在设计时就考虑到了这些需求，作为一个连贯的系统。

拥有一支称职的工程团队，您可能可以在本机自定义元素之上构建等效项 - 但这也意味着您要承担内部框架的长期维护负担，同时失去了生态系统和社区利益像 Vue 这样成熟的框架。

也有使用自定义元素作为其组件模型基础构建的框架，但它们都不可避免地要针对上面列出的问题引入自己的专有解决方案。使用这些框架需要购买他们关于如何解决这些问题的技术决策 - 尽管可能会宣传，这并不能自动将您与潜在的未来流失隔离开来。

