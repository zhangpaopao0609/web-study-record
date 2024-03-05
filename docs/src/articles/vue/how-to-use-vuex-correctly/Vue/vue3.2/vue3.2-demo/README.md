[toc]
# Vue3.2 单文件组件新特性之——`<script setup>` 和 `<style>`

## 1. `<script setup>`

`<script setup>` 是在单文件组件 (SFC) 中使用 [组合式 API](/api/composition-api.html) 的编译时语法糖。相比于普通的 `<script>` 语法，它具有更多优势：

- 更少的样板内容，更简洁的代码。

- 能够使用纯 Typescript 声明 props 和定义自定义事件。

- 更好的运行时性能 (其模板会被编译成与其同一作用域的渲染函数，没有任何的中间代理)。

- 更好的 IDE 类型推断性能 (减少语言服务器从代码中抽离类型的工作)。

### 1.1 基本语法

要选择加入这个语法，需要将 `setup` attribute 添加到 `<script>` 代码块上：

```vue
<script setup>
const a = ref(1);
console.log('hello script setup')
</script>
```

里面的代码会被编译成组件 `setup()` 函数的内容。

这也就意味着与普通的 `<script>` 只在组件被首次引入的时候仅执行一次不同，`<script setup>` 中的代码会在**每次组件实例被创建的时候执行**。这一点非常的重要，也就是写在 `<script setup>` 中的代码，例如初始化的赋值等在组件每次实例创建时都重新执行一次。

