[toc]

# vue源码梳理流程

## 1. package.json

```js
"dev": "rollup -w -c scripts/config.js --sourcemap --environment TARGET:web-full-dev",
```

这里的关键是两个

1. scripts/config.js 告诉了我们打包的配置文件，一般来书在这里就能找到打包的入口文件
2. TARGET:web-full-dev" 这个信息很重要，在等下的寻找入口文件很有用

## 2. scripts/config.js

```JS
module.exports = genConfig(process.env.TARGET)  // 打包配置出口

function genConfig (name) {}  // 这就是配置主体

const builds= {}  // 不同环境下的不同配置

// Runtime+compiler development build (Browser)
  'web-full-dev': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.js'),
    format: 'umd',
    env: 'development',
    alias: { he: './entity-decoder' },
    banner
  },
// 通过process.env.TARGET   web-full-dev 
// 此时的入口文件就是 web/entry-runtime-with-compiler.js
    
 const aliases = require('./alias')  // 文件配置了很多的路径缩写
```

## 3. scripts/alias.js

```js
web: resolve('src/platforms/web'),
  
// 这里记录一个缩写, 后面会用得上
core: resolve('src/core'), 
```

结合缩写和打包配置入口web/entry-runtime-with-compiler.js ，就可以找到dev的入口文件

## 4. src/platforms/web/entry-runtime-with-compiler.js

```js
import Vue from './runtime/index'  // 这里引入了 Vue，说明不是 Vue 的构造 

const mount = Vue.prototype.$mount

Vue.prototype.$mount = function(el) {
  const options = this.$options
  const { render, staticRenderFns } = compileToFunctions(.....)  // 这个就是模板解析
  options.render = render
  
  return mount.call(this, el, hydrating)
}
```

主要是给 Vue.prototype.$mount 添加了一些东西， 获取了渲染函数

这里有一个点需要留意：

1. import { compileToFunctions } from './compiler/index'  这应该就是模板解析

## 5. src/platforms/web/runtime/index.js

```js
import Vue from 'core/index'  // 引入

Vue.prototype.$mount = function() {
  return mountComponent(this, el, hydrating)  // 那么这个mountComponent是关键
}
```

这里主要是做了按照运行时的指令和组件，当然还有 获取 Vue.prototype.$mount 

这里有一个点需要留意：

1. mountComponent  

   import { mountComponent } from 'core/instance/lifecycle'

## 6. src/core/index.js

```js
import Vue from './instance/index'  // 引入

initGlobalAPI(Vue)  // 初始化全局API VUE
```

这里有一个点需要留意：

1. initGlobalAPI(Vue) 

   import { initGlobalAPI } from './global-api/index'

## 7. src/core/instance/index.js

```js
import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue
```

终于算是找到了 VUE 的构造函数

这里有六个点需要注意：

1. this._init(options)  // 这是从哪儿来的
2. initMixin(Vue)
3. stateMixin(Vue)
4. eventsMixin(Vue)
5. lifecycleMixin(Vue)
6. renderMixin(Vue)

## 8. src/core/instance/init.js

```js
Vue.prototype._init = function() {
  
  
  	initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate')
    initInjections(vm) // resolve injections before data/props
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created')
}
```

这里初始化了一些东西，值得关注：

1. initLifecycle(vm)
2. initEvents(vm)
3. initRender(vm)
4. callHook(vm, 'beforeCreate')
5. initInjections(vm) // resolve injections before data/props
6. initState(vm)
7. initProvide(vm) // resolve provide after data/props
8. callHook(vm, 'created')

## 9. src/core/instance/lifecycle.js

initLifecycle(vm)   只是找到了根节点

## 10. src/core/instance/events.js

initEvents

```js
export function initEvents (vm: Component) {
  const listeners = vm.$options._parentListeners
  if (listeners) {
    updateComponentListeners(vm, listeners)
  }
}

export function updateComponentListeners () {
  target = vm
  updateListeners(listeners, oldListeners || {}, add, remove, createOnceHandler, vm)
  target = undefined
}

import { updateListeners } from '../vdom/helpers/index'
```

看起来是初始化了监听器

## 11. src/core/instance/render.js

initRender

```js
vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true)

if (process.env.NODE_ENV !== 'production') {
  defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, () => {
    !isUpdatingChildComponent && warn(`$attrs is readonly.`, vm)
  }, true)
  defineReactive(vm, '$listeners', options._parentListeners || emptyObject, () => {
    !isUpdatingChildComponent && warn(`$listeners is readonly.`, vm)
  }, true)
} else {
  defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true)
  defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true)
}
```

defineReactive  定义观察者















