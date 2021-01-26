[toc]

# HookEvent  in Vue2.x

## 1. 前言

### 1.1 发现 hookEvent 

2020.1.25 同事小姐姐问了一个问题，如何在 react 中监听组件的生命周期，也就是说，想知道目前页面执行到哪一个生命周期了，希望能在某个生命周期执行某个功能。就类似于 Vue 中的 hookEvent。

我从未听说和使用过。学习一直在路上，通过网上查看和源码的查看，明白了其中的原理，在此记录。

### 1.2 hookEvent 应用场景

#### 1.2.1 场景1

某父组件下有 10 个子组件，每个子组件中都需要在 mounted 时提示用户组件渲染成功，在 beforeDestory 时提示用户组件销毁成功，如果没有 hookEvent，那么就需要在 10 个子组件的mounted 和 beforeDestory 生命周期中分别写一段相同的代码。如下：

```js
mounted() {
	alert("组件渲染成功！")
}
beforeDestory() {
	alert("组件销毁成功！")
}
```

这段代码需要在10个组件里分别写上。如果使用 hookEvent，只需要在父组件中监听子组件的这两个生命周期，写一套代码即可。如下：

```js
<component-a 
	@hook:mounted="handleHookMounted" 
	@hook:beforeDestory="handleHookBeforeDestory" 
/>
<component-b 
	@hook:mounted="handleHookMounted" 
	@hook:beforeDestory="handleHookBeforeDestory" 
/>
    
methods: {
  handleHookMounted() {
    alert("组件渲染成功！");
  },
  handleHookBeforeDestory() {
    alert("组件销毁成功！");
  }
}
```

#### 1.2.2 场景2

代码中引入某一个三方 UI 组件，由于数据量过大，这个组件从 created 到 mounted 需要 5s 时间，可是这个 UI 组件并没有考虑到这一点，因此没有做加载效果，因此，页面存在 5s 的空白时间，那么这时候如果想要在 created 到 mounted 期间让页面展示一个 loading 效果，有两种方案。第一种就是修改这个 UI 组件，在这个期间加上 loading 效果，显然这很难。第二种就是利用 hookEvent 来实现，监听 UI 组件的 created 和 mounted 生命周期。如下：

```js
<component-ui 
	@hook:created="handleHookCreated" 
	@hook:mounted="handleHookMounted" 
/>

handleHookCreated() {
	alert("组件开始loading，此时可让页面展示loading");
},
handleHookMounted() {
	alert("组件加载结束，此时loading结束");
}
```

## 2. HookEvent

首先，hookEvent 并没有在官方文档中出现，但是在源码中的确是实现了这一功能。

下面，让我们来看看源码是怎么实现的。

既然是监听的生命周期，因此，从生命周期的调用开始查找。

### 2.1 生命周期调用（`src/core/instance/init.js`）

```js
import { initLifecycle, callHook } from './lifecycle'
...
vm._self = vm
initLifecycle(vm)
initEvents(vm)
initRender(vm)
callHook(vm, 'beforeCreate')
initInjections(vm) // resolve injections before data/props
initState(vm)
initProvide(vm) // resolve provide after data/props
callHook(vm, 'created')
```

可以看到，源码中调用生命周期的是  callHook 函数。

### 2.2 callHook(`src/core/instance/lifecycle.js`)

```js
export function callHook (vm: Component, hook: string) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget()
  const handlers = vm.$options[hook]
  const info = `${hook} hook`
  if (handlers) {
    for (let i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info)
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook)
  }
  popTarget()
}
```

特别注意其中的  `vm.$emit('hook:' + hook)` ，**想必看到这里应该就有所理解，原来源码是这样实现的，也就是在生命周期执行时触发了父组件监听的 `'hook:' + hook` 事件**。

再注意一下，这里有个 `if (vm._hasHookEvent)`  条件，需要条件满足时才执行。

### 2.3 _hasHookEvent(`src/core/instance/events.js`)

```js
export function eventsMixin (Vue: Class<Component>) {
  const hookRE = /^hook:/
  Vue.prototype.$on = function (event: string | Array<string>, fn: Function): Component {
    const vm: Component = this
    if (Array.isArray(event)) {
      for (let i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn)
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn)
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true
      }
    }
    return vm
  }
```

这里可以看到，Vue 监听到某个 以 `hook:`开头的事件时，`_hasHookEvent` 就会为真。

看了这一段源码就会大概明白，原来源码是在生命周期执行过程中帮我们触发了父组件监听的以 `hook:`开头的事件。因此，如何使用也自然就知晓了。

## 3. 如何使用 HookEvent

只需要在父组件中监听 `hook: + 生命周期`的时间，就可以在子组件对应的生命周期执行时执行需要的动作了。

如下：

```js
<son-component
  @hook:beforeCreate="handleHookBeforeCreate" 
  @hook:created="handleHookCreated" 
  @hook:beforeMount="handleHookBeforeMount" 
  @hook:mounted="handleHookMounted" 
  @hook:beforeUpdate="handleHookBeforeUpdate" 
  @hook:updated="handleHookUpdated" 
  @hook:beforeDestory="handleHookBeforeDestory" 
  @hook:destoryed="handleHookDestoryed" 
/>

methods: {
  handleHookBeforeCreate() {},
  handleHookCreated() {},
  handleHookBeforeMount() {},
  handleHookMounted() {},
  handleHookBeforeUpdate() {},
  handleHookUpdated() {},
  handleHookBeforeDestory() {},
  handleHookDestoryed() {}
}
```

## 4. 总结和感谢

总结：

1. 为什么官网没有？

   也许是不常用，也许是想留一手，哈哈！

2. 个人觉得是一个有用的东西，不仅是实际业务场景，而且给我一种启发，在设计框架中， 如果能够保留这些功能，非常的棒和实用。

感谢：

- 感谢一下同事小姐姐，让我发现了一个新东西，不错不错，完美完美！















