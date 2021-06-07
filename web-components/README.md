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

