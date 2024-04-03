# 包管理器

所谓包管理器，那就是管理 node 包的工具。
> 虽然大家都叫 node 包，但 node 包这个并不能涵盖 npm 仓库中的所有包，我也不知道咋说了 😂。

前端发展这么多年，包管理器一共出现了 3 个，npm、yarn、pnpm 这就来看看吧。

## 1. 前言
在正式介绍这三个工具之前，我们先来讲几个关键点，这样后续介绍会更加清晰。

### 1.1 直接依赖和间接依赖

直接依赖：在 _package.json_ 文件中显示地指定的依赖
子依赖：直接依赖所依赖的依赖

### 1.2 幽灵依赖问题

通常所说的幽灵依赖是指：**没有**在 _package.json_ 文件中显示地指定但能在项目中导入并使用的依赖。

什么情况下会导致幽灵依赖呢？目前用 npm 和 yarn 包管理工具来管理依赖的项目均可能出现幽灵依赖。

为什么呢？因为目前用 npm 和 yarn 均采用的是平铺+嵌套的结构来放置项目的直接和间接依赖，这样间接依赖也能被项目导入和使用了。

那么为什么平铺就能被项目直接使用了呢？这就要谈到依赖是如何找到的了，1.3 _node_modules_ 就会提到。

那为什么 npm 和 yarn 要采用的是平铺+嵌套的结构呢？下面也会谈到。

