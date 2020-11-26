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

#### 忽略文件

.gitignore 

无需纳入 Git 的管理，也不希望他们总出现未跟踪文件列表

```bash
cat .gitignore
```

#### 查看已暂存和未暂存的修改

```bash
git diff 
# 不添加参数比较的是工作目录中当前文件和暂存区域快照之间的差异
```

```bash
git diff --staged
# 查看已暂存的将要添加到下次提交里的内容
```

#### 提交更新

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

跳过使用暂存区域

尽管是一个暂存区域的方式可以精心准备要提交的细节，但有时候这么做略显繁琐。Git 提供了一个跳过使用暂存区域的方式，只要在提交的时候，给 git commit 加上 -a 的选项，Git 就会自动把所有已经跟踪过的文件暂存起来一并提交，从未跳过git add 步骤

```bash
git commit -a -m "message"
# git commit -am "message"
```

