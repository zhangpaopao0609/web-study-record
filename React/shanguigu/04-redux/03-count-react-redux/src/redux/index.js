// 该文件是整个 redux 中最为核心的 store 对象
import { createStore, applyMiddleware } from "redux";
// 引入支持异步 action 的中间件
import reduxThunk from "redux-thunk";
import countReducer from "./count/reducers";

const store = createStore(countReducer, applyMiddleware(reduxThunk))  ;

export default store;
