[toc]

# 第 2 章. Git 基础

## 2.1 获取 Git 仓库

```bash
git init
```

```bash
git clone
```

## 2.2 记录每次更新到仓库 

```bash
git status

git status -s
```

```bash
git add 
```

### 1. 忽略文件

.gitignore 

无需纳入 Git 的管理，也不希望他们总出现未跟踪文件列表

```bash
cat .gitignore
```

### 2. 查看已暂存和未暂存的修改

```bash
git diff 
# 不添加参数比较的是工作目录中当前文件和暂存区域快照之间的差异
```

```bash
git diff --staged
# 查看已暂存的将要添加到下次提交里的内容
```

### 3. 提交更新

```bash
git commit
```

```bash
git commit -v
```

```bash
git commit -m "message"
# -m 的意思是将提交信息与命令放在同一行
```

### 4. 跳过使用暂存区域

尽管是一个暂存区域的方式可以精心准备要提交的细节，但有时候这么做略显繁琐。Git 提供了一个跳过使用暂存区域的方式，只要在提交的时候，给 git commit 加上 -a 的选项，Git 就会自动把所有已经跟踪过的文件暂存起来一并提交，从未跳过git add 步骤

```bash
git commit -a -m "message"
# git commit -am "message"
```

### 5. 移除文件

```bash
git rm
# 直接移除某个文件，从工作目录和暂存区均移除
```

```bash
git rm --cached 
# 只把文件从Git仓库中删除（亦即从暂存区域移除），但仍然希望保留咋当前工作目录中
```

### 6. 重命名文件

```bash
git mv filename newname
```

## 2.3 查看提交历史

### 1. 查看提交历史

```bash
git log
```

```bash
git log -p
# 显示每次提交的内容差异
```

```bash
git log -p -2
```

```bash
git log --stat
# 总结性选项
```

```bash
git log --pretty=oneline
# 使用不同于默认格式的方式展示提交历史
```

```bash
git log --pretty=format:"%h -%an, %ar : %s"
# 定制要显示的记录格式
```

```bash
git log --graph
# 使用一些 ASCII 字符串来形象地展示你的分支、合并历史
```

### 2. 限制输出长度

```bash
git log -<n> 
# 但不推荐使用，Git 在输出所有提交时会自动调用分页程序，所以一次只会看到一页的内容
```

```bash
# 按照时间作限制的选项 --since --until
git log --since=2.weeks
# 这个命令可以在多种格式下工作比如某一天“2020-02-02”， 或者是相对地多久以前
# “2 years 1 day 3 minutes ago”
```

```bash
# 可以用--author选项显示指定作者的提交
# 用 --grep 选项搜索提交说明的关键字
# 如果需要同时满足，需要使用 --all-match
git log --pretty=oneline --grep=fix --author=vv --all-match
```

```bash
# git log 选项是路径 path， 如果只关心某些文件或者目录的历史提交，可以在 git log 选项的最后指定他们的路径。因为是放在最后位置上的选项，所以用两个短划线（--）隔开之前的选项和后面限定的路径名
git log -- path
```

## 2.4 撤销操作

### 1. 撤销操作

```bash
# 有时候我们提交完了才发现漏掉了几个文件没有提交，或者提交信息写错了。此时，可以运行带有 --amend 选项的提交命令尝试重新提交
git commit --amend
# 这个命令会将暂存区的文件提交。
# 例如：你提交后发现忘记了暂存某些需要的修改，可以像下面这样操作
git commit -m "initial commit"
git add forgotten_file
git commit --amend
# 最终你只会有一个提交，第二次提交将代替第一次提交的结果
```

### 2. 取消暂存的文件

```bash
# git status 已经给出了提示
# Changes to be committed:
#  (use "git restore --staged <file>..." to unstage)
git restore --staged <file>
```

### 3. 撤销对文件的修改

```bash
# 不希望保留当前工作目录对某个文件的修改，还原为上一次提交的样子
# git status 中已经给出了提示
# Changes not staged for commit:
#  (use "git add <file>..." to update what will be committed)
#  (use "git restore <file>..." to discard changes in working directory)
git restore <file>
```

