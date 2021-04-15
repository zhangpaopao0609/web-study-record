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
Object.defineProperty(exports, "__esModule", { value: true });
// 多态：父类定义一个方法不去实现，让继承它的子类去实现，每一个子类都有不同的表现。
// 多态是继承的一种表现。
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    ;
    Animal.prototype.eat = function () {
        console.log('吃的方法！');
    };
    return Animal;
}());
;
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dog.prototype.eat = function () {
        console.log(this.name + "\u5403\u8089\uFF01");
    };
    return Dog;
}(Animal));
;
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cat.prototype.eat = function () {
        console.log(this.name + "\u5403\u8001\u9F20\uFF01");
    };
    return Cat;
}(Animal));
;
var dog = new Dog('dog');
dog.eat();
