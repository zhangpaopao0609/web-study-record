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





















