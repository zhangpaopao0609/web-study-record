"use strict";
/**
 * 功能： 定义一个操作数据库的库， 支持 Mysql Mssql MongoDb
 * 要求1： Mysql MsSql MongoDb 功能一样 都有 add update delete get 方法
 * 注意：约束统一规范、以及代码重用
 * 解决方案：需要约束规范所以要定义接口，需要代码重用所以用到泛型
 * 1. 接口： 在面向对象的编程中，接口是一种规范的定义，它定义了行为和动作规范
 * 2. 泛型 通俗理解：泛型就是解决 类 接口 方法的复用性
 */
;
// 定义一个操作 mysql 数据库的类
// 注意： 要实现泛型接口，这个类也应该是一个泛型类
var MysqlDB = /** @class */ (function () {
    function MysqlDB() {
    }
    MysqlDB.prototype.add = function (info) {
        console.log(info);
        return true;
    };
    ;
    MysqlDB.prototype.update = function (info, id) {
        throw new Error("Method not implemented.");
    };
    ;
    MysqlDB.prototype.delete = function (id) {
        throw new Error("Method not implemented.");
    };
    ;
    MysqlDB.prototype.get = function (id) {
        throw new Error("Method not implemented.");
    };
    ;
    return MysqlDB;
}());
;
// 定义一个操作 mssql 数据库的类
var MsSql = /** @class */ (function () {
    function MsSql() {
    }
    MsSql.prototype.add = function (info) {
        console.log(info);
        return true;
    };
    ;
    MsSql.prototype.update = function (info, id) {
        throw new Error("Method not implemented.");
    };
    ;
    MsSql.prototype.delete = function (id) {
        throw new Error("Method not implemented.");
    };
    ;
    MsSql.prototype.get = function (id) {
        throw new Error("Method not implemented.");
    };
    ;
    return MsSql;
}());
;
// 操作用户表 定义一个 User 类和数据表做映射
var User = /** @class */ (function () {
    function User(username, password) {
        this.username = username;
        this.password = password;
    }
    ;
    return User;
}());
;
var u = new User('arrow', '123');
var demoMysql = new MysqlDB(); // 类作为参数来约束数据传入的类型
demoMysql.add(u);
var demoMssql = new MsSql();
demoMssql.add(u);
