# vue 基础

## 1. MVVM、MVC、MVP 的区别

MVC、MVP 和 MVVM 是三种常见的软件架构设计模式，主要通过分离 关注点的方式来组织代码结构，优化开发效率。

在开发单页面应用时，往往一个路由页面对应了一个脚本文件，所有 的页面逻辑都在一个脚本文件里。页面的渲染、数据的获取，对用户 事件的响应所有的应用逻辑都混合在一起，这样在开发简单项目时， 可能看不出什么问题，如果项目变得复杂，那么整个文件就会变得冗 长、混乱，这样对项目开发和后期的项目维护是非常不利的。

1. MVC

MVC 通过分离 Model、View 和 Controller 的方式来组织代码结构。 其中 View 负责页面的显示逻辑，Model 负责存储页面的业务数据， 以及对相应数据的操作。并且 View 和 Model 应用了观察者模式， 当 Model 层发生改变的时候它会通知有关 View 层更新页面。

Controller 层是 View 层和 Model 层的纽带，它主要负责用户与应 用的响应操作，当用户与页面产生交互的时候，Controller 中的事 件触发器就开始工作了，通过调用 Model 层，来完成对 Model 的修 改，然后 Model 层再去通知 View 层更新

2. MVVM

MVVM 分为 Model、View、ViewModel： Model 代表数据模型，数据和业务逻辑都在 Model 层中定义； View 代表 UI 视图，负责数据的展示； ViewModel 负责监听 Model 中数据的改变并且控制视图的更新，处理 用户交互操作； Model 和 View 并无直接关联，而是通过 ViewModel 来进行联系的， Model 和 ViewModel 之间有着双向数据绑定的联系。因此当 Model 中 的数据改变时会触发 View 层的刷新，View 中由于用户交互操作而改 变的数据也会在 Model 中同步。 这种模式实现了 Model 和 View 的数据自动同步，因此开发者只需要 专注于数据的维护操作即可，而不需要自己操作 DOM。

3. MVP

MVP 模式与 MVC 唯一不同的在于 Presenter 和 Controller。在 MVC 模式中使用观察者模式，来实现当 Model 层数据发生变化的时 候，通知 View 层的更新。这样 View 层和 Model 层耦合在一起， 当项目逻辑变得复杂的时候，可能会造成代码的混乱，并且可能会对 代码的复用性造成一些问题。MVP 的模式通过使用 Presenter 来实 现对 View 层和 Model 层的解耦。MVC 中的 Controller 只知道 Model 的接口，因此它没有办法控制 View 层的更新，MVP 模式中， View 层的接口暴露给了 Presenter 因此可以在 Presenter 中将 Model 的变化和 View 的变化绑定在一起，以此来实现 View 和 Model 的同步更新。这样就实现了对 View 和 Model 的解耦， Presenter 还包含了其他的响应逻辑

## 2. slot 是什么？有什么作用？原理是什么？

slot 又名插槽，是 Vue 的内容分发机制，组件内部的模板引擎使用 slot 元素作为承载分发内容的出口。插槽 slot 是子组件的一个模板 标签元素，而这一个标签元素是否显示，以及怎么显示是由父组件决 定的。slot 又分三类，默认插槽，具名插槽和作用域插槽。

- 默认插槽：又名匿名插槽，当 slot 没有指定 name 属性值的时候一个 默认显示插槽，一个组件内只有有一个匿名插槽。
- 具名插槽：带有具体名字的插槽，也就是带有 name 属性的 slot，一 个组件可以出现多个具名插槽。
- 作用域插槽：默认插槽、具名插槽的一个变体，可以是匿名插槽，也 可以是具名插槽，该插槽的不同点是在子组件渲染作用域插槽时，可 以将子组件内部的数据传递给父组件，让父组件根据子组件的传递过 来的数据决定如何渲染该插槽。

实现原理：当子组件 vm 实例化时，获取到父组件传入的 slot 标签的 内容，存放在 vm.$slot 中，默认插槽为 vm.$slot.default，具名插 槽为 vm.$slot.xxx，xxx 为插槽名，当组件执行渲染函数时候，遇 到 slot 标签，使用$slot 中的内容进行替换，此时可以为插槽传递 数据，若存在数据，则可称该插槽为作用域插槽

> vnode 层面，普通的模板编译后，就是 vnode， 编译到 slot 时， vnode 此时通过 vm.$slot 去获取 vnode

## 3. $nextTick 原理及作用

Vue 的 nextTick 其本质是对 JavaScript 执行原理 EventLoop 的 一种应用。

