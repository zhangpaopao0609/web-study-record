# vue-study-04
目标：
1. 深入理解 VUE 底层原理
2. 手写 VUE 核心部分实现
知识要点
1. vue工作机制
2. vue响应式的原理
3. 依赖收集与追踪
4. 编译compile

## 为什么要懂原理
编程世界和武侠世界是比较像的，每一个入门的程序员，都幻想自己有朝一日，神功大成，青衣长剑，救民于水火，但其实大部分人一开始的学习方式就错了，导致一直无法进入到高手的行列，究其原因，就是过于看中招式，武器从而忽略了内功的修炼，所以任你慕容复有琅环玉洞的百家武学，还是被我乔峰一招制敌，这就是内功差距

武学之道，切勿贪多嚼不烂，博而不精不如一招鲜吃遍天 编程亦是如此，源码，就是内力修炼的捷径

## Vue 工作机制

### 编译
编译模块分为三个阶段
1. parse： 解析： 使用正则解析 template 中的 vue 的指令（v-xxx) 变量等等，形成抽象语法书 AST
2. optimize: 优化： 标记一些静态节点，用作后面的性能优化，在diff的时候直接略过
3. generate：生成： 把第一部分生成的 AST 转化为渲染函数 render function

### 响应式
这一块是 vue 最核心的内容，初始化的时候通过 defineProperty 定义对象 getter、setter，设置通知机制
当编译生成的渲染函数被实际渲染的时候，会触发 getter 进行依赖收集，在数据变化的时候，触发 setter 进行更新

### 虚拟 dom
Virtual DOM 是 react 首创， Vue2开始支持，就是用 javaScript 对象来描述 dom 结构，数据修改的时候，我们先修改虚拟 dom 中的数据，然后数据做 diff， 最后再汇总所有的 diff， 力求做最少的 dom 操作，毕竟 js 里对比很快，而真实 dom 操作太慢
```js
// vdom
{
  tag: 'div',
  props: {
    name: '跑跑'，
    style: {color: red},
    onClick: xxx
  },
  children: [
    {
      tag: 'a',
      text: 'arrow'
    }
  ]
}
```
```html
// 真实 dom
<div name="跑跑" style="color: red" @click="xxx">
  <a>arrow</a>
</div>
```
### 更新视图
数据修改触发 setter，然后监听器会通知进行修改，通过对比新旧 vdom 树，得到最小修改，就是patch，然后只需要把这些差异修改即可

小小实战一波
Vue 响应式的原理： defineProperty
```html
<body>
  <div class="app" onclick="change()">
    <p>你好<span id='name'></span></p>
  </div>
  <script>
    let obj = {};
    
    // 数据拦截
    Object.defineProperty(obj, 'name', {
      get: () => {
        console.log('有人想要获取 name 属性！');
        return document.getElementById('name').innerHTML;
      },
      set: (nick) => {
        console.log('有人想要修改 name 属性！');
        document.getElementById('name').innerHTML = nick;
      }
    })
    
    obj.name = 'arrow';
    const change = () => {
      obj.name = obj.name + '2';
      console.log(obj.name);
    }
     
  </script>
</body>
```

数据拦截 --> 依赖收集与追踪

### 编译Compile
核心任务
1. 获取并遍历DOM树
2. 文本节点：获取 {{  }} 格式的内容并解析
3. 元素节点：访问节点特性，截获 a- 和 @ 开头内容并解析 


