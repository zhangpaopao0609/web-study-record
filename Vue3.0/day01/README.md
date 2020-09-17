[toc]
# 开课吧Vue 3.0 学习
时间： 2020.9.16
地点： 公司
# vue3.0-day-01

## 作业
### 第一题 说说Vue2.0和Vue3.0有什么区别
1. 重构响应式系统，使用Proxy替换Object.defineProperty，使用Proxy优势：
- 可直接监听数组类型的数据变化
- 监听的目标为对象本身，不需要像Object.defineProperty一样遍历每个属性，有一定的性能提升
- 可拦截apply、ownKeys、has等13种方法，而Object.defineProperty不行
- 直接实现对象属性的新增/删除
2. 新增Composition API，更好的逻辑复用和代码组织
3. 重构 Virtual DOM
- 模板编译时的优化，将一些静态节点编译成常量
- slot优化，将slot编译为lazy函数，将slot的渲染的决定权交给子组件
- 模板中内联事件的提取并重用（原本每次渲染都重新生成内联函数）
4. 代码结构调整，更便于Tree shaking，使得体积更小
5. 使用Typescript替换Flow

### 为什么要新增Composition API，它能解决什么问题
1. Vue2.0中，随着功能的增加，组件变得越来越复杂，越来越难维护，而难以维护的根本原因是Vue的API设计迫使开发者使用watch，computed，methods选项组织代码，而不是实际的业务逻辑。
2. 另外Vue2.0缺少一种较为简洁的低成本的机制来完成逻辑复用，虽然可以minxis完成逻辑复用，但是当mixin变多的时候，会使得难以找到对应的data、computed或者method来源于哪个mixin，使得类型推断难以进行。
所以Composition API的出现，主要是也是为了解决Option API带来的问题，第一个是代码组织问题，Compostion API可以让开发者根据业务逻辑组织自己的代码，让代码具备更好的可读性和可扩展性，也就是说当下一个开发者接触这一段不是他自己写的代码时，他可以更好的利用代码的组织反推出实际的业务逻辑，或者根据业务逻辑更好的理解代码。
第二个是实现代码的逻辑提取与复用，当然mixin也可以实现逻辑提取与复用，但是像前面所说的，多个mixin作用在同一个组件时，很难看出property是来源于哪个mixin，来源不清楚，另外，多个mixin的property存在变量命名冲突的风险。而Composition API刚好解决了这两个问题。