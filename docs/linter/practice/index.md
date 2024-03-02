# Lint 实践

## 实战走起

husky + commitlint + eslint + stylelint + prettier + lint-staged + vscode 

> 先介绍一下 [lint-staged](https://github.com/lint-staged/lint-staged)
> 
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

```bash
# 初始化，根据配置选择即可
npm init @eslint/config
```

_package.json_ 设置 `script`

```json
{
    "scripts": {
      "eslint": "eslint .", // 可按照自己的需要来进行配置
      "eslint:fix": "eslint --fix .",
    },
}
```
[点击可查看](https://eslint.org/docs/latest/use/command-line-interface)关于如何设置命令行命令的详细。

这里简单介绍几个常用的：
- --ext：指定要 lint 的文件的文件后缀名
  ```bash
    # Use only .ts extension
    npx eslint . --ext .ts

    # Use both .js and .ts
    npx eslint . --ext .js --ext .ts

    # Also use both .js and .ts
    npx eslint . --ext .js,.ts
  ```
- --fix：修复一些可自动修复的问题
  ```bash
    npx eslint --fix file.js
  ```
- --quiet：打印时仅仅打印 error 的
  ```bash
    npx eslint --quiet file.js
  ```

### 4. Stylelint

规范 Style 的写法：[Stylelint](https://stylelint.io/user-guide/get-started)

这里以 scss 作为示例哈：

```bash
pnpm add --save-dev stylelint stylelint-config-standard-scss
```

_stylelint.config.js_

```js
module.exports = {
  "extends": ["stylelint-config-standard-scss"]
};
```

_package.json_ 设置 `script`

```json
{
    "scripts": {
      "stylelint": "stylelint '**/*.{css,scss}'", // 可按照自己的需要来进行配置
      "stylelint:fix": "stylelint --fix '**/*.{css,scss}'"
    },
}
```

同样 stylelint cli 也有对应的配置，[点击可查看详情](https://stylelint.io/user-guide/cli).
这里简述几个常用的：

- --fix 自动修复可以修复的问题
- --quiet, -q 仅报告 error

### 5. Prettier

如 [Prettier](/linter/prettier/) 所述，因为自己不爱用哈，所以这里就不多赘述了。

### 6. Lint-Staged

仅 lint git staged 中的文件。
> 这样不仅可以减少 lint 的等待时间，还可以尽量避免修改到旧代码

```bash
# 安装
pnpm add -D lint-staged
# 利用 husky 在 git pre-commit 钩子触发 lint-staged
echo "npx lint-staged" > .husky/pre-commit
```



