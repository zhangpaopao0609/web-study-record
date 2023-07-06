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

一般情况下，共享的配置指一组预定义的 ESLint 内置规则集合。例如，[eslint-config-Airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base)，它其实就是包含了一堆 ESLint 内置规则集合，这些规则是按照 Airbnb 风格来配置的，如下截图所示：

<PaoImages
  src="./images/eslint-config-airbnb-base.png" 
  width="80%"
  title="Airbab" 
  reference="[eslint-config-Airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base)" 
/>
点击可查看详细信息，[使用共享配置](https://eslint.org/docs/latest/use/configure/configuration-files#using-a-shareable-configuration-package)

### 3. 插件

与可共享配置类似，ESLint 插件同样通过 npm 包来实现。

ESLint 插件一般包含一组 ESLint 规则、配置、处理器和环境配置等。通常情况下，插件会包含自定义规则，用于扩展 ESLint 功能的模块，一般用于特定的 JavaScript 扩展（如 TypeScript）、库以及框架（Vue、React、Angular）的代码风格校验。例如 [`eslint-plugin-vue`](https://www.npmjs.com/package/eslint-plugin-vue) 包含了使用 Vue 框架时的 ESLint 最佳实践配置（官方插件）。

点击可查看详细信息，[配置插件](https://eslint.org/docs/latest/use/configure/plugins)

:::tip
共享配置和插件的区别是什么？

- 共享配置：共享配置是一组预定义的规则集合，便于多个项目复用，共享配置适用于定义和管理一组 **通用** 的 ESLint 内置规则集合。
- 插件：插件是用于扩展 ESLint 功能的模块，**可以提供额外的规则和功能**，插件适用于提供 **特定** 的功能和规则扩展。
:::
### 4. 解析器

ESLint 解析器将代码转换为 ESLint 可以识别的抽象语法树。默认情况下，ESLint 使用内置的 [Espree](https://github.com/eslint/espree) 解析器，它兼容标准 JavaScript 的运行时和版本。

自定义解析器允许 ESLint 解析非标准的 JavaScript 语法。通常情况，可共享配置或插件中会配置自定义解析器，一般不会单独使用它们。

例如，[@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser) 就是 [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint) 项目中的自定义解析器，它允许 ESLint 可以解析和识别 TypeScript 代码。
### 5. 自定义处理器

ESLint 处理器可以从其他类型的文件中提取 JavaScript 代码，然后让 ESLint 进行检查。或者还可以使用处理器 ESLint 检查之前对 JavaScript 代码进行操作。

例如，[eslint-plugin-markdown](https://github.com/eslint/eslint-plugin-markdown) 中就包含一个自定义处理器，使得 ESLint 可以在 Markdown 代码块中查找 JavaScript 代码


