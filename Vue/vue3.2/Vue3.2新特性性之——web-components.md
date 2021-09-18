[toc]

# Vue3.2 新特性之 —— Web Components

## 1. 聊聊 Web Components

Web Components 是一套允许开发者创建可重用的自定义元素的技术。而自定义元素的主要好处之一是它可以与任何框架一起使用，也可以在没有框架的情况下直接在 `html` 中使用。 这使得它们非常适合在使用者可能使用的是不同的前端技术栈的情况下分发 UI 或者业务组件，同样也非常的适合当你希望你的应用程序与使用的组件完全隔离（css, js 完全隔离）的情况。

但是原生的  Web Components 的写法实在有些繁琐，需要开发者直接利用 DOM api 以及 JS api 来写，如下是 MDN 上利用原生的 Web Components 来实现组件的部分代码，看到这个不知道你有没有头皮发麻。

```js
// 创建一个 shadow root
var shadow = this.attachShadow({mode: 'open'});

// 创建一个 spans
var wrapper = document.createElement('span');
wrapper.setAttribute('class','wrapper');
var icon = document.createElement('span');
icon.setAttribute('class','icon');
icon.setAttribute('tabindex', 0);
var info = document.createElement('span');
info.setAttribute('class','info');
...
```

因此，虽然自定义元素在有万般好处，但是在社区中并不流行。

## 2. Vue 3.2 新特性之 —— web components

vue3.2 的新特性之一就是，提供了一种方案，让开发者可以完全使用 vue 单文件组件的写法来创建自定义元素。

### 2.1 `defineCustomElement`

`vue`支持通过 `defineCustomMelement `方法使用完全相同的 `vue` 组件 API 创建自定义元素。该方法接受与`defineComponent` 相同的参数，但返回扩展 `HtmleElement` 的自定义元素构造函数，这个构造函数可以直接用于自定义元素注册，`customElements.define`。

```js
import { defineCustomElement } from 'vue'

const MyVueElement = defineCustomElement({
  // 普通的 vue 组件
  props: {
    msg: String,
    selected: Boolean,
    index: Number,
  },
  emits: {},
  template: `<div class="msg">{{ msg }}</div>`,

  styles: [`.msg { color: red; }`]
});

// 注册自定义元素.
// 注册后，页面上所有的 `<my-vue-element>` 标签都会更新
customElements.define('my-vue-element', MyVueElement);
```

注册完成后， `<my-vue-element /> ` 就可以在组件或者 `html` 文件中使用了，如下所示。

```html
<my-vue-element
  msg="This is a message"
  :selected="true"
  :index="1"
/>
```

#### 2.1.1 生命周期

1. 首次调用元素的 `connectedCallback`时，自定义元素将在其 `shadow root` 内部挂载 `vue`组件的实例。
2. 调用元素的 `disconnectedCallback` 时，`vue` 将在微任务执行完后检查元素是否已从 DOM 中卸载。
   1. 如果元素仍然在 DOM 中，那么 `vue` 认为这是一个移动操作，组件实例将被保留
   2. 如果元素从文档中已卸载，那么 `vue` 认为这是一个删除操作，组件实例将被卸载

#### 2.1.2  props

1. 基础类型的 `props` (`string`, `boolean` 和 `number`) 都将在自定义元素上被定义为属性。`vue` 将正确的自动处理 attributes 属性和 props 属性之间的 map 关系。

2. `vue` 还将自动的把布尔或数字类型声明的 `props` 转换为所需的类型

   <div align='center'>
   	<img src="./img/components/props-1.png" style="zoom:50%;" width="50%" />
     <p>传递给自定义元素的 props 被定义为属性并且自动转换成了所需的类型</p>
   </div>

3. 因为 DOM 属性只能是字符串，所以当我们需要将复杂数据作为 DOM 属性传递给自定义元素时。可以使用 `.prop` 修饰符强制地将 `v-bind` 绑定值设置为 DOM 属性。

   ```html
   <my-vue-element :user.prop="{ name: 'jack' }"></my-vue-element>
   
   <!-- 简写方式 -->
   <my-vue-element .user="{ name: 'jack' }"></my-vue-element>
   ```

   > 因为 `vue3` 会自动地对传递的  `props` 进行处理，所以不需要担心复杂的 `props` 是否正确传递。但是，我自己实验发现，大部分情况下如果不使用 `.prop` 这个修饰符，都会出错，所以只要是复杂的 `props`， 建议直接使用 `.prop` 修饰符就可以了

#### 2.1.3 事件

