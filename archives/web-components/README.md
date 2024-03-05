[toc]

# Web Components

Web components 是一套不同的技术，允许您创建可重用的定制元素（它们的功能封装在您的代码之外）并且在您的 web 应用中使用它们

## 1. 概念和使用

作为开发者，我们都知道尽可能做重用代码是一个好主意。

web components 旨在解决这些问题 —— 它由三项主要技术组成，它们可以一起使用来创建封装功能的定制元素，可以在你喜欢的任何地方重用，不必担心代码冲突。

- Custom elements(自定义元素)： 一组 JS API, 允许您定义 custom elements 及其行为，然后可以在您的用户界面中按照需要使用它们
- Shadow DOM: 一组 JS API， 用于封装的 ”影子“ DOM 树附加到元素（与主文档 DOM分开呈现）并控制其关联的功能。通过这种方式，您可以保持元素的功能私有，这样它们就可以被脚本化和样式化，而不用担心与文档的其它部分发生冲突。
- HTML templates(HTML 模板)： `<template>` 和 `<slot>` 元素使您可以编写不在呈现页面中显示的标记模板。然后它们可以作为自定义元素结构的基础被多次重用

实现 web components 的基本方法通常如下所示：

1. 类或函数
2. CustomElementRegistry.define()
3. Element.attachShadow
4.  `<template>` 和 `<slot>` 元素



## 2. 使用 custom elements



## 3. 使用生命周期回调函数

在 custom element 的构造函数中，可以指定多个不同的回调含糊，它们将会在元素的不同生命时期被调用：

- connectedCallback: 当 custom element 首次被插入文档 DOM 时，被调用
- disconnectedCallback: 当custom element 从文档 DOM 中删除时，被调用
- adoptedCallback: 当custom element 被移动到新的文档时，被调用
- attributeChangedCallback: 当 custom element 增加、删除、修改自身属性时，被调用





## 4. 使用 shadow DOM

Web components 的一个重要属性是封装——可以将标记结构、样式和行为隐藏起来，并与页面上的其它代码相隔离，保证不同的部分不会混在一起，可以使代码更加干净、整洁。其中，Shadow DOM 接口是关键所在，它可以将一个隐藏的、独立的DOM 附加到一个元素上

### 4.1 概况

DOM（文档对象模型），由不同的元素节点、文本节点连接而成的一个树状结构，应用于标记文档中。

Shadow DOM 允许将隐藏的 DOM 树附加到常规的 DOM 树中——它以 shadow root 节点为起始根节点，在这个根节点的下方，可以是任意元素，和普通的 DOM 元素一样

![image-20210608104845490](/Users/ardor/Desktop/MyGitHub/web-study-record/web-components/img/shadow-dom-tree.png)

这里，有一些 Shadow DOM 特有的术语需要了解

- Shadow host: 有一个常规的 DOM 节点， Shadow DOM 会被附加到这个节点上
- Shadow tree: Shadow DOM 内部的 DOM 树
- Shadow boundary: Shadow DOM 结束的地方，也是常规 DOM 开始的地方
- Shadow root: Shadow tree 的根节点

注意：不管从哪个方面来看，Shadow DOM 都不是一个新事物——在过去的很长一段时间里，浏览器用它来封装一些元素的内部结构。以一个有着默认播放控制按钮的 `<video>` 元素为例。你所能看到的只是一个 `<video>`标签，实际上，在它的 Shadow DOM 中，包含了一系类的按钮和其它控制器。Shadow DOM 标准允许你为你自己的元素（custom element）维护一组 Shadow DOM。

### 4.2 基本用法

可以使用`Element.attachShdow()`方法来将一个 shadow root 附加到任何一个元素上。它接受一个配置对象作为参数，该对象有一个  `mode` 属性，值可以是 `open` 或者 `closed`

```js
let shadow = elementRef.attachShadow({ mode: 'open'});
let shadow = elementRef.attachShadow({ mode: 'closed'});
```

`open` 表示可以通过页面内的 JS 方法来获取 Shadow DOM ， 例如使用 `Element.shadowRoot`属性：

```js
let myShadowDom = myCustomElem.shadowRoot;
```

如果你将一个 Shadow root 附加到一个 Custom element 上，并且将 `mode` 设置为 `closed`，那么就不可以从外部获取 Shadow DOM 了  —— `myCustomElem.shadowRoot`将会返回 `null`。浏览器中的某些内置元素就是如此，比如 `<video>`，包含了不可访问的  Shadow DOM.

如果期望将一个 Shadow DOM 附加到 custom element 上，可以在 custom element 的构造函数中添加如下实现（目前，这就是 Shadow DOM 最实用的用法）：

```js
let shadow = this.attachShadow({ mode: 'open' });
```

将 Shadow DOM 附加到一个元素后，就可以使用 DOM APIs 对它进行操作，就和处理常规 DOM 一样。

```js
const para = document.createElement('p');
shadow.appendChild(para);
// etc..
```



## 5. 使用 templates and slots

使用 `<template>`和`<slot>`元素创建一个可以用来灵活填充 Web 组件的 shadow DOM 的模板

### 5.1 关于模板（Templates）

当您必须在网页上重复使用相同的标记结构时，使用某种模板而不是一遍又一遍地重复相同的结构时有意义的。以前这是可行的，但 HTML `<template>` 元素使它更容易实现，此元素及其内容不会在 DOM 中呈现，但仍可使用 JS 去引用它。

让我们来看一个简单的示例：

```html
<template id='my-paragraph'>
	<p>My paragraph</p>
</template>
```

上面的代码不会展示在你的页面中，直到你使用 JS 获取它的引用，然后再添加到 DOM 中，如下：

```js
let template = document.getEmelentById('my-paragraph');
let tempalteContent = tempalte.content;
document.body.appednChild(templateContent);
```

### 5.2 在 web components 中使用模板

模板（templates） 本身就是有用的，而组件（web component）一起使用效果更好。我们定义一个 web 组件使用模板作为 shadow DOM 的内容，叫它 `<my-paragraph>`

```js
class MyParagraph extends HTMLElement {
  constructor() {
    super();
    this.init();
  };

  init() {
    const template = document.getElementById('my-paragraph');
    const templateContent = template.content;

    const shadowRoot = this.attachShadow({ mode: 'open' });
    // shadowRoot.appendChild(templateContent);
    shadowRoot.appendChild(templateContent.cloneNode(true));

  };
};

customElements.define('my-paragraph', MyParagraph);
```

要注意的关键是我们使用 `Node.cloneNode()` 方法添加了模板的拷贝到 Shadow DOM 的根节点上

>为什么不使用 appendChild 呢？因为appendChild 是将要添加的 node 给移过来，也就是说，原来的 node 是移动了，会消失

因为我们添加了模板的内容到 shadow DOM，所以我们可以加入一些样式信息到模板的 `<style>`标签里，这些样式信息稍后会封装到自定义的元素中。如果只给它添加到一个标准的 DOM 是不起作用的。

```html
<template id='my-paragraph'>
  <style>
    p {
      color: white;
      background-color: #666;
      padding: 5px;
    }
  </style>
  <p>this is my-paragraph I built with the template tag</p>
</template>
<my-paragraph></my-paragraph>
```

### 5.3 使用槽(slots)添加灵活度





































