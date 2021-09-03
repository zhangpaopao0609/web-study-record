[toc]

# 09-defineExpose

用于测试 defineExpose API

## 1. 基本使用
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

## 2. 遇到的有趣的地方
<font color='red'>**在我的实验过程中，我居然发现，不管有没有显示暴露，都可以拿到！！很奇怪！！**</font>

> 不知道大家能不能猜到是因为什么原因，我在 `<script setup>` 中并没有显示暴露，但是却能获取到呢？
可以看看 `DefineExposeWithNormalScript.vue` 文件便知道了。

原来是因为我不仅仅使用了 `<script setup>`，同时为了给组件命名，还添加了一个普通的 `<script>` 标签，我们都知道,当仅仅使用 `<script>` 时，是需要在 `<setup>` 函数中显示得使用 `return` 才能暴露的，但是这里为何添加了一个 普通的 `<script>` 标签后就全量的暴露了，我也检查了编译后的代码，暂未找出具体的原因，恐怕需要查看源码才能真正的看透其中奥秘了。

1. 首先，使用 ref 等方式去获取组件实例的方法或者组件属性本身就不是推荐的（vue react 官方都有提及，ref 的方式并不推荐），所以 `defineExpose` 使用的频率不高
2. 即便是要向外暴露方法或者属性，那么也并不需要暴露太多，所以 `defineExpose` 完全能满足业务需求

不过，这个实验给我们提供了一个办法，那就是当需要向外暴露很多数据或者方法时（当然，这种情况很少见，就当是钻vue 中一个有趣的空子玩玩好了），使用 `defineExpose` 这种标准的暴露方式当然是可行的，但是过多了我们又不想写，那么可以采取这种”巧妙的办法“来全量暴露，但至于这种暴露方式是否有什么缺陷，还有待验证。

