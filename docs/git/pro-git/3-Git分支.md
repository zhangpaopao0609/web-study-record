[toc]

# 第三章. Git 分支

## 3.1 分支简介

### 1. 分支简介

Git 把数据看做是对小型文件系统的一组快照。每次提交更新，或在 Git 中保存项目状态时，主要对当时的全部文件制作一个快照并保存这个快照的索引。为了高效，如果文件没有修改， Git 不再重新存储该文件，而是只保留一个链接指向之前存储的文件。 Git 对待数据更像是一个快照流。

暂存操作会为每个文件计算校验和（SHA-1 哈希算法），然后会把当前版本的文件快照保存到 Git 仓库中 （Git 使用blob对象来保存他们）最终将校验和加入到暂存区域等待提交。

```bash
git add
```

当使用 git commit 进行提交操作时， Git 会先计算每一个子目录的校验和，然后在 Git 仓库中将这些校验和保存为树对象。 随后， Git 便会创建一个提交对象，它除了包含上面提到的那些信息外，还包含指向这个树对象的指针。如此一来， Git 就可以在需要的时候重新此次保存的快照

做些修改后再次提交，产生的提交对象就会包含一个指向上次提交对象（父对象）的指针

**Git 的分支，其实本质上仅仅是指向提交对象的可变指针**

### 2. 分支创建

Git 分支，只是创建了一个可以移动的新的指针

```bash
git branch [branch-name]
```

这会在当前所在的提交对象上创建一个指针

那么， Git 又是怎么知道当前是在哪一个分支上呢？也很简单，它有一个名为 HEAD 的特殊指针，指向当前所在的本地分支（译注： 可将 HEAD 想象成当前分支的别名）

```bash
git log --oneline --decorate
# c1ed4f8 (HEAD -> test, origin/test, origin/HEAD)
```

### 3. 分支切换

```bash
git checkout [branch-name]
```

这样，HEAD 就指向切换的分支了

修改后再次提交，会发现 HEAD 分支会随着提交操作自动向前移动

再 切回分支 git checkout master

这条命令就会做两件事情。一是使 HEAD 指回 master 分支，二是将工作目录回复成 master 分支所指向的快照内容。也就是说，你现在做修改的话，项目将始于一个较旧的版本。本质上来讲，这就是忽略 [banch-name]分支所做的修改，以便于向另一个方向进行开发。

然后再修改再提交，提交历史就会产生分叉。可以通过一下命令查看

```bash
git log --online --decorate --graph --all
# 仔细看，能看懂的
```

## 3.2 分支的新建与合并

```bash
git checkout -b iss53
```

在切换分支之前，保持好一个干净的状态。切换分支之前需要留意工作目录和暂存区里那些还没有提交的修改，它可能会和即将检出的分支产生冲突从而阻止 Git 切换到该分支。有一些方法可以绕过这个问题（即，保存进度（stashing）和修补提交（commit amending））

```bash
git merge
```

合并的时候存在三种情况，

先描述一个前提条件

```bash
# 存在分支 A
# 切出分支 B 、 C 和 D 
# 分支 B C D分别作了更改和提交
# C 和 D 还修改了同一个文件的同一处(index.html)
```

1. 第一种，快进

   ```bash
   #  A 分支
   git merge B
   # Fast-forward
   ```

   快进，这个词。当前分支所指向的提交（相当于父对象）是当前提交的直接上游，也就是说，从A分支切一个新的分支B出去，B做了更改，提交，然后又切回A分支，A分支没有做任何的更改和提交，然后进行merge B， 这时候A分支所指向的提交就是当前提交（merge B的提交）的直接上游，所以 Git 只是简单的将指针向前移动。换句话说，当试图合并两个分支时，如果顺这样一个分支走下去能够到达另一个分支，那么 Git 在合并两者的时候，只会简单的将指针向前推进，指针右移，因为这种情况下的合并操作是没有需要解决的分歧。

2. 第二种，三方合并

   ```bash
   # A 分支
   git merge C
   # Merge made by the 'recursive' strategy
   ```

   在这种情况下，开发历史从一个更早的地方开发分叉（diverged）开来 。因为，A分支所在的提交并不是C分支提交的直接祖先， Git 不得不做一些额外的工作。出现这种情况，Git 会使用两个分支的末端所指的快照以及两个分支的工作祖先，做一个简单的三方合并。 

   和直接将分支指针向前推进所不同的是， Git 将此三方合并的结果做了一个新的快照并且自动创建一个新的提交指向它。**这个被称作一次合并提交，特别之处就在于它有不止一个父提交**

   当merge时，这时候自动创建新的提交，因此会弹出 commit 框

   需要指出的是， Git 会自行决定选取哪一个提交作为最优的共同祖先，并以此作为合并的基础。

