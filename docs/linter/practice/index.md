# Lint 实践

## 实战走起

husky + commitlint + eslint + stylelint + prettier + lint-staged

> 先介绍一下 [lint-staged](https://github.com/lint-staged/lint-staged)
> 一句话：使得 linter 仅仅校验在 git staged 中的文件。说得更通俗点就是，使得 linter 校验时仅仅校验git 要提交的那些文件，那些不提交的，就不去做校验（这也是我们想要的效果嘛）。
> 1. 安装：`pnpm add -D lint-staged`
> 2. 在 `pre-commit` git 钩子中运行 `lint-staged`，可以用之前提到的 husky，当然也可以自己去写哈
> 3. 安装 ESLint 和 Prettier 啥的
> 4. 配置 [`lint-staged`](https://github.com/lint-staged/lint-staged?#configuration)

开始实践，这里的实践就是本项目的配置过程，完整可查看项目。

### 1. Husky

便捷处理 git hooks：[Husky](https://typicode.github.io/husky/)

```bash
# 安装
pnpm add --save-dev husky
# 初始化
pnpm exec husky init
```

### 2. Commitlint

规范 git commit 提交：[commitlint](https://commitlint.js.org/)

```bash
# 安装
pnpm add --save-dev @commitlint/{cli,config-conventional}
# 初始化配置文件
echo "export default { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js

# 在 git commit-msg 钩子中执行 commitlint，也就是对 commit 信息进行规范
echo "npx --no -- commitlint --edit \$1" > .husky/commit-msg
```

### 3. Eslint

规范 JS Vue React 的等代码书写：[Eslint](https://eslint.org/)