# 性能优化

## 1. 懒加载的概念

懒加载也叫做延迟加载、按需加载，指的是在长网页中延迟加载图片 数据，是一种较好的网页性能优化的方式。在比较长的网页或应用中， 如果图片很多，所有的图片都被加载出来，而用户只能看到可视窗口 的那一部分图片数据，这样就浪费了性能。 如果使用图片的懒加载就可以解决以上问题。在滚动屏幕之前，可视 化区域之外的图片不会进行加载，在滚动屏幕时才加载。这样使得网页的加载速度更快，减少了服务器的负载。懒加载适用于图片较多， 页面列表较长（长列表）的场景中。

## 2. 懒加载的特点

减少无用资源的加载：使用懒加载明显减少了服务器的压力和流量， 同时也减小了浏览器的负担。

提升用户体验: 如果同时加载较多图片，可能需要等待的时间较长， 这样影响了用户体验，而使用懒加载就能大大的提高用户体验。 防止加载过多图片而影响其他资源文件的加载 ：会影响网站应用的 正常使用。

防止加载过多图片而影响其他资源文件的加载 ：会影响网站应用的 正常使用

## 3. 懒加载的实现原理

图片的加载是由 src 引起的，当对 src 赋值时，浏览器就会请求图片资源。

根据这个原理，我们使用 HTML5 的 data-xxx 属性来储存图片 的路径，在需要加载图片的时候，将 data-xxx 中图片的路径赋值给 src，这样就实现了图片的按需加载，即懒加载。

注意：`data-xxx` 中的 xxx 可以自定义，这里我们使用 `data-src` 来定 义。懒加载的实现重点在于确定用户需要加载哪张图片，在浏览器中，可 视区域内的资源就是用户需要的资源。所以当图片出现在可视区域时， 获取图片的真实地址并赋值给图片即可。

使用原生 JavaScript 实现懒加载：

知识点:

- window.innerHeight 是浏览器可视区的高度
- `document.body.scrollTop || document.documentElement.scrollTop` 是浏览器滚动的过的距离
- `img.offsetTop` 是元素顶部距离文档顶部的高度（包括滚动条的距 离）
- 图片加载条件 ： `img.offsetTop < window.innerHeight + scrollTop;

图示：

<PaoImages
  src="./images/offsetTop<window.innerHeight+scrollTop.png"
  width="60%"
  title="offsetTop"
/>

示例：

```html
<body>
  <img src="https://i.gifer.com/ZKZg.gif" data-src="https://cdn.pixabay.com/photo/2023/11/23/20/40/ocean-8408693_1280.jpg">
  <img src="https://i.gifer.com/ZKZg.gif" data-src="https://cdn.pixabay.com/photo/2014/11/03/11/06/hippo-515027_1280.jpg">
  <img src="https://i.gifer.com/ZKZg.gif" data-src="https://cdn.pixabay.com/photo/2023/12/17/20/31/car-8454879_1280.jpg">
  <img src="https://i.gifer.com/ZKZg.gif" data-src="https://cdn.pixabay.com/photo/2023/06/05/17/19/shopping-8042865_1280.png">
  <img src="https://i.gifer.com/ZKZg.gif" data-src="https://cdn.pixabay.com/photo/2024/02/22/15/18/clouds-8590310_1280.jpg">

  <script>
    function lazyLoad() {
      const imgs = document.getElementsByTagName('img');

      const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      const innerHeight = window.innerHeight;

      for (const img of imgs) {
        const offsetTop = img.offsetTop;
        if(offsetTop <= scrollTop + innerHeight) {
          const src = img.getAttribute('data-src');
          img.setAttribute('src', src);
        }
      }
    }
    lazyLoad()

    window.onscroll = lazyLoad
  </script>
