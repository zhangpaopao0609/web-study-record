[toc]

# 移动端基础知识详解

## 1. 相关基本概念

### 1.1 屏幕相关

#### 1.1.1 屏幕大小

**指屏幕对角线长度，单位是英寸(inch)**，常见的尺寸有：3.5寸，4.0寸，5.0寸，5.5寸，6.0寸等等。

> 备注：1英寸(inch) = 2.54 厘米

<img src="/Users/ardor/Desktop/MyGitHub/web-study-record/Mobile-Study/shangguigu/img/inch-screen.png" alt="image-20210816201704116" style="zoom:30%;" />

#### 1.1.2 屏幕分辨率

是指屏幕在： 横向、纵向上的**物理像素点**总数(物理像素点，通俗的说就是屏幕上的小灯泡)。一般表示用 n * m 表示
例如：Iphone6 的屏幕分辨率为： 750*1334

- 注意点：
  - 屏幕分辨率是一个固定值,无法修改！！
  - 屏幕分辨率、显示分辨率是两个概念，系统设置中可以修改的是： 显示分辨率
  - 屏幕分辨率 >= 显示分辨率
  
- 常见手机分辨率

  <img src="/Users/ardor/Desktop/MyGitHub/web-study-record/Mobile-Study/shangguigu/img/norma-pixel.png" alt="image-20210828221144990" style="zoom:65%;" />

#### 1.1.3 屏幕密度

指屏幕上每英寸里包含的物理像素点的个数， 单位 ppi (pixels per inch)，其实还有另一个单位，dpi(dots per inch)，两个值的计算方式一样，只是使用场景不同，ppi 主要衡量屏幕，dpi 主要衡量打印机，投影仪等。计算方式如下：
$$
屏幕分辨率 = X * Y
$$

$$
PPI=\frac{\sqrt{X^{2}+Y^{2}}}{屏幕分辨率}
$$

### 1.2 像素相关
#### 1.2.1 物理像素

物理像素又名： 设备像素, 是一个长度单位，单位是 px，1 个物理像素就是屏幕上的一个物理成像点，就是屏幕中一个微小的发光物理元器件（可简单的理解为超级微小的灯泡），是屏幕能显示的最小粒度。屏幕的物理像素点数（分辨率）是手机屏幕的一个重要参数，由屏幕制造商来决定，屏幕生产后无法修改。例如 iPhone6 横向上拥有的物理像素为 750、纵向上拥有的物理像素为 1334，我们也可以用： 750*1334 表示。

物理像素图示：

<img src="/Users/ardor/Desktop/MyGitHub/web-study-record/Mobile-Study/shangguigu/img/ppp.png" alt="image-20210828222749477" style="zoom:50%;" />



#### 1.2.2 CSS 像素

css 像素又名：逻辑像素，css 像素是一个抽象的长度单位，单位也是 px（pixels），它是为 Web 开发者创造的，用来精确的度量 Web 页面上的内容大小。我们在编写 css，js，less 中所使用的都是 css 像素。

> 这里给一个思考： 代码中 4px * 4px 的盒子（css 像素），到了屏幕上到底对应几个物理像素（发光的小灯泡）呢？  要探究这个对应关系，就需要学习接下来的新概念： 设备独立像素

#### 1.2.3 设备独立像素

设备独立像素简称 DIP 或者 DP (device-independent pixel)，又称： 屏幕密度无关像素，设备独立像素的概念仅针对移动端。

> 引言：在没有出现【高清屏】的年代，1 个  css 像素对应 1 个物理像素，但自从【高清屏】问世，二者就不再是 1 对 1 的关系了。苹果公司在 2010 年推出了一种新的显示标准：在屏幕尺寸不变的前提下，把更多的物理像素点压缩至一块屏幕里，这样分辨率就会更高，显示效果就会更加细腻。苹果将这种设备称为：Retina 屏幕（又称为：视网膜屏幕），与此同时推出了配备这种屏幕的划时代数码产品 —— iPhone4.

<img src="/Users/ardor/Desktop/MyGitHub/web-study-record/Mobile-Study/shangguigu/img/dpi-ppi.png" alt="image-20210828223633762" style="zoom:80%;" />

