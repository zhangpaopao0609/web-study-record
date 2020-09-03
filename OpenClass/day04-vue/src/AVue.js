// 定义 AVue 构造函数
class AVue {
  constructor(options) {
    // 保存选项
    this.$options = options;
    
    // 传入 data
    this.$data = options.data;
    
    // 响应化处理
    this.observe(this.$data);
    
    // new Watcher(this, 'name');
    // this.name;
    
    new Compiler(options.el, this);
    
    options.created && options.created.call(this);
  }
  
  observe(value) {
    if(!value || typeof value !== 'object') return
    
    // 遍历 Value
    Object.keys(value).forEach(key => {
      // 响应式处理
      this.defineReactive(value, key, value[key]);
      // 代理 data 中的属性到 vue 根上
      this.proxyData(key);
    })
  }
  
  defineReactive(obj, key, value) {
    // 递归遍历 obj， 因为 obj 可能嵌套
    this.observe(value);
    
    // 定义了一个 Dep
    const dep = new Dep();  // 每个dep实例和data中每个key有一一对应关系
    
    // 给obj的每一个key定义拦截
    Object.defineProperty(obj, key, {
      get: () => {
        // 依赖收集
        Dep.target && dep.addDep(Dep.target); 
        return value;
      },
      set: (newValue) => {
        if(newValue !== value) {
          // console.log(`${key} 属性从${value}更新为${newValue}了！`);
          value = newValue;
          dep.notify();
        }  
      }
    })
  }
  
  // 在 vue 根上定义属性代理data中的数据
  proxyData(key) {
    // this 指实例
    Object.defineProperty(this, key, {
      get() {
        return this.$data[key];
      },
      set(newValue) {
        this.$data[key] = newValue;
      }
    })
  }
  
}


// 创建 Dep: 管理所有的 watcher
class Dep {
  constructor() {
    // 存储所有依赖
    this.watchers = [];
  }
  
  addDep(watcher) {
    this.watchers.push(watcher);
  }
  
  notify() {
    this.watchers.forEach(watcher => watcher.update());
  }
}

// 创建 watcher：保存data中数值和页面中的挂钩关系
class Watcher {
  constructor(vm, key, cb) {
    // 创建实例时立刻将该实例指向 Dep.target 便于依赖收集
    Dep.target = this;
    this.vm = vm;
    this.key = key;
    this.cb = cb;
    
    // 触发依赖收集
    this.vm[this.key];
    Dep.target = null;
  }
  
  // 更新
  update() {
    this.cb.call(this.vm, this.vm[this.key]);
    console.log(`${this.key} 更新了！`);
  }
} 