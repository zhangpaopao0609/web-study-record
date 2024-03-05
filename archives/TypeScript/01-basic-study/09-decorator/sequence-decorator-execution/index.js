"use strict";
/**
 * 装饰器执行的顺序
 * Sequence of decorator execution
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
function propertyDecorator_1(target, propertyName) {
    console.log("1. propertyDecorator_1");
}
;
function propertyDecorator_2(target, propertyName) {
    console.log("1. propertyDecorator_2");
}
;
function functionDecorator_1(target, functionName, descriptor) {
    console.log("2. functionDecorator_1");
}
;
function functionDecorator_2(target, functionName, descriptor) {
    console.log("2. functionDecorator_2");
}
;
function functionParamsDecorator_1(target, functionName, paramsIndex) {
    console.log("3. functionParamsDecorator_1");
}
;
function functionParamsDecorator_2(target, functionName, paramsIndex) {
    console.log("3. functionParamsDecorator_2");
}
;
function classDecorator_1(target) {
    console.log("4. classDecorator_1");
}
;
function classDecorator_2(target) {
    console.log("4. classDecorator_2");
}
;
var Arrow = /** @class */ (function () {
    function Arrow() {
    }
    Arrow.prototype.getName = function () { };
    Arrow.prototype.set = function (name, age) { };
    __decorate([
        propertyDecorator_1,
        propertyDecorator_2
    ], Arrow.prototype, "name", void 0);
    __decorate([
        functionDecorator_1,
        functionDecorator_2
    ], Arrow.prototype, "getName", null);
    __decorate([
        __param(0, functionParamsDecorator_1), __param(1, functionParamsDecorator_2)
    ], Arrow.prototype, "set", null);
    Arrow = __decorate([
        classDecorator_1,
        classDecorator_2
    ], Arrow);
    return Arrow;
}());
;
