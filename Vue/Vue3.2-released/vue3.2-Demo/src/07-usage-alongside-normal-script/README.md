[toc]

## 与普通的 `<script>` 一起使用

`<script setup>` 可以和普通的 `<script>` 一起使用。普通的 `<script>` 在有这些需要的情况下或许会被使用到：

- 无法在 `<script setup>` 声明的选项，例如 `inheritAttrs` 或通过插件启用的自定义的选项。
- 显示定义组件的名称。
- 运行副作用或者创建只需要执行一次的对象。

```vue
<script>
// 普通 <script>, 在模块范围下执行(只执行一次)
runSideEffectOnce()

// 声明额外的选项
export default {
  inheritAttrs: false,
  customOptions: {}
}
</script>

<script setup>
// 在 setup() 作用域中执行 (对每个实例皆如此)
</script>
```

> 这里实验得知，如果同时使用 `<script setup>` 和 `<script>` ，那么将打破 `<script setup>` 的默认关闭（即外部无法获取组件内部的属性和方法），此时，组件内部的属性和方法都将在外部可获取到，如 `ref.xxx`

