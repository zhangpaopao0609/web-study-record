# shallowReactive 和 shallowRef
- shallowReactive： 只处理了对象内最外层属性的响应式（也就是浅响应式）
- shallowRef： 只处理了value的响应式，不对对象的 reactive 处理
  ```
  const cityShallow = shallowRef(['s', 'c']);
  console.log(cityShallow);
  ```
  这里的 array 就不再是响应式的了
  ```
  RefImpl {_rawValue: Array(2), _shallow: true, __v_isRef: true, _value: Array(2)}
  __v_isRef: true
  _rawValue: (2) ["s", "c"]
  _shallow: true
  _value: Array(2)
  0: "s"
  1: "c"
  length: 2
  __proto__: Array(0)
  value: (...)
  __proto__: Object
  ```

相比较的就是 reactive  ref
- reactive: 将对象变成一个响应式对象，而且是深度的(基于 Proxy 进行数据劫持实现)，也就是说内部的任何一个值（不论这个值深度如何）改变，都是会引起 UI 变化的
- ref: 将一个值变成 ref 对象，当这个值是一个对象时，首先会把它变成一个 ref 对象（基于 getter/setter 进行数据拦截），同时还会在内部把这个值用 reactive 进行处理
  ```
  const city = ref(['s', 'c']);
  console.log(city);
  ```
  这里的 array 就是一个用 Proxy 劫持过的响应式的数据
  ```
  RefImpl {_rawValue: Array(2), _shallow: false, __v_isRef: true, _value: Proxy}
  __v_isRef: true
  _rawValue: (2) ["s", "c"]
  _shallow: false
  _value: Proxy
  [[Handler]]: Object
  [[Target]]: Array(2)
  [[IsRevoked]]: false
  value: (...)
  __proto__: Object
  ```

# readonly

# shallowReadonly