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