在普通的 `script` 中使用 `this.$emit` 和 `setup` 中使用 `emit` 抛出的自定义事件都将通过原生的[ `CustomEvents`](https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events#adding_custom_data_%E2%80%93_customevent)来执行。事件传递的参数将会暴露成一个数组并作为 `CustomEvent` 对象的 `details` 属性。

#### 2.1.4 插槽

编写组件时，可以像往常一样使用  `<slot/>` 元素预留插槽。 但是，在使用自定义元素时，它只接受[原生的插槽语法](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots)：

1. 不支持作用域插槽
2. 使用命名插槽时，使用 `slot` 属性而不是 `v-slot` 指令：

```html
<my-vue-element>
  <div slot="named">hello</div>
</my-vue-element>
```

#### 2.1.5 `Provide/Injection`

`Provide / Inject` API 及其等效的 `Composition API` 也适用于 `vue` 定义的自定义元素。 但是，需要注意，这仅适用于自定义元素之间，即 `vue` 定义的自定义元素将无法注入非自定义元素` vue` 组件提供的值。

### 2.2 使用单文件组件创建 web component

  `defineCustomElement`  除了接收使用  `vue` 单文件组件写法的对象外（说实话，这种写法实在太老火了），还可以直接接收一个 `.vue` 文件（早说嘛，是吧）。

但是，有三点需要注意：

1. 一般在使用默认工具设置时，SFC 中的 `<style>` 在生产构建期间会被提取并合并到单个 `css` 文件中。 而使用 SFC 作为自定义元素时，是需要将 `<style>` 标记注入自定义元素的 `shadow root` 中的。

2. 官方 SFC 工具直接支持以 SFC 作为 `defineCustomElement` 的参数的，但是需要 `@vitejs/plugin-vue@^1.4.0` 或 `vue-loader@^16.5.0`。
3. 要选择使用此模式，只需以 `.ce.vue` （`.ce` customElement 的缩写）结尾您的组件文件名，以使得构建工具在构建时将 `css` 注入到自定义元素的 `shadow root` 中而不是提取合并到单个 `css` 文件中

```js
import { defineCustomElement } from 'vue'
import Example from './Example.ce.vue'		// 引入

const ExampleElement = defineCustomElement(Example)  // 生成 HTMLElement 构造函数

customElements.define('my-example', ExampleElement)		// 注册
```

## 3. 用 vue 创建自定义元素库的注意点

### 3.1 注意成本和优势

<font color='red'>使用 Vue 构建自定义元素时，自定义元素的解析是需要依赖于 Vue 的运行时解析的。</font>比如使用的构建工具是 `vite`，为了能够生效，需要我们配置一下 `vite.config.ts`。

```js
resolve: {
  alias: [
    { find: 'vue', replacement: 'vue/dist/vue.esm-bundler.js' },
  ],
},
```

这里配置就是指定项目打包或运行时 `vue` 是运行时的包。

而运行时的包比生产包大约要大16kb，也就是说，需要去多承担这个 16 kb的体积。这意味着，如果你仅仅要发布（或者使用）单个自定义元素，使用 Vue 并不理想。但是，如果您要发布具有复杂逻辑并且数量较多的自定义元素库，那么这点成本几乎就不算什么了，因为相比较使用原生的 web components 的写法， Vue 要编写的代码将会少很多，所以，自定义元素数量越多，vue 创建自定义元素的方式就越有优势。

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

## 4. 聊聊 vue component 和 web component

一些开发人员认为应该避免使用框架专有的组件模型，并且专门使用自定义元素，这样呢可以使应用程序更加能够 “面向未来”。

在这里，将尝试解释为什么这是对问题的过于简单化的看法。

> 看法来自于 vue 官网，[可点击查看](https://v3.vuejs.org/guide/web-components.html#definecustomelement)

自定义元素和 Vue 组件之间确实存在一定程度的功能重叠：它们都允许我们定义具有数据传递、事件分发和生命周期管理的可重用组件。然而，Web Components  API 是相对低级和简单的。为了构建一个实际的应用程序，我们需要很多平台没有涵盖的附加功能：

- 一个声明式和高效的模板系统；
- 一个有助于跨组件逻辑提取和重用的反应式状态管理系统；
- 一种在服务器上呈现组件并在客户端 (SSR) 上将它们水合的高效方法

`vue` 的组件模型在设计时就考虑到了这些需求，`vue` 拥有一支称职的工程团队，你可以使用自定义元素之上来构建大型项目，但这也意味着您要承担内部框架的长期维护负担，同时失去了生态系统和社区利益。

## 5. 总结

对于自定义元素，我想这更多的是一种拓展研究吧，`vue` `react` 框架不仅仅是在其框架本身的设计，还有是生态，所以能形成一个闭环。而自定义元素，缺少的不仅是设计层面的，更多是生态。

但是 `vue3` 能够去做这样的拓展也是非常有意思的，我们开发者也多去探索探索，说不定未来就能够实现跨技术栈了呢？

