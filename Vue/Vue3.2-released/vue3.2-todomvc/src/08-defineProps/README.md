[toc]

# 08-defineProps

## 1. 基本用法
1. 使用运行时声明（runtime declaration）

     > 解释什么是运行时声明
     > 在这里，运行时申明指对于 props 的类型的申明, 这种申明方式 IED 是无法检测和给出提示的，只有在运行后才会给出提示
     > 例如： 这是 option API 的 props 写法
     >
     > ```js
     > props: {
     > 	height: Number,
     > 	title: String,
     > }
     > ```
     >
     > 这样的写法 IDE 是无法检测到 props 是否按照类型进行传递，只能运行后才能检测到，因此这种叫运行时声明

   `defineProps` 运行时声明的基本用法：

     ```ts
   <script setup>
   const props = defineProps({
     foo: String
   })
   </script>
     ```

     接到的 props 直接可在模板中使用，这与 vue2.x 是一致的。

2. 类型声明（type declaration）

   > 类型声明指基于 ts 的类型检查，对 props 进行类型的约束，因此，要使用类型声明，需要基于 ts，即 `<script setup lang="ts">`
   
   `defineProps` 类型声明的基本用法：
   
   ```ts
   <script setup lang='ts'>
   const props = defineProps<{
     foo: string
     bar?: number
   }>()
   </script>
   ```

## 2. 需要注意的点

1. 不能同时使用运行时声明和类型声明

   `defineProps` 只能是要么使用运行时声明，要么使用类型声明。同时使用两种声明方式会导致编译报错

2. 使用类型声明的时候，静态分析(也就是约束的类型) 会自动生成等效的运行时声明，**以消除双重声明的需要并仍然确保正确的运行时行为**

   - 截至目前，类型声明参数必须是以下内容之一，以确保正确的静态分析：

     - 类型字面量，如 `string, number, boolean` 等
     - 在**同一文件**中的 `interface` 或类型字面量的引用

     说得更通俗一些就是，`props` 的  `ts` 接口只能写在本文件中，如下所示

     ```ts
     <script setup lang="ts">
     // 暂不支持引入，因为 setup 语法糖会将 List 编译成一个变量，因此只能在文件内写
     // import { List } from "./type";
     interface List {
       id: number,
       content: string,
       isDone: boolean,
     };
     
     const props = defineProps<{
       title: string,
       list: List[],
     }>();
     </script>
     ```

     **现在还不支持复杂的类型和从其它文件进行类型导入。理论上来说，将来是可能实现类型导入的。**

     <font color='red'>但是，可以将 `interface` 通过 `namespace` 的方式来通过 IDE 自动导如，这样就不需要在文件中引入，直接就可以使用了</font>
   
     示例如下， [可点击查看示例]()：
   
     `types` 文件夹下的 `list.ts` 文件
   
     ```ts
     declare namespace List {
       export interface Basic {
         id: number,
         content: string,
         isDone: boolean,
       }
     }
     ```
   
     ```ts
     // 这样是支持的
     const props = defineProps<{
       title: string,
       list: List.Basic[],
     }>();
     ```
   
   - 在开发环境下， IDE  会试着从类型声明来推断对应的运行时声明。
     - 例如这里从 `foo: string` 类型中推断出 `foo: String`。但如果类型声明使用的是对导入类型的引用(例如自定义的 `interface`)，这里的推断结果会是 `foo: null` (与 `any` 类型相等)，因为 IDE 没有外部文件的信息。因此，使用导入类型的引用的类型声明运行时是没有校验的，推断成 `null` 了
     - 在生产模式下，IDE 会生成数组格式的声明来减少打包体积 (这里的 props 会被编译成 `['foo', 'bar']`)。
     - 生成的代码仍然是有着类型的 ts 代码，它会在后续的流程中被其它工具处理。

## 3. 运行时声明和类型声明的比较

| 类型       | 优势                                                         | 劣势                                                         |
| ---------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 运行时声明 | 不使用 ts 的情况下能够对 props 进行一定的、运行时的类型校验  | 1. 运行时校验<br />2. 只能进行基本类型的校验<br />3. 编码时无任何提示 |
| 类型声明   | 完美的支持类型的校验，包括props 的完美类型约束、父组件在传 props 时的提示以及子组件在使用 props 的提示 | 目前 ts 的接口暂时只支持写在文件内，未来应该会实现可从外部导入的 |



## 4. 其它

1. 使用类型声明的时候，静态分析会自动生成等效的运行时声明，以消除双重声明的需要并仍然确保正确的运行时行为

- 在开发环境下， IDE  会试着从类型来推断对应的运行时验证。例如这里从 `foo: string` 类型中推断出 `foo: String`。如果类型是对导入类型的引用，这里的推断结果会是 `foo: null` (与 `any` 类型相等)，因为编译器没有外部文件的信息。

- 在生产模式下，编译器会生成数组格式的声明来减少打包体积 (这里的 props 会被编译成 `['foo', 'bar']`)。

- 生成的代码仍然是有着类型的 Typescript 代码，它会在后续的流程中被其它工具处理。

- 截至目前，类型声明参数必须是以下内容之一，以确保正确的静态分析：

  - 类型字面量
  - 在同一文件中的接口或类型字面量的引用

  现在还不支持复杂的类型和从其它文件进行类型导入。理论上来说，将来是可能实现类型导入的。

