// 该文件是 Count 的容器组件，用于连接 Count 的 UI 和 redux
import { connect } from "react-redux"; 
import CountUI from "../../components/Count/index";
import { 
  increaseAction,
  decreaseAction,
  increaseAsyncAction
} from "../../redux/count/actions";

export default connect(
  state => ({ sum: state }), 
  {
    increaseAction,
    decreaseAction,
    increaseAsyncAction,
  },
)(CountUI);
