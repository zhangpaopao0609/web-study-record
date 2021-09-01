# 09-defineExpose
用于测试 defineExpose API

## 基本使用
官方文档指出默认情况下使用 `<script setup>` 的组件是**默认关闭**的，也就是说通过模板 ref 或者 `$parent` 链获取到的组件的实例，并不会暴露任何在 `<script setup>` 中声明的绑定（变量，函数）。

为了在 `<script setup>` 组件中明确要暴露出去的属性，那么就需要使用 `defineExpose` 编译宏（compiler macro）：
> 这里提一下什么是 compiler macro 
> 其实就是在 `<script setup>` 这个语法糖下 `vue` 暴露的函数，跟 options API 里面使用生命周期是类似的
```vue
<script setup>
import { ref } from 'vue'

const a = 1
const b = ref(2)

defineExpose({
  a,
  b
})
</script>
```
当父组件通过模板 ref 的方式获取到当前组件的实例，获取到的实例会像这样 `{ a: number, b: number }` (ref 会和在普通实例中一样被自动解包)

## 遇到的有趣的地方
**在我的实验过程中，我居然发现，不管有没有显示暴露，都可以拿到！！很奇怪！！**
> 不知道大家能不能猜到是因为什么原因，我在 `<script setup>` 中并没有显示暴露，但是却能获取到呢？
可以看看 `DefineExposeWithNormalScript.vue` 文件便知道了。

原来是因为我不仅仅使用了 `<script setup>`，同时为了给组件命名，还添加了一个普通的 `<script>` 标签，我们都知道,当仅仅使用 `<script>` 时，默认是全部暴露的，而 `<script setup>` 这个语法糖最终其实还是编译成了普通的 `<script>`, 只是经过语法糖后默认不再暴露，但是这里又添加了一个 `<script>` 标签，vue 底层会将 `<script setup>` 编译后的代码和 `<script>` 进行组合，所以最终是因为普通的 `<script>` 标签的原因，即便是没有显示的暴露，也完全的暴露出来了