</body>
```

## 4. 回流与重绘的概念及触发条件

1. 回流（重排）

当渲染树中部分或者全部元素的尺寸、结构或者属性发生变化时，浏 览器会重新渲染部分或者全部文档的过程就称为回流。

下面这些操作会导致回流：

- 页面的首次渲染
- 浏览器的窗口大小发生变化
- 元素的内容发生变化
- 元素的尺寸或者位置发生变化
- 元素的字体大小发生变化
- 激活 CSS 伪类
- 查询某些属性或者调用某些方法
- 添加或者删除可见的 DOM 元素

在触发回流（重排）的时候，由于浏览器渲染页面是基于流式布局的， 所以当触发回流时，会导致周围的 DOM 元素重新排列，它的影响范围有两种：

- 全局范围：从根节点开始，对整个渲染树进行重新布局
- 局部范围：对渲染树的某部分或者一个渲染对象进行重新布局

2. 重绘
   当页面中某些元素的样式发生变化，但是不会影响其在文档流中的位 置时，浏览器就会对元素进行重新绘制，这个过程就是重绘。

下面这些操作会导致重绘：

- color、background 相关属性：background-color、background-image 等
- outline 相 关 属 性 ： outline-color 、 outline-width 、 text-decoration border-radius、visibility、box-shadow

注意： 当触发回流（重排）时，一定会触发重绘，但是重绘不一定会引发回 流。

## 5. 如何避免回流与重绘？

减少回流与重绘的措施：

- 操作 DOM 时，尽量在低层级的 DOM 节点进行操作

- 不要使用 table 布局， 一个小的改动可能会使整个 table 进行重新
- 布局使用 CSS 的表达式
- 不要频繁操作元素的样式，对于静态页面，可以修改类名，而不是样式
- 使用 absolute 或者 fixed，使元素脱离文档流，这样他们发生变化 就不会影响其他元素
- 避免频繁操作 DOM，可以创建一个文档片段 documentFragment，在它 上面应用所有 DOM 操作，最后再把它添加到文档中
- 将元素先设置 display: none，操作结束后再把它显示出来。因为在 display 属性为 none 的元素上进行的 DOM 操作不会引发回流和重绘。
- 将 DOM 的多个读操作（或者写操作）放在一起，而不是读写操作穿插 着写。这得益于浏览器的渲染队列机制

浏览器针对页面的回流与重绘，进行了自身的优化——渲染队列 浏览器会将所有的回流、重绘的操作放在一个队列中，当队列中的操 作到了一定的数量或者到了一定的时间间隔，浏览器就会对队列进行 批处理。这样就会让多次的回流、重绘变成一次回流重绘。 上面，将多个读操作（或者写操作）放在一起，就会等所有的读操作 进入队列之后执行，这样，原本应该是触发多次回流，变成了只触发 一次回流

## 6. 如何优化动画？

对于如何优化动画，我们知道，一般情况下，动画需要频繁的操作 DOM，就会导致页面的性能问题，我们可以将动画的 position 属性 设置为 absolute 或者 fixed，将动画脱离文档流，这样他的回流就 不会影响到页面了。

## 7. documentFragment 是什么？用它跟直接操作 DOM 的区别是 什么？

MDN 中对 documentFragment 的解释： DocumentFragment，文档片段接口，一个没有父对象的最小文档对象。 它被作为一个轻量版的 Document 使用，就像标准的 document 一样， 存储由节点（nodes）组成的文档结构。与 document 相比，最大的区 别是 DocumentFragment 不是真实 DOM 树的一部分，它的变化不会触 发 DOM 树的重新渲染，且不会导致性能等问题。

当我们把一个 DocumentFragment 节点插入文档树时，插入的不是 DocumentFragment 自身，而是它的所有子孙节点。在频繁的 DOM 操 作时，我们就可以将 DOM 元素插入 DocumentFragment，之后一次性 的将所有的子孙节点插入文档中。和直接操作 DOM 相比，将 DocumentFragment 节点插入 DOM 树时，不会触发页面的重绘，这样 就大大提高了页面的性能

## 8. 对节流与防抖的理解

函数防抖是指在事件被触发 n 秒后再执行回调，如果在这 n 秒内事 件又被触发，则重新计时。这可以使用在一些点击请求的事件上，避 免因为用户的多次点击向后端发送多次请求。 函数节流是指规定一个单位时间，在这个单位时间内，只能有一次触 发事件的回调函数执行，如果在同一个单位时间内某事件被触发多次， 只有一次能生效。

节流可以使用在 scroll 函数的事件监听上，通过 事件节流来降低事件调用的频率。

- 防抖函数的应用场景：
  - input 框触发自动请求
  - 按钮提交场景：防⽌多次提交按钮，只执⾏最后提交的⼀次 （但一般更多用 loading）
  - 服务端验证场景：表单验证需要服务端配合，只执⾏⼀段连续的输⼊ 事 件 的 最 后 ⼀ 次 ， 还 有 搜 索 联 想 词 功 能 类 似
- 节流函数的适⽤场景：
  - 拖拽场景：固定时间内只执⾏⼀次，防⽌超⾼频次触发位置变动
  - 缩放场景：监控浏览器 resize 动画场景：避免短时间内多次触发动画引起性能问题

## 9. 实现节流函数和防抖函数

```js
/**
 * 事件触发 delay 后再执行，如果又重新出发，那么重新计时
 * @param {*} fn
 * @param {*} delay
 */
function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(fn.bind(this, ...args), delay);
  };
}

/**
 * 事件连续触发时，每隔 interval 去执行一次，然后再触发时再重新及时
 * @param {*} fn
 * @param {*} interval
 */
