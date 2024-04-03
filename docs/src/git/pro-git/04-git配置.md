# 4. git 配置

设置你的名字和邮件地址

```bash
git config --global user.name "xxx"
git config --global user.email "xxx"
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