> 来看一个场景，
>
> 程序猿写： width = 2排序， height = 2px 的盒子，若 1 个 css 像素直接对应一个物理像素，由于 iPhone3G/S 与 iPhone4 屏幕尺寸相同，但是 iPhone4 的屏幕能够容纳更多的物理像素点，所以 iPhone4 的物理像素点比  iPhone3G/S 小很多，那么理论上这个盒子在 iPhone4 屏幕上也就会比 iPhone3G/S 屏幕上小很多，而事实是在 iPhone3G/S 与 iPhone4 下这个盒子显示时一样大的！！！只不过在 iPhone4 上更加细腻、清晰。那是如何做到的呢？这就要靠设备独立像素。

<img src="/Users/ardor/Desktop/MyGitHub/web-study-record/Mobile-Study/shangguigu/img/iPhone3-4-c.png" alt="image-20210828224458137" style="zoom:67%;" />

对比： iPhone3G/S 与 iPhone4 的成像效果

<img src="/Users/ardor/Desktop/MyGitHub/web-study-record/Mobile-Study/shangguigu/img/iPhone3-4-c-2.png" alt="image-20210828224557873" style="zoom:70%;" />

**设备独立像素的出现，使得即使在 【高清屏】上元素也可以拥有正常的尺寸，让代码不受到设备的影响，它是设备厂商根据屏幕特性设置的，无法更改**

1. **设备独立像素和 css 像素关系**

- 在标准情况下（无缩放）： 1 css 像素 = 1 设备独立像素

2. **设备独立像素与物理像素关系**

- 普通屏幕下 1 个设备独立像素 对应 1 个 物理像素

- 高清屏下 1 个设备独立像素 对应 N 个物理像素

  > 这个 N 就等于像素比，即 物理像素 / 设备独立像素， 例如 iPhone6 的物理像素为 750，设备独立像素为 375，因此 N = 2。 因为标准情况下 1 css 像素 = 1设备独立像素，也就是说程序猿写的 1px ，手机接收到的像素也是 1px，但是展示在屏幕上的需要乘以这个 N， 所以 iPhone6 上将会展示 2 个物理像素，也就是需要点亮两个灯泡。

#### 1.2.4 像素比

像素比（dpr）: 单一方向上，【物理像素】和【设备独立像素】的比值。即 dpr = 物理像素 / 设备独立像素

使用 js 获取 dpr:  `window.devicePixelRatio`， 当然像素比概念仍仅针对移动端。

