[toc]

# 08-widthDefaults
`defineProps` 使用类型声明的不足之处在于，它没有可以给 props 提供默认值的方式。为了解决这个问题，提供了 `withDefaults` complier macro：

## 1. 基本用法
```ts
<script setup lang="ts">
const props = withDefaults(defineProps<{
  title?: string,
  list?: List.Basic[],
}>(), {
  title: 'Hello withDefaults',
  list: () => [{ id: 3, content: '3', isDone: false }],
});
</script>
```
上面代码会被编译为等价的运行时 props 的 `default` 选项。此外，`withDefaults` 辅助函数提供了对默认值的类型检查，并确保返回的 `props` 的类型删除了已声明默认值的属性的可选标志。

## 2. 注意点
`widthDefaults` 是为了给 `defineProps` 使用类型声明时提供添加默认值的的方法，因此，需要注意这仅仅适用于 `<script setup lang='ts'>` 且 `defineProps` 使用类型声明
