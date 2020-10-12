# vue-study
vue-study-09 
服务端渲染
# Nuxt框架（还有一种备选，pupter）
服务端渲染的优点
1. seo 友好
2. 首屏加载速度快
3. 
## 今日目标
1. 调试Vue项目的方式
2. vue是如何启动的
3. vue响应式机制逐行分析

### 
术语解释：
- runtime: 仅包含运行是的版本，包含 vue 运行核心代码但没有模板编译器，如 vue.runtime.js
- umd: Universal Module Definition 规范，用于浏览器 script 标签， 默认包含运行时和编译器，如 vue.js
- commonjs: cjs 规范用于旧版打包器如 browserify、webpack 1，如 vue.runtime.js
- esm: ES module 规范用于现代打包器如 weboack2及以上版本 vue.runtime.esm.js

### 步骤
1. 调试 vue 项目的方式
- 安装依赖： ```npm i || yarn```
- 安装打包工具： rollup  ```npm i rollup -g```
- 修改package.json里面的dev脚本：
```js
  "dev": "rollup -w -c scripts/config.js --sourcemap --environment TARGET:web-full-dev",
```
- 执行打包 ``` npm run dev ``` 
- 修改samples里面的文件引用新生成的 vue.js 


### Vue 数据响应式
Vue一大特点是数据响应式，数据的变化会作用于 UI 而不用进行 DOM 操作。原理上来讲，是利用了 js 语言特性 Object.defineProperty(), 通过定义对象属性 setter 方法拦截对象属性变更，从而将数值的变化转换成 UI 的变化。

vue1.0 的实现，将组件中的每个模板都解析出来并且创建一个watcher，当项目变大时，watcher就会很多，因此会很卡
vue2.0 的实现，仅仅是为每个组件创建一个watcher，因此，这时候data变化时vue并不知道是哪个地方应该做dom操作，所以引入了vdom， 利用diff算法来比对，然后实现dom操作

initData