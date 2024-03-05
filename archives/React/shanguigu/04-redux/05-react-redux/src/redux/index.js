// 该文件是整个 redux 中最为核心的 store 对象
import { createStore, combineReducers, applyMiddleware } from "redux";
// 引入支持异步 action 的中间件
import reduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import countReducer from "./count/reducers";
import personReducer from "./person/reducers";

const store = createStore(combineReducers({
  count: countReducer,
  person: personReducer,
}), composeWithDevTools(applyMiddleware(reduxThunk)));

export default store;
