[toc]

## 顶层 `await`

`await` 的使用必须是要在`async` 语法糖的包裹下，否者将无法执行，为了更简化代码， `<script setup>` 中可以使用顶层 `await`。

```vue
<script setup>
const post = await fetch(`/api/post/1`).then(r => r.json())
</script>
```

上述代码编译后的结果如下，可以看到编译后的结果不再是 `setup` 了，而是带有 `async` 的 `setup()`， 因此便可以直接在 `<script setup>` 中使用顶层的 `await` 了：

```js
import { withAsyncContext as _withAsyncContext } from 'vue'

const __sfc__ = {
  async setup(__props) {		// 不再是 setup， 而是 async setup

    let __temp, __restore

    const post = (([__temp,__restore]=_withAsyncContext(()=>(fetch(`/api/post/1`).then(r => r.json())))),__temp=await __temp,__restore(),__temp)

    return () => {}
  }
}
__sfc__.__file = "App.vue"
export default __sfc__
```

另外，await 的表达式会自动编译成在 `await` 之后保留当前组件实例上下文的格式。
<font color='red'>注意：</font> `async setup()` 必须与 `Suspense` 组合使用，`Suspense` 目前还是处于实验阶段的特性。vue 官方提到，在将来的某个发布版本中将开发完成并提供文档 - 如果你现在感兴趣，可以参照 [tests](https://github.com/vuejs/vue-next/blob/master/packages/runtime-core/__tests__/components/Suspense.spec.ts) 看它是如何工作的。

> 如果你了解 React 的话，一定知道 React 中有一个` <Suspense>` 内置组件， 这个组件主要是在组件完成前实现 loading 效果，因为有的组件是需要等待异步结果才渲染的，所以需要一个 loading 过程，那么 vue 这里提到的 "`async setup()` 必须与 `Suspense` 组合使用" ，其思想应该是一致的，因为默认情况下 vue 会认为 `async setup()` 中一定存在顶层的 `await` 异步，为了更好的交互体验，强制添加一个 `Suspense` 组件以显示 loading
>
> 所以，思想才是关键，做法是次要的

