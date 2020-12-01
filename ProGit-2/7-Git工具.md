[toc]

# Git 工具

## 6. 1 选择修订版本

### 1. 祖先引用

祖先引用是另一种指明一个提交的方式。如果你在引用的尾部加上一个 `^`,  Git 会将其解析为该引用的上一个提交。

假设这是你的提交历史：

```bash
aispeechdeMacBook-Air:web-study-record aispeech$ git log --oneline
84f4adc (HEAD -> master, origin/master) feat: GitHub
9998d15 feat: GitHub
731dba7 feat: maintain
```

可以使用 `HEAD^` 来查看上一个提交，也就是 “HEAD 的父提交”

```bash
aispeechdeMacBook-Air:web-study-record aispeech$ git show HEAD^
commit 9998d15561c5aac7e272c156547b51d2fa76d74f
Author: arrow_zb <arrow_zb@outlook.com>
Date:   Mon Nov 30 21:29:12 2020 +0800

    feat: GitHub

```

也可以在 `^` 后面添加一个数字 —— 例如 `9998d15^2` 代表 “9998d15 的第二父提交”。这个语法只是适用于合并（merge）的提交，因为合并提交会有多个提交。第一父提交是你合并时所在分支，而第二父提交就是你所合并的分支。

另一种祖先提交的方法是 `~`。同样是指向第一父提交，因此 HEAD~ 和 HEAD^ 是等价的。而区别在于你在后面添加数字的时候。`HEAD~2` 代表 “第一父提交的第一父提交”，也就是 “祖父提交” —— Git 会根据你指定的次数获取对应的第一父提交。

```BASH
aispeechdeMacBook-Air:web-study-record aispeech$ git show HEAD~2
commit 731dba707b1759a54d19bfdf7c73fa9a7e8c6e4e
Author: arrow_zb <arrow_zb@outlook.com>
Date:   Mon Nov 30 19:08:27 2020 +0800

    feat: maintain
```

这也可以写成 `HEAD^^`, 这也是第一父提交的第一父提交

```BASH
aispeechdeMacBook-Air:web-study-record aispeech$ git show HEAD^^
commit 731dba707b1759a54d19bfdf7c73fa9a7e8c6e4e
Author: arrow_zb <arrow_zb@outlook.com>
Date:   Mon Nov 30 19:08:27 2020 +0800

    feat: maintain
```

你也可以组合使用这两个语法 —— 通过 `HEAD~3^2` 来取得之前引用的第二父提交（当然，需要 `HEAD~3` 是一个合并提交）

### 2. 提交区间

- 双点

  最常用的指明提交区间语法的是双点。这种语法可以让 Git 选出在一个分支而不在另一个分支中的提交。

  比如 

  - master 上 提交记录为  M-A  M-B  M-C  M-D  M-E
  - test 以master  M-C 为父提交切分支，新增提交记录 T-D T-E

  想要查看 test 分支上还有哪些分支尚未合并到 master 分支，可以使用 `master..test` 来让 Git 显示这些提交。也就是在“test 分支中而不在 mster 分支中的提交”。

  ```bash
  git log master..test
  ```

  反过来，想查看在 master分支却不在 test 分支中的提交，只要交换分支名即可。

  

  另一个常用的场景是查看你即将推送到远端的内容：

  ```bash
  git log origin/master..HEAD
  ```

- 多点

- 三点

  被两个引用中的一个包含但又不被两者同时包含的提交

## 7.2 交互式暂存

Git 自带的一些脚本可以使在命令行下工作更容易。 本节的几个互交命令可以帮助你将文件的特定部分组合成提交。 当你修改一组文件后，希望这些改动能放到若干提交而不是混杂在一起成为一个提交时，这几个工具会非常有用。 通过这种方式，可以确保提交是逻辑上独立的变更集，同时也会使其他开发者在与你工作时很容易地审核。

运行 `git add ` 时使用 `-i` 或者 `--interactive`选项，Git将会进入一个交互式终端模式。

