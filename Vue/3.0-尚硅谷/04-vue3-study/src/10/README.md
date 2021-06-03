# toRefs
把一个响应式对象转换成普通对象，该普通对象的每一个 property 都是一个 ref
应用： 当从合成函数返回响应式对象时， toRefs 非常有用，这样消费组件就可以在不丢失响应式的情况下对放回的对象进行分解使用

存在的问题，也是 toRefs 使用的场景。
- reactive 对象取出的所有属性值（对象除外,obj, arr；所以这里准确来说应该是基本类型数据）都是非响应式的，
所以解决办法就是
- 利用 toRefs 可以将一个响应式 reactive 对象的所有原始属性转换为响应式的 ref 属性
  ```
  age: ObjectRefImpl {_object: Proxy, _key: "age", __v_isRef: true}
  children: ObjectRefImpl {_object: Proxy, _key: "children", __v_isRef: true}
  name: ObjectRefImpl {_object: Proxy, _key: "name", __v_isRef: true}
  wife: ObjectRefImpl {_object: Proxy, _key: "wife", __v_isRef: true}
  ```