# Prettier

:::warning
在正式介绍 Prettier 之前，我想谈谈自己的观点。

我不是非常推荐 Prettier + ESLint + Stylelint 组合使用，单独使用 Prettier 是可以的。

首先，我个人并不反对使用 Prettier，它是一个非常优秀的工具。我个人不推荐的最大问题是：
1. 它为了便于使用，尽可能少的配置，内置了非常多的规则，这些规则是无法更改的，它是固执己见的（Opinionated）
2. Prettier + ESLint + Stylelint 一起使用会有一些冲突（都有代码格式的规则），通常的做法是使用 [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) 来在 ESLint 中使用禁用这些重叠规则（以及[一些其他解决方案](https://prettier.io/docs/en/integrating-with-linters.html)）。
3. ESLint + Stylelint 就能够做到与 Prettier 一样的代码格式自动修复

当然，前端大神 antfu 也是同样的观点，这里罗列的部分原因也是来自 antfu，他还对此有[一篇文章](https://antfu.me/posts/why-not-prettier)来解释。
:::



与传统的Lint工具（如ESLint）相比，Prettier 没有提供灵活的配置选项和规则，而是采用了一套固定的格式化规则。这意味着无论你是否同意某些格式化规则，Prettier 都会强制执行它们。因此，Prettier 更适合用于格式化整个项目或代码库，而不是针对个别文件或特定的代码规则进行检查。

虽然Prettier不是严格意义上的Lint工具，但它可以与 Lint 工具（如ESLint）配合使用，以实现代码格式化和代码质量检查的双重效果。通过在项目中同时使用 Prettier 和 Lint 工具，可以达到代码风格一致性和代码质量的双重保证。