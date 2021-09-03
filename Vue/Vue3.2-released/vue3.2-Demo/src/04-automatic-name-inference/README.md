[toc]

# 04-Automatic Name Inference

在 vue2.x options API 和使用普通的 `<script>` 的情况下，都可以为组件进行命名，以便再以下三种情况对组件进行定位或使用：

- 开发环境警告格式化
- DevTools 检查
- 递归的自引用。

但是在 `<script setup>` 下，暂没有方式可以设置的组件的名称，因此，vue 在上述情况会依据它的**文件名**来自动推断组件名称。



例如：名为 `Foo.vue` 的文件可以在模板中用 `<Foo/>` 引用它自己，在 devtools 中看到的组件名称也是 `Foo`。

<img src="/Users/ardor/Desktop/MyGitHub/web-study-record/Vue/Vue3.2-released/vue3.2-Demo/src/04-automatic-name-inference/img/Foo.vue.png" alt="image-20210903105628629" style="zoom:50%;" />

当然，这种推断的方式比明确注册或 `import` 的组件的优先级要低，所以，当遇到注册或引入的组件和推断名称冲突你，可以对注册或引入的组件重命名以避免冲突。

