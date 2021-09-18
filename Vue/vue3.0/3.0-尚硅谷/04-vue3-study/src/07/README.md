# 计算属性 和 监视

# computed
计算属性的函数
- 如果只传入一个回调函数，表示的是 get
- 如果需要传入 get 和 set 需要, 传一个 对象
  ```
  {
    get(){},
    set(){},
  }
  ```

# watch
watch
- 设置： immediate: true， 这样初始时才会执行一次
- deep: true, 深度监视
  ```js
  const userName3 = ref('');
  watch(user, ({ firstName, lastName }) => {
    userName3.value = firstName + '-' + lastName;
  }, { immediate: true, deep: true });
  watch(userName3, val => {
    const [first, last] = val.split('-');
    user.firstName = first;
    user.lastName = last;
  });
  ```
- watch 可以监视多个值
  ```
  watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) => {
    /* ... */
  })
  ```
- watch 不能监视非响应式数据
  ```
  setInterval(() => {
    user.firstName = Date.now();
  }, 1000);

  watch(user.firstName, () => {
    console.log('1111');
  });
  ```
  会直接警告，并且 watch 没效果， 
  ```
  Invalid watch source:  ardor A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types. 
  at <App>
  ```
  可更改为监视一个 function 即可生效
  ```
  setInterval(() => {
      user.firstName = Date.now();
    }, 1000);

    watch(() => user.firstName, () => {
      console.log('1111111');
    });
  ```
# watchEffect
根据响应式状态自动应用和重新应用副作用，使用 watchEffect 方法。立即执行传入 的一个函数， 同时响应式追踪其依赖，并在其依赖变更时重新运行该函数

与 watch 比较
watch 允许我们
- 懒执行副作用（也就是第一次不执行）
- 更具体地说明什么状态应该触发侦听器重新运行，因为watch明确指定某个值变化时才执行
- 访问侦听状态变化前后的值

