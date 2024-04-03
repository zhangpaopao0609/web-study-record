[toc]

# 详解 script 标签中 defer 和 async 

### 1. defer 和 async

HTML 网页中，浏览器通过`<script>` 标签加载 JS  脚本。

```html
<!-- 页面内嵌的脚本 -->
<script type="application/javascript">
	// module code
</script>

<!-- 外部脚本 -->
<script type='application/javascript' scr="path/to/myModule.js"></script>
```

默认情况下，浏览器是同步加载 JS 脚本，即渲染引擎遇到 `<script>`标签就会停下来，等到执行完脚本，再继续往下渲染。如果是外部脚本，还必须加入脚本下载的时间。

如果脚本体积很大，下载和执行的时间就会很长，因此造成浏览器堵塞，用户会感觉到浏览器"卡死"了，没有任何响应。这显然是很不好的体验，所以浏览器允许脚本异步加载，下面就是两种异步加载的语法。

```html
<script src="path/to/myModule.js" defer></script>
<script src="path/to/myModule.js" async></script>
```

上面代码中，`script` 标签打开 `defer`或`async`属性，脚本就会异步加载。渲染引擎遇到这一行命令，就会开始下载外部脚本，但不会等它下载和执行，而是直接执行后面的命令。

`defer`和`async`的区别是：

- `defer`要等到整个页面在内存中正常渲染结束（DOM结构完全生成，以及其他脚本执行完成），才会执行；
- `async` 一旦下载完成，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染。

一句话，`defer`是渲染完再执行，`async`是下载完就执行。

另外，如果有多个defer脚本，会按照它们在页面出现的顺序加载，而多个 `async`脚本是不能保证加载顺序的。



### 2. script 中 type=module

对于`script`中带有 `type=module` 的 `script`，都是异步加载，不会造成堵塞浏览器，即等到整个页面渲染完，再执行模块脚本，等同于打开了`<script>` 标签的 `defer`属性。

如果网页中有多个 `<script type="module">`，它们会按照在页面出现的顺序依次执行。跟 `defer`表现形式是一样的。

`script` 中 `type=module`标签的 `async`属性也可以打开，这时候只要加载完成，渲染引擎就会中断渲染立即执行。执行完成后，再恢复渲染。

一旦使用 `async`属性，`<script type="module">`就不会按照在页面中出现的顺序执行，而是只要该模块加载完成，就执行该模块。