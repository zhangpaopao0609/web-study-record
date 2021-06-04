# teleport
teleport 提供了一种干净的方法，允许我们控制在 DOM 中哪个父节点下呈现 HTML，
比如模态框，逻辑是在子组件中，但是希望能够以 body 为定位，也就是 直接挂载到 body 下
```
<teleport to="body">
  <div v-if="modelOpen">
    <h2>this is model box</h2>
    <button @click="modelOpen=false">关闭模态框</button>
  </div>
</teleport>
```

# Suspense(不确定的)
- 允许我们的应用程序在等待异步组件时渲染一些后背内容，可以让我们创建一个平滑的用户体验