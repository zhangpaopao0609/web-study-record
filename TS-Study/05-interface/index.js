"use strict";
/**
 * 1. 属性接口 对 json 的约束
 */
// interface FullName {
//   firstName: string;      // 这里用 ; 结尾哟
//   lastName: string;
// }
function printName(name) {
    console.log(name.firstName + "---" + name.lastName);
}
;
var data = {
    firstName: 'arrow',
    lastName: 'bullet'
};
printName(data);
;
var md5 = function (key, value) {
    return key + value;
};
md5('11', '22');
/**
 * 3. 可索引接口： 数组、对象的约束（不常用）
 */
// 一般ts定义数组的方式是：
var arr1 = [1, 2];
var arr2 = ['1', '2'];
;
var arr3 = ['a', 'b'];
;
var obj1 = {
    test: 'test'
};
;
var Dog = /** @class */ (function () {
    function Dog(name) {
        this.name = 'init';
        this.name = name;
    }
    ;
    Dog.prototype.eat = function (str) {
        console.log(this.name + '---' + str);
    };
    ;
    return Dog;
}());
;
var d = new Dog('wumi');
d.eat('meat');