```bash
aispeechdeMacBook-Air:web-study-record aispeech$ git add -i

*** Commands ***
  1: status	  2: update	  3: revert	  4: add untracked
  5: patch	  6: diff	  7: quit	  8: help
What now> 
```

## 7.3 储藏与清理

`git stash`

储藏会处理工作目录的脏的转态 - 即，修改的跟踪文件与暂存改动 - 然后将未完成的修改保存到一个栈上，而你可以在任何时候重新应用这些改动

### 1. 储藏工作

```bash
git stash
# 或 git stash save
```

```bash
aispeechdeMacBook-Air:git-test aispeech$ git checkout A
error: Your local changes to the following files would be overwritten by checkout:
        master-stash
Please commit your changes or stash them before you switch branches.
Aborting
aispeechdeMacBook-Air:git-test aispeech$ git stash
Saved working directory and index state WIP on master: 2e13a8e A
aispeechdeMacBook-Air:git-test aispeech$ 
```

现在，工作目录是干净的了。

在这时，能够轻易地切换分支并在其他地方工作；修改都没存储在栈上。要查看储藏的东西，可以使用 `git stash list`

```bash
aispeechdeMacBook-Air:git-test aispeech$ git stash list
stash@{0}: WIP on A: 3108d6a A2
stash@{1}: WIP on master: 2e13a8e A
```

可以通过 `stash` 命令的帮助提示来将储藏的工作重新应用：

```bash
git stash apply
```

想要应用一个更旧的储藏，可以通过名字指定它

```bash
git stash apply stash@{1}
# 如果不指定一个储藏， Git 认为指定的是最近的储藏
```

应用选项只会尝试应用暂存的工作 - 在堆栈上还有它。可以运行 `git stash drop` 加上将要移除的储藏的名字来移除它

```bash
aispeechdeMacBook-Air:git-test aispeech$ git stash list
stash@{0}: WIP on B: 521988e Merge branch 'A' into B
stash@{1}: WIP on A: 3108d6a A2
stash@{2}: WIP on master: 2e13a8e A
aispeechdeMacBook-Air:git-test aispeech$ git stash drop stash@{2}
Dropped stash@{2} (95315d6a56a658204aa77055f883c88e409883fb)
aispeechdeMacBook-Air:git-test aispeech$ git stash list
stash@{0}: WIP on B: 521988e Merge branch 'A' into B
stash@{1}: WIP on A: 3108d6a A2
aispeechdeMacBook-Air:git-test aispeech$ 
```

  ### 2. 清理工作目录

```bash
git clean
```

一个更安全的选项是运行 

```bash
git stash --all
# 来移除每一样东西并存放到栈中
```

## 7.4 签署工作

GPG 来签署和验证工作的方式

## 7.5 搜索

Git 提供两个有用的工具来快速地从它的数据库中浏览代码和提交。

### 1. Git Grep

默认情况下 Git 会查找你的工作目录的文件。可以传入 `-n` 参数来输出 Git 所找到的匹配行行号

