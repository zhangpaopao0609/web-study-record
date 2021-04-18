"use strict";
var A;
(function (A) {
    var Animal = /** @class */ (function () {
        function Animal(name) {
            this.name = name;
        }
        ;
        Animal.prototype.getName = function () {
            console.log(this.name);
        };
        return Animal;
    }());
    A.Animal = Animal;
})(A || (A = {}));
;
var d = new A.Animal('dog');
d.getName();
var B;
(function (B) {
    var Animal = /** @class */ (function () {
        function Animal(name) {
            this.name = name;
        }
        ;
        Animal.prototype.getName = function () {
            console.log(this.name);
        };
        return Animal;
    }());
    B.Animal = Animal;
})(B || (B = {}));
;
var ld = new B.Animal('l dog');
ld.getName();
