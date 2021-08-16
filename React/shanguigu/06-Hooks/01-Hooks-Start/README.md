# useState
# useEffect
1. Effect Hook 可以让你在函数组件中执行副作用操作(用于模拟类组件中的生命周期钩子）
2. React 中的副作用操作
- 发 ajax 请求数据获取
- 设置订阅 / 启动定时器
3. 语法和说明
  ```js
  useEffect(() => {
    // 在此可以执行任何带副作用操作 功能1
    return () => {  // 在组件卸载前执行
      // 在此做一些收尾工作，比如清楚定时器 / 取消订阅等 功能2
    }
  }, [stateValue]) // 如果指定的是 [], 回调函数只会在第一次渲染后执行
  ```

**[] 这个数组也叫做监听数组**
- 如果不传这个数组，那么功能1 会在 componentDidMount 和 componentDidUpdate 均执行
- 如果传一个空数组，那么功能1 仅会在 componentDidMount 执行
- 如果传的数组中包含了某个值 state (这个值是由 useState 来的)，那么首先 功能1 会在 componentDidMount 执行，同时当 state 变化时，也会执行 功能1， 但是其它的值变化时，功能1 不会执行，所以叫做监听数组

4. 可以把 useEffect Hook 看做如下三个函数的组合
- componentDidMount()
- componentDidUpdate()
- componnentWillUnmount()

# useRef

# Fragment
```jsx
<Fragment>
</Fragment>

<></>
```