```bash
aispeechdeMacBook-Air:web-study-record aispeech$ git grep -n paopao
OpenClass/NODE/Node-day01-NodeJSBasic/vue-auto-router-cli/package.json:13:  "author": "paopao-arrow",
OpenClass/NODE/Node-day02-Koa/package.json:10:  "author": "paopao-arrow",
OpenClass/NODE/Node-day03-NetworkProgram/package.json:10:  "author": "paopao-arrow",
OpenClass/NODE/Node-day04-DataPersistence-Mysql/package.json:10:  "author": "paopao-arrow",
OpenClass/NODE/Node-day05-DataPersistence-Mongodb/package.json:10:  "author": "paopao-arrow",
OpenClass/NODE/preview/AsynchronousProgramming/package.json:10:  "author": "paopao-arrow",
OpenClass/NODE/preview/helloworld/package.json:10:  "author": "paopao-arrow",
OpenClass/VUE/day01-vue/src/App.vue:6:      <template v-slot:arrow="{ paopao  }">
OpenClass/VUE/day01-vue/src/App.vue:8:        {{ paopao.try }}
OpenClass/VUE/day01-vue/src/views/Home.vue:5:    <slot name="arrow" :paopao="paopao"></slot>
OpenClass/VUE/day01-vue/src/views/Home.vue:17:      paopao : { try: 99 }
OpenClass/VUE/day01-vue/笔记.md:105:    {{ paopao.try }}
OpenClass/VUE/day01-vue/笔记.md:117:  <slot name="arrow" :paopao="data"></slot>
OpenClass/VUE/day01-vue/笔记.md:122:  <template v-slot:arrow="{ paopao }">
OpenClass/VUE/day01-vue/笔记.md:124:    {{ paopao }}
OpenClass/VUE/day04-vue-again/index.html:25:                name: 'paopao',
OpenClass/VUE/day04-vue-again/index.html:38:                    this.name = "arrow-paopao";
OpenClass/VUE/day04-vue/index.html:33:          this.name = 'paopao';
OpenClass/VUE/day06-vue/day06-vue/vue.config.js:2:const title = 'paopao';
OpenClass/VUE/day08-typescript/PreView/package.json:9:  "author": "paopao-arrow",
Professional-JS-4/chapter-24-XHR/package.json:10:  "author": "paopao-arrow",
```

grep 命令的一些有趣选项

```bash
# --count 来使 Git 输出概述的信息
git grep --count []

aispeechdeMacBook-Air:web-study-record aispeech$ git grep --count 10.12.6.144
OpenClass/NODE/Node-day07-EggJs/agg-v4-router-controller-service-mysql/config/index.js:1
OpenClass/NODE/Node-day07-EggJs/agg-v5-router-controller-service-mysql-middle/config/index.js:1
OpenClass/NODE/Node-day07-EggJs/agg-v6-router-controller-service-mysql-middle-schedule/config/index.js:1
OpenClass/NODE/Node-day07-EggJs/egg/config/config.default.js:1
aispeechdeMacBook-Air:web-study-record aispeech$ 
```

查看匹配的的行是输入哪一个方法或函数，可以使用 `-p`

使用 `--and` 标志来查看复杂的字符串组合，也就是在同一行同时包含多个匹配。

### 2. Git 日志搜索

想知道某一项什么时候存在或者引入的。

例如： 想知道10.12.6.144是什么时候引入的，可以使用 `-S` 选项来显示新增和删除该字符的提交

```bash
aispeechdeMacBook-Air:web-study-record aispeech$ git log -S 10.12.6.144 --oneline
83576e3 feat: egg
5705bd6 feat: agg-v6
4424280 feat: agg-v5
ed4fc50 feat: agg-v4
```

然后查看这些提交的diff, 就可以知道何时引入的

如果你希望得到更精确的结果，你可以使用 -G 选项来使用正则表达式搜索。

```bash
aispeechdeMacBook-Air:web-study-record aispeech$ git log -G 10.12.6.144 --oneline
83576e3 feat: egg
5705bd6 feat: agg-v6
4424280 feat: agg-v5
ed4fc50 feat: agg-v4
```

## 7.5 重写历史

### 1. 修改最后一次提交

对于最近一次提交，往往是做两件事：修改提交信息，或者修改添加、修改和移除的文件的快照

```bash
# 修改最近一次提交的提交信息
git commit --amend
```

如果之前提交忘记添加一个新创建的文件，想通过添加或修改文件来更改提交的快照，也可以通过类似的操作来完成。通过修改文件然后运行 `git add` 或 `git rm` 一个已追踪的文件，随后运行 `git commit --amend` 拿走当前的暂存区域并使其作为新提交的快照。

### 2. 修改多个提交信息

为了修改在提交历史中较远的提交。

通过变基来实现

```bash
git rebase -i 
```

如果想要修改最近三次提交信息，或者那组提交中的任意一个提交信息，将想要修改的最近一次提交的提交作为参数传递给 `git rebease -i`命令，即 `HEAD~2^` 或 `HEAD~3`。

