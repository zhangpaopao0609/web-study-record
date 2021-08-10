// 该文件是整个 redux 中最为核心的 store 对象
import { createStore } from "redux";
import countReducer from "./count/reducers";

const store = createStore(countReducer);

export default store;
