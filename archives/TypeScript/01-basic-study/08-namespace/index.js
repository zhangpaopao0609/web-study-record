'use strict';
let A;
(function (A) {
  const Animal = /** @class */ (function () {
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
const d = new A.Animal('dog');
d.getName();
let B;
(function (B) {
  const Animal = /** @class */ (function () {
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
const ld = new B.Animal('l dog');
ld.getName();
