// 定义 AVue 构造函数
class AVue {
    constructor(options) {
        // 内部变量
        this.$options = options;

        this.$data = options.data;

        // 数据的拦截  响应化处理
        this.observe(this.$data);
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
        
        Object.defineProperty(data, key, {
            get() {
                console.log(key+ '正在获取...');
                return value;
            },
            set(newValue) {
                if(newValue !== value) {
                    value = newValue;
                    console.log(key + "正在更新...");
                }
            }
        })
    }
}