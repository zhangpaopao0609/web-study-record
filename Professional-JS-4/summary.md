# JavaScript高级程序设计（第4版）
红宝书的内容十分的丰富，涵盖js基础、语法、变量、基本引用类型、集合引用类型，同时引入了新的ES6的语法，如迭代器和生成器、类、promise、proxy及reflect，还介绍了DOM、BOM、事件处理，HTML5，以及介绍了网络请求，模块，线程等。
# 目录
1. 什么是JavaScript
2. HTML中的JavaScript
3. 语言基础
4. 变量、作用域与内存
5. 基本引用类型
6. 集合引用类型
7. 迭代器与生成器
8. 对象、类与面向对象编程
9. 代理和反射
10. 函数
11. Promise和异步函数
12. BOM
13. 客户端检测
14. DOM
15. DOM扩展
16. DMO2和DOM3
17. 事件
18. 动画与Canva图形
19. 表单脚本
20. JavaScript API
21. 错误处理与调试
22. 处理XML
23. JSON
24. 网络请求与远程资源
25. 客户端存储
26. 模块
27. 工作者线程
28. 最佳实践

# 2020.11.12 - 第一遍结束

记得不错的话，应该是在2020.9.18或19日在网上购买的，距今大约两个月，因为上班的关系，所以时间并不是特别的多，加上我还在同时看《算法4》，所以花了两个月时间看完，也记录了一些自己觉得有必要的东西，一个厚厚400页的笔记本，粗略一看，应该是有写200页吧，一开始的进度没有这么快，基本上就是早上来看《算法4》，中午和晚上的时间来看《JS4》，后来我发现了书中的几处错误，所以我就有了一个打算，抓紧时间看完，同时记录遇到的错误和建议修改处，然后想给译者发一封邮件，提出自己的意见，所以大概就在10月底左右，我就暂时没有看《算法4》了，几乎早上中午晚上都看《JS4》，前后两个月，几乎是每一页每一页的阅读，也发现了10处有余的错误。

 看完第一遍后，感想是，原来这么多内容，而且好多东西感觉从来没用过，还有很多基础的东西看得明白，但要让我回忆或者让我写或讲，我是不敢说自己能道清楚的，比如集合类型、引用类型、比如迭代器生成器、比如proxy和reflect等等，这些基础的东西，需要反复的琢磨。

因此，接下来的时间来，我还会抽时间来看第二遍，但是接下来我不会像第一遍这样一点一点的看了，有目标性的，针对性的看，首先，书中内容太多，需要一点一点深挖来；其次，毕竟是一本基础书，里面很多东西都是提到或是给出简单的示例，并不能深入的理解。因此，深挖、实践是接下来的目标

## 记录错误

1. 451页：15.3.4字符集属性，首段中 "这个属性的默认值是...以及新增的characterSeet属性来修改"， 这里 characterSeet 拼写错误，应为 characterSet

2. 440页:

   ```html
   <html>
     <head>
     </head>
   
     <body>
       <script>
         // 清空主体
         document.body.innerHTML = '';
         let observer = new MutationObserver(
           (mutationRecords) => console.log(mutationRecords)
         );
   
         observer.observe(document.body, { childList: true });
   
         document.body.appendChild(document.createElement('div'));
       </script>
     </body>
   </html>
   ```

   ```js
   //[
   //   {
   //     addedNodes: NodeList [div],
   //     attributeName: null,
   //     attributeNamespace: null,
   //     nextSibling: null,
   //     oldValue: null,
   //     previousSibling: null,
   //     removedNodes: NodeList [],
   //     target: body,
   //     type: "childList"
   //   }
   // ]
   ```

   

   ```html
   <html>
     <head>
     </head>
   
     <body>
       <div></div>
       <script>
         // 清空主体
         // document.body.innerHTML = '';
         const d = document.getElementsByTagName('div')[0]
         let observer = new MutationObserver(
           (mutationRecords) => console.log(mutationRecords)
         );
   
         observer.observe(document.body, { childList: true });
   
         // document.body.appendChild(document.createElement('div'));
         document.body.removeChild(d)
       </script>
     </body>
   </html>
   ```

   ```js
   // [
   //   {
   //     addedNodes: NodeList [],
   //     attributeName: null,
   //     attributeNamespace: null,
   //     nextSibling: text,
   //     oldValue: null,
   //     previousSibling: text,
   //     removedNodes: NodeList [div],
   //     target: body,
   //     type: "childList"
   //   }
   // ]
   ```

3. 428页：14.2.2 动态样式 "另一种定义样式的方式是使用\<script\>元素包含嵌入的css规则"，应该为\<style\>元素

4. 591页：19.2.2 输入过滤中2.处理剪贴板，"IE的实现成为了事实标准"，是否修改为事件标准更为妥当

5. 612页：20.1.2 原子操作基础，"// 对索引0处的值执行原子与0b1111", 应该为 0b1100

6. 618页：20.3.1 文本编码， "// o 的 UTF-8编码是 0x6F（即二进制111）", 应该为 十进制 111

7. 619页， 620页：20.3.2 文本解码，"// o 的 UTF-8编码是 0x6F（即二进制111）", 应该为 十进制 111

8. 建议：625页： 20.4.4 Blob与部分读取，"blob=blobSlice(files[0], 0, 32)"，这里给出 blobSlice  函数是否更易理解

9. 630页：20.5.3 自定义媒体播放器 "duiration.innerHTML = player.duration", 这里直接是获取不到player.duration的，建议修改为

   ```js
   player.addEventListen('loadedmetadata', () => {
     duiration.innerHTML = player.duration
   })
   ```

10. 720页："如果没有这个头部，或者有但源不匹配，则表明不会响应浏览器请求"， 这里的"有但源"是指？

11. 744页："另外，read()方法也可以真接封装到Iterable接口中"，应该为 直接

12. 782页：26.3.3 通用模块定义， "开发者只需专注于模块的内由容"，应该为 "内容"

13. 775页，26.1.8 循环依赖， 建议修改排版

    ```js
    require('./moduleD');
    require('./moduleB');
    console.log('moduleA');
    
    require('./moduleA');
    require('./moduleC');
    console.log('moduleB');
    
    require('./moduleB');
    require('./moduleD');
    console.log('moduleC');
    
    require('./moduleA');
    require('./moduleC');
    console.log('moduleD');
    ```

    