```bash
git rebase -i HEAD~3
```

### 3. 重新排序提交

### 4. 压缩提交

### 5. 拆分提交

拆分一个提交其实很简单，首先撤销这个提交，然后多次地部分地暂存与提交直到完成你所需次数的提交。

```bash
$ git reset HEAD^ 
$ git add README 
$ git commit -m 'updated README formatting' 
$ git add lib/simplegit.rb 
$ git commit -m 'added blame' 
$ git rebase --continue
```

### 6. 核武器级选项： filter-branch

- 从每一个提交移除一个文件

  为了从整个提交历史中移除一个叫做 passwaord.txt 的文件，可以使用 `--tree-filter` 选项给 `filter-branch`:

  ```bash
  git filter-branch --tree-filter 'rm -f passwaord.txt' HEAD
  ```

- 全局修改邮箱地址

  通过 filter-branch 来一次性修改多个提交中的邮箱地址。需要小心的是只修改自己的邮箱地址，所以使用 `--commit-filter`

  ```bash
  git filter-branch --commit-filter '
  	if [ "$GIT_AUTHOR_EMAIL" = "bo.zhang@aispeech.com" ];
  	then
  		GIT_AUTHOR_NAME="arrow_zb";
  		GIT_AUTHOR_EMAIL="arrow_zb@outlook.com";
  		git commit-tree "$@";
  	else
  		git commit-tree "$@";
  	fi' HEAD
  '
  ```


## 7.7 重置揭密

### 1. 三棵树

```bash
# --soft ,仅仅撤销上一次的 commit,保留暂存区（索引）和工作区域，于是回到了git commit 的命令执行之前
git reset --soft HEAD~
# --mixed, 这也是默认行为，撤销上一次的 commit, 并且取消暂存所有的东西，于是回到了git  add 和 git commit 的命令执行之前
git reset [--mixed] HEAD~
# --hard 是 reset 命令唯一危险的用法，也是 Git 会真正销毁数据的仅有的几个操作之一 
git reset --hard 
```

回顾

`reset` 命令会以特定的顺序重写三棵树，在你指定以下选项时停止：

- 移动 HEAD 分支的指向（若指定了 `--soft`，则到此停止）
- 使索引看起来像 HEAD （若为指定 `--hard`, 则到此停止）
- 使工作目录看起来像索引

### 2. 检出

checkout 和 reset 之间的区别。和 reset 一样，checkout 也操作三棵树，不过它有一点不同，这取决于你是否传给该命令一个文件路径。

不带路径

运行 `git checkout [branch]` 与运行 `git reset --hard [branch]` 非常相似

带路径

## 7.8 高级合并

```bash
# git merge --abort 选项会尝试恢复到你运行合并前的状态。但当运行命令前，在工作目录中有为储藏、未提交的修改时它不能完美处理，除此之外它都工作地很好
git merge --abort
```

### 1. 忽略空白

默认合并策略可以带有参数

```bash
# -Xignore-all-space 忽略任意数量的已有空白的修改
# -Xignore-space-change 忽略所有空白修改
git merge -Xignore-space-change [branch-name]
```

### 2. 手动文件再合并

### 4. 合并日志

### 5. 组合式差异格式

### 6. 撤销合并

两种方式来解决这个问题

- 修复引用

  如果这个不想要的合并只存在于你的本地仓库中，最简单且最好的解决方案是移动分支到你想要指向的地方。大多数情况下，如果你在错误的 git merge 后运行 git reset --hard HEAD~

  这个方法的缺点是它会重写历史。

- 还原提交

  如果移动分支指针并不适合你，Git 给你生成一个新提交的选项，提交将会撤销一个已存在提交的所有修改。称“还原”，

  ```bash
  git revert -m 1 HEAD
  ```

  

### 7.9 Rerere

```bash
git rerere
# reuse recorded resolution
```

### 7.10 使用Git调试

`

















