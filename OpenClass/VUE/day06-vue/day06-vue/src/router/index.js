import Vue from 'vue';
import vueRouter from 'vue-router';
import Layout from '@/layout/index.vue'; // 布局页

Vue.use(vueRouter);

// 通用页面
export const constRoutes = [
    {
        path: '/login',
        component: () => import('@/views/Login/index.vue'),
        hidden: true // 导航栏忽略该项
    },
    {
        path: '/',
        component: Layout,  
        redirect: '/home',
        children: [
            {
                path: 'home',
                component: () => import('@/views/Home/index.vue'),
                name: 'home',
                meta: {
                    title: 'Home',  // 导航菜单项标题
                    icon: 'qq'      // 导航菜单项图标
                }
            }
            
        ]
    }
];

export const asyncRoutes = [
    {
        path: '/about',
        component: Layout,
        redirect:'/about/index',
        children: [
            {
                path: 'index',
                component: () => import('@/views/About/index.vue'),
                name: 'about',
                meta: {
                    title: "About",
                    icon:'qq',
                    // 角色决定将来那些用户可以用来看到该路由
                    roles: ['admin', 'editor']
                }
            }
        ]
    }
];

export default new vueRouter({
    base: process.env.BASE_URL,
    routes: constRoutes
})