[幽灵依赖](https://broadcrunch.com/technology/computing/phantom-dependencies-in-nodejs-and-how-pnpm-prevents-them/)
[ss](https://juejin.cn/post/7097973833600073758)

### 1.3 _node_modules_

前端项目通常会在 `_node_modules_` 目录中查找它们的依赖。

当安装依赖时，包管理器会查看你项目的 `package.json` 文件中列出的依赖，并将这些依赖及其子依赖下载到 `_node_modules_` 文件夹中。

在代码中，当你使用 `require('module')` 或 `import ... from 'module'` 语法导入一个模块时，Node.js 或者你的打包工具（如 Webpack，Rollup，Vite等）会在 `_node_modules_` 文件夹中查找那个模块。

这里的查找过程**遵循一个规则**。**首先在当前目录下的 `_node_modules_` 中查找，如果没有找到，接着会去上一级目录的 `_node_modules_` 中寻找，如此类推，直到找到模块或者到达根目录为止。**

> 这里就解释了只要你在 _node_modules_ 文件夹中有这个依赖，即便是没有在 `package.json` 中，也会被成功导入。这样就会出现幽灵依赖问题。

### 1.4 包管理工具和 npm 仓库的关系

包管理工具使用在项目中如何管理你的依赖，包括如何下载、组织、锁定依赖等等。

npm 仓库是用于存储和分发依赖的地方。
> 至于什么叫做 npm 仓库而不是其它的名字，可能是因为：
> 1. npm -> Node Package Manager
> 2. npm 是 node 的默认包管理工具

## 2. 包管理器
本节内容主要参考 [An abbreviated history of JavaScript package managers](https://javascript.plainenglish.io/an-abbreviated-history-of-javascript-package-managers-f9797be7cf0e)
https://www.kochan.io/nodejs/why-should-we-use-pnpm.html
https://github.com/lvqq/blog/issues/60
https://www.kochan.io/nodejs/pnpms-strictness-helps-to-avoid-silly-bugs.html

### 2.1 npm

npm，于 2010 年1月12日发布，是 Node 的第一个包注册表和包管理器。

> 包注册表：npm 仓库

2011年 5 月 1 日，npm v1 版本发布，在 v1 和 [v2](https://npm.github.io/how-npm-works-docs/npm2/how-npm2-works.html) 中，npm 实现了一个嵌套的依赖结构。这意味着在项目的根目录 _node_modules_ 文件夹中能找到你安装直接依赖，直接依赖的子依赖项会被存储在直接依赖项的 _node_modules_ 文件夹中，这样就形成了嵌套的结构，这样设计可避免 “依赖地狱” 问题。然而，这种嵌套依赖结构导致了文件路径可能很长，因为依赖项可能有子依赖项，子依赖项又有它自己的依赖项等等。这导致在 Windows 下程序崩溃。Windows默认文件路径的字符限制为260，并且在[Windows 10之前这个限制无法改变](https://mspoweruser.com/ntfs-260-character-windows-10/)。

> “依赖地狱” 问题：[dependency hell](https://npm.github.io/how-npm-works-docs/theory-and-design/dependency-hell.html)，指同一个依赖需要不同的版本。举个例子，你的项目直接依赖有包 A 和包 C，包 A依赖于 v1 的包 B，包 C 依赖于v2 的包 B。包 A 和包 C 将位于你的根 _node_modules_ 中。包 B v1 将位于包 A 的 _node_modules_ 文件夹中，包 B v2 将在包 C 的 _node_modules_ 文件夹中。所以嵌套的结构永远不会出现“依赖地狱” 问题。

<PaoImages
  src="https://npm.github.io/how-npm-works-docs/gitbook/images/deps4.png"
  width="40%"
  title="how-npm2-works"
  reference="[how-npm2-works](https://npm.github.io/how-npm-works-docs/npm2/how-npm2-works.html)"
/>

于是 [npm v3](https://npm.github.io/how-npm-works-docs/npm3/how-npm3-works.html) 基于 "扁平化" 的依赖树解决了这个问题。什么是 ”扁平化“ 呢？就是所有的直接依赖和间接依赖均放置在根 _node_modules_ 文件夹中。如果一个包的某个版本已经在根 _node_modules_ 文件夹中，为了避免依赖地狱，它将被放置在使用它的依赖项的 _node_modules_ 文件夹中。因此，依赖树并不完全扁平，但是扁平程度足够，使得 Windows 用户的文件路径问题大大减少。

<PaoImages
  src="https://npm.github.io/how-npm-works-docs/gitbook/images/npm3deps4.png"
  width="70%"
  title="how-npm3-works"
  reference="[how-npm3-works](https://npm.github.io/how-npm-works-docs/npm3/how-npm3-works.html)"
/>

这种扁平化 + 嵌套的结构不仅尽可能地解决了嵌套过深导致 windows 崩溃的问题，同时也有助于节省磁盘空间和加快安装速度，因为纯嵌套的模式，即便是一模一样的依赖，只要是身处不同的父级，那么都需要安装，这样即浪费安装时间也浪费磁盘空间。

但是，这种结构存在一个致命的缺陷，那就是幽灵依赖（phantom dependencies）。
> 当然，致命可能有点夸张，但在某些情况下，它真的就是致命的。

比如，项目依赖包 A，A 依赖包 B，此时，因为扁平化结构的原因，包 B 也能够像 A 一样在项目中导入和使用。但是，突然有一天，包 A 删掉了依赖包 B，此时项目重新安装，包 B 就不存在了，于是项目就崩掉了。

为了解决这个问题，npm v5 引入了 _package-lock.json_ 文件，该文件可记录整个项目依赖树的确切版本信息，即使之后重新安装依赖，也能确保每一次的安装都能得到同样版本、同样结构的依赖树。这样一来，可以解决因为包版本不一致带来的兼容性问题，确保不同环境下的一致性。
> 在没有 _package-lock.json_ 文件的情况下，即使 _package.json_ 文件的内容没有变化，由于npm会默认安装满足 _package.json_ 文件中所定义版本范围的最高版本的包，因此可能多次运行 npm install 得到的 _node_modules_ 结构可能会不一样。_package-lock.json_ 文件的出现，就是为了解决这个问题。每次运行 npm install，npm都会查看是否有 _package-lock.json_ 文件，如果有，就会依照这个文件中记录的依赖版本和依赖间的关系进行安装。
>
> 此外 _package-lock.json_ 还有一个非常重要的作用是增加安全性，通过记录依赖包的 integrity 属性，这是用于验证每个包的完整性，防止在安装过程中被篡改，加强了 npm 包的安全性。

### 2.2 yarn

Yarn 2016 年 10 月 11 日发布，基于其拥有 Facebook和 Google 的背书，并且其包的安装速度明显快于 npm，因此很快在开发者中间获得了人气。

Yarn的安装速度之所以比 npm 更快，一个原因是它使用了更快的算法从缓存中获取数据。

Yarn提供了一些 npm 没有的优点：

- 缓存：Yarn 使用了它的缓存，这样就可以在离线的情况下使用任何之前下载过的包。使用离线的包拷贝也能加快持续集成的构建时间和普通的包安装时间，因为你不需要发送网络请求来获取你的包。如果你不需要发送网络请求，你就不需要担心某个包的网络请求失败，这也使得构建过程更可靠。

- 安全性：Yarn 还通过为每个包生成校验和 (即哈希值) 来提高应用程序的安全性。简而言之，这是通过使用一个纯函数的哈希函数完成的。这意味着每次你将相同的数据输入到函数中，你会得到相同的输出。所以，如果你的包中有一个字符发生了改变，Yarn的哈希函数就会识别出问题。这样可以确保你不用担心黑客在npm注册表中修改包的内容，或者在你安装包的时候修改包。

- lock 文件：Yarn还因其“锁定文件”而备受关注。在第一次安装一个包时，会创建一个名为 yarn.lock 的文件，其中列出了每个安装的包的确切版本。每次安装和更新包时，Yarn都会更新这个文件。

  > lock 文件是 yarn 的首创，后来 npm v5 也参照 yarn 的设计提出了 package-lock.json 文件

### 2.3 pnpm

pnpm 由 Zoltan Kochan 创建并于 2017 年 6 月发布 1.0 版本。它的核心特性在于有效地节省了磁盘空间，并规避了 npm 和 yarn 在 _node_modules_ 结构上的一些问题。

- 节省空间占用：使用软链接 + 硬链接组合的方式极大地节省了空间占用
- 完美解决幽灵依赖：_node_modules_ 平铺
- 完美解决依赖地狱：依赖名 + 版本号

尽管pnpm存在一些挑战，但是它用硬链接和符号链接的方式解决了磁盘空间和node_modules结构的问题，使其在严格性、磁盘使用效率和性能上有显著的优势。但是，请注意，pnpm使用的符号链接方式可能使得某些文件监视工具，如Watchman，无法正常工作，这也是Yarn放弃使用符号链接的一个原因。
