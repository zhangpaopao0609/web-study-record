// 做一个全局的路由
import router from './router/index.js';
import store from "./store/index.js";
import { getToken } from "@/utils/auth";  // 从cookie里面获取令牌

const whiteList = ['/login']

router.beforeEach((to, from, next) => {
    const hasToken = getToken();
    
    if (hasToken) {
        if(to.path === '/login') {
            next({ path: '/' });
        } else {
            // 已登录
            const hasRoles = store.getters.roles &&  
        }

    } else {
        if(whiteList.includes(to.path)) {
            next(); 
        } else {
            next(`/login?redirect=${to.path}`);
        }
    }
})