几款手机的屏幕像素参数，[点击查看更多](https://uiiiuiii.com/screen)

<img src="/Users/ardor/Desktop/MyGitHub/web-study-record/Mobile-Study/shangguigu/img/dpr-2.png" alt="image-20210828225942870" style="zoom:70%;" />

> 描述一下自己的屏幕
>
> 以 iPhone6 为例，描述一下屏幕（横向上）：
>
> - 物理像素： 750px
> - 设备独立像素： 375px
> - css 像素 375px
> - 像素比（dpr）：2

### 1.3 图片的高清显示

1. 位图像素

   位图和矢量图

   - 位图，又称点阵图像或栅格图像，是由 n 个像素点组成的。放大后会失真。
   - 矢量图，又称面向对象图或回执图像，在数学上定义为一系列曲线连接的点，放大后不会失真，常见 svg

### 1.4 视口相关

#### 1.4.1 pc 端视口

在 pc 端，视口的默认宽度和浏览器窗口的宽度一致。在 css 标准文档中，视口又被称为：初始包含块。它是 所有 css 百分比宽度推算的根源，在 pc 端可通过如下几种方式获取宽度

#### 1.4.2 移动端视口

在移动端，浏览器厂商面临着一个比较大的问题，他们如何将数以万计的 pc 端网页完整的显示在移动端设备上，并且不会出现横向滚动条呢？那就要引出移动端的三个概念：1. 布局视口，2. 视觉视口，3. 理想视口

1. 布局视口

   用于解决早起的页面在手机上显示的问题，早期的时候我们这样做： pc 端网页宽度一般都为： 960px ~ 1024px 这个范围，就算超出了改范围， 960px ~ 1024px 这个区域也依然是版心的位置，浏览器厂商针对移动端设备设计了一个容器，先用这个容器去承接 pc 端网页，这个容器的宽度一般是 980 px，不同的设备可能有所差异，但相差并不大；随后将这个容器等比例的压缩到与手机等宽，这样就可以保证没有横向滚动条且完整呈现页面，但是这样做依然有问题：网页内容被压缩得太小，严重影响用户体验。

   移动端获取布局视口方式：`document.documentElement.clientWidth`

   注意： 布局视口经过压缩后，横向的宽度用 css 像素表达就不再是 375px 了，而是 980px， 因为布局视口是被压缩而不是截图。

   

2. 视觉视口

   视觉视口就是用户可见的区域，它的绝对宽度永远和设备(这里的设备用布局视口来衡量)一样宽，但是这个宽度里所包含的 css 像素值是变化的，例如：一般手机会将 980 个 css 像素放入视觉视口中，而 ipad Pro 会将 1024 个 css 像素放入视觉视口中

   移动端获取视觉视口方式： `window.innerWidth`

3. 理想视口标准
   与屏幕等宽(用设备独立像素来衡量)的布局视口，称之为理想视口。所以也可以说理想视口是一种标准：让布局视口与屏幕等宽（设备独立像素），靠 meta 标签实现
   理想视口的特点：
   - 布局视口和屏幕等宽，以 iphone6 为例，符合理想视口标准之后
      - 设备独立像素： 375px
      - 布局视口宽度： 375px
   - 用户不需要缩放、滚动就能看到网站的全部内容
   - 要为移动端设备单独设计一个移动端网站
   设置理想视口的具体方法
   `<meta name='viewport' content='width=device-width'>`

### 1.5 缩放

### 移动端缩放

放大时
- 布局视口不变
- 视觉视口变小

缩小时
- 布局视口不变
- 视觉视口变大

移动端缩放不会影响页面布局，因为缩放的时候，布局视口大小没有变化

### viewport 
meta-viewport 标签是苹果公司在 2007 年引进的，用于移动端布局视口的控制
使用示例：
`<meta name='viewport' content='width=device-width, initial-scale=1.0'>`

viewport 相关选项
1. width 布局视口的宽度
2. initial-scale 【系统】初始缩放比列
3. maximum-scale 允许 【用户】 缩放的最大比例
4. minimum-scale 允许 【用户】 缩放的最大比例
5. user-scale 是否允许用户缩放
6. viewport-fit 设置为 cover 值可以解决刘海屏的留白问题

#### 1. width
width 值可以使 device-width,也可以是具体值，但是有些安卓手机不支持， ios 全系列都支持
#### 2. initial-scale
- initial-scale 为页面初始化时的显示比例
- initial-scale = 屏幕宽度(设备独立像素) / 布局视口像素
- 只写 initial-scale=1.0 也可以实现完美视口，但为了更好的兼容性，`width=device-width, initial-scale=1.0` 都写上

#### 3. maximum-scale
- 设置允许用户最大缩放比例，苹果浏览器 safari 不认识该属性
- maximum-scale=屏幕宽度（设备独立像素）/ 视觉视口宽度值

#### 4. minimum-scale
- 设置允许用户最小缩放比例，苹果浏览器 safari 不认识该属性
- maximum-scale=屏幕宽度（设备独立像素）/ 视觉视口宽度值 

#### 5. user-scalable
- 是否允许用户通过手指缩放页面。苹果浏览器 safari 不认识该属性

#### 6. vueport-fit
- 解决刘海屏问题
viewport-fit 设置为 cover 值可以解决刘海屏的留白问题


# 适配
## 为什么要做适配？
由于移动端设备的屏幕尺寸大小不一，会出现：同一个元素在两个不同的手机上显示效果不一样（比例不容）。要想让同一个元素在不同设备上显示效果一样，就需要适配，无论采用何种适配方案，中心原则永远是： 等比！
主要的适配方案又是那种
- viewport 适配方案
- rem 适配

### viewport 适配 方案
- 方法： 拿到设计稿之后，设置布局视口宽度为设计稿宽度，然后直接按照设计稿给出宽高进行布局即可
```html
<meta name="viewport" content="width=375">
```
- 优点：不用复杂的计算，直接使用图稿上标注的 px 值
- 缺点：
   - 不能使用完整的 meat 标签，会导致在某些安卓手机上有兼容性问题
   - 不希望适配的东西，例如边框，也强制参与了适配

### rem 适配方案
共有两种方案
1. 
核心过程：
- 根字体 = （设备横向独立像素 / 设计稿宽度）* 100
- 编写样式时：
   - 直接以 rem 为单位
   - 值为：设计值 / 100

2. 
核心过程：
- 根字体 = 设备横向独立像素 / 10
- 编写样式时：
   - 直接以 rem 为单位
   - 值为： 设计值 / (设计稿宽度 / 10)  

### vw 适配方案
vw 和 vh 是两个相对单位
- 1vw = 等于布局视口宽度的 1%
- 1vh = 等于布局视口高度的 1%
不过 vw 和 vh 有一定的兼容性问题[查看](https://www.caniuse.com)

### 1物理像素边框
高清屏幕下 1px 对应更多的物理像素， 所以 1 像素边框看起来比较粗，解决方法两种如下：
1. 媒体查询直接设置大小
```css
@media screen and (-webkit-min-device-pixel-ratio: 2){
   .a {
      margin: 0.5px auto 0;
   }
}

@media screen and (-webkit-min-device-pixel-ratio: 3){
   .a {
      margin: 0.3333px auto 0;
   }
}
```
2. 媒体查询以及伪元素缩放
```css
@media screen and (-webkit-min-device-pixel-ratio: 2){
   .a::after {
      transform: scaleY(0.5)
   }
}

@media screen and (-webkit-min-device-pixel-ratio: 3){
   .a::after {
      transform: scaleY(0.3333)
   }
}
```
但目前很多移动端网站已经不再做边框的，所以这个用处其实不大，因为本身移动端屏幕就小，没必要加边框了

### 移动端点击事件
移动端兼容 pc 端的所以事件，但 pc 端不兼容 移动端事件
移动端事件列表
- touchstart 元素上触摸开始时触发
- touchmove 元素上触摸移动时触发
- touchend 手指从元素上离开时触发
- touchcancel 触摸被打断时触发
这几个事件最早出现在 IOS safari 中，为了想开发人员转达一些特殊的信息

应用场景
- touchstart 事件可以用于元素触摸的交互，比如页面跳转，标签页切换
- touchmove 事件可用于页面的滑动特效，网页游戏，画板
- touchend 事件主要跟 touchmove 事件结合使用
- touchcancel 事件使用率不高

这里有趣的是：
- touchmove 事件触发后，即使手指离开了元素，touchmove 事件也会持续触发
- 触发 touchmove 与 touchend 事件，一定要先触发 touchstart
- 事件的作用在于实现移动端的界面交互


### 点击穿透
touch 事件结束后会默认触发元素的 click 事件，如果没有设置完美视口，则事件触发的时间间隔为 300 ms 左右，如果设置完美视口则时间间隔为 30ms 左右（当然也得看具体的设备的特性）

如果 touch 事件隐藏了元素，则 click 动作将作用到新的元素上，触发新元素的 click 事件或页面调转，此现象称为点击穿透
解决方法共有4种，但是第一种是最简单也是最直接有效的，其它的只是考一些边边角角的知识点。
1. 阻止默认事件
```js
node.addEventListener('touchstart', e => {
   e.preventDefault();
})
```
2. 使背后的元素不具备 click 特性，用 touchXXXX 来代替 click
如将 a 标签改写成 touchend 事件
```js
btn.addEventListener('touchend', () => {
   window.location.href = 'https://www.baidu.co'
});
```
3. 让背后的元素暂时失去 click 事件， 300 毫秒左右在恢复
其实这只是一个非常老的知识点，元素的样式上有一个 ‘pointer-events’属性，设置为 'none' 后将不再响应任何事件
```js
btn.addEventListener('touchend', e => {
   baidu.style.pointerEvents = 'none';
   mask.style.display = 'none';
   setTimeout(() => {
      baidu.style.pointerEvents = 'auto';
   }, 300);
});
```
4. 让隐藏元素延迟 300 毫秒再隐藏
```js
btn.addEventListener('touchend', e => {
   setTimeout(() => {
      mask.style.display = 'none';
   }, 300);
});
```

### 移动端真机调试
1. 内网穿透
- ngrok
- uTools