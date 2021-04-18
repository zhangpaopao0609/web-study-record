"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// 类装饰器
/**
 * 类装饰器传递的参数为 类本身
 */
// 1. 普通装饰器（无法传参）
function logClass_1(target) {
    console.log(target); // target 就是当前类
    target.prototype.apiUrl = '动态扩展的属性';
    target.prototype.run = function () {
        console.log(this.name);
    };
}
var HttpClient_1 = /** @class */ (function () {
    function HttpClient_1(name) {
        this.name = name;
    }
    ;
    HttpClient_1.prototype.getData = function () {
    };
    HttpClient_1 = __decorate([
        logClass_1
    ], HttpClient_1);
    return HttpClient_1;
}());
;
var h_1 = new HttpClient_1('arrow');
console.log(h_1.apiUrl);
h_1.run();
// 2. 装饰器工厂（可传参）
function logClass_2(params) {
    return function (target) {
        target.prototype.apiUrl = '动态扩展的属性' + params;
        target.prototype.run = function () {
            console.log(this.name + params);
        };
    };
}
var HttpClient_2 = /** @class */ (function () {
    function HttpClient_2(name) {
        this.name = name;
    }
    ;
    HttpClient_2.prototype.getData = function () {
    };
    HttpClient_2 = __decorate([
        logClass_2('hello')
    ], HttpClient_2);
    return HttpClient_2;
}());
;
var h_2 = new HttpClient_2('arrow');
console.log(h_2.apiUrl);
h_2.run();
// 类的重载
function logClass_3(target) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.name = '修改后！';
            _this.more = 11111;
            return _this;
        }
        class_1.prototype.getData = function () {
            console.log(this.name + this.more);
        };
        return class_1;
    }(target));
}
var HttpClient_3 = /** @class */ (function () {
    function HttpClient_3(name) {
        this.name = name;
    }
    ;
    HttpClient_3.prototype.getData = function () {
        console.log(this.name);
    };
    HttpClient_3 = __decorate([
        logClass_3
    ], HttpClient_3);
    return HttpClient_3;
}());
;
var h_3 = new HttpClient_3('arrow-3');
h_3.getData();
