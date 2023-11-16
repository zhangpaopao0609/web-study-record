[toc]

# git reset 和 revert 的区别

## 1. 前言

当我们在开发过程中，向 git 提交了一个记录，但后面觉得似乎提交的这个记录有些缺陷，我不想要它了，想要重置。可是重置git中存在两个命令，reset 和 revert，那么它们究竟有什么区别呢？什么时候我采用哪一个呢？

## 2. Reset

语法

```bash
git reset \--soft | --mixed | --hard
```

- `--soft` 回退时保留源码，仅仅回退 commit，修改的文件仍然保存在暂存区,再次提交时只需要 git commit 
- `--mixed`（默认）回退时保留源码，回退 commit 同时修改的文件会置于 工作区，再次提交时需要 git add
- `--hard` 回退时清除提交的源码（危险操作），源码和commit 都会回滚到某个版本

git reset 实际执行的是 HEAD的指向的回退，指定回到某个commit，那么HEAD指针就会回退到对应的 commit。这些操作都是本地执行的，如果想要推送到远程仓库（这是危险操作，因为会修改提交历史），那么需要在push的时候加上强制。

```bash
git push --force 
```

## 3. Revert

语法

```bash
git revert
```

git revert 和 reset 最本质的区别为两点：

1. revert 使用一个新的commit 来回滚你希望回滚的commit， reset 是直接HEAD 指向回退的commit
2. revert 只会回滚你希望回滚的哪一个commit的操作，不会影响其他的，reset 由于指针回退了，因此这个commit 之后的commit都会消失。

当然，我们一般的使用时，如果已经push了，使用revert，如果没有，就是用reset