"use strict";
/**
 * 3. 方法装饰器
 * 它会被应用到方法的属性描述符上，可以用来监视，修改或者替换方法定义
 *
 * 方法装饰会在运行时传入下面 3 个参数
 * 1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
 * 2. 成员的名字
 * 3. 成员的属性描述符
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
function functionDecorator(target, functionName, descriptor) {
    console.log(target, functionName, descriptor);
    console.log(target); // 类的原型
    // 保存当前的方法
    var old = descriptor.value;
    descriptor.value = function () {
        console.log('改造原来的方法！');
        old.apply(this); // 实例
    };
}
;
var Person = /** @class */ (function () {
    function Person() {
        this.name = 'arrow';
    }
    Person.prototype.getName = function () {
        console.log(this.name);
    };
    Person.prototype.getAge = function () {
        console.log(this.age);
    };
    __decorate([
        functionDecorator
    ], Person.prototype, "getName", null);
    return Person;
}());
;
var t = new Person();
t.getName();
