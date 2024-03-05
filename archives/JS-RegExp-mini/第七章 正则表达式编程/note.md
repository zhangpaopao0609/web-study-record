用于正则操作的相关API，共6个，字符串实例4个，正则实例2个
- RegExp#test
- RegExp#exec
- String#match
- String#search
- String#split
- String#replace

## 相关 API 注意要点

### 1. search 和 match 参数问题
字符串实例的那4个方法参数都支持正则和字符串
但search 和 match 会把字符串转换为正则的

### 2. match 返回结构的格式问题
match 返回结果的格式，与正则对象是否有修饰符 g 有关
没有 g ，返回的结果是标准匹配格式
```js
[ '.', index: 4, input: '2020.06.09', groups: undefined ]
```
有g，返回的是所有匹配的内容
```js
[ '.', '.' ]
```

### 3. exec 比 match 更加强大
当正则没有 g 时，使用 match 返回的信息较多，但是有 g 后，就没有关键的信息 index 了。
而 exec 方法就能解决这个问题，它能接着上一次匹配后继续匹配
