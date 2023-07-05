---
outline: deep
---

# ESLint 使用

ESLint 官网给出了非常详细的[配置说明](https://eslint.org/docs/latest/use/configure/configuration-files-new)。

这里记录一下在不同的场景下如何使用 ESLint，抛砖引玉，做一个简单地指引。

<!-- :::details 9.x 版本
从ESLint 9.0版本开始，确实不再使用"env"配置选项。

在ESLint 9.0版本及更高版本中，不再需要使用"env"配置选项来指定代码运行的环境。相反，ESLint将根据你的代码中使用的全局变量和ECMAScript版本自动推断出代码运行的环境。
::: -->

:::tip
这里仍然使用的是老版的 _.eslintrc.js_ 的写法，点击查看[新版的配置写法](https://eslint.org/docs/latest/use/configure/configuration-files-new)（_eslint.config.js_）,
:::

## 1. JS 项目
> 指没有使用框架，没有使用 ts.

- 安装
```bash
pnpm add -D eslint @eslint/js
```
- _eslintrc.js_

```js
// eslintrc.js
module.exports = {
  env: {
    node: true,
    browser: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"]
  }
};
```

## 2. TS 项目

> 普通的 ts 项目

- 安装
```bash
pnpm add -D @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint typescript
```
- _eslintrc.js_

```js
// eslintrc.js
module.exports = {
  env: {
    node: true,
    browser: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
};
```

## 3. Vue 项目

1. vue-js 项目

- 安装
```bash
pnpm add -D eslint eslint-plugin-vue
```
- _eslintrc.js_

```js
// eslintrc.js
module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    'plugin:vue/vue3-recommended',
    // 'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
  }
};
```

点击可查看 [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue) 的详细内容。

2. vue-ts 项目

- 安装
```bash
pnpm add -D eslint eslint-plugin-vue @typescript-eslint/parser @typescript-eslint/eslint-plugin typescript
```
- _eslintrc.js_

```js
module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    'plugin:vue/vue3-recommended',
    // 'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
    'plugin:@typescript-eslint/recommended'
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    sourceType: "module"
  },
  plugins: ['@typescript-eslint'],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    "semi": ["error", "always"], // 强制使用分号结尾
  }
};
```
