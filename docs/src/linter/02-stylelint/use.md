---
outline: deep
---

# Stylelint 使用

Stylelint 官网给出了非常详细的[配置说明](https://stylelint.io/user-guide/get-started)。

这里记录一下在不同的场景下如何使用 Stylelint。

## 1. CSS

通常直接使用 [stylelint-config-standard](https://www.npmjs.com/package/stylelint-config-standard)。

- 使用 Stylelint "脚手架" 进行快速配置

```bash
pnpm create stylelint
```

:::info
命令会执行三件事情

1. 安装 stylelint 和 stylelint-config-standard 依赖
2. 在根目录创建 _.stylelintrc.json_ 文件
3. 在 _.stylelintrc.json_ 文件中添加 `{ "extends": ["stylelint-config-standard"] }`
   :::

- 运行 Stylelint

```bash
# 命令会检查项目中的所有 css 文件
npx stylelint "**/*.css"
```

当然，规则完全自定义，[点击查看详情](https://stylelint.io/user-guide/customize/)

## 2. 类 CSS 语言和 “容器” 中的 CSS

- 类 CSS 语言：SCSS，Sass 和 Less 等
- “容器” 中的 CSS：在 HTML 中（行内和内联），CSS-in-JS 和 Vue 单文件等

对于这些，Stylelint 本身是无法解析和识别的，所以对这类 CSS 检查，需要特定的 “解析器” 来实现（将其转为标准 css 或从 “容器” 中提取 css）。

例如 SCSS，社区提供了 `postcss-scss` 这一自定义 “解析器” 来解析 SCSS，这样 Stylelint 就能认识 SCSS 并对其进行检查了；同时，社区还提供了一个配套的针对 SCSS 的自定义规则集 [stylelint-scss](https://www.npmjs.com/package/stylelint-scss)，用于扩展 Stylelint 的能力。

### 2.1 SCSS

1. 安装依赖

```bash
pnpm add -D stylelint postcss-scss
```

2. 配置文件 _.stylelintrc.js_

> 因为 json 文件无法添加注释，因此，这里使用了 js 文件，看个人爱好哈。具体[可查看](https://stylelint.io/user-guide/configure)

```js
// .stylelintrc.js
module.exports = {
  customSyntax: 'postcss-scss',
  rules: {
    // stylelint 内置规则
    'unit-allowed-list': ['em'],
  }
};
```

3. 如果想针对 SCSS 添加额外的补充规则，可按照以下步骤

- 安装依赖 `stylelint-scss`

```bash
pnpm add -D stylelint-scss
```

- 配置文件添加 `plugin`

```js
// .stylelintrc.js
module.exports = {
  customSyntax: 'postcss-scss',
  plugins: [
    'stylelint-scss'
  ],
  rules: {
    // stylelint 内置规则
    'unit-allowed-list': ['em'],
    // stylelint-scss 特定的规则
    'scss/dollar-variable-colon-newline-after': 'always',
  }
};
```

点击可查看 [stylelint-scc](https://github.com/stylelint-scss/stylelint-scss) 的具体内容以及如何配置。

4. 社区推荐配置

社区还提供了 `stylelint-config-recommended-scss` 作为 SCSS 的推荐配置。`stylelint-config-recommended-scss` 其实就是一套 Stylelint 配置，如下图所示：

<PaoImages
  src="./images/stylelint-config-recommended-scss.png"
  width="80%"
  title="stylelint-config-recommended-scss"
  reference="图片来至：[stylelint-config-recommended-scss](https://github.com/stylelint-scss/stylelint-config-recommended-scss/blob/master/index.js)"
/>

- 安装

```bash
pnpm add -D stylelint-config-recommended-scss
```

- _.stylelintrc.js_

```js
// .stylelintrc.js
module.exports = {
  // 使用社区推荐的配置
  extends: 'stylelint-config-recommended-scss',
  rules: {
    // stylelint 内置规则
    'unit-allowed-list': ['em'],
    // stylelint-scss 特定的规则
    'scss/dollar-variable-colon-newline-after': 'always',
  }
};
```

:::tip
是否使用看个人偏好，爱用就用，推荐的配置也不一定适合自己，完全可以根据 `stylelint` 内置的规则和 `stylelint-scss` 的规则来自己定义。
:::

### 2.2 LESS

跟 SCSS 一样，社区提供了 [`postcss-less`](https://www.npmjs.com/package/postcss-less) 这一 “解析器” 来解析 LESS。

> 但目前暂未发现 LESS 提供类似 `stylelint-scss` 这样的 LESS 自定义规则，也不知道是为啥没有，是不需要吗？比如说 `mixin` 呀、变量呀这些个的写法，不需要校验吗？不懂不懂

1. 安装依赖

```bash
pnpm add -D stylelint postcss-less
```

2. 配置文件 _.stylelintrc.js_

```js
// .stylelintrc.js
module.exports = {
  // less 解析器
  customSyntax: 'postcss-less',
  rules: {
    // stylelint 内置规则
    'unit-allowed-list': ['em'],
  }
};
```

### 2.3 HTML 中的 CSS

[`postcss-html`](https://www.npmjs.com/package/postcss-less) 用于 HTML 中的 css。

#### 2.3.1 纯 HTML

1. 安装依赖

```bash
pnpm add -D stylelint postcss-html
```

2. 配置文件 _.stylelintrc.js_

```js
// .stylelintrc.js
module.exports = {
  // html 解析器
  customSyntax: 'postcss-html',
  rules: {
    // stylelint 内置规则
    'unit-allowed-list': ['em'],
  }
};
```

:::tip
[stylelint-config-html](https://github.com/ota-meshi/stylelint-config-html) 是社区推荐的一个 HMTL（类HTML）Stylelint 的配置，其中包含了 html, php, svelte, vue 以及 xml 的配置。Vue 官方[推荐的 Stylelint 配置](https://github.com/ota-meshi/stylelint-config-recommended-vue)就使用了这一配置。

stylelint-config-html 所用的解析器就是 `postcss-html`。
:::

#### 2.3.2 HTML + CSS 文件

1. 安装依赖

```bash
pnpm add -D stylelint postcss-html
```

2. 配置文件 _.stylelintrc.js_

```js
// .stylelintrc.js
module.exports = {
  overrides: [
    {
      files: ['*.html'],
      // html 解析器
      customSyntax: 'postcss-html',
    }
  ],
  rules: {
    // stylelint 内置规则
    'unit-allowed-list': ['em'],
  }
};
```

> 为什么要这样写才能同时检测 html 文件和 css 文件呢？

#### 2.3.3 HTML + SCSS

1. 安装依赖

```bash
pnpm add -D stylelint postcss-html postcss-sass
```

2. 配置文件 _.stylelintrc.js_

```js
// .stylelintrc.js
module.exports = {
  overrides: [
    {
      files: ['*.html'],
      // html 解析器
      customSyntax: 'postcss-html',
    },
    {
      files: ['*.scss'],
      // scss 解析器
      customSyntax: 'postcss-scss',
    }
  ],
  rules: {
    // stylelint 内置规则
    'unit-allowed-list': ['em'],
  }
};
```

### 2.4 Vue

好吧，Vue 没啥可说的，直接用官方推荐的就可以的：[stylelint-config-recommended-vue](https://github.com/ota-meshi/stylelint-config-recommended-vue)。

stylelint-config-recommended-vue 就是：[stylelint-config-recommended](https://github.com/stylelint/stylelint-config-recommended) + [stylelint-config-html]() + 一点点 vue 特定配置，如下图所示：

<PaoImages
  src="./imgs/stylelint-config-recommended-vue-01.png"
  width="80%"
/>
<PaoImages
  src="./imgs/stylelint-config-recommended-vue-02.png"
  width="80%"
  title="stylelint-config-recommended-vue"
  reference="图片来至：[stylelint-config-recommended-vue](https://github.com/ota-meshi/stylelint-config-recommended-vue/blob/main/lib/index.js)"
/>
