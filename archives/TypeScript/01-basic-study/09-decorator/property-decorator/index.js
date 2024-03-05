"use strict";
/**
 * 2. 属性装饰器
 * 属性装饰器表达式会在运行时当做函数被调用，传入2个参数：
 * 1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
 * 2. 成员的名字
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
function propertyDecorator(target, key) {
    target[key] = 'test';
}
;
function propertyDecoratorWithParams(params) {
    return function (target, key) {
        target[key] = params;
    };
}
var Url = /** @class */ (function () {
    function Url() {
    }
    Url.prototype.getData = function () {
        console.log(this.data);
        console.log(this.value);
    };
    __decorate([
        propertyDecorator
    ], Url.prototype, "data", void 0);
    __decorate([
        propertyDecoratorWithParams("default value")
    ], Url.prototype, "value", void 0);
    return Url;
}());
;
var h = new Url();
h.getData();
