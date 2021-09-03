[toc]

# 01-Basic Syntax
要选择加入这个语法，需要将 `setup` attribute 添加到 `<script>` 代码块上：

```vue
<script setup>
const a = ref(1);
console.log('hello script setup')
</script>
```

里面的代码会被编译成组件 `setup()` 函数的内容。

这也就意味着与普通的 `<script>` 只在组件被首次引入的时候仅执行一次不同，`<script setup>` 中的代码会在**每次组件实例被创建的时候执行**。这一点非常的重要，也就是写在 `<script setup>` 中的代码，例如初始化的赋值等在组件每次实例创建时都重新执行一次。
