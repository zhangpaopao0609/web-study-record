# Sass 还可以这么玩 —— Sass 批量生成 `padding` 和 `margin`

有时候，我们需要为上下左右批量添加不同尺寸的 padding 和 margin，比如 `.m-0, m-1, m-2, ..., .mt-0, .mt-1,...`，我们可以自己写这些类，但这会很繁琐且易出错。

幸运的是，我们可以使用 Sass 快速生成。

>  Sass 是一个 css 预处理器。

让我们看一个简单的例子，在 `0em` 到 `7em` 的所有方向上创建 `padding` 和 `margin`。

1. 定义列表

   首先定义两个列表，一个包含 em 范围，另一个包含方向字符串。

   ```scss
   $ems: 0, 1, 2, 3, 4;
   $directions: "", "-bottom", "-top", "-left", "-right";
   ```

   在 Sass 中，列表变量定义方式为： `$variableName: itemOne，itemTwo;`

   接下来，嵌套循环两个列表。这样，内层循环就可以获取到 `$em 和 $dir`

   ```scss
   @each $em in $ems{
     @each $dir in $directions {
     }
   }
   ```

2. 生成结果

   - 利用 `str-slice` 函数获取类名方向

     > 注意 sass 中列表和字符串的起始位置为 1 而不是大多数语言中的 0

     ```scss
     $dir-alias: str-slice($dir, 2, 2);
     ```

     这样就可以获取到 `b, t, l, r`

   - 变量使用

     ```scss
     .m#{$dir-alias}-#{$em} {
       margin#{$dir}: $em + em;
     }
     .p#{$dir-alias}-#{$em}{
       padding#{$dir}: $em + em;
     }
     ```

     sass 变量在字符串中需要使用 `#{变量}` 才能生效，这样，运行 sass 代码，就可以得到如下结果，不再需要自己手写，真香

     ```scss
     .m-0 {
       margin: 0em;
     }

     .p-0 {
       padding: 0em;
     }

     .mb-0 {
       margin-bottom: 0em;
     }

     .pb-0 {
       padding-bottom: 0em;
     }

     .mt-0 {
       margin-top: 0em;
     }

     .pt-0 {
       padding-top: 0em;
     }

     .ml-0 {
       margin-left: 0em;
     }

     .pl-0 {
       padding-left: 0em;
     }

     .mr-0 {
       margin-right: 0em;
     }

     .pr-0 {
       padding-right: 0em;
     }

     .m-1 {
       margin: 1em;
     }

     .p-1 {
       padding: 1em;
     }

     .mb-1 {
       margin-bottom: 1em;
     }

     .pb-1 {
       padding-bottom: 1em;
     }

     .mt-1 {
       margin-top: 1em;
     }

     .pt-1 {
       padding-top: 1em;
     }

     .ml-1 {
       margin-left: 1em;
     }

     .pl-1 {
       padding-left: 1em;
     }

     .mr-1 {
       margin-right: 1em;
     }

     .pr-1 {
       padding-right: 1em;
     }

     .m-2 {
       margin: 2em;
     }

     .p-2 {
       padding: 2em;
     }

     ... /* There should be 80 Classes like this */
     ```

3. 完整 sass  代码

   ```scss
   $ems: 0, 1, 2, 3, 4;
   $directions: "", "-bottom", "-top", "-left", "-right";

   @each $em in $ems{
     @each $dir in $directions {
       $dir-alias: str-slice($dir, 2, 2);
         .m#{$dir-alias}-#{$em} {
           margin#{$dir}: $em + em;
         }
         .p#{$dir-alias}-#{$em}{
           padding#{$dir}: $em + em;
         }
     }
   }
   ```