3. 第三种， 合并冲突

   有时候合并操作不会如此顺利，如果在两个不同分支中，对同一个部分进行了不同的修改，Git 就没法干净的合并他们。如果都修改了同一处，那么在合并的时候就会产生冲突：

   ```bash
   # A 分支
   git merge D
   # Auto-mergeing index.html
   # CONFLICT (content) : Merge conflict in index.html
   # Automatic merge failed; fix conflicts and then commit the result
   ```

删除分支

```bash
git branch -d [branch-name]
```

## 3.3 分支管理

```bash
git branch
# 查看每个分支的最后一次提交
git branch -v
# 查看哪些分支已经合并到当前分支
git branch --merged
#  arrow-ci
#  ci-to-beta
#  feature/sprint-13
#  full-link-on-shelf
#  release
#* test
# 因为之前已经合并了这些分支，所以现在看到它在列表中。在这个列表中分支名字前没有 * 号的分支通常可以使用 git branch -d 删除掉；因为你已经将他们的工作整合到了另一个分支，所以并不会失去任何东西

# 查看所有包含未合并工作的分支，
git branch --no-merged
# aispeechdeMacBook-Air:odcp-console-product aispeech$ git checkout release
# aispeechdeMacBook-Air:odcp-console-product aispeech$ git branch --no-merged
#  arrow-ci
#  ci-to-beta
#  feature/sprint-13
#  full-link-on-shelf
#  test
# 这里显示了其他分支。因为它包含了还未合并的工作，尝试使用 git branch -d 命令删除它时会失败
# aispeechdeMacBook-Air:odcp-console-product aispeech$ git branch -d test
# error: The branch 'test' is not fully merged
# If you are sure you want to delete it, run 'git branch -D test'
# 如果真的想要删除分支并丢掉那些工作，如同帮助信息里面所指出的，可以使用 -D 选项强制删除它
```

## 3.4 分支开发工作流

### 1. 长期分支

### 2. 特性分支

## 3.5 远程分支

远程分支是对远程仓库的引用（指针），包括分支、标签等等

```bash
git ls-remote (remote)
git remote show (remote) 
```

### 1. 利用远程跟踪分支

远程跟踪分支时远程分支状态的引用。它们是不能移动的本地引用，当做任何网络通信操作时，它们会自动移动。远程跟踪分支就像是你上次连接到远程仓库时，那些分支所处状态的书签。

它们以 （remote）/ （branch）形式命名。

```bash
# aispeechdeMacBook-Air:ProGit-2 aispeech$ git branch -a
# * master
#  remotes/origin/master
```

我在本地master分支上已经提交了3次，也就是说与远程分支的状态不一样了，这里的 remotes/origin/master 就是最后一次与远程仓库连接时的 master 分支的状态，那么想要查看，直接checkout就可以了

```bash
# aispeechdeMacBook-Air:ProGit-2 aispeech$ git checkout origin/master
# Note: switching to 'origin/master'.
# HEAD is now at 92fc352 feat: authentication
```

这时候当前分支就到了最后一次与远程仓库连接时的 master 分支的状态了。

```bash
# 在git clone 时会自动将远程命名为origin，创建一个指向它的master分支的指针，并在本地将其命名为 origin/master， 同时git也会给一个与origin的master分支在指向同一个地方的mster分支，这样就有了工作的基础分支

# origin 没有特殊含义，只是使用广泛，默认的
git clone -o arrow
# 这样默认的远程分支就成就会是 arrow/master
```

如果你在本地的master分支做了一些工作，然而在同一时间，其他人推送提交到远程仓库并更新了它的master分支，那么你的提交历史将向不同的方向前进。当然，只要你不与远程仓库服务器连接，那么本地的 origin/master 指针就不会移动。

如果要同步你的工作，运行

```bash
git fetch origin
# 这个命令查找 origin 是哪一个服务器，从中抓取本地没有的数据，并且更新本地数据库，移动 origin/master 指针指向新的、更新后的位置
```

```bash
# 复习一下 添加远程仓库
git remote add origin_2 UTL
# 拉取
git fetch origin_2
```

### 2. 推送

```bash
# 当从服务器上抓取数据时，会在本地生成远程分支
# 特别注意的一点是当抓取到新的远程跟踪分支时，本地不会自动生成一份可编辑的副本。换句话说，这种情况下不会有一个新的分支，只会有一个不可修改的origin/fenzhi
# 可以通过merge 将这写工作合并到当前所在分支或者自己新建一个分支建立在远程跟踪分支之上
git checkout -b [branch-name] origin/[branch-name]
```

但是好像现在不一样了

