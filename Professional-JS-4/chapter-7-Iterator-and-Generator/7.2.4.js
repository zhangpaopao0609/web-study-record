// 提前终止迭代器
class Counter {
    constructor(limit) {
        this.limit = limit;
    }

    [Symbol.iterator]() {   // 迭代器工厂函数  也可以说是Iterable接口
        let count = 1, limit = this.limit;
        return {
            next() {    // 迭代next
                if(count <= limit) {
                    return { done: false, value: count++ };
                }else {
                    return { done: true, value: undefined };
                }
            },
            return() {      // 终止函数
                console.log('Exit Early');
                return { done: true };
            }
        }
    }
}

const counter = new Counter(3);

for (const i of counter) {
    if(i > 2) break;
    console.log(i);
}
