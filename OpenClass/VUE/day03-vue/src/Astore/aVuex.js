let Vue;

function install(_Vue) {
  Vue = _Vue;
  
  // 混入： 把store选项指定到Vue原型上
  Vue.mixin({
    beforeCreate() {
      if(this.$options.store) {
        Vue.prototype.$store = this.$options.store;
      }
    }
  })
}

class Store {
  // options: { state: { count : 0 } }
  constructor(options = {}) {
    // 利用vue数据的响应式
    this.state = new Vue({
      data: options.state
    });
    // 初始化mutations
    this.mutations = options.mutations || {};
    // 初始化actions
    this.actions = options.actions || {};
    // 初始化getters
    options.getters && this.handleGetters(options.getters);
  }
  
  // 触发mutations， 需要实现commit
  commit = (type, arg) => {
    // this指向 Store 实例
    const fn = this.mutations[type]  // 获取变更函数
    fn(this.state, arg); 
  }
  
  dispatch = (type, arg) => {
    const fn = this.actions[type];
    return fn(this, arg);
  }
  
  handleGetters = (getters) => {
    this.getters = {};
    
    // 定义只读的属性
    Object.keys(getters).forEach(key => {
      Object.defineProperty(this.getters, key, { 
        get: () => {
          return getters[key](this.state)
        }
       });
    })
  }
}

// Vuex
export default { Store, install }