```bash
# 查看所有分支
git branch -a
# aispeechdeMacBook-Air:odcp-console-product aispeech$ git branch -a
#  arrow-ci
#  ci-to-beta
#  feature/sprint-13
#  full-link-on-shelf
#  release
#* test
#  remotes/origin/HEAD -> origin/test
#  remotes/origin/arrow-ci
#  remotes/origin/ci-to-beta
#  remotes/origin/custom-resource
#  remotes/origin/feature/bigdata-1029
#  remotes/origin/feature/bugfix-0226
#  remotes/origin/feature/head_link
#  remotes/origin/feature/hechengyin-1125
#  remotes/origin/feature/sprint-10
#  remotes/origin/feature/sprint-11
#  remotes/origin/feature/sprint-13
#  remotes/origin/feature/sprint-2
#  remotes/origin/feature/sprint-20
#  remotes/origin/feature/sprint-21
#  remotes/origin/feature/sprint-22
#  remotes/origin/feature/sprint-3
#  remotes/origin/feature/sprint-5
#  remotes/origin/feature/sprint-6
#  remotes/origin/feature/sprint-7

# 然后可以直接 checkout 分支 
# 切出来的分支就是建立在对应的远程分支上的
aispeechdeMacBook-Air:odcp-console-product aispeech$ git checkout feature/sprint-10
Branch 'feature/sprint-10' set up to track remote branch 'feature/sprint-10' from 'origin'.
Switched to a new branch 'feature/sprint-10'
```

### 3. 跟踪分支

从远程跟踪分支检出一个本地分支会自动创建一个叫做“跟踪分支”（有时候也叫做’上游分支‘）。跟踪分支是与远程分支有直接关系的本地分支。如果在一个跟踪分支上输入 git pull,  Git 能自动地识别去哪个服务器上抓取、合并到哪个分支

当克隆一个仓库时，通常会自动地创建一个跟踪 origin/master 的 master 分支。然而，也可以设置其他的跟踪分支-其他远程仓库的跟踪分支或者不跟踪master分支。最简单的例子就是运行 git checkout -b [branch-name] [remotename]/[branch-name]。同时，Git 还提供了 --track 来设置跟踪

```bash
git checkout --track origin/arrow
# Branch arrow set up to track remote branch arrow from origin. 
# Switched to a new branch 'arrow'
```

设置已有本地分支跟踪一个刚刚拉取下来的远程分支，或者想要修改正在跟踪的上游分支，你可以在任意时间使用 -u 或 --set-upstream-to 选项运行 git branch 来显示的设置

```bash
git branch -u origin/arrow
# Branch arrow set up to track remote branch arrow from origin.
```

```bash
git branch -vv
```

### 4. 拉取

git fetch 命令从服务器上抓取本地没有的数据时，它并不会修改工作目录中的内容。它只会获取数据然后让你自己合并。然而，有一个命令git pull, 在大多数情况下它的含义是一个 git fetch 紧接着一个 git merge 命令。如果有一个像之前章节中演示的设置好的跟踪分支，不管它是显示地设置还是通过clone或checkout命令创建的，git pull 都会查找当前分支所跟踪的服务器与分支，从服务器上抓取数据然后尝试合并那个远程分支。

### 5. 删除远程分支

```bash
git push origin --delete [branch-name]
```

## 3.6 变基

在git 中整合来自不同分支的修改主要有两种方法： merge 以及 rebase。 

### 1. 变基的基本操作

整合分支最容易的方法时 merge，它会把两个分支的最新快照以及二者最近的共同祖先进行三方合并，合并的结果是生成一个新的快照（并提交）。

其实，还有一种方法：可以提取在 B分支中引入的补丁和修改，然后在 C 分支的基础上再应用一次。在 Git 中，这种操作叫做变基。使用 rebase 命令将提交到某一分支上的所有修改都移至另一个分支上，就好像“重新播放”一样

原理是首先找到两个分支的最近共同祖先，探后对比当前分支相对于该祖先的历次提交，提取响应的修改并存为临时文件，然后将当前分支指向目标基底，最后以此将之前另存为临时文件的修改依序应用。

这个 rebase 很有趣。其实很简单，比如我现在在 A分支上，我想合并一下C分支，方法一就是merge,不说了。

方法二：

```bash
# 在分支 A 上
# 假设共同祖先是 COMMINT-TOGRTHER 加上 A 上提交了 A1 A2, C上提交了C1 C2。
git rebase C
# 现在呢，首先找到 AC的最近共同祖先，然就把 相比较于共同祖先的 A 的改变（A1 A2）拿出来变成一个临时文件，然后以 C 为基础，把临时文件指向 C， 所以最终的结果就是 A 变成了COMMINT-TOGRTHER C1 C2 A1 A2
# 然后如果 C 想要合并 A 的话，就是 Fast-forward 了，不再是 merge 了
```

这个变基是非常有意思的！