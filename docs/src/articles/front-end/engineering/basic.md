# 前端工程化

## 1. webpack 与 grunt、gulp 的不同

Grunt、Gulp 是基于任务运⾏的⼯具： 它们会⾃动执⾏指定的任务， 就像流⽔线，把资源放上去然后通过不同插件进⾏加⼯，它们包含活 跃的社区，丰富的插件，能⽅便的打造各种⼯作流。

Webpack 是基于模块化打包的⼯具: ⾃动化处理模块，webpack 把⼀ 切当成模块，当 webpack 处理应⽤程序时，它会递归地构建⼀个依 赖关系图 (dependency graph)，其中包含应⽤程序需要的每个模块， 然后将所有这些模块打包成⼀个或多个 bundle。 因此这是完全不同的两类⼯具,⽽现在主流的⽅式是⽤npm script 代 替 Grunt、Gulp，npm script 同样可以打造任务流。

## 2. webpack、rollup、parcel 优劣？

webpack 适⽤于⼤型复杂的前端站点构建: webpack 有强⼤的 loader 和插件⽣态，打包后的⽂件实际上就是⼀个⽴即执⾏函数，这个⽴即 执⾏函数接收⼀个参数，这个参数是模块对象，键为各个模块的路径， 值为模块内容。⽴即执⾏函数内部则处理模块之间的引⽤，执⾏模块等，这种情况更适合⽂件依赖复杂的应⽤开发。

rollup 适⽤于基础库的打包，如 vue、d3 等: Rollup 就是将各个模 块打包进⼀个⽂件中，并且通过 Tree-shaking 来删除⽆⽤的代码, 可以最⼤程度上降低代码体积,但是rollup没有webpack如此多的的 如代码分割、按需加载等⾼级功能，其更聚焦于库的打包，因此更适合库的开发。

parcel 适⽤于简单的实验性项⽬: 他可以满⾜低⻔槛的快速看到效 果,但是⽣态差、报错信息不够全⾯都是他的硬伤，除了⼀些玩具项 ⽬或者实验项⽬不建议使⽤。

## 3. 有哪些常⻅的 Loader？

- file-loader：把⽂件输出到⼀个⽂件夹中，在代码中通过相对 URL 去引⽤输出的⽂件
- url-loader：和 file-loader 类似，但是能在⽂件很⼩的情况下以 base64 的⽅式把⽂件内容注⼊到代码中去
- source-map-loader：加载额外的 Source Map ⽂件，以⽅便断点调 试
- image-loader：加载并且压缩图⽚⽂件
- babel-loader：把 ES6 转换成 ES5
- css-loader：加载 CSS，⽀持模块化、压缩、⽂件导⼊等特性
- style-loader：把 CSS 代码注⼊到 JavaScript 中，通过 DOM 操作 去加载 CSS
- eslint-loader：通过 ESLint 检查 JavaScript 代码

注意：在 Webpack 中，loader 的执行顺序是从右向左执行的。因为 webpack 选择了 compose 这样的函数式编程方式，这种方式的表达式 执行是从右向左的。

## 4. 有哪些常⻅的 Plugin？

- define-plugin：定义环境变量
- html-webpack-plugin：简化 html⽂件创建
- uglifyjs-webpack-plugin：通过 UglifyES 压缩 ES6 代码
- webpack-parallel-uglify-plugin: 多核压缩，提⾼压缩速度
- webpack-bundle-analyzer: 可视化 webpack 输出⽂件的体积
- mini-css-extract-plugin: CSS 提取到单独的⽂件中，⽀持按需加载

## 5. bundle，chunk，module 是什么？

- bundle：是由 webpack 打包出来的⽂件；
- chunk：代码块，⼀个 chunk 由多个模块组合⽽成，⽤于代码的合并 和分割；
- module：是开发中的单个模块，在 webpack 的世界，⼀切皆模块，⼀ 个模块对应⼀个⽂件，webpack 会从配置的 entry 中递归开始找出所 有依赖的模块。

## 6. Loader 和 Plugin 的不同？

- 不同的作⽤:

  - Loader 直译为"加载器"。Webpack 将⼀切⽂件视为模块，但是 webpack 原⽣是只能解析 js⽂件，如果想将其他⽂件也打包的话，就会⽤到 loader 。 所以 **Loader 的作⽤是让 webpack 拥有了加载和解析⾮ JavaScript⽂件的能⼒**。
  - Plugin 直译为"插件"。Plugin 可以扩展 webpack 的功能，让 webpack 具有更多的灵活性。在 Webpack 运⾏的⽣命周期中会⼴播出许多事 件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。

