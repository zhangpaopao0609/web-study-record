# this call apply

# this
JS 的 this 总是指向一个对象，而具体指向哪个对象是在运行时基于函数的执行环境动态绑定的，而非函数被声明时的环境。（箭头函数除外）

## 1.1 this 的指向
除去 with 和 eval 的情况，具体到实际中，this的指向大致可分为以下 4 种。
- 作为对象的方法调用
- 作为普通函数调用
- 构造器调用
- Function.prototype.call 或 Function.prototype.apply 调用

