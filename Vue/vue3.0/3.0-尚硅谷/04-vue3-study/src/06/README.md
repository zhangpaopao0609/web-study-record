# ref 和 reactive
- vue3 的 composition API 中 2 个最重要的响应式 API
- ref 一般用于处理基本类型数据， reactive 一般用来处理对象(会自动的递归响应式,需要确认的是这是 vue3 做的， 还是 proxy 内部机制)
- 如果 ref 用来处理对象 / 数组， 内部会自动将对象 / 数组 转换为 reactive 的代理对象
- ref 内部： 通过给 value 属性添加 getter / setter 来实现对数据的劫持
- reactive 内部：通过使用 Proxy 来实现对对象内部所有数据的劫持，并通过 Reflect 操作对象内部数据
- ref 的数据操作：在 js 中要 .value， 在模板中不需要（内部解析模板时会自动添加 .value）
- 注意
  - 一般用 ref 来处理基本类型，但是也可以处理对象
    ```
    const c = ref({
      info: 'c-info',
    });
    ```
    c 的输出结果, 可以看到 ref 用 getter / setter 来拦截内部对象，内部对象仍然会使用 Proxy 来劫持的
    ```
    __v_isRef: true
    _rawValue: {info: "c-info"}
    _shallow: false
    _value: Proxy {info: "c-info"}
    value: Proxy
    [[Handler]]: Object
    [[Target]]: Object
    info: "c-info"
    __proto__: Object
    [[IsRevoked]]: false
    __proto__: Object
    ```
  - reactive 不能用于基本数据类型
    ```
    const d = reactive(1);
    ```
    警告, 因为 reactive 是用 Proxy 对对象进行劫持的，这就基本语法错误了
    ```
    value cannot be made reactive: 1
    ```
    如下 Proxy
    ```js
    const p = new Proxy(1, {});
    console.log(p);
    ```
    ```
    const p = new Proxy(1, {});
          ^
    TypeError: Cannot create proxy with a non-object as target or handler
    ```
    直接就出错了