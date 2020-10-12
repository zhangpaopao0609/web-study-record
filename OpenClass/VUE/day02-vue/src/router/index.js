import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    meta: { auth: true },
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,  // http://1.2.3.4/shop
  routes
})

// 全局守卫
router.beforeEach( (to, from, next) => {
  // 看当前路由是否需要登录
  if( to.meta.auth && !window.isLogin ) { 
    if( window.confirm('请登录') ) {
      // 登录成功继续下一步
      window.isLogin = true;
      next();
    } else {
      // 放弃回首页
      next('/')
    }
  } else {
    // 不需要登录 继续
    next()
  }
  
})

export default router