将 callback 放入本次事件循环 tick 的队列末尾，此时状态已经完成了改变， dom 也已经完成了更新，所以在 callback 中能够获取到改变完成的状态值和 dom。

## 4. Vue 单页应用与多页应用的区别

概念：

- SPA 单页面应用（SinglePage Web Application），指只有一个主页 面的应用，一开始只需要加载一次 js、css 等相关资源。所有内容都 包含在主页面，对每一个功能模块组件化。单页应用跳转，就是切换 相关组件，仅仅刷新局部资源。
- MPA 多页面应用 （MultiPage Application），指有多个独立页面的 应用，每个页面必须重复加载 js、css 等相关资源。多页应用跳转， 需要整页资源刷新。

## 5. Vue 中封装的数组方法有哪些，其如何实现页面更新

vue3 对

```js
includes();
indexOf();
lastIndexOf();
```

做了代理，主要是因为代理对象会进行深层代理 arr.includes(obj) 时，arr[0-xxx] 是代理对象，所以在查找时要在原对象上去查找。

同时还对

```js
push();
pop();
shift();
unshift();
splice();
```

进行代理，主要是因为他们在设置的同时也会读取 length，所以会造成栈溢出，因此在调用这些方法的时候，要使得它们在读取 length 的时候不进行追踪

## 6. Vue data 中某一个属性的值发生改变后，视图会立即同步执 行重新渲染吗？

这个答案不能直接说不会，也不能说会，要分情况。

- 默认情况下不会，因为 vue 中设计的副作用函数调度器默认是异步调度的。

  ```js
  const p = Promise.resolve();
  let flush = false;
  const jobs = new Set();

  function scheduler() {
    if (flush) {
      return;
    }
    flush = true;
    p.then(() => {
      jobs.forEach(job => job());
    }).finally(() => {
      flush = false;
    });
  }

  effect(fn, {
    scheduler(fn) {
      jobs.add(fn);
    }
  });
  ```

  这样有几个好处哈

  - 同一状态多次改变只会触发一次副作用函数执行
  - 不同状态触发同一个副作用函数时，只会触发一次副作用函数执行

- 既然默认情况下是异步的，那么当然也可以是同步的

## 7. assets 和 static 的区别

- 相同点： assets 和 static 两个都是存放静态资源文件。项目中所 需要的资源文件图片，字体图标，样式文件等都可以放在这两个文件 下，这是相同点

- 不相同点：assets 中存放的静态资源文件在项目打包时，也就是运 行 npm run build 时会将 assets 中放置的静态资源文件进行打包 上传，所谓打包简单点可以理解为压缩体积，代码格式化。而压缩后 的静态资源文件最终也都会放置在 static 文件中跟着 index.html 一同上传至服务器。static 中放置的静态资源文件就不会要走打包 压缩格式化等流程，而是直接进入打包好的目录，直接上传至服务器。 因为避免了压缩直接进行上传，在打包时会提高一定的效率，但是 static 中的资源文件由于没有进行压缩等操作，所以文件的体积也 就相对于 assets 中打包后的文件提交较大点。在服务器中就会占据 更大的空间。

- 建议： 将项目中 template 需要的样式文件 js 文件等都可以放置在 assets 中，走打包这一流程。减少体积。而项目中引入的第三方的 资源文件如 iconfont.css 等文件可以放置在 static 中，因为这 些引入的第三方文件已经经过处理，不再需要处理，直接上传

## 8. Vue 模版编译原理

- vue 中的模板 template 无法被浏览器解析并渲染，因为这不属于浏 览器的标准，不是正确的 HTML 语法，所有需要将 template 转化成一 个 JavaScript 函数，这样浏览器就可以执行这一个函数并渲染出对 应的 HTML 元素，就可以让视图跑起来了，这一个转化的过程，就成 为模板编译。模板编译又分三个阶段，解析 parse，优化 optimize， 生成 generate，最终生成可执行函数 render。

- 解析阶段：使用大量的正则表达式对 template 字符串进行解析，将 标签、指令、属性等转化为抽象语法树 AST。 优化阶段：遍历 AST，找到其中的一些静态节点并进行标记，方便在 页面重渲染的时候进行 diff 比较时，直接跳过这一些静态节点，优 化 runtime 的性能。

- 生成阶段：将最终的 AST 转化为 render 函数字符串。

## 9. v-if 和 v-for 哪个优先级更高？如果同时出现，应如何优 化？

