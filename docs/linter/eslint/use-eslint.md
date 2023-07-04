---
outline: deep
---

# ESLint 使用

ESLint 官网给出了非常详细的[配置说明](https://eslint.org/docs/latest/use/configure/configuration-files-new)。

这里记录一下在不同的场景下如何使用 ESLint，抛砖引玉，做一个简单地指引。


:::details 9.x 版本
从ESLint 9.0版本开始，确实不再使用"env"配置选项。

在ESLint 9.0版本及更高版本中，不再需要使用"env"配置选项来指定代码运行的环境。相反，ESLint将根据你的代码中使用的全局变量和ECMAScript版本自动推断出代码运行的环境。
:::

:::tip
这里使用的是[新版的配置写法](https://eslint.org/docs/latest/use/configure/configuration-files-new)（_eslint.config.js_）,
:::

## 1. JS 项目
> 指没有使用框架，没有使用 ts.

- 安装
```bash
pnpm i -D eslint @eslint/js
```
- _eslint.config.js_

```js
// eslint.config.js
import js from "@eslint/js";

export default [
  // @eslint/js 推荐的配置
  js.configs.recommended,
  {
    // 语言配置
    languageOptions: {
      globals: {
        window: 'readonly',
      }
    },
    // 规则
    rules: {
      semi: "error",
      "prefer-const": "error"
    }
  }
];
```

## 2. TS 项目