function throttle(fn, interval) {
  let timer = null;
  return function (...args) {
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, interval);
  };
}
```

## 10. 如何对项目中的图片进行优化？

好吧，看我自己的文章

## 11. 常见的图片格式及使用场景

- BMP，是无损的、既支持索引色也支持直接色的点阵图。这种图 片格式几乎没有对数据进行压缩，所以 BMP 格式的图片通常是较大的 文件。
- GIF 是无损的、采用索引色的点阵图。采用 LZW 压缩算法进行 编码。文件小，是 GIF 格式的优点，同时，GIF 格式还具有支持动画 以及透明的优点。但是 GIF 格式仅支持 8bit 的索引色，所以 GIF 格 式适用于对色彩要求不高同时需要文件体积较小的场景。
- JPEG 是有损的、采用直接色的点阵图。JPEG 的图片的优点是采 用了直接色，得益于更丰富的色彩，JPEG 非常适合用来存储照片， 与 GIF 相比，JPEG 不适合用来存储企业 Logo、线框类的图。因为有 损压缩会导致图片模糊，而直接色的选用，又会导致图片文件较 GIF 更大。
- PNG-8 是无损的、使用索引色的点阵图。PNG 是一种比较新的图片格式，PNG-8 是非常好的 GIF 格式替代者，在可能的情况下，应该 尽可能的使用 PNG-8 而不是 GIF，因为在相同的图片效果下，PNG-8 具有更小的文件体积。除此之外，PNG-8 还支持透明度的调节，而 GIF 并不支持。除非需要动画的支持，否则没有理由使用 GIF 而不是 PNG-8。
- PNG-24 是无损的、使用直接色的点阵图。PNG-24 的优点在于它压缩了图片的数据，使得同样效果的图片，PNG-24 格式的文件大小 要比 BMP 小得多。当然，PNG24 的图片还是要比 JPEG、GIF、PNG-8 大得多
- SVG 是无损的矢量图。SVG 是矢量图意味着 SVG 图片由直线和曲 线以及绘制它们的方法组成。当放大 SVG 图片时，看到的还是线和曲 线，而不会出现像素点。这意味着 SVG 图片在放大时，不会失真，所 以它非常适合用来绘制 Logo、Icon 等
- WebP 是谷歌开发的一种新图片格式，WebP 是同时支持有损和无 损压缩的、使用直接色的点阵图。从名字就可以看出来它是为 Web 而 生的，什么叫为 Web 而生呢？就是说相同质量的图片，WebP 具有更 小的文件体积。现在网站上充满了大量的图片，如果能够降低每一个 图片的文件大小，那么将大大减少浏览器和服务器之间的数据传输量， 进而降低访问延迟，提升访问体验。目前只有 Chrome 浏览器和 Opera 浏览器支持 WebP 格式，兼容性不太好。 在无损压缩的情况下，相同质量的 WebP 图片，文件大小要比 PNG 小 26%； 在有损压缩的情况下，具有相同图片精度的 WebP 图片，文件大小要 比 JPEG 小 25%~34%； WebP 图片格式支持图片透明度，一个无损压缩的 WebP 图片，如果要 支持透明度只需要 22%的格外文件大小

## 12. 如何⽤webpack 来优化前端性能？

⽤webpack 优化前端性能是指优化 webpack 的输出结果，让打包的最 终结果在浏览器运⾏快速⾼效。

- 压缩代码：删除多余的代码、注释、简化代码的写法等等⽅式。可以 利⽤webpack的 UglifyJsPlugin 和 ParallelUglifyPlugin 来压缩 JS⽂件， 利⽤ cssnano （css-loader?minimize）来压缩 css
- 利⽤CDN 加速: 在构建过程中，将引⽤的静态资源路径修改为 CDN 上对应的路径。可以利⽤ webpack 对于 output 参数和各 loader 的 publicPath 参数来修改资源路径
- Tree Shaking: 将代码中永远不会⾛到的⽚段删除掉。可以通过在启 动 webpack 时追加参数 --optimize-minimize 来实现
- Code Splitting: 将代码按路由维度或者组件分块(chunk),这样做 到按需加载,同时可以充分利⽤浏览器缓存
- 提取公共第三⽅库: SplitChunksPlugin 插件来进⾏公共模块抽取, 利⽤浏览器缓存可以⻓期缓存这些⽆需频繁变动的公共代码

## 13. 如何提⾼webpack 的构建速度？

- 多⼊⼝情况下，使⽤ CommonsChunkPlugin 来提取公共代码
- 通过 externals 配置来提取常⽤库
- 利⽤ DllPlugin 和 DllReferencePlugin 预编译资源模块 通过 DllPlugin 来对那些我们引⽤但是绝对不会修改的 npm 包来进⾏预 编译，再通过 DllReferencePlugin 将预编译的模块加载进来
- 使⽤ Happypack 实现多线程加速编译
- 使⽤ webpack-uglify-parallel 来提升 uglifyPlugin 的压缩速 度。原理上 webpack-uglify-parallel 采⽤了多核并⾏压缩来提升 压缩速度
- 使⽤ Tree-shaking 和 Scope Hoisting 来剔除多余代码