v-for 优先于 v-if 被解析，如果同时出现，每次渲染都会先执行循 环再判断条件，无论如何循环都不可避免，浪费了性能。 要避免出现这种情况，则在外层嵌套 template，在这一层进行 v-if 判断，然后在内部进行 v-for 循环。如果条件出现在循环内部，可通 过计算属性提前过滤掉那些不需要显示的项。

## 10. Vue 子组件和父组件执行顺序

在Vue.js中，父组件和子组件的生命周期钩子执行顺序是有明确规定的。了解这个执行顺序对于理解组件间的交互和数据流非常重要。以下是Vue 2和Vue 3中父子组件生命周期钩子的一般执行顺序：

- 创建阶段（Mounting Phase）

1. 父组件 `beforeCreate`
2. 父组件 `created`
3. 父组件 `beforeMount`
4. 子组件 `beforeCreate`
5. 子组件 `created`
6. 子组件 `beforeMount`
7. 子组件 `mounted`
8. 父组件 `mounted`

- 更新阶段（Updating Phase）

当父组件或子组件的响应式数据发生变化时，将触发更新：

1. 父组件 `beforeUpdate`
2. 子组件 `beforeUpdate`
3. 子组件 `updated`
4. 父组件 `updated`

- 销毁阶段（Unmounting Phase）

当组件被销毁时（例如，使用`v-if`指令来控制组件的显示与隐藏），以下是生命周期钩子的执行顺序：

1. 父组件 `beforeDestroy` / `beforeUnmount` (Vue 3)
2. 子组件 `beforeDestroy` / `beforeUnmount` (Vue 3)
3. 子组件 `destroyed` / `unmounted` (Vue 3)
4. 父组件 `destroyed` / `unmounted` (Vue 3)

- 注意事项：

- 在Vue 3中，`beforeDestroy` 和 `destroyed` 生命周期钩子被重命名为 `beforeUnmount` 和 `unmounted`。
- 在更新阶段，如果子组件的变化导致父组件需要更新，那么子组件的 `beforeUpdate` 和 `updated` 钩子将在父组件的相应钩子之前执行。
- 如果有多个子组件，它们将按照它们在模板中出现的顺序进行挂载和更新。
- `activated` 和 `deactivated` 钩子用于`<keep-alive>`包裹的组件，它们的执行顺序与上述规则类似。

理解这些生命周期钩子的执行顺序对于编写可预测的Vue代码非常重要，尤其是当你需要在父子组件之间同步数据或者执行某些操作时。

## 11. keep-alive 的实现原理

总说：将组件缓存起来

细说：
两个方面

- 缓存真实 dom,将组件实例上的 el 也就是真实 dom 放到一个 fragment 中，这样下次就不需要重新渲染了，直接执行一次 dom 操作即可
- 缓存状态，所有的状态都是存储在 实例对象上的，因此，将实例对象进行缓存

`<keep-alive>` 是 Vue.js 提供的一个内置组件，它可以用来缓存非活动组件实例，而不是销毁它们。这样做可以保持组件状态，避免重新渲染，从而提高性能。`<keep-alive>` 组件在单页面应用（SPA）中非常有用，尤其是在需要保持组件状态或避免重复渲染开销较大的组件时。

实现原理

`<keep-alive>` 的实现原理主要基于以下几个方面：

1. **缓存机制：**
   `<keep-alive>` 组件内部维护了一个缓存对象，用来存储被包裹的组件实例。当组件第一次渲染时，它会被创建并缓存起来。如果组件的条件渲染（如 `v-if`）变为 `false`，组件不会被销毁，而是被缓存起来，等待下次重新渲染。

2. **生命周期钩子：**
   `<keep-alive>` 会影响内部组件的生命周期钩子。当组件被缓存时，它不会触发 `destroyed` 钩子；当组件再次被激活时，会触发 `activated` 钩子；当组件从缓存中移除时，会触发 `deactivated` 钩子。

3. **LRU 缓存策略：**
   为了限制缓存大小，`<keep-alive>` 可以使用最近最少使用（LRU）策略来丢弃不常用的组件实例。这意味着如果缓存的组件数量超过了 `<keep-alive>` 的 `max` 属性指定的值，最不常访问的组件实例将被销毁并从缓存中移除。

4. **渲染控制：**
   `<keep-alive>` 包裹的组件在渲染过程中，Vue 的渲染函数会检查组件是否已经被缓存。如果已经缓存，Vue 会直接从缓存中获取组件实例并渲染，而不是创建一个新的实例。

5. **Props 和 Slots：**
   `<keep-alive>` 组件接受 `include` 和 `exclude` 属性，允许开发者指定哪些组件应该被缓存或排除。此外，它也可以包裹默认插槽中的任何组件。