## 2.5 远程仓库的使用

### 1. 查看远程仓库

```bash
git remote
# 查看已经配置的远程仓库服务器
git remote -v
# 显示需要读写远程仓库使用的 Git 保存的简写与其对应的 URL
# aispeechdeMacBook-Air:ProGit-2 aispeech$ git remote -v
# origin	git@github.com:Arrow-zb/web-study-record.git (fetch)
# origin	git@github.com:Arrow-zb/web-study-record.git (push)
```

### 2. 添加远程仓库

```bash
git remote add <shortname> <url>
# 添加一个新的远程 Git 仓库，同时指定要一个可以轻松引用的简写,假设为test
# 在命令行中可以使用字符串 test 来代替整个 URL。
git fetch test
# aispeechdeMacBook-Air:simplegit-progit aispeech$ git fetch test
# warning: no common commits
# remote: Enumerating objects: 634, done.
# remote: Total 634 (delta 0), reused 0 (delta 0), pack-reused 634
# Receiving objects: 100% (634/634), 88.93 KiB | 7.00 KiB/s, done.
# Resolving deltas: 100% (261/261), done.
# From https://github.com/paulboone/ticgit
#  * [new branch]      master     -> test/master
#  * [new branch]      ticgit     -> test/ticgit
# 可以通过 test/master 访问到
git checkout test/master
```

### 3. 从远程仓库中抓取与拉取

```bash
git fetch [remote-name]
# 这个命令会访问远程仓库，从中拉取所有你还没有的数据。执行完成后，将会拥有那个远程仓库中所有分支的引用，可以随时合并或查看
```

```bash
# 使用 clone 命令克隆了一个仓库，命令会自动将其添加为远程仓库并默认以 “origin” 为简写。所以，git fetch origin 会抓取克隆（或上一次抓取）后新推送的所有工作。
# 默认情况下，git clone 命令会自动设置本地 master 分支跟踪克隆的远程仓库的 master 分支（或不管是什么名字的默认分支）
```

### 4. 推送到远程仓库

```bash
git push [remote-name] [branch-name]
```

### 5. 查看远程仓库

```bash
# 简单查看信息
git remote -v
# 查看某一个仓库的更多信息
git remote show [remote-name]
```

### 6. 远程仓库的移除与重命名

```bash
# 重命名引用的名字
git remote rename 
# git remote rename origin test
```

```bash
# 移除一个远程仓库
git remote rm [remote-name]
```

## 2.6 打标签

### 1. 打标签

### 2. 列出标签

```bash
git tag
# 特定模式查找标签
git tag -l 'v1.8.5'
```

### 3. 创建标签

轻量标签 (lightweight) 和附注标签 (annotated)

轻量标签很像一个不会改变的分支-它只是一个特定提交的引用

#### 3.1 附注标签

```bash
# 附注标签
git tag -a v1.4 -m "my version 1.4"
# 查看
git show v1.4
```

#### 3.2 轻量标签

```bash
git tag v1.4-lw
```

#### 3.3 后期打标签

假设忘记了给项目打标签，可以在之后不上标签。要在哪个提交上打标签，只需要在命令的末尾指定提交的校验和（commit hash）

```bash
git tag -a v1.2 92fc02
```

#### 3.4 共享标签

默认情况下 git push 不会推送标签到远程仓库服务器中。创建完标签后必须显示地推送标签到共享服务器上。就类似于推送共享远程分支一样

```bash
git push origin [tagname]
```

也可以一次性推送很多标签，使用 --tags 的 git push 实现

```bash
git push origin --tags
```

#### 3.5 检出标签

在 Git 中并不能真的检出一个标签，因为他们并不能像分支一样来回移动，如果你想要工作目录与仓库中特定的标签版本完全一样，可以使用 

```bash 
git checkout -b [branchname] [tagname]
```

在特定分支上创建一个新分支

## 2.7 Git 别名

可以通过 git config 文件来轻松为每一个命令设置一个别名

```bash
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
```

```bash
git config --global ailas.unstage 'reset HEAD --'
# 这会使得以下两个命令等价
git unstage fileA
git reset HEAD --fileA
```























