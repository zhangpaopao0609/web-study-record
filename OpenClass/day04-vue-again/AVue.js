// 定义 AVue 构造函数
class AVue {
    constructor(options) {
        // 内部变量
        this.$options = options;

        this.$data = options.data;

        // 数据的拦截  响应化处理
        this.observe(this.$data);
        this.dataProxyToThis(this.$data);

        // 测试
        // new Watcher(this, 'name');

        new ACompile(options.el, this);

        options.created & options.created.call(this);
    }

    observe(data) {
        if (!data || typeof data !== 'object') {
            return;
        }

        // 遍历data
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key]);
        })
    }

    defineReactive(data, key, value) {
        this.observe(value);

        // 定义一个Dep
        const dep = new Dep();  // 每个dep实例和data中每个key有一对一关系   
        
        Object.defineProperty(data, key, {
            get() {
                // console.log(key+ '正在获取...');
                Dep.target && dep.addWatcher(Dep.target);
                return value;
            },
            set(newValue) {
                if(newValue !== value) {
                    value = newValue;
                    dep.notify();
                    // console.log(key + "正在更新...");
                }
            }
        })
    }

    // 将所有的数据都代理到this上，因为我们通常都是this.data来访问的
    dataProxyToThis(data) {
        Object.keys(data).forEach(key => {
            Object.defineProperty(this, key, {
                get() {
                    return this.$data[key];
                },
                set(newValue) {
                    // ! 这种挂载方式是存在问题的，如果对象中的子对象也拥有同样的键名呢？
                    // ! 所以，实际上对象只需要挂载外层即可，不需要内层再挂载
                    // ! 经过打断点发现，其实内部的子对象是需要挂载的，那么为什么这里不需要呢？
                    // ! 因为在内部的子对象在 defineReactive 做了的
                    this.$data[key] = newValue;
                }
            })
        })
    }
}

// 创建Dep: 管理所有的 Wather
class Dep {
    constructor() {
        // 存储所有的watcher
        this.watchers = []
    }

    addWatcher(watcher) {
        this.watchers.push(watcher);
    } 

    notify() {
        this.watchers.forEach(watcher => watcher.update())
    }
}

// 创建 Watcher: 保存 data 中数值和页面中的挂钩关系
class Watcher {
    constructor(vm, key, cb) {
        this.vm = vm;
        this.key = key;
        this.cb = cb;

        // 创建实例时立刻将该实例指向 Dep.target 便于依赖收集
        Dep.target = this;
        this.vm[this.key];
        Dep.target = null;
    }

    // 更新
    update() {
        console.log(this.key + '更新了！');
        this.cb.call(this.vm,  this.vm[this.key]);
    }
}