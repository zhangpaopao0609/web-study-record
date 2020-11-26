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

