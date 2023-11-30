# 5. Git 命令

> 网上有非常多的 git cheat sheet，可以自行搜索查看
> 这里贴一个 pdf 地址：https://www.atlassian.com/dam/jcr:8132028b-024f-4b6b-953e-e68fcce0c5fa/atlassian-git-cheatsheet.pdf

## 5.1 基础

| 命令                        | 说明                                                         |
| ------------------------------------------- | ------------------------------------------------------------ |
| git init <directory>        | 在指定的目录中创建空的 git 仓库。运行时不带任何参数，将当前目录初始化为 git 仓库 |
| git clone <repo>            | 将位于 <repo> 的仓库克隆到本地计算机上。原始仓库可以位于本地文件系统上或通过HTTP或SSH位于远程机器上。 |
| git config user.name <name> | 定义用于当前仓库中所有提交的作者名称。开发人员通常使用 --global 标志来设置当前用户的全局配置选项。 |
| git add <directory>         | 暂存更改 |
| git commit -m "<message>" | 提交暂存快照并携带提交信息 |
| git status | 列出已暂存、未暂存和未跟踪的文件 |
| git log | 使用默认格式显示整个提交历史记录 |
| git diff | 在索引和工作目录之间显示未暂存的更改 |

## 5.2 撤销更改

| 命令                | 说明                                                         |
| ------------------- | ------------------------------------------------------------ |
| git revert <commit> | 创建一个新的提交，用于撤销中所指定的 <commit> 的更改。       |
| git reset  <commit> | 撤销对应的  <commit>                                         |
| git clean -n        | 显示将从工作目录中删除的文件。使用 -f 标志代替 -n 标志来执行 clean。 |

## 5.3 修改历史记录

| 命令               | 说明 |
| ------------------ | ---- |
| git commit --amend |      |
| git rebase         |      |
| git reflog         |      |

## 5.4 分支

| 命令                | 说明               |
| ------------------- | ------------------ |
| git branch          |                    |
| git checkout -b     | 创建新分支         |
| git merge  <branch> | 合并分支到当期分支 |

## 5.5 远程仓库

| 命令                        | 说明               |
| --------------------------- | ------------------ |
| git remote add <name> <url> |                    |
| git fetch <remote> <branch> | 创建新分支         |
| git pull <remote>           | 合并分支到当期分支 |
| git push <remote> <branch>  |                    |
