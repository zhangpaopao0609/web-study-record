"use strict";
// 这里的 T 就代表泛型
/**
 * 泛型函数
 */
function getData(value) {
    return value;
}
;
console.log(getData(1));
console.log(getData('arrow'));
/**
 * 泛型类
 * 利用泛型来定义类
 */
var MinData = /** @class */ (function () {
    function MinData() {
        this.queue = [];
    }
    MinData.prototype.add = function (data) {
        if (!this.minData || this.minData > data) {
            this.minData = data;
        }
        ;
        this.queue.push(data);
    };
    ;
    MinData.prototype.min = function () {
        return this.minData;
    };
    return MinData;
}());
;
var n = new MinData();
n.add(10);
n.add(4);
n.add(6);
console.log(n.min());
var s = new MinData();
s.add('c');
s.add('a');
s.add('d');
console.log(s.min());
;
var fn_1 = function (value) {
    return value;
};
console.log(fn_1('1'));
console.log(fn_1(1));
;
function fn(value) {
    return value;
}
;
var fn_2 = fn;
console.log(fn_2('1'));
