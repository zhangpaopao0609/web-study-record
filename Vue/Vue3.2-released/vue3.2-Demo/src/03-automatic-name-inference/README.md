[toc]

# 04-Automatic Name Inference

在 vue2.x options API 和使用普通的 `<script>` 的情况下，都可以为组件进行命名，以便再以下三种情况对组件进行定位或使用：

- 开发环境警告格式化
- DevTools 检查
- **递归的自引用**。

但是在 `<script setup>` 下，暂没有方式可以设置的组件的名称，因此，vue 在上述情况会依据它的**文件名**来自动推断组件名称。

例如：名为 `Foo.vue` 的文件可以在模板中用 `<Foo/>` 引用它自己，在 devtools 中看到的组件名称也是 `Foo`。

<img src="/Users/ardor/Desktop/MyGitHub/web-study-record/Vue/Vue3.2-released/vue3.2-Demo/src/03-automatic-name-inference/img/Foo.vue.png" alt="image-20210903105628629" style="zoom:50%;" />

当然，这种推断的方式比明确注册或 `import` 的组件的优先级要低，所以，当遇到注册或引入的组件和推断名称冲突你，可以对注册或引入的组件重命名以避免冲突。

<font color='red'>提示：</font>在 SFC 中，虽然 `<script setup>` 中无法显示定义组件名称，但是 `<script>` 是支持的，同时在一个 SFC 是支持 `<script setup>` 与 `<script>` 同时存在的，因此，可以像下述代码一样显示定义组件名称（其实这个特性从官网是一定看不到的，我最初也没有发现，是因为我在实验 `defineExpose` 方法时发现的，后续也会提到）：

```vue
<script lang="ts">
export default { name: 'CustomComponentsName' }
</script>

<script setup lang="ts">
// code
</script>

<template>
	<p>利用 script 自定义组件名称</p>
</template>
```

 上述代码在编译后的 js 代码如下，细细的品真的会发现很多有趣的东西

```js
const __default__ = { name: 'CustomComponentsName' }		// 普通 script 的内容

function setup(__props) {		// <script setup> 的内容
  // code
  return (_ctx,_cache) => {
    return (_openBlock(), _createElementBlock("p", null, "利用 script 自定义组件名称"))
  }
}

const __sfc__ = /*#__PURE__*/_defineComponent({		// 在这里可以看到普通的 script 的内容会和 <script setup> 的内容进行 merge，也就自然实现了自定义组件名称，细细的品真的会发现很多有趣的东西
  ...__default__,
  setup
})
__sfc__.__file = "App.vue"
export default __sfc__
```

