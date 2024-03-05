// 该文件专门用于统一管理路由
import Login from '../views/Login/index.jsx';
import User from '../views/User/index.jsx';

// routes 数组中存储着所有的路由配置，每个路由配置都是一个对象
const routes = [
  {
    path: '/login',
    component: Login,
    exact: true,
  },
  {
    path: '/user',
    component: User,
    exact: true,
  },
];

export default routes;