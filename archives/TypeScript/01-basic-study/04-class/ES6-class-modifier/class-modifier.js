"use strict";
// 3. 类的修饰符 typescript 里面定义属性的时候给我提供了三种修饰符
/**
 * public: 公有，在类里面、子类、类外面都可以访问
 * protected： 保护类型，在类里面、子类里面可以访问，在类外面不可访问
 * private：私有  只能再类里面访问，子类和类外面都不访问
 * 属性如果不加修饰符，默认是 public
 */
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
var Person = /** @class */ (function () {
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    Person.prototype.getName = function () {
        return this.name;
    };
    Person.prototype.getAge = function () {
        return this.age;
    };
    Person.prototype.getNameAndAge = function () {
        return this.name + " + " + this.age;
    };
    Person.prototype.init = function () {
        return this.getNameAndAge(); // 私有方法只能当前类中获取
    };
    Person.nationality = function () {
        return 'China';
    };
    return Person;
}());
;
console.log(Person.nationality());
var p = new Person('arow', 2);
console.log(p.name); // 公有属性实例可直接访问
var Man = /** @class */ (function (_super) {
    __extends(Man, _super);
    function Man() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Man.prototype.getManAge = function () {
        return this.getAge(); // 受保护的方法只能 类 和 子类中获取，实例无法获取
    };
    return Man;
}(Person));
var tom = new Man('tom', 16);
console.log(tom.name); // 公有属性实例可直接访问
console.log(tom.getManAge()); // 公有属性实例可直接访问
