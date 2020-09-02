# vue-study 03
Vuex 数据管理
- Vuex 是一个专为 Vue.js 应用开发的状态管理模式，集中式存储管理应用所有组件的状态
- Vue 遵循单向数据流理念，易于问题追踪以及提高代码可维护性
- Vue 多个视图依赖同一状态时，视图间传参和转态同步比较困难，Vuex能够很好解决该问题

## 1 mutation action
1. 能够改变 data 值的只有 mutation，这是状态中最原子的操作
2. 某个事件需要得到某个应答才能做出决定，比如异步就是 action，比如复杂的逻辑， 书写复杂的业务逻辑
就好像是 mvc action 更多像是 c 层
**mutation就是用来修改状态的，简单的就直接用commit**
**action就是在修改状态前的复杂逻辑,复杂的就用action**

## 2 模块化

## 2 vuex的源码
1. 维护状态 state
2. 修改状态 commit
3. 业务逻辑控制 dispatch
4. 状态派发 getter
5. 实现state响应式
6. 实现插件
7. 实现混入