- 不同的⽤法:
  Loader 在 module.rules 中配置，也就是说他作为模块的解析规则⽽存在。
  类型为数组，每⼀项都是⼀个 Object ，⾥⾯描述了对于 什么类型的⽂件（ test ），使⽤什么加载( loader )和使⽤的参数 （ options ） Plugin在 plugins 中单独配置。类型为数组，每⼀项是⼀个 plugin 的实例，参数都通过构造函数传⼊。

## 7. webpack 热更新的实现原理？

Webpack 的热更新（Hot Module Replacement，HMR）是一种非常有用的功能，它允许在运行时更新、添加或删除模块，而无需进行完整的页面刷新。这对于开发体验来说是一个巨大的提升，因为它可以保持应用程序的状态，同时应用新的代码变更。

Webpack 的热更新主要依赖以下几个核心概念和组件：

1. **Webpack Dev Server（WDS）：**
   这是一个小型的Express服务器，它提供了静态文件服务，并且能够处理 HMR 的请求。WDS 与浏览器之间通过 WebSocket 连接通信，以便实时推送更新。

2. **HMR 插件：**
   Webpack 有内置的 HMR 插件，它可以处理模块的热替换逻辑。在配置文件中启用这个插件后，Webpack 会在构建过程中添加 HMR 的代码，并在必要时触发更新。

3. **HMR 运行时：**
   这是在浏览器端运行的代码，它处理模块的热替换。当 WDS 推送更新时，HMR 运行时会接收到更新，并且根据更新的内容来决定如何处理。

4. **模块热替换 API：**
   Webpack 提供了一个 API，允许开发者编写自定义的处理逻辑来接受更新的模块。这通常涉及到在模块代码中调用 `module.hot.accept` 方法。

### HMR 的工作流程

1. **启动阶段：**
   当 Webpack Dev Server 启动时，它会启动 HMR 插件，并在浏览器端注入 HMR 运行时代码。

2. **文件修改：**
   开发者修改了源代码文件并保存，Webpack 会监听到文件变化，并触发一个新的编译。

3. **编译更新：**
   Webpack 编译修改后的模块，并创建一个 "hot update" 包，这个包含有更新后的模块代码和一个 manifest 文件，描述了哪些模块被更新。

4. **推送更新：**
   WDS 通过 WebSocket 连接将 hot update 推送给浏览器端。

5. **接收更新：**
   浏览器端的 HMR 运行时接收到更新，并使用 HMR API 根据 manifest 文件请求更新的模块代码。

6. **应用更新：**
   更新的模块被下载后，HMR 运行时会根据开发者提供的自定义逻辑（如果有的话）来处理模块更新。如果没有提供处理逻辑，它会使用默认的逻辑来替换旧模块。

7. **失败处理：**
   如果热更新失败，或者某些模块不支持热更新，HMR 运行时可以选择回退到全页面刷新，以确保新的代码被正确加载。

通过这个过程，Webpack 的热更新能够在不刷新页面的情况下，将新的代码应用到正在运行的应用程序中。这大大提高了开发效率，因为开发者可以即时看到他们的更改效果，同时保持应用程序的状态不变。

## 8. Babel 的原理是什么?

babel 的转译过程也分为三个阶段，这三步具体是：

- 解析 Parse: 将代码解析⽣成抽象语法树（AST），即词法分析与语 法分析的过程；

- 转换 Transform: 对于 AST 进⾏变换⼀系列的操作，babel 接受得到 AST 并通过 babel-traverse 对其进⾏遍历，在此过程中进⾏添 加、更新及移除等操作；

- ⽣成 Generate: 将变换后的 AST 再转换为 JS 代码, 使⽤到的模 块是 babel-generator。

## 9. git 和 svn 的区别

Git 和 Subversion（SVN）都是版本控制系统，它们用于跟踪和管理代码库中文件的变化。尽管它们的目标相同，但它们在设计和功能上有很多不同之处。

1. Git

Git 是一个分布式版本控制系统（DVCS），由 Linus Torvalds 在 2005 年创建，用于更有效地管理 Linux 内核的开发。Git 的主要特点包括：

- **分布式架构：** 每个开发者的本地机器上都有代码库的完整副本，包括所有的历史记录和分支。这意味着开发者可以在本地进行大多数操作，如提交、分支、合并等，而无需网络连接。
- **性能：** Git 在处理大型项目时非常高效，特别是在执行分支和合并操作时。
- **数据完整性：** Git 使用 SHA-1 哈希来确保文件和提交的完整性。
- **分支模型：** Git 的分支模型非常灵活，支持轻量级的分支创建和合并。这使得各种工作流程，如特性分支、Git Flow 或者 Forking 工作流程变得容易实现。
- **非线性开发：** Git 支持快速的上下文切换和并行开发，允许多个分支独立进展。

2. SVN

Subversion（SVN）是一个集中式版本控制系统（CVCS），由 CollabNet Inc. 在 2000 年开发。它是为了成为 Concurrent Versions System（CVS）的替代品。SVN 的主要特点包括：

- **集中式架构：** SVN 有一个中央服务器存储所有文件的版本历史，而客户端则检出当前版本的快照。开发者需要与中央服务器通信来提交或获取最新的变更。
- **版本控制：** SVN 以线性方式进行版本控制，每次提交都会增加一个全局的修订号。
- **目录版本控制：** SVN 对目录和文件的变更都进行版本控制，包括文件的添加和删除。
- **权限控制：** SVN 服务器可以对不同的目录和文件设置不同的访问权限。
- **分支和标签：** SVN 通过复制整个代码库来创建分支和标签，这在大型项目中可能会比 Git 更耗时和占用更多空间。

3. 主要区别

- **架构：** Git 是分布式的，而 SVN 是集中式的。
- **性能：** Git 在执行分支和合并操作时通常比 SVN 更快。
- **存储方式：** Git 存储项目历史的方式是通过快照，而 SVN 是通过增量变更。
- **网络依赖：** Git 用户可以在本地执行大多数操作，而 SVN 用户在提交和更新时需要与服务器通信。
- **数据安全和完整性：** Git 通过哈希值来确保数据的完整性，而 SVN 依赖于中央服务器。
- **分支处理：** Git 的分支是轻量级的，而 SVN 的分支是通过复制整个代码库来实现的。
- **工作流程：** Git 支持更复杂和灵活的工作流程，而 SVN 的工作流程通常更简单和直线化。

尽管 SVN 在某些组织中仍然被使用，但 Git 已经成为当今最流行的版本控制系统，特别是在开源社区和敏捷开发环境中。Git 的分布式特性、性能和灵活的工作流程使其成为许多开发团队的首选。

## 10. 经常使用的 git 命令？

在日常工作中，开发者会使用一系列 Git 命令来管理和操作代码库。以下是一些常用的 Git 命令：

1. 基础命令

- `git init`: 初始化一个新的 Git 仓库。
- `git clone <repository>`: 克隆一个远程仓库到本地。
- `git status`: 查看当前工作目录的状态（修改的文件、未跟踪的文件等）。
- `git add <file>`: 将文件添加到暂存区（也可以使用 `.` 来添加所有更改）。
- `git commit -m "<message>"`: 提交暂存区的更改到仓库，并附上提交信息。
- `git log`: 查看提交历史。
- `git diff`: 查看工作目录和暂存区之间的差异，或者查看不同提交之间的差异。

2. 分支管理

- `git branch`: 列出所有本地分支。
- `git branch <branch-name>`: 创建一个新分支。
- `git checkout <branch-name>`: 切换到指定分支。
- `git merge <branch-name>`: 将指定分支合并到当前分支。
- `git branch -d <branch-name>`: 删除一个分支。

3. 远程操作

- `git remote add <name> <url>`: 添加一个新的远程仓库。
- `git fetch <remote>`: 从远程仓库获取最新的历史记录，但不合并到当前分支。
- `git pull <remote> <branch>`: 从远程仓库获取最新的历史记录，并自动合并到当前分支。
- `git push <remote> <branch>`: 将本地分支的更改推送到远程仓库。

4. 撤销更改

- `git checkout -- <file>`: 放弃对文件的修改（未暂存的更改）。
- `git reset --hard`: 放弃所有更改，回到上一次提交的状态。
- `git reset <commit>`: 将 HEAD 指针移动到指定提交，并可选择性地重置暂存区或工作目录。
- `git revert <commit>`: 创建一个新的提交，这个提交会撤销指定提交的更改。

5. 高级命令

- `git rebase <branch>`: 将当前分支的更改重新基于指定分支的最新提交。
- `git stash`: 暂时保存当前工作目录的更改，以便后续恢复。
- `git stash pop`: 应用之前暂存的更改，并从暂存列表中移除。
- `git cherry-pick <commit>`: 将指定提交的更改应用到当前分支。

6. 配置

- `git config --global user.name "<name>"`: 设置全局用户名。
- `git config --global user.email "<email>"`: 设置全局用户邮箱。
- `git config --list`: 查看当前 Git 配置。

这些命令只是 Git 功能的一部分，Git 提供了非常丰富的命令集来支持各种复杂的版本控制需求。根据你的工作流程和项目需求，你可能会使用到更多的命令和选项。

## 11. git pull 和 git fetch 的区别

- git fetch 只是将远程仓库的变化下载下来，并没有和本地分支合并。
- git pull 会将远程仓库的变化下载下来，并和当前分支合并。

## 12. git rebase 和 git merge 的区别

`git rebase` 和 `git merge` 都是 Git 中用于合并不同分支上的更改的命令，但它们的工作方式和结果有所不同。

1. git merge

`git merge` 是将两个或多个开发历史合并在一起的命令。当你执行 `git merge` 时，Git 会创建一个新的 "合并提交"（merge commit），这个提交有两个父提交，一个是当前分支的最后一个提交，另一个是被合并分支的最后一个提交。这种合并方式保留了项目历史的完整性，因为它不会改变现有的提交历史。

合并操作通常用于将特性分支的更改合并回主分支（如 `master` 或 `main`）。合并提交清楚地标记了两个分支的合并点。

2. git rebase

`git rebase` 是另一种合并更改的方法，它通过重新应用一个分支上的更改到另一个分支上。`rebase` 的目的是创建一个更线性或更干净的项目历史。当你执行 `git rebase` 时，Git 会找到两个分支的共同祖先，然后将当前分支上从该共同祖先以来的提交复制到一个临时区域。之后，Git 会将被 `rebase` 的分支的指针移动到目标分支的最新提交上，然后逐个将临时区域的提交应用到目标分支上。

`rebase` 可以使历史看起来像是在目标分支上直接进行了更改，这样可以避免合并提交，并且历史记录看起来更加直观。

> 可能会给团队其他成员带来问题，因为 rebase 会改写历史。这意味着它会修改已经存在的提交的哈希值，创建一系列新的、不同于原来的提交
> 比如 main 分支上有 a -> b 两个提交，foo 分支是基于 a 切的，bar 是基于 b 切的，假如执行合并的时候，main 分支上执行 git rebase foo 的话，首先指针会指向 foo 的最新提交，然后把 a 提交后面的所有提交，这里就是 b，全部重写提交到 foo 的最新提交上，此时 main 分支的 head 就会指向一个新的 b 提交（既然是新的，那么 b 的 hash 肯定是变化了的），所以当 bar 修改完提交时，就会发现 b 的提交已经被重写了，此时就会需要花更多的时间去查看和比对

3. 主要区别

- **历史记录：** `merge` 保留了真实的、非线性的开发历史，而 `rebase` 会重写历史，使其成为一条直线，这样做可以消除不必要的合并提交。
- **冲突解决：** 在 `merge` 过程中，所有冲突都会在合并提交中一次性解决。而在 `rebase` 过程中，冲突需要在每个重新应用的提交中解决，这可能会导致多次冲突解决。
- **安全性：** `merge` 被认为是一种更安全的操作，因为它不会改变现有的提交。`rebase` 可能会更危险，因为它会重写历史。如果在公共分支上使用 `rebase`，可能会给团队其他成员带来问题。

4. 使用场景

- **git merge：**

  - 当你想要保留完整的历史记录时。
  - 当你的分支准备好合并到主分支时。
  - 在多人协作的项目中，尤其是当其他人可能已经基于你的分支进行了工作时。

- **git rebase：**
  - 当你想要一个更干净、更直线的历史记录时。
  - 在你开始合并之前，将主分支上的更改整合到你的特性分支中。
  - 在私人分支上工作，或者在一个小团队中，你可以确保没有其他人正在同一分支上工作。

总的来说，`merge` 和 `rebase` 都有它们的用途，选择哪一个取决于你想要的历史记录的形式以及你的工作流程。通常，最佳实践是在私人分支上使用 `rebase` 来保持历史的整洁，然后使用 `merge` 将特性分支合并到公共分支上。
