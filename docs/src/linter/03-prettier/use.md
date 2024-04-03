---
outline: deep
---

# Prettier 使用

Prettier 官网给出了非常详细的[配置说明](https://prettier.io/docs/en/install)。

安装和文件的说明这里就不赘述了，这里主要讲讲 Prettier 配置项的含义

1. Print Width：指定换行的长度
2. Tab Width：缩进的所占的长度
3. Tabs：缩进是用空格还是用 tab，默认是空格
4. Semicolons：表达式后是否添加分号，默认添加
5. Quotes：使用单引号还是双引号，默认双引号
6. Quote Props：对象中属性是否添加引号
  - "as-needed"：仅需要时添加
  - "consistent"：只要有一个添加了，那么全部都添加
  - "preserve"：不做修改
7. JSX Quotes：jsx 使用单引号还是双引号，默认双引号
8. Trailing Commas：末尾逗号如何添加
  - "all"：所有[可能的地方](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Trailing_commas#trailing_commas_in_functions)都加上
  - "es5"：遵循 es 规范
  - "none"：不做修改
9. Bracket Spacing：大括号前后是否添加空格，默认是
10. Bracket Line：多行 html 元素下闭 `>` 是否展示到下一行，默认是
11. Arrow Function Parentheses：箭头函数单参数时是否加括号，默认添加
12. Range：格式化的范围
13. Parser：指定用什么解析器来解析，基本不用设置
14. File Path：指定要解析的文件的文件path
15. Require Pragma：标注，在文件顶部标注
  ```bash
  /**
  * @prettier
  */
  ```
16. Insert Pragma：是否插入标注，默认 false
17. Prose Wrap：默认情况下，Prettier不会更改文本中的换行，因为有些服务对换行敏感。
  - "always"：严格按照 Print Width
  - "never"
  - "preserve"
18. HTML Whitespace Sensitivity
19. Vue files script and style tags indentation：vue script 和 style 是否缩进，默认false
20. End of Line：文件最后一行是否换行，默认 `lf`
21. Embedded Language Formatting：嵌入的代码如何格式化
