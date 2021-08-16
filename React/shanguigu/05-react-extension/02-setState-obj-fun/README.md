# setState-obj-fun
setState 的两种写法
## 对象式
对象式写法：`setState(stateChange, [callback])`
1. stateChange 为状态改变对象(该对象可以提现出状态的更改)
2. callback 是可选的回调函数，它在状态更新完毕、界面也更新后(render 调用后)才被调用

## 函数式
函数式写法： `setState(updater, [callback])`
1. updater 为返回 stateChange 的函数
2. updater 可以选择接收到 state 和 props
3. callback 是可选的回调函数，它在状态更新完毕、界面也更新后(render 调用后)才被调用

## 总结
1. 对象式的 setState 是函数式的 setState 的简写方式(语法糖)
2. 使用原则
 - 如果新状态不依赖于原状态 ===》 使用对象方式
 - 如果新状态依赖于原状态 ===》 使用函数方式
 - 如果需要在 setState() 执行后获取最新的状态数据，要在第二个 callback 函数中读取