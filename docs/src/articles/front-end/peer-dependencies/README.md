[toc]

# 原来 peerDependencies 是这么个东东

相信前端同学对 package.json 中的 `dependencies` 和 `devDependencies` 都有一定的认知，通俗的理解如下：

- `dependencies`：会被构建打包到最终的产物中
- `devDependencies`：仅开发环境会使用到，不会被打包到最终的产物中

但是，对 `peerDependencies` 可能就有些陌生了，但它也相当重要，特别是期望开发插件的同学。本文就来讲讲 。

## 是个啥？

用两个例子来说明：

1. `antd`

   仔细查看 `antd` 的 package.json 中的 `dependencies`，发现并未安装  `react` 和 `react-dom`，但是随意打开一个组件你就会发现，它依赖  `react` 和 `react-dom`，如下：

   ```jsx
   // site/theme/template/Layout/index.jsx
   import * as React from 'react';
   import * as ReactDOM from 'react-dom';
   ```

   那 `antd` 是怎么运行起来的呢？

   这就要归功于 `peerDependencies`

   > 这里的归功并不带任何感情色彩

   `antd` 的 package.json 中 `peerDependencies`，如下

   ```json
   "peerDependencies": {
     "react": ">=16.9.0",
     "react-dom": ">=16.9.0"
   },
   ```

   意思是：`antd` 不能独立的运行，需要使用它的项目中安装了 `react` 和 `react-dom` 才可以运行。

   所以，要想在你的项目中使用 `antd`，就必须得安装  `react` 和 `react-dom`

2. `webpack-dev-server`

   `webpack-dev-server` 的 package.json 中 `peerDependencies`，如下

   ```json
   "peerDependencies": {
     "webpack": "^4.37.0 || ^5.0.0"
   },
   ```

   意思是：`webpack-dev-server` 不能独立的运行，需要使用它的项目中安装了 `webpack`

总结：peer 这个词翻译过来就是"同龄， 同辈" 的意思，非常符合这里的用法。

因此我有个非常通俗的理解：你要想雇用我呀，那你就得把我的兄弟姐妹们也雇上，不然我干不了。

在项目中就是：如果你期望在项目中使用这个依赖，那就得把这个依赖的相关依赖都叫上，不然无法运行。即 `peerDependencies` 指定了宿主环境所需要安装的额外依赖。

唉，我知道，你可能会想说，那为啥不直接放到 `dependencies`，放到 `dependencies` 不就直接安装了吗？还搞这个干嘛？肯定有用涩，来，往下看。

## 有啥用？

下面我们就来看看这个东东为啥会出现哈？

1. 如果没有 —— 导致的问题

   还是以 `antd` 为例，假设没有 `peerDependencies`，为了保证 antd 能够顺利的在宿主环境中运行起来，它不得不在 `dependencies` 中添加 `react` 和 `react-dom`：

   ```json
   "dependencies": {
     "react": ">=16.9.0",
     "react-dom": ">=16.9.0"
   },
   ```

   那么这样做会有什么问题呢？

   **重复安装 —— npm 3 以前**

   **在 npm3 以前，也就是 node_modules 是嵌套而非平铺的年代。**如果开发者使用 `antd` 并且没有 `peerDependencies` 的话，就需要安装两次 `react` 和 `react-dom`。

   > 感兴趣的可以去看看 npm 2 时代，那时候的嵌套

2. 现在有了 —— 能带来的好处

   - npm 3 以前避免重复安装（间接）

     > npm 3 及之后 npm 采用了平铺的方式，直接解决了重复安装问题

   - 提示宿主环境

     - 当 npm 版本为 1、2 和 7 时，如果宿主环境没有安装 `peerDependencies` 中指定版本或更高版本的依赖，将自动安装，

       > 但自动安装将造成另外的问题，即可能宿主会在”不安装“直接使用这些自动安装的依赖

     - 当 npm 版本 3 到 6 时，并不会自动安装，但是将收到未安装 `peerDependency` 的警告。如下：

       ```bash
       npm WARN antd@4.19.3 requires a peer of react@>=16.9.0 but none is installed. You must install peer dependencies yourself.
       ```

## 好吧

`peerDependencies` 的目的是提示宿主环境去安装满足 `peerDependencies` 所指定依赖的包。

到今天来看，`peerDependencies` 更多的是在公共库或者三方插件中使用，平时的开发中几乎不会使用。

参考：

- [Peer Dependencies](https://nodejs.org/es/blog/npm/peer-dependencies/)