使用示例

```html
<keep-alive :max="10">
  <component v-if="showComponent" :is="currentComponent"></component>
</keep-alive>
```

在这个例子中，`<keep-alive>` 包裹了一个动态组件 `<component>`。当 `showComponent` 为 `true` 时，`currentComponent` 指定的组件会被渲染并缓存。如果 `showComponent` 变为 `false`，组件不会被销毁，而是被缓存起来，直到下次需要时再次被激活。`max` 属性限制了缓存中可以存储的组件实例数量。

总的来说，`<keep-alive>` 的实现原理是通过维护一个缓存对象来存储组件实例，并通过特定的生命周期钩子来管理这些实例的激活和停用状态，从而实现组件的缓存和复用。

## 12. 路由的 hash 和 history 模式的区别

Vue-Router 有两种模式：hash 模式和 history 模式。

默认的路由模式是 hash 模式。

1. hash 模式

- 简介： hash 模式是开发中默认的模式，它的 URL 带着一个#，例如： http://www.abc.com/#/vue，它的 hash 值就是#/vue。
- 特点：hash 值会出现在 URL 里面，但是不会出现在 HTTP 请求中，对后端完全没有影响。所以改变 hash 值，不会重新加载页面。这种模式的浏览器支持度很好，低版本的 IE 浏览器也支持这种模式。hash 路由被称为是前端路由，已经成为 SPA（单页面应用）的标配。
- 原理： hash 模式的主要原理就是 onhashchange()事件： 使用 onhashchange()事件的好处就是，在页面的 hash 值发生变化时， 无需向后端发起请求，window 就可以监听事件的改变，并按规则加载相应的代码。除此之外，hash 值变化对应的 URL 都会被浏览器记录下来，这样浏览器就能实现页面的前进和后退。虽然是没有请求后 端服务器，但是页面的 hash 值和对应的 URL 关联起来了

2. history 模式

- 简介：history 模式的 URL 中没有#，它使用的是传统的路由分发模式，即用户在输入一个 URL 时，服务器会接收这个请求，并解析这个 URL，然后做出相应的逻辑处理。
- 特点：当使用 history 模 式 时 ， URL 就 像 这 样 ： http://abc.com/user/id。相比 hash 模式更加好看。但是，history 模式需要后台配置支持。如果后台没有正确配置，访问时会返回 404。 API： history api 可以分为两大部分，切换历史状态和修改历史状 态：
  - 修 改 历 、史 状 态 ： 包 括 了 HTML5 History Interface 中 新 增 的 pushState() 和 replaceState() 方法，这两个方法应用于浏览器的 历史记录栈，提供了对历史记录进行修改的功能。只是当他们进行修 改时，虽然修改了 url，但浏览器不会立即向后端发送请求。如果要 做到改变 url 但又不刷新页面的效果，就需要前端用上这两个 API。
  - 切换历史状态： 包括 forward()、back()、go()三个方法，对应浏 览器的前进，后退，跳转操作。 虽然 history 模式丢弃了丑陋的#。但是，它也有自己的缺点，就是 在刷新页面的时候，如果没有相应的路由或资源，就会刷出 404 来。 如果想要切换到 history 模式，就要进行以下配置（后端也要进行配置）：

3. 两种模式对比

调用 history.pushState() 相比于直接修改 hash，存在以下优势:

- pushState() 设置的新 URL 可以是与当前 URL 同源的任意 URL；而 hash 只可修改 # 后面的部分，因此只能设置与当前 URL 同文档的 URL；
- pushState() 设置的新 URL 可以与当前 URL 一模一样，这样也会把 记录添加到栈中；而 hash 设置的新值必须与原来不一样才会触发动 作将记录添加到栈中；
- pushState() 通过 stateObject 参数可以添加任意类型的数据到记录中；而 hash 只可添加短字符串；
- pushState() 可额外设置 title 属性供后续使用。 hash 模式下，仅 hash 符号之前的 url 会被包含在请求中，后端如果没有做到对路由的全覆盖，也不会返回 404 错误；
- history 模式下， 前端的 url 必须和实际向后端发起请求的 url 一致，如果没有对用的路由处理，将返回 404 错误。

hash 模式和 history 模式都有各自的优势和缺陷，还是要根据实际 情况选择性的使用

## 13. vue3 比较 vue2 有哪些变化？

## 14. vue3 proxy 为什么比 object.defineProperty？

## 15. vue diff 算法，三种

- 简单 diff
  新的在旧的里面直接找，找到了直接 patch，然后判断是否移动（按照新节点的在旧节点的位置来判断）
