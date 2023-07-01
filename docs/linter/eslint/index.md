---
outline: deep
---


# ESLint

ESLint 是一个强大的工具，可以帮助开发人员提高代码质量和可维护性。通过配置合适的规则和插件，可以根据项目需求定制 ESLint，以适应不同的开发环境和团队规范。

自己多年都在使用 ESLint，但基本上都是用的一些模板自带的，比如 vue cli 或者 react cli 模板自带的，很少自己去配置过，相信很多同学跟我差不多的，知道有这个东西，项目中也要使用它，但鲜有自己配置，所以都没有系统地去学习过。也是趁这个机会，好好地来捋一捋 ESLint。

## ESLint 核心概念
:::tip
这是 ESLint 必须要也是我觉得唯一需要掌握理解的点，其它的诸如详细的规则，都可以在用的时候来官网查。
:::
### 1. 规则

规则是 ESLint 的核心构建块。所谓规则，就是验证您的代码是否满足某个期望，以及如果它不满足该期望该怎么处理。

例如，[`semi`](https://eslint.org/docs/latest/rules/semi) 规则允许您指定 JavaScript 语句是否应以分号（；）结尾。可以将规则设置为始终要求使用分号，或者要求语句从不以分号结尾。

ESLint 包含数百个可以使用的内置规则。这些规则可以在配置文件中自定义开启或关闭，当然，也可以引入别人共享的规则。

[点击可查看详细信息](https://eslint.org/docs/latest/rules/)

### 2. 可共享的配置
可共享配置是指可以通过 npm 来共享 ESLint 配置。

一般情况下，共享的配置主要包含对 ESLint 内置规则的配置。例如，[eslint-config-Airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base)，它其实就是包含了一堆 ESLint 内置规则的配置，这些规则是按照 Airbnb 风格来配置的，如下截图：

<PaoImages
  src="./images/eslint-config-airbnb-base.png" 
  width="80%"
  title="Airbab" 
  reference="[eslint-config-Airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base)" 
/>
点击可查看详细信息，[使用共享配置](https://eslint.org/docs/latest/use/configure/configuration-files#using-a-shareable-configuration-package)
### 4. 插件

### 5. 解析器

### 6. 处理器

### 7. 输出格式

### 8. CLI
## 使用 ESLint

ESLint 官网给出了非常项目的配置和
### 1. 普通 JS 项目
> 没有框架，没有 TS

