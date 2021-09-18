[toc]
# 开课吧Vue 3.0 学习
时间： 2020.9.17
地点： 公司
# vue3.0-day-01

## 作业
### 1. 第一题 说说Vue3.0 如何优雅的使用v-model
1. 自定义组件的多属性v-model支持，相比较2.0, 做了一点点修改，去掉了.sync，利用冒号实现参数的确定，
### 2. SSR的原理是什么

1. SSR全称Server Side Render的简称，中文服务端渲染
2. 服务端渲染是指利用服务端对用户请求的数据（html）进行解析渲染然后再返回客户端

服务端渲染是和客户端渲染一一对应的，客户端渲染是用户请求后，服务端只返回某些数据，而由客户端来进行解析渲染。

Nuxt就是一个比较好的服务端渲染的框架，而且可以做到页面懒加载，实现首页打开用服务端渲染，其他用客户端渲染

### 3. **Composition API与React Hook很像，说说区别**

1. 相同点

   拆分服务组件，实现功能的复用

2. 异同点

   1）前者更多的采用js的函数相互调用，更贴近原生的js，可以随意调用嵌套，无任何心智负担

   2）后者具有非常高的心智负担，需要effect，state很好的配合才能有较佳的实现的



在Vue3.0优雅的使用v-model


在Vue2.0中如何实现双向数据绑定一种是v-model，另一种是.sync。因为一个组件只能用于一个v-model，但是有的组件需要有多个可以双向响应的数据，所以就出现了.sync。在Vue3.0中为了实现统一，实现了让一个组件可以拥有多个v-model，同时删除掉了.sync。在vue3.0中，v-model后面需要跟一个modelValue，即要双向绑定的属性名，Vue3.0就是通过给不同的v-model指定不同的modelValue来实现多个v-model。

参考地址: https://v3.vuejs.org/guide/migration/v-model.html#overview


SSR有了解吗？原理是什么？

在客户端请求服务器的时候，服务器到数据库中获取到相关的数据，并且在服务器内部将Vue组件渲染成HTML，并且将数据、HTML一并返回给客户端，这个在服务器将数据和组件转化为HTML的过程，叫做服务端渲染SSR。
而当客户端拿到服务器渲染的HTML和数据之后，由于数据已经有了，客户端不需要再一次请求数据，而只需要将数据同步到组件或者Vuex内部即可。除了数据意外，HTML也结构已经有了，客户端在渲染组件的时候，也只需要将HTML的DOM节点映射到Virtual DOM即可，不需要重新创建DOM节点，这个将数据和HTML同步的过程，又叫做客户端激活。
使用SSR的好处：
有利于SEO：其实就是有利于爬虫来爬你的页面，因为部分页面爬虫是不支持执行JavaScript的，这种不支持执行JavaScript的爬虫抓取到的非SSR的页面会是一个空的HTML页面，而有了SSR以后，这些爬虫就可以获取到完整的HTML结构的数据，进而收录到搜索引擎中。
白屏时间更短：相对于客户端渲染，服务端渲染在浏览器请求URL之后已经得到了一个带有数据的HTML文本，浏览器只需要解析HTML，直接构建DOM树就可以。而客户端渲染，需要先得到一个空的HTML页面，这个时候页面已经进入白屏，之后还需要经过加载并执行 JavaScript、请求后端服务器获取数据、JavaScript 渲染页面几个过程才可以看到最后的页面。特别是在复杂应用中，由于需要加载 JavaScript 脚本，越是复杂的应用，需要加载的 JavaScript 脚本就越多、越大，这会导致应用的首屏加载时间非常长，进而降低了体验感。





Composition API与React Hook很像，说说区别

从React Hook的实现角度看，React Hook是根据useState调用的顺序来确定下一次重渲染时的state是来源于哪个useState，所以出现了以下限制
不能在循环、条件、嵌套函数中调用Hook
必须确保总是在你的React函数的顶层调用Hook
useEffect、useMemo等函数必须手动确定依赖关系
而Composition API是基于Vue的响应式系统实现的，与React Hook的相比
声明在setup函数内，一次组件实例化只调用一次setup，而React Hook每次重渲染都需要调用Hook，使得React的GC比Vue更有压力，性能也相对于Vue来说也较慢
Compositon API的调用不需要顾虑调用顺序，也可以在循环、条件、嵌套函数中使用
响应式系统自动实现了依赖收集，进而组件的部分的性能优化由Vue内部自己完成，而React Hook需要手动传入依赖，而且必须必须保证依赖的顺序，让useEffect、useMemo等函数正确的捕获依赖变量，否则会由于依赖不正确使得组件性能下降。
虽然Compositon API看起来比React Hook好用，但是其设计思想也是借鉴React Hook的。
















、