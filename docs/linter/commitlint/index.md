# commitlint

用于规范 git commit 提交信息。
一般使用 [commitlint](https://github.com/conventional-changelog/commitlint)，[官网传送门](https://commitlint.js.org/)。

## 使用

在本地 git commit 提交时，要想 lint 生效，就需要在 git 的 commit-msg 钩子触发时进行 lint。这就不得不提到 husky 了。

husky 使得在触发 git 钩子时更容易地进行一些处理。
> 什么意思呢？我们想要对 commit 的信息进行规范，也就是想要对 commit 信息进行校验，那怎么知道现在是在 git commit 了呢？很简单，git 在执行 commit 命令时会触发一个钩子函数，那就是 commit-msg，在没有 husky 之前，我们可以通过这个钩子函数来进行校验，在 `.git/hooks/commit-msg` 中处理即可。
> 
> 简单来说就是 git 在执行 commit 命令时会触发 `.git/hooks/commit-msg` 这里面的代码，那就可以校验了对吧。但这样很麻烦，究极麻烦。**所以出现了 husky，它使得我们能更加方便地处理这些事情**。

1. 安装 commitlint

```bash
pnpm add -D @commitlint/{cli,config-conventional}
```
> 其中 config-conventional 是一个社区规范，社区都按照这个共识来进行提交 commit。具体内容可[点击查看](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional)

2. commitlint.config.js
```bash
echo "export default { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js
```
就创建配置文件。

3. 初始化 husky
```bash
pnpm add -D husky
pnpm exec husky init

# Add commit message linting to commit-msg hook
echo "npx --no -- commitlint --edit \$1" > .husky/commit-msg
```
> `npx --no -- commitlint --edit \$1` 其中的这一句就是执行校验的关键 `npx commitlint` 不就是执行 commitlint 命令嘛，对谁？对 `$1`，它是什么？就是 `commit-msg` 这个钩子回调的参数，也就是提交的 commit 信息内容

然后就大功告成了，这样 git commit 时就会自动校验了。