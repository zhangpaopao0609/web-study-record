[toc]

# 08-defineEmits

`defindEmits` 和 `defineProps` 一样是 `compiler macro` 函数，直接可以再 `<script setup>` 中使用，不需要引入。

> `defineEmits` 指在组件中定义一个 emit 函数，

## 1. 基本用法
1. 使用运行时声明（runtime declaration）

   ```js
   <script setup lang="ts">
   // 这样是没有任何的类型检查的
   const emit = defineEmits(['handleClick', 'handleChange']);
   
   const handleClick = () => emit('handleClick', Date.now()+'');
   const handleChange = () => emit('handleChange', Date.now());
   </script>
   ```

2. 类型声明式

   ```ts
   <script setup lang="ts">
   interface Click {
     id: string,
     val: number,
   }
   // 完美的类型检查
   // List.Basic 是基于 ts 自动扫描 types 文件夹以及 delcare namespace 自动导入的
   const emit = defineEmits<{
     (e: 'handleClickWithTypeDeclaration', data: Click): void,
     (e: 'handleChangeWithTypeDeclaration', data: List.Basic): void,
   }>();
   
   const handleClickWithTypeDeclaration = () => emit('handleClickWithTypeDeclaration', { id: '1', val: Date.now() });
   const handleChangeWithTypeDeclaration = () => emit('handleChangeWithTypeDeclaration', {
     id: 1,
     content: 'change',
     isDone: false,
   });
   </script>
   ```

## 2. 注意点

跟 `defineProps` 一样，运行时声明和类型声明式同样不可同时使用
