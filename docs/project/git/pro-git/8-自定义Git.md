[toc]

# 自定义 Git

## 8.1 配置Git

### 1. 配置

设置你的名字和邮件地址

```bash
git config --global user.name "arrow_zb"
git config --global user.email "arrow_zb@outlook.com"
```

Git 使用一系列配置文件来保存你自定义的行为。

- 首先 查找 `/etc/gitconfig` 文件，该文件含有系统里每位用户及他们所用用的仓库的配置项。

  ```bash
  git  config --system -l 
  # 这就会读写该文件
  ```

- 接下来查找每个用户的 `~/ .gitconfig` 文件（或者 `~/ .config/git/config` 文件）。可以传递 `--global` 选项来让 Git 读写该文件

  ```bash
  git config --global -l
  ```

- 最后 Git 会查找你正在操作的版本库所对应的 Git 目录下的配置文件 (`.git/config`)。 这个文件中的值只对该版本库有效。

### 2. 客户端配置

```bash
main git-config
# 得到当前版本的 Git 支持的选项列表
```

还可以配置 

- commit.template

  commit 提交的模板

- core.pager

  该配置项指定 Git 运行诸如 log 和 diff 等命令所使用的的分页器。你可以把它设置成 more 或者任何你喜欢的分页器，默认用的是less，当然也可以设置成空字符串，关闭该选项

  ```bash
  git config --global core.pager ''
  ```

- core.excludesfile

  类似于全局生效的 .gitignore 文件。

  比如，按照下面的内容创建一个 `~/ .gitignore_global` 文件

  ```bash
  *~
  .DS_Store
  ```

  然后运行 `git config --global core.excludesfile ~/ .gitignore_global`，

- help.autocorrect

  ```bash
  aispeechdeMacBook-Air:Node-day08-EggJs-Better-Practice aispeech$ git checkcout master
  git: 'checkcout' is not a git command. See 'git --help'.
  
  The most similar command is
          checkout
  ```

Git 中的着色

- color.ui

格式化与多余的空白字符

- core.autocrlf

  假如你正在 window 上写程序，而你的同伴用的是其他系统（或相反），你可能会遇到 CRLF 问题。这是因为 windows 使用回车（CR） 和换行（LF）两个字符来结束一行，而 Mac 和 Linux 只使用换行（LF）一个字符。

- core.whitespace

## 8.2 Git 属性

你也可以针对特定的路径配置某些设置项，这样 Git 就只对特定的子目录或子文件集运用它们。 `这些基于路径的设置项被称为` Git 属性

## 8.3 Git 钩子

### 1. 客户端钩子

### 2. 服务端钩子

## 8.4 使用强制策略的一个例子



















