let Vue;

class VueRouter {
  constructor(options) {
    this.$options = options;
    
    // 创建一个路由 path 和 route 映射
    this.routeMap = {};
    
    // 将来当前路径 current 需要响应式
    // 利用 Vue 响应式原理可以做到这一点
    this.app = new Vue({
      data: {
        current: '/'
      }
    });
  }
  
  init() {
    // 绑定浏览器事件
    this.bindEvents();
    
    // 解析路由配置
    this.cerateRouteMap(this.$options);
    
    // 创建 router-link  router-view
    this.initComponent();
  }
  
  bindEvents() {
    window.addEventListener('hashchange', this.onHashChange.bind(this));
    window.addEventListener('load', this.onHashChange.bind(this));
  }
  
  onHashChange() {
    // localhost/#/home
    this.app.current = window.location.hash.slice(1) || '/';
  }
  
  cerateRouteMap(options) {
    options.routes.forEach(item => {
      this.routeMap[item.path] = item
    }) 
  }
  
  initComponent() {
    // 声明两个全局组件
    Vue.component('router-link', {
      props: {
        to: String
      },
      render(h) {
        // 目标是： <a :href='to'></a>
        return h('a', { attrs: { href: '#' + this.to } }, this.$slots.default)
        // 也可以写成 jsx
        // return ( 
        //   <a href={ this.to }>{ this.$slots.default }</a>
        // )
      }
    }),
    Vue.component('router-view', {
      // 箭头函数能够保留this的指向，这里指向VueRouter实例
      render: (h) => {
        const Comp = this.routeMap[this.app.current].component;
        return h(Comp);
      }
    })
  }
}

// 把 VueRouter 变成插件
VueRouter.install = function(_Vue) {
  Vue = _Vue; // 这里保存，上面使用
  
  // 混入任务  
  Vue.mixin({  // 混入： 就是扩展 Vue
    beforeCreate() {
      // 这里的代码将来会在外面初始化的时候被调用
      // 这样我们就实现了Vue扩展
      // this是谁？ Vue组件实例
      // 但是，这里只希望根组件执行一次
      if( this.$options.router ) {
        Vue.prototype.$router = this.$options.router;
        this.$options.router.init();
      }
    }
  })
}

export default VueRouter;