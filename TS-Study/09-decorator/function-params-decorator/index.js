"use strict";
/**
 * 4. 方法参数装饰器
 * 参数装饰器表达式会在运行时当前函数被调用，可以使用参数装饰器为类的原型增加一些元素数据，传入下面 3 个参数：
 * 1. 对于静态成员来说是类的构造函数，对于实例成员来说是类的原型对象
 * 2. 方法的名字
 * 3. 参数在函数参数列表中的索引
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
function functionParamsDecorator(target, functionName, paramsIndex) {
    console.log(target, functionName, paramsIndex);
    target.gender = 'boy';
}
var Man = /** @class */ (function () {
    function Man() {
    }
    Man.prototype.getData = function (str, uuid) {
        console.log('get data');
    };
    __decorate([
        __param(1, functionParamsDecorator)
    ], Man.prototype, "getData", null);
    return Man;
}());
;
var m = new Man();
m.getData('a', 'b');
console.log